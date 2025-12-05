package entities

import (
	"time"
)

// Bookmark represents a user's bookmark for a specific lesson in a course
type Bookmark struct {
	ID              string
	UserID          string
	LibraryCourseID string
	LessonIndex     int
	Note            string // optional note
	CreatedAt       time.Time
}

// NewBookmark creates a new Bookmark with validation
func NewBookmark(userID, libraryCourseID string, lessonIndex int, note string) (*Bookmark, error) {
	if userID == "" {
		return nil, ErrInvalidUserID
	}
	if libraryCourseID == "" {
		return nil, ErrInvalidCourseID
	}
	if lessonIndex < 0 {
		return nil, ErrInvalidLessonIndex
	}

	return &Bookmark{
		UserID:          userID,
		LibraryCourseID: libraryCourseID,
		LessonIndex:     lessonIndex,
		Note:            note,
		CreatedAt:       time.Now(),
	}, nil
}

// UpdateNote updates the bookmark's note
func (b *Bookmark) UpdateNote(note string) {
	b.Note = note
}
