package repositories

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// LibraryCourseRepository defines the interface for library course data access
type LibraryCourseRepository interface {
	// Create stores a new library course and returns it with ID
	Create(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error)

	// GetByID retrieves a library course by ID
	GetByID(ctx context.Context, id string) (*entities.LibraryCourse, error)

	// Update modifies an existing library course
	Update(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error)

	// Delete removes a library course by ID
	Delete(ctx context.Context, id string) error

	// List retrieves all library courses with pagination
	List(ctx context.Context, limit, offset int) ([]*entities.LibraryCourse, int, error)

	// ListByDifficulty retrieves courses filtered by difficulty
	ListByDifficulty(ctx context.Context, difficulty entities.Difficulty, limit, offset int) ([]*entities.LibraryCourse, int, error)

	// Search finds courses by title or description
	Search(ctx context.Context, query string, limit, offset int) ([]*entities.LibraryCourse, int, error)
}

// UserCourseRepository defines the interface for user course data access
type UserCourseRepository interface {
	// Create stores a new user course and returns it with ID
	Create(ctx context.Context, userCourse *entities.UserCourse) (*entities.UserCourse, error)

	// GetByID retrieves a user course by ID
	GetByID(ctx context.Context, id string) (*entities.UserCourse, error)

	// GetByUserAndCourse retrieves a user course by user ID and library course ID
	GetByUserAndCourse(ctx context.Context, userID, libraryCourseID string) (*entities.UserCourse, error)

	// Update modifies an existing user course
	Update(ctx context.Context, userCourse *entities.UserCourse) (*entities.UserCourse, error)

	// Delete removes a user course by ID
	Delete(ctx context.Context, id string) error

	// ListByUser retrieves all courses for a specific user
	ListByUser(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error)

	// ListCompleted retrieves all completed courses for a user
	ListCompleted(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error)

	// ListInProgress retrieves all in-progress courses for a user
	ListInProgress(ctx context.Context, userID string, limit, offset int) ([]*entities.UserCourse, int, error)
}
