package entities

import (
	"time"
)

// Attachment represents a file attachment for a lesson
type Attachment struct {
	ID              string
	LibraryCourseID string
	LessonIndex     int
	Filename        string
	OriginalName    string
	MimeType        string
	Size            int64
	UploadedAt      time.Time
	UploadedBy      string
}

// NewAttachment creates a new Attachment with validation
func NewAttachment(libraryCourseID string, lessonIndex int, filename, originalName, mimeType string, size int64, uploadedBy string) (*Attachment, error) {
	if libraryCourseID == "" {
		return nil, ErrInvalidCourseID
	}
	if lessonIndex < 0 {
		return nil, ErrInvalidLessonIndex
	}
	if filename == "" {
		return nil, ErrInvalidFilename
	}
	if originalName == "" {
		return nil, ErrInvalidFilename
	}
	if uploadedBy == "" {
		return nil, ErrInvalidUserID
	}
	if size <= 0 {
		return nil, ErrInvalidFileSize
	}

	return &Attachment{
		LibraryCourseID: libraryCourseID,
		LessonIndex:     lessonIndex,
		Filename:        filename,
		OriginalName:    originalName,
		MimeType:        mimeType,
		Size:            size,
		UploadedAt:      time.Now(),
		UploadedBy:      uploadedBy,
	}, nil
}
