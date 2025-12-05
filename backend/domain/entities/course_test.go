package entities

import (
	"testing"
	"time"
)

// LibraryCourse Tests

func TestNewLibraryCourse_ValidInput(t *testing.T) {
	lessons := []Lesson{
		{Title: "Introduction", Content: "Welcome to the course", Order: 0},
		{Title: "Basics", Content: "Learn the basics", Order: 1},
	}

	course, err := NewLibraryCourse("Go Programming", "Learn Go from scratch", lessons, "John Doe", DifficultyBeginner, 10)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if course.Title != "Go Programming" {
		t.Errorf("expected title 'Go Programming', got '%s'", course.Title)
	}

	if course.Description != "Learn Go from scratch" {
		t.Errorf("expected description 'Learn Go from scratch', got '%s'", course.Description)
	}

	if len(course.Lessons) != 2 {
		t.Errorf("expected 2 lessons, got %d", len(course.Lessons))
	}

	if course.Author != "John Doe" {
		t.Errorf("expected author 'John Doe', got '%s'", course.Author)
	}

	if course.Difficulty != DifficultyBeginner {
		t.Errorf("expected difficulty Beginner, got '%s'", course.Difficulty)
	}

	if course.EstimatedHours != 10 {
		t.Errorf("expected 10 estimated hours, got %d", course.EstimatedHours)
	}

	if course.CreatedAt.IsZero() {
		t.Error("expected CreatedAt to be set")
	}
}

func TestNewLibraryCourse_EmptyTitle(t *testing.T) {
	lessons := []Lesson{{Title: "Intro", Content: "Content", Order: 0}}

	_, err := NewLibraryCourse("", "Description", lessons, "Author", DifficultyBeginner, 5)

	if err != ErrInvalidCourseTitle {
		t.Errorf("expected ErrInvalidCourseTitle, got %v", err)
	}
}

func TestNewLibraryCourse_NoLessons(t *testing.T) {
	_, err := NewLibraryCourse("Title", "Description", []Lesson{}, "Author", DifficultyBeginner, 5)

	if err != ErrNoLessons {
		t.Errorf("expected ErrNoLessons, got %v", err)
	}
}

func TestNewLibraryCourse_NilLessons(t *testing.T) {
	_, err := NewLibraryCourse("Title", "Description", nil, "Author", DifficultyBeginner, 5)

	if err != ErrNoLessons {
		t.Errorf("expected ErrNoLessons, got %v", err)
	}
}

func TestLibraryCourse_AddLesson(t *testing.T) {
	lessons := []Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := NewLibraryCourse("Title", "Desc", lessons, "Author", DifficultyBeginner, 5)

	newLesson := Lesson{Title: "Chapter 1", Content: "First chapter", Order: 1}
	course.AddLesson(newLesson)

	if len(course.Lessons) != 2 {
		t.Errorf("expected 2 lessons, got %d", len(course.Lessons))
	}

	if course.Lessons[1].Title != "Chapter 1" {
		t.Errorf("expected lesson title 'Chapter 1', got '%s'", course.Lessons[1].Title)
	}
}

func TestLibraryCourse_RemoveLesson(t *testing.T) {
	lessons := []Lesson{
		{Title: "Intro", Content: "Welcome", Order: 0},
		{Title: "Chapter 1", Content: "First", Order: 1},
		{Title: "Chapter 2", Content: "Second", Order: 2},
	}
	course, _ := NewLibraryCourse("Title", "Desc", lessons, "Author", DifficultyBeginner, 5)

	err := course.RemoveLesson(1)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if len(course.Lessons) != 2 {
		t.Errorf("expected 2 lessons, got %d", len(course.Lessons))
	}

	// Verify remaining lessons
	if course.Lessons[0].Title != "Intro" {
		t.Errorf("expected first lesson 'Intro', got '%s'", course.Lessons[0].Title)
	}
	if course.Lessons[1].Title != "Chapter 2" {
		t.Errorf("expected second lesson 'Chapter 2', got '%s'", course.Lessons[1].Title)
	}
}

func TestLibraryCourse_RemoveLesson_InvalidIndex(t *testing.T) {
	lessons := []Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := NewLibraryCourse("Title", "Desc", lessons, "Author", DifficultyBeginner, 5)

	err := course.RemoveLesson(5)

	if err != ErrInvalidLessonIndex {
		t.Errorf("expected ErrInvalidLessonIndex, got %v", err)
	}
}

func TestLibraryCourse_RemoveLesson_LastLesson(t *testing.T) {
	lessons := []Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := NewLibraryCourse("Title", "Desc", lessons, "Author", DifficultyBeginner, 5)

	err := course.RemoveLesson(0)

	if err != ErrCannotRemoveLastLesson {
		t.Errorf("expected ErrCannotRemoveLastLesson, got %v", err)
	}
}

// UserCourse Tests

func TestNewUserCourse_ValidInput(t *testing.T) {
	userCourse, err := NewUserCourse("user-123", "course-456")

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if userCourse.UserID != "user-123" {
		t.Errorf("expected userID 'user-123', got '%s'", userCourse.UserID)
	}

	if userCourse.LibraryCourseID != "course-456" {
		t.Errorf("expected libraryCourseID 'course-456', got '%s'", userCourse.LibraryCourseID)
	}

	if userCourse.Progress != 0 {
		t.Errorf("expected progress 0, got %d", userCourse.Progress)
	}

	if userCourse.CurrentLessonIndex != 0 {
		t.Errorf("expected currentLessonIndex 0, got %d", userCourse.CurrentLessonIndex)
	}

	if userCourse.StartedAt.IsZero() {
		t.Error("expected StartedAt to be set")
	}

	if userCourse.CompletedAt != nil {
		t.Error("expected CompletedAt to be nil")
	}
}

