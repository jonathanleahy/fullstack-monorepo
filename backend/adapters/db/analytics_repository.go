package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"

	"github.com/project/backend/domain/entities"
)

// AnalyticsRepository implements the AnalyticsRepository interface with SQLite
type AnalyticsRepository struct {
	db *SQLiteDB
}

// NewAnalyticsRepository creates a new AnalyticsRepository
func NewAnalyticsRepository(db *SQLiteDB) *AnalyticsRepository {
	return &AnalyticsRepository{db: db}
}

// RecordView records a course view event
func (r *AnalyticsRepository) RecordView(ctx context.Context, view *entities.CourseView) error {
	view.ID = uuid.New().String()

	query := `INSERT INTO course_views (id, library_course_id, user_id, viewed_at)
			  VALUES (?, ?, ?, ?)`

	_, err := r.db.DB().ExecContext(ctx, query,
		view.ID, view.LibraryCourseID, view.UserID, view.ViewedAt)
	return err
}

// GetCourseAnalytics retrieves analytics for a specific course
func (r *AnalyticsRepository) GetCourseAnalytics(ctx context.Context, libraryCourseID string) (*entities.CourseAnalytics, error) {
	analytics := entities.NewCourseAnalytics(libraryCourseID)

	// Get total views
	viewQuery := `SELECT COUNT(*) FROM course_views WHERE library_course_id = ?`
	if err := r.db.DB().QueryRowContext(ctx, viewQuery, libraryCourseID).Scan(&analytics.TotalViews); err != nil {
		return nil, err
	}

	// Get unique views (distinct user_ids, excluding empty strings)
	uniqueViewQuery := `SELECT COUNT(DISTINCT user_id) FROM course_views
						WHERE library_course_id = ? AND user_id != ''`
	if err := r.db.DB().QueryRowContext(ctx, uniqueViewQuery, libraryCourseID).Scan(&analytics.UniqueViews); err != nil {
		return nil, err
	}

	// Get total enrollments
	enrollmentQuery := `SELECT COUNT(*) FROM user_courses WHERE library_course_id = ?`
	if err := r.db.DB().QueryRowContext(ctx, enrollmentQuery, libraryCourseID).Scan(&analytics.TotalEnrollments); err != nil {
		return nil, err
	}

	// Get completion stats
	if analytics.TotalEnrollments > 0 {
		// Count completed courses (progress = 100)
		var completedCount int
		completionQuery := `SELECT COUNT(*) FROM user_courses
							WHERE library_course_id = ? AND progress = 100`
		if err := r.db.DB().QueryRowContext(ctx, completionQuery, libraryCourseID).Scan(&completedCount); err != nil {
			return nil, err
		}
		analytics.CompletionRate = (float64(completedCount) / float64(analytics.TotalEnrollments)) * 100.0

		// Get average progress
		var avgProgress sql.NullFloat64
		avgQuery := `SELECT AVG(progress) FROM user_courses WHERE library_course_id = ?`
		if err := r.db.DB().QueryRowContext(ctx, avgQuery, libraryCourseID).Scan(&avgProgress); err != nil {
			return nil, err
		}
		if avgProgress.Valid {
			analytics.AverageProgress = avgProgress.Float64
		}
	}

	return analytics, nil
}

// GetAuthorCoursesAnalytics retrieves analytics for all courses by an author
func (r *AnalyticsRepository) GetAuthorCoursesAnalytics(ctx context.Context, authorID string) ([]*entities.CourseAnalytics, error) {
	// First, get all course IDs by this author
	courseQuery := `SELECT id FROM library_courses WHERE author_id = ?`
	rows, err := r.db.DB().QueryContext(ctx, courseQuery, authorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courseIDs []string
	for rows.Next() {
		var courseID string
		if err := rows.Scan(&courseID); err != nil {
			return nil, err
		}
		courseIDs = append(courseIDs, courseID)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	// Get analytics for each course
	var allAnalytics []*entities.CourseAnalytics
	for _, courseID := range courseIDs {
		analytics, err := r.GetCourseAnalytics(ctx, courseID)
		if err != nil {
			return nil, err
		}
		allAnalytics = append(allAnalytics, analytics)
	}

	return allAnalytics, nil
}
