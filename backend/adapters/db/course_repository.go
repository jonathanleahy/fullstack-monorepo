package db

import (
	"context"
	"database/sql"
	"encoding/json"
	"time"

	"github.com/google/uuid"

	"github.com/project/backend/domain/entities"
)

// LibraryCourseRepository implements the LibraryCourseRepository interface with SQLite
type LibraryCourseRepository struct {
	db *SQLiteDB
}

// NewLibraryCourseRepository creates a new LibraryCourseRepository
func NewLibraryCourseRepository(db *SQLiteDB) *LibraryCourseRepository {
	return &LibraryCourseRepository{db: db}
}

// Create stores a new library course and returns it with ID
func (r *LibraryCourseRepository) Create(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error) {
	course.ID = uuid.New().String()
	course.CreatedAt = time.Now()
	course.UpdatedAt = course.CreatedAt

	lessonsJSON, err := json.Marshal(course.Lessons)
	if err != nil {
		return nil, err
	}

	query := `INSERT INTO library_courses (id, title, description, lessons, author, difficulty, estimated_hours, created_at, updated_at)
			  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err = r.db.DB().ExecContext(ctx, query,
		course.ID, course.Title, course.Description, string(lessonsJSON),
		course.Author, string(course.Difficulty), course.EstimatedHours,
		course.CreatedAt, course.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return course, nil
}

// GetByID retrieves a library course by ID
func (r *LibraryCourseRepository) GetByID(ctx context.Context, id string) (*entities.LibraryCourse, error) {
	query := `SELECT id, title, description, lessons, author, difficulty, estimated_hours, created_at, updated_at
			  FROM library_courses WHERE id = ?`

	course := &entities.LibraryCourse{}
	var lessonsJSON string
	var difficulty string

	err := r.db.DB().QueryRowContext(ctx, query, id).Scan(
		&course.ID, &course.Title, &course.Description, &lessonsJSON,
		&course.Author, &difficulty, &course.EstimatedHours,
		&course.CreatedAt, &course.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrCourseNotFound
	}
	if err != nil {
		return nil, err
	}

	course.Difficulty = entities.Difficulty(difficulty)

	if err := json.Unmarshal([]byte(lessonsJSON), &course.Lessons); err != nil {
		return nil, err
	}

	return course, nil
}

// Update modifies an existing library course
func (r *LibraryCourseRepository) Update(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error) {
	course.UpdatedAt = time.Now()

	lessonsJSON, err := json.Marshal(course.Lessons)
	if err != nil {
		return nil, err
	}

	query := `UPDATE library_courses SET title = ?, description = ?, lessons = ?, author = ?,
			  difficulty = ?, estimated_hours = ?, updated_at = ? WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query,
		course.Title, course.Description, string(lessonsJSON),
		course.Author, string(course.Difficulty), course.EstimatedHours,
		course.UpdatedAt, course.ID)
	if err != nil {
		return nil, err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}
	if rows == 0 {
		return nil, entities.ErrCourseNotFound
	}

	return course, nil
}

// Delete removes a library course by ID
func (r *LibraryCourseRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM library_courses WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return entities.ErrCourseNotFound
	}

	return nil
}

// List retrieves all library courses with pagination
func (r *LibraryCourseRepository) List(ctx context.Context, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM library_courses`
	if err := r.db.DB().QueryRowContext(ctx, countQuery).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated courses
	query := `SELECT id, title, description, lessons, author, difficulty, estimated_hours, created_at, updated_at
			  FROM library_courses ORDER BY created_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var courses []*entities.LibraryCourse
	for rows.Next() {
		course := &entities.LibraryCourse{}
		var lessonsJSON string
		var difficulty string

		if err := rows.Scan(&course.ID, &course.Title, &course.Description, &lessonsJSON,
			&course.Author, &difficulty, &course.EstimatedHours,
			&course.CreatedAt, &course.UpdatedAt); err != nil {
			return nil, 0, err
		}

		course.Difficulty = entities.Difficulty(difficulty)
		if err := json.Unmarshal([]byte(lessonsJSON), &course.Lessons); err != nil {
			return nil, 0, err
		}

		courses = append(courses, course)
	}

	return courses, total, rows.Err()
}

