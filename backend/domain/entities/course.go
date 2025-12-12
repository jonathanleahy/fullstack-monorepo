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

// QuizQuestion represents a single quiz question with multiple choice options
type QuizQuestion struct {
	ID           string
	Question     string
	Options      []string
	CorrectIndex int
	Explanation  string
}

// Quiz represents a quiz attached to a lesson
type Quiz struct {
	Questions []QuizQuestion
}

// Lesson represents a single lesson within a course
// Lessons can have sublessons to create a hierarchical chapter structure
type Lesson struct {
	Title        string
	Content      string
	Order        int
	FolderIndex  int           // Index in alphabetically sorted folder list (used for save path)
	Sublessons   []Lesson      // Nested subchapters/sublessons
	Quiz         *Quiz         // Optional legacy quiz for this lesson
	ExtendedQuiz *ExtendedQuiz // Optional extended quiz with multiple question types
}

// Validate checks if the lesson has valid data
func (l *Lesson) Validate() error {
	if l.Title == "" {
		return ErrInvalidLessonTitle
	}
	if l.Content == "" {
		return ErrInvalidLessonContent
	}
	// Validate sublessons recursively
	for _, sub := range l.Sublessons {
		if err := sub.Validate(); err != nil {
			return err
		}
	}
	return nil
}

// TotalCount returns the total number of lessons including all sublessons
func (l *Lesson) TotalCount() int {
	count := 1 // Count this lesson
	for _, sub := range l.Sublessons {
		count += sub.TotalCount()
	}
	return count
}

// HasSublessons returns true if this lesson has any sublessons
func (l *Lesson) HasSublessons() bool {
	return len(l.Sublessons) > 0
}

// LibraryCourse represents a course in the shared library
type LibraryCourse struct {
	ID             string
	Title          string
	Description    string
	Lessons        []Lesson
	Author         string
	AuthorID       string
	Tags           []string
	Difficulty     Difficulty
	EstimatedHours int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

// NewLibraryCourse creates a new LibraryCourse with validation
func NewLibraryCourse(title, description string, lessons []Lesson, author, authorID string, tags []string, difficulty Difficulty, estimatedHours int) (*LibraryCourse, error) {
	if title == "" {
		return nil, ErrInvalidCourseTitle
	}
	if len(lessons) == 0 {
		return nil, ErrNoLessons
	}
	if authorID == "" {
		return nil, ErrInvalidUserID
	}

	if tags == nil {
		tags = []string{}
	}

	now := time.Now()
	return &LibraryCourse{
		Title:          title,
		Description:    description,
		Lessons:        lessons,
		Author:         author,
		AuthorID:       authorID,
		Tags:           tags,
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

// TotalLessonCount returns the total number of lessons including all sublessons
func (c *LibraryCourse) TotalLessonCount() int {
	count := 0
	for _, lesson := range c.Lessons {
		count += lesson.TotalCount()
	}
	return count
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
	CompletedLessons   []int // Lesson indices that are completed
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
		CompletedLessons:   []int{},
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

// SetCurrentLesson sets the current lesson index
func (uc *UserCourse) SetCurrentLesson(lessonIndex int) error {
	if lessonIndex < 0 {
		return ErrInvalidLessonIndex
	}
	uc.CurrentLessonIndex = lessonIndex
	uc.UpdatedAt = time.Now()
	return nil
}

// MarkLessonCompleted marks a lesson as completed and updates progress
func (uc *UserCourse) MarkLessonCompleted(lessonIndex int, totalLessons int) error {
	if lessonIndex < 0 || lessonIndex >= totalLessons {
		return ErrInvalidLessonIndex
	}

	// Check if already completed
	for _, idx := range uc.CompletedLessons {
		if idx == lessonIndex {
			return nil // Already completed
		}
	}

	uc.CompletedLessons = append(uc.CompletedLessons, lessonIndex)
	uc.CalculateProgress(totalLessons)
	uc.UpdatedAt = time.Now()

	return nil
}

// MarkLessonIncomplete removes a lesson from completed list and updates progress
func (uc *UserCourse) MarkLessonIncomplete(lessonIndex int, totalLessons int) error {
	if lessonIndex < 0 || lessonIndex >= totalLessons {
		return ErrInvalidLessonIndex
	}

	// Remove from completed lessons
	newCompleted := []int{}
	for _, idx := range uc.CompletedLessons {
		if idx != lessonIndex {
			newCompleted = append(newCompleted, idx)
		}
	}
	uc.CompletedLessons = newCompleted
	uc.CalculateProgress(totalLessons)
	uc.UpdatedAt = time.Now()

	return nil
}

// CalculateProgress calculates progress based on completed lessons
func (uc *UserCourse) CalculateProgress(totalLessons int) {
	if totalLessons == 0 {
		uc.Progress = 0
		return
	}

	progress := (len(uc.CompletedLessons) * 100) / totalLessons
	uc.Progress = progress

	// Mark as completed if all lessons are done
	if progress == 100 && uc.CompletedAt == nil {
		now := time.Now()
		uc.CompletedAt = &now
	} else if progress < 100 && uc.CompletedAt != nil {
		// Unmark completion if progress drops below 100
		uc.CompletedAt = nil
	}
}
