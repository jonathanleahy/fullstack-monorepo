package repositories

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// AnalyticsRepository defines the interface for analytics data access
type AnalyticsRepository interface {
	// RecordView records a course view event
	RecordView(ctx context.Context, view *entities.CourseView) error

	// GetCourseAnalytics retrieves analytics for a specific course
	GetCourseAnalytics(ctx context.Context, libraryCourseID string) (*entities.CourseAnalytics, error)

	// GetAuthorCoursesAnalytics retrieves analytics for all courses by an author
	GetAuthorCoursesAnalytics(ctx context.Context, authorID string) ([]*entities.CourseAnalytics, error)
}