func TestNewUserCourse_EmptyUserID(t *testing.T) {
	_, err := NewUserCourse("", "course-456")

	if err != ErrInvalidUserID {
		t.Errorf("expected ErrInvalidUserID, got %v", err)
	}
}

func TestNewUserCourse_EmptyCourseID(t *testing.T) {
	_, err := NewUserCourse("user-123", "")

	if err != ErrInvalidCourseID {
		t.Errorf("expected ErrInvalidCourseID, got %v", err)
	}
}

func TestUserCourse_UpdateProgress_Valid(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")

	err := userCourse.UpdateProgress(50)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if userCourse.Progress != 50 {
		t.Errorf("expected progress 50, got %d", userCourse.Progress)
	}

	if userCourse.CompletedAt != nil {
		t.Error("expected CompletedAt to still be nil at 50%")
	}
}

func TestUserCourse_UpdateProgress_Complete(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")

	err := userCourse.UpdateProgress(100)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if userCourse.Progress != 100 {
		t.Errorf("expected progress 100, got %d", userCourse.Progress)
	}

	if userCourse.CompletedAt == nil {
		t.Error("expected CompletedAt to be set when progress is 100")
	}
}

func TestUserCourse_UpdateProgress_InvalidNegative(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")

	err := userCourse.UpdateProgress(-10)

	if err != ErrInvalidProgress {
		t.Errorf("expected ErrInvalidProgress, got %v", err)
	}
}

func TestUserCourse_UpdateProgress_InvalidOver100(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")

	err := userCourse.UpdateProgress(150)

	if err != ErrInvalidProgress {
		t.Errorf("expected ErrInvalidProgress, got %v", err)
	}
}

func TestUserCourse_AdvanceLesson(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")

	userCourse.AdvanceLesson(5) // 5 total lessons

	if userCourse.CurrentLessonIndex != 1 {
		t.Errorf("expected currentLessonIndex 1, got %d", userCourse.CurrentLessonIndex)
	}
}

func TestUserCourse_AdvanceLesson_AtEnd(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")
	userCourse.CurrentLessonIndex = 4 // Last lesson (0-indexed, 5 total)

	userCourse.AdvanceLesson(5)

	// Should not advance past the end
	if userCourse.CurrentLessonIndex != 4 {
		t.Errorf("expected currentLessonIndex to stay at 4, got %d", userCourse.CurrentLessonIndex)
	}
}

func TestUserCourse_UpdatedAt(t *testing.T) {
	userCourse, _ := NewUserCourse("user-123", "course-456")
	originalUpdatedAt := userCourse.UpdatedAt

	// Small delay to ensure time difference
	time.Sleep(time.Millisecond)

	_ = userCourse.UpdateProgress(25)

	if !userCourse.UpdatedAt.After(originalUpdatedAt) {
		t.Error("expected UpdatedAt to be updated after progress change")
	}
}

// Lesson Tests

func TestLesson_Validate(t *testing.T) {
	lesson := Lesson{Title: "Valid Title", Content: "Valid Content", Order: 0}

	err := lesson.Validate()

	if err != nil {
		t.Errorf("expected no error for valid lesson, got %v", err)
	}
}

func TestLesson_Validate_EmptyTitle(t *testing.T) {
	lesson := Lesson{Title: "", Content: "Valid Content", Order: 0}

	err := lesson.Validate()

	if err != ErrInvalidLessonTitle {
		t.Errorf("expected ErrInvalidLessonTitle, got %v", err)
	}
}

func TestLesson_Validate_EmptyContent(t *testing.T) {
	lesson := Lesson{Title: "Valid Title", Content: "", Order: 0}

	err := lesson.Validate()

	if err != ErrInvalidLessonContent {
		t.Errorf("expected ErrInvalidLessonContent, got %v", err)
	}
}

// Difficulty Tests

func TestDifficulty_String(t *testing.T) {
	tests := []struct {
		difficulty Difficulty
		expected   string
	}{
		{DifficultyBeginner, "beginner"},
		{DifficultyIntermediate, "intermediate"},
		{DifficultyAdvanced, "advanced"},
	}

	for _, test := range tests {
		if string(test.difficulty) != test.expected {
			t.Errorf("expected '%s', got '%s'", test.expected, string(test.difficulty))
		}
	}
}

func TestValidateDifficulty_Valid(t *testing.T) {
	validDifficulties := []Difficulty{DifficultyBeginner, DifficultyIntermediate, DifficultyAdvanced}

	for _, d := range validDifficulties {
		if err := ValidateDifficulty(d); err != nil {
			t.Errorf("expected difficulty '%s' to be valid, got error: %v", d, err)
		}
	}
}

func TestValidateDifficulty_Invalid(t *testing.T) {
	err := ValidateDifficulty(Difficulty("expert"))

	if err != ErrInvalidDifficulty {
		t.Errorf("expected ErrInvalidDifficulty, got %v", err)
	}
}