// ListByDifficulty retrieves courses filtered by difficulty
func (r *LibraryCourseRepository) ListByDifficulty(ctx context.Context, difficulty entities.Difficulty, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	// Get total count for this difficulty
	var total int
	countQuery := `SELECT COUNT(*) FROM library_courses WHERE difficulty = ?`
	if err := r.db.DB().QueryRowContext(ctx, countQuery, string(difficulty)).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated courses
	query := `SELECT id, title, description, lessons, author, difficulty, estimated_hours, created_at, updated_at
			  FROM library_courses WHERE difficulty = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, string(difficulty), limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var courses []*entities.LibraryCourse
	for rows.Next() {
		course := &entities.LibraryCourse{}
		var lessonsJSON string
		var diff string

		if err := rows.Scan(&course.ID, &course.Title, &course.Description, &lessonsJSON,
			&course.Author, &diff, &course.EstimatedHours,
			&course.CreatedAt, &course.UpdatedAt); err != nil {
			return nil, 0, err
		}

		course.Difficulty = entities.Difficulty(diff)
		if err := json.Unmarshal([]byte(lessonsJSON), &course.Lessons); err != nil {
			return nil, 0, err
		}

		courses = append(courses, course)
	}

	return courses, total, rows.Err()
}

// Search finds courses by title or description
func (r *LibraryCourseRepository) Search(ctx context.Context, query string, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	searchPattern := "%" + query + "%"

	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM library_courses WHERE title LIKE ? OR description LIKE ?`
	if err := r.db.DB().QueryRowContext(ctx, countQuery, searchPattern, searchPattern).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated courses
	sqlQuery := `SELECT id, title, description, lessons, author, difficulty, estimated_hours, created_at, updated_at
			  FROM library_courses WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, sqlQuery, searchPattern, searchPattern, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var courses []*entities.LibraryCourse
	for rows.Next() {
		course := &entities.LibraryCourse{}
		var lessonsJSON string
		var difficulty string

		if err := rows.Scan(&course.ID, &course.Title, &course.Description, &lessonsJSON,
			&course.Author, &difficulty, &course.EstimatedHours,
			&course.CreatedAt, &course.UpdatedAt); err != nil {
			return nil, 0, err
		}

		course.Difficulty = entities.Difficulty(difficulty)
		if err := json.Unmarshal([]byte(lessonsJSON), &course.Lessons); err != nil {
			return nil, 0, err
		}

		courses = append(courses, course)
	}

	return courses, total, rows.Err()
}

// UserCourseRepository implements the UserCourseRepository interface with SQLite
type UserCourseRepository struct {
	db *SQLiteDB
}

// NewUserCourseRepository creates a new UserCourseRepository
func NewUserCourseRepository(db *SQLiteDB) *UserCourseRepository {
	return &UserCourseRepository{db: db}
}

// Create stores a new user course and returns it with ID
func (r *UserCourseRepository) Create(ctx context.Context, userCourse *entities.UserCourse) (*entities.UserCourse, error) {
	userCourse.ID = uuid.New().String()
	userCourse.StartedAt = time.Now()
	userCourse.UpdatedAt = userCourse.StartedAt

	query := `INSERT INTO user_courses (id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at)
			  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.DB().ExecContext(ctx, query,
		userCourse.ID, userCourse.UserID, userCourse.LibraryCourseID,
		userCourse.Progress, userCourse.CurrentLessonIndex,
		userCourse.StartedAt, userCourse.UpdatedAt, userCourse.CompletedAt)
	if err != nil {
		return nil, err
	}

	return userCourse, nil
}

// GetByID retrieves a user course by ID
func (r *UserCourseRepository) GetByID(ctx context.Context, id string) (*entities.UserCourse, error) {
	query := `SELECT id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at
			  FROM user_courses WHERE id = ?`

	userCourse := &entities.UserCourse{}
	var completedAt sql.NullTime

	err := r.db.DB().QueryRowContext(ctx, query, id).Scan(
		&userCourse.ID, &userCourse.UserID, &userCourse.LibraryCourseID,
		&userCourse.Progress, &userCourse.CurrentLessonIndex,
		&userCourse.StartedAt, &userCourse.UpdatedAt, &completedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrCourseNotFound
	}
	if err != nil {
		return nil, err
	}

	if completedAt.Valid {
		userCourse.CompletedAt = &completedAt.Time
	}

	return userCourse, nil
}

