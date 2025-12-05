package repositories

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// BookmarkRepository defines the interface for bookmark data access
type BookmarkRepository interface {
	// Create stores a new bookmark
	Create(ctx context.Context, bookmark *entities.Bookmark) (*entities.Bookmark, error)

	// GetByID retrieves a bookmark by its ID
	GetByID(ctx context.Context, id string) (*entities.Bookmark, error)

	// GetByUserID retrieves all bookmarks for a user
	GetByUserID(ctx context.Context, userID string) ([]*entities.Bookmark, error)

	// GetByCourse retrieves all bookmarks for a specific course and user
	GetByCourse(ctx context.Context, userID, libraryCourseID string) ([]*entities.Bookmark, error)

	// Delete removes a bookmark
	Delete(ctx context.Context, id string) error

	// DeleteByUserAndLesson removes a bookmark by user, course, and lesson index
	DeleteByUserAndLesson(ctx context.Context, userID, libraryCourseID string, lessonIndex int) error

	// Update modifies an existing bookmark
	Update(ctx context.Context, bookmark *entities.Bookmark) (*entities.Bookmark, error)
}
