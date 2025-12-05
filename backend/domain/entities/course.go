package entities

import (
	"time"
)

// Difficulty represents the difficulty level of a course
type Difficulty string

const (
	DifficultyBeginner     Difficulty = "beginner"
	DifficultyIntermediate Difficulty = "intermediate"
	DifficultyAdvanced     Difficulty = "advanced"
)

// ValidateDifficulty checks if the difficulty level is valid
func ValidateDifficulty(d Difficulty) error {
	switch d {
	case DifficultyBeginner, DifficultyIntermediate, DifficultyAdvanced:
		return nil
	default:
		return ErrInvalidDifficulty
	}
}

// Lesson represents a single lesson within a course
type Lesson struct {
	Title   string
	Content string
	Order   int
}

// Validate checks if the lesson has valid data
func (l *Lesson) Validate() error {
	if l.Title == "" {
		return ErrInvalidLessonTitle
	}
	if l.Content == "" {
		return ErrInvalidLessonContent
	}
	return nil
}

// LibraryCourse represents a course in the shared library
type LibraryCourse struct {
	ID             string
	Title          string
	Description    string
	Lessons        []Lesson
	Author         string
	Difficulty     Difficulty
	EstimatedHours int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

// NewLibraryCourse creates a new LibraryCourse with validation
func NewLibraryCourse(title, description string, lessons []Lesson, author string, difficulty Difficulty, estimatedHours int) (*LibraryCourse, error) {
	if title == "" {
		return nil, ErrInvalidCourseTitle
	}
	if len(lessons) == 0 {
		return nil, ErrNoLessons
	}

	now := time.Now()
	return &LibraryCourse{
		Title:          title,
		Description:    description,
		Lessons:        lessons,
		Author:         author,
		Difficulty:     difficulty,
		EstimatedHours: estimatedHours,
		CreatedAt:      now,
		UpdatedAt:      now,
	}, nil
}

// AddLesson appends a new lesson to the course
func (c *LibraryCourse) AddLesson(lesson Lesson) {
	c.Lessons = append(c.Lessons, lesson)
	c.UpdatedAt = time.Now()
}

// RemoveLesson removes a lesson at the given index
func (c *LibraryCourse) RemoveLesson(index int) error {
	if index < 0 || index >= len(c.Lessons) {
		return ErrInvalidLessonIndex
	}
	if len(c.Lessons) == 1 {
		return ErrCannotRemoveLastLesson
	}

	c.Lessons = append(c.Lessons[:index], c.Lessons[index+1:]...)
	c.UpdatedAt = time.Now()
	return nil
}

// UserCourse represents a user's personal copy of a course with progress tracking
type UserCourse struct {
	ID                 string
	UserID             string
	LibraryCourseID    string
	Progress           int // 0-100 percentage
	CurrentLessonIndex int
	StartedAt          time.Time
	UpdatedAt          time.Time
	CompletedAt        *time.Time
}

// NewUserCourse creates a new UserCourse with validation
func NewUserCourse(userID, libraryCourseID string) (*UserCourse, error) {
	if userID == "" {
		return nil, ErrInvalidUserID
	}
	if libraryCourseID == "" {
		return nil, ErrInvalidCourseID
	}

	now := time.Now()
	return &UserCourse{
		UserID:             userID,
		LibraryCourseID:    libraryCourseID,
		Progress:           0,
		CurrentLessonIndex: 0,
		StartedAt:          now,
		UpdatedAt:          now,
		CompletedAt:        nil,
	}, nil
}

// UpdateProgress sets the progress percentage and marks completion if 100%
func (uc *UserCourse) UpdateProgress(progress int) error {
	if progress < 0 || progress > 100 {
		return ErrInvalidProgress
	}

	uc.Progress = progress
	uc.UpdatedAt = time.Now()

	if progress == 100 && uc.CompletedAt == nil {
		now := time.Now()
		uc.CompletedAt = &now
	}

	return nil
}

// AdvanceLesson moves to the next lesson if not at the end
func (uc *UserCourse) AdvanceLesson(totalLessons int) {
	if uc.CurrentLessonIndex < totalLessons-1 {
		uc.CurrentLessonIndex++
		uc.UpdatedAt = time.Now()
	}
}