// GetByUserAndCourse retrieves a user course by user ID and library course ID
func (r *UserCourseRepository) GetByUserAndCourse(ctx context.Context, userID, libraryCourseID string) (*entities.UserCourse, error) {
	query := `SELECT id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at
			  FROM user_courses WHERE user_id = ? AND library_course_id = ?`

	userCourse := &entities.UserCourse{}
	var completedAt sql.NullTime

	err := r.db.DB().QueryRowContext(ctx, query, userID, libraryCourseID).Scan(
		&userCourse.ID, &userCourse.UserID, &userCourse.LibraryCourseID,
		&userCourse.Progress, &userCourse.CurrentLessonIndex,
		&userCourse.StartedAt, &userCourse.UpdatedAt, &completedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrCourseNotFound
	}
	if err != nil {
		return nil, err
	}

	if completedAt.Valid {
		userCourse.CompletedAt = &completedAt.Time
	}

	return userCourse, nil
}

// Update modifies an existing user course
func (r *UserCourseRepository) Update(ctx context.Context, userCourse *entities.UserCourse) (*entities.UserCourse, error) {
	userCourse.UpdatedAt = time.Now()

	query := `UPDATE user_courses SET progress = ?, current_lesson_index = ?, updated_at = ?, completed_at = ? WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query,
		userCourse.Progress, userCourse.CurrentLessonIndex,
		userCourse.UpdatedAt, userCourse.CompletedAt, userCourse.ID)
	if err != nil {
		return nil, err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}
	if rows == 0 {
		return nil, entities.ErrCourseNotFound
	}

	return userCourse, nil
}

// Delete removes a user course by ID
func (r *UserCourseRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM user_courses WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return entities.ErrCourseNotFound
	}

	return nil
}

// ListByUser retrieves all courses for a specific user
func (r *UserCourseRepository) ListByUser(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error) {
	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM user_courses WHERE user_id = ?`
	if err := r.db.DB().QueryRowContext(ctx, countQuery, userID).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated user courses
	query := `SELECT id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at
			  FROM user_courses WHERE user_id = ? ORDER BY started_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var userCourses []*entities.UserCourse
	for rows.Next() {
		uc := &entities.UserCourse{}
		var completedAt sql.NullTime

		if err := rows.Scan(&uc.ID, &uc.UserID, &uc.LibraryCourseID,
			&uc.Progress, &uc.CurrentLessonIndex,
			&uc.StartedAt, &uc.UpdatedAt, &completedAt); err != nil {
			return nil, 0, err
		}

		if completedAt.Valid {
			uc.CompletedAt = &completedAt.Time
		}

		userCourses = append(userCourses, uc)
	}

	return userCourses, total, rows.Err()
}

// ListCompleted retrieves all completed courses for a user
func (r *UserCourseRepository) ListCompleted(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error) {
	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM user_courses WHERE user_id = ? AND completed_at IS NOT NULL`
	if err := r.db.DB().QueryRowContext(ctx, countQuery, userID).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated completed courses
	query := `SELECT id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at
			  FROM user_courses WHERE user_id = ? AND completed_at IS NOT NULL ORDER BY completed_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var userCourses []*entities.UserCourse
	for rows.Next() {
		uc := &entities.UserCourse{}
		var completedAt sql.NullTime

		if err := rows.Scan(&uc.ID, &uc.UserID, &uc.LibraryCourseID,
			&uc.Progress, &uc.CurrentLessonIndex,
			&uc.StartedAt, &uc.UpdatedAt, &completedAt); err != nil {
			return nil, 0, err
		}

		if completedAt.Valid {
			uc.CompletedAt = &completedAt.Time
		}

		userCourses = append(userCourses, uc)
	}

	return userCourses, total, rows.Err()
}

// ListInProgress retrieves all in-progress courses for a user
func (r *UserCourseRepository) ListInProgress(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error) {
	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM user_courses WHERE user_id = ? AND completed_at IS NULL`
	if err := r.db.DB().QueryRowContext(ctx, countQuery, userID).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated in-progress courses
	query := `SELECT id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at
			  FROM user_courses WHERE user_id = ? AND completed_at IS NULL ORDER BY updated_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var userCourses []*entities.UserCourse
	for rows.Next() {
		uc := &entities.UserCourse{}
		var completedAt sql.NullTime

		if err := rows.Scan(&uc.ID, &uc.UserID, &uc.LibraryCourseID,
			&uc.Progress, &uc.CurrentLessonIndex,
			&uc.StartedAt, &uc.UpdatedAt, &completedAt); err != nil {
			return nil, 0, err
		}

		if completedAt.Valid {
			uc.CompletedAt = &completedAt.Time
		}

		userCourses = append(userCourses, uc)
	}

	return userCourses, total, rows.Err()
}
