package entities

import "errors"

// Domain errors - User
var (
	ErrInvalidEmail = errors.New("invalid email address")
	ErrInvalidName  = errors.New("name cannot be empty")
	ErrWeakPassword = errors.New("password must be at least 8 characters")
	ErrUserNotFound = errors.New("user not found")
	ErrEmailExists  = errors.New("email already exists")
	ErrUnauthorized = errors.New("unauthorized")
	ErrInvalidID    = errors.New("invalid ID")
)

// Domain errors - Course
var (
	ErrInvalidCourseTitle     = errors.New("course title cannot be empty")
	ErrNoLessons              = errors.New("course must have at least one lesson")
	ErrInvalidLessonIndex     = errors.New("invalid lesson index")
	ErrCannotRemoveLastLesson = errors.New("cannot remove the last lesson")
	ErrInvalidUserID          = errors.New("user ID cannot be empty")
	ErrInvalidCourseID        = errors.New("course ID cannot be empty")
	ErrInvalidProgress        = errors.New("progress must be between 0 and 100")
	ErrCourseNotFound         = errors.New("course not found")
	ErrInvalidDifficulty      = errors.New("invalid difficulty level")
	ErrInvalidLessonTitle     = errors.New("lesson title cannot be empty")
	ErrInvalidLessonContent   = errors.New("lesson content cannot be empty")
)

// Domain errors - Attachment
var (
	ErrInvalidFilename    = errors.New("filename cannot be empty")
	ErrInvalidFileSize    = errors.New("file size must be greater than 0")
	ErrAttachmentNotFound = errors.New("attachment not found")
	ErrInvalidFileType    = errors.New("invalid file type")
	ErrFileTooLarge       = errors.New("file size exceeds maximum allowed")
)
