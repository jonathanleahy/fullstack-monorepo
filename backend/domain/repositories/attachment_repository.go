package repositories

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// AttachmentRepository defines the interface for attachment data access
type AttachmentRepository interface {
	// Create stores a new attachment and returns it with ID
	Create(ctx context.Context, attachment *entities.Attachment) (*entities.Attachment, error)

	// GetByID retrieves an attachment by ID
	GetByID(ctx context.Context, id string) (*entities.Attachment, error)

	// ListByLesson retrieves all attachments for a specific lesson
	ListByLesson(ctx context.Context, libraryCourseID string, lessonIndex int) ([]*entities.Attachment, error)

	// Delete removes an attachment by ID
	Delete(ctx context.Context, id string) error

	// GetByFilename retrieves an attachment by filename
	GetByFilename(ctx context.Context, filename string) (*entities.Attachment, error)
}
