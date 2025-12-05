package db

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/project/backend/domain/entities"
	"github.com/project/backend/domain/repositories"
)

// AttachmentRepository implements the attachment repository interface
type AttachmentRepository struct {
	db *SQLiteDB
}

// NewAttachmentRepository creates a new attachment repository
func NewAttachmentRepository(db *SQLiteDB) repositories.AttachmentRepository {
	return &AttachmentRepository{db: db}
}

// Create stores a new attachment and returns it with ID
func (r *AttachmentRepository) Create(ctx context.Context, attachment *entities.Attachment) (*entities.Attachment, error) {
	attachment.ID = uuid.New().String()

	query := `
		INSERT INTO attachments (
			id, library_course_id, lesson_index, filename, original_name,
			mime_type, size, uploaded_at, uploaded_by
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	_, err := r.db.DB().ExecContext(
		ctx,
		query,
		attachment.ID,
		attachment.LibraryCourseID,
		attachment.LessonIndex,
		attachment.Filename,
		attachment.OriginalName,
		attachment.MimeType,
		attachment.Size,
		attachment.UploadedAt,
		attachment.UploadedBy,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create attachment: %w", err)
	}

	return attachment, nil
}

// GetByID retrieves an attachment by ID
func (r *AttachmentRepository) GetByID(ctx context.Context, id string) (*entities.Attachment, error) {
	query := `
		SELECT id, library_course_id, lesson_index, filename, original_name,
			   mime_type, size, uploaded_at, uploaded_by
		FROM attachments
		WHERE id = ?
	`

	attachment := &entities.Attachment{}
	err := r.db.DB().QueryRowContext(ctx, query, id).Scan(
		&attachment.ID,
		&attachment.LibraryCourseID,
		&attachment.LessonIndex,
		&attachment.Filename,
		&attachment.OriginalName,
		&attachment.MimeType,
		&attachment.Size,
		&attachment.UploadedAt,
		&attachment.UploadedBy,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrAttachmentNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get attachment: %w", err)
	}

	return attachment, nil
}

// ListByLesson retrieves all attachments for a specific lesson
func (r *AttachmentRepository) ListByLesson(ctx context.Context, libraryCourseID string, lessonIndex int) ([]*entities.Attachment, error) {
	query := `
		SELECT id, library_course_id, lesson_index, filename, original_name,
			   mime_type, size, uploaded_at, uploaded_by
		FROM attachments
		WHERE library_course_id = ? AND lesson_index = ?
		ORDER BY uploaded_at DESC
	`

	rows, err := r.db.DB().QueryContext(ctx, query, libraryCourseID, lessonIndex)
	if err != nil {
		return nil, fmt.Errorf("failed to list attachments: %w", err)
	}
	defer rows.Close()

	var attachments []*entities.Attachment
	for rows.Next() {
		attachment := &entities.Attachment{}
		err := rows.Scan(
			&attachment.ID,
			&attachment.LibraryCourseID,
			&attachment.LessonIndex,
			&attachment.Filename,
			&attachment.OriginalName,
			&attachment.MimeType,
			&attachment.Size,
			&attachment.UploadedAt,
			&attachment.UploadedBy,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan attachment: %w", err)
		}
		attachments = append(attachments, attachment)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating attachments: %w", err)
	}

	return attachments, nil
}

// Delete removes an attachment by ID
func (r *AttachmentRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM attachments WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete attachment: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return entities.ErrAttachmentNotFound
	}

	return nil
}

// GetByFilename retrieves an attachment by filename
func (r *AttachmentRepository) GetByFilename(ctx context.Context, filename string) (*entities.Attachment, error) {
	query := `
		SELECT id, library_course_id, lesson_index, filename, original_name,
			   mime_type, size, uploaded_at, uploaded_by
		FROM attachments
		WHERE filename = ?
	`

	attachment := &entities.Attachment{}
	err := r.db.DB().QueryRowContext(ctx, query, filename).Scan(
		&attachment.ID,
		&attachment.LibraryCourseID,
		&attachment.LessonIndex,
		&attachment.Filename,
		&attachment.OriginalName,
		&attachment.MimeType,
		&attachment.Size,
		&attachment.UploadedAt,
		&attachment.UploadedBy,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrAttachmentNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get attachment: %w", err)
	}

	return attachment, nil
}
