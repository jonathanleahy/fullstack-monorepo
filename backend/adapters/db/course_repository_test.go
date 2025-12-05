package db

import (
	"context"
	"os"
	"testing"

	"github.com/project/backend/domain/entities"
)

func setupTestCourseDB(t *testing.T) (*SQLiteDB, func()) {
	t.Helper()

	// Create temp file for test database
	tmpFile, err := os.CreateTemp("", "test_course_*.db")
	if err != nil {
		t.Fatalf("failed to create temp file: %v", err)
	}
	tmpFile.Close()

	db, err := NewSQLiteDB(tmpFile.Name())
	if err != nil {
		os.Remove(tmpFile.Name())
		t.Fatalf("failed to create database: %v", err)
	}

	if err := db.Migrate(); err != nil {
		db.Close()
		os.Remove(tmpFile.Name())
		t.Fatalf("failed to migrate: %v", err)
	}

	cleanup := func() {
		db.Close()
		os.Remove(tmpFile.Name())
	}

	return db, cleanup
}

// LibraryCourseRepository Tests

func TestLibraryCourseRepository_Create(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	lessons := []entities.Lesson{
		{Title: "Introduction", Content: "Welcome to Go", Order: 0},
		{Title: "Variables", Content: "Learn about variables", Order: 1},
	}

	course, err := entities.NewLibraryCourse(
		"Go Programming",
		"Learn Go from scratch",
		lessons,
		"John Doe",
		entities.DifficultyBeginner,
		10,
	)
	if err != nil {
		t.Fatalf("failed to create course entity: %v", err)
	}

	created, err := repo.Create(ctx, course)
	if err != nil {
		t.Fatalf("failed to create course: %v", err)
	}

	if created.ID == "" {
		t.Error("expected course ID to be set")
	}
	if created.Title != "Go Programming" {
		t.Errorf("expected title 'Go Programming', got '%s'", created.Title)
	}
	if len(created.Lessons) != 2 {
		t.Errorf("expected 2 lessons, got %d", len(created.Lessons))
	}
}

func TestLibraryCourseRepository_GetByID(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	// Create a course first
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := entities.NewLibraryCourse("Test Course", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	created, _ := repo.Create(ctx, course)

	// Retrieve it
	retrieved, err := repo.GetByID(ctx, created.ID)
	if err != nil {
		t.Fatalf("failed to get course: %v", err)
	}

	if retrieved.Title != "Test Course" {
		t.Errorf("expected title 'Test Course', got '%s'", retrieved.Title)
	}
	if len(retrieved.Lessons) != 1 {
		t.Errorf("expected 1 lesson, got %d", len(retrieved.Lessons))
	}
}

func TestLibraryCourseRepository_GetByID_NotFound(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	_, err := repo.GetByID(ctx, "nonexistent-id")
	if err != entities.ErrCourseNotFound {
		t.Errorf("expected ErrCourseNotFound, got %v", err)
	}
}

func TestLibraryCourseRepository_Update(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	// Create a course
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := entities.NewLibraryCourse("Original Title", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	created, _ := repo.Create(ctx, course)

	// Update it
	created.Title = "Updated Title"
	created.Description = "Updated Description"
	updated, err := repo.Update(ctx, created)

	if err != nil {
		t.Fatalf("failed to update course: %v", err)
	}

	if updated.Title != "Updated Title" {
		t.Errorf("expected title 'Updated Title', got '%s'", updated.Title)
	}
}

func TestLibraryCourseRepository_Delete(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	// Create a course
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	course, _ := entities.NewLibraryCourse("To Delete", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	created, _ := repo.Create(ctx, course)

	// Delete it
	err := repo.Delete(ctx, created.ID)
	if err != nil {
		t.Fatalf("failed to delete course: %v", err)
	}

	// Verify it's gone
	_, err = repo.GetByID(ctx, created.ID)
	if err != entities.ErrCourseNotFound {
		t.Errorf("expected ErrCourseNotFound after delete, got %v", err)
	}
}

func TestLibraryCourseRepository_List(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	// Create multiple courses
	for i := 0; i < 5; i++ {
		lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
		course, _ := entities.NewLibraryCourse("Course", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
		repo.Create(ctx, course)
	}

	// List with pagination
	courses, total, err := repo.List(ctx, 3, 0)
	if err != nil {
		t.Fatalf("failed to list courses: %v", err)
	}

	if total != 5 {
		t.Errorf("expected total 5, got %d", total)
	}
	if len(courses) != 3 {
		t.Errorf("expected 3 courses, got %d", len(courses))
	}
}

func TestLibraryCourseRepository_ListByDifficulty(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	// Create courses with different difficulties
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}

	beginner, _ := entities.NewLibraryCourse("Beginner", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	repo.Create(ctx, beginner)

	intermediate, _ := entities.NewLibraryCourse("Intermediate", "Desc", lessons, "Author", entities.DifficultyIntermediate, 10)
	repo.Create(ctx, intermediate)

	advanced, _ := entities.NewLibraryCourse("Advanced", "Desc", lessons, "Author", entities.DifficultyAdvanced, 15)
	repo.Create(ctx, advanced)

	// Filter by beginner
	courses, total, err := repo.ListByDifficulty(ctx, entities.DifficultyBeginner, 10, 0)
	if err != nil {
		t.Fatalf("failed to list by difficulty: %v", err)
	}

	if total != 1 {
		t.Errorf("expected 1 beginner course, got %d", total)
	}
	if len(courses) != 1 || courses[0].Title != "Beginner" {
		t.Errorf("expected 'Beginner' course, got %v", courses)
	}
}

func TestLibraryCourseRepository_Search(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	repo := NewLibraryCourseRepository(db)
	ctx := context.Background()

	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}

	go1, _ := entities.NewLibraryCourse("Go Programming", "Learn Go basics", lessons, "Author", entities.DifficultyBeginner, 5)
	repo.Create(ctx, go1)

	python, _ := entities.NewLibraryCourse("Python Programming", "Learn Python", lessons, "Author", entities.DifficultyBeginner, 5)
	repo.Create(ctx, python)

	// Search for "Go"
	courses, total, err := repo.Search(ctx, "Go", 10, 0)
	if err != nil {
		t.Fatalf("failed to search: %v", err)
	}

	if total != 1 {
		t.Errorf("expected 1 result for 'Go', got %d", total)
	}
	if len(courses) != 1 || courses[0].Title != "Go Programming" {
		t.Errorf("expected 'Go Programming', got %v", courses)
	}
}

// UserCourseRepository Tests

func TestUserCourseRepository_Create(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Create a library course first
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	libCourse, _ := entities.NewLibraryCourse("Test Course", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	createdLib, _ := libRepo.Create(ctx, libCourse)

	// Create a user course
	userCourse, _ := entities.NewUserCourse("user-123", createdLib.ID)
	created, err := userCourseRepo.Create(ctx, userCourse)

	if err != nil {
		t.Fatalf("failed to create user course: %v", err)
	}

	if created.ID == "" {
		t.Error("expected user course ID to be set")
	}
	if created.UserID != "user-123" {
		t.Errorf("expected userID 'user-123', got '%s'", created.UserID)
	}
	if created.Progress != 0 {
		t.Errorf("expected progress 0, got %d", created.Progress)
	}
}

func TestUserCourseRepository_GetByUserAndCourse(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Setup
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	libCourse, _ := entities.NewLibraryCourse("Test", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	createdLib, _ := libRepo.Create(ctx, libCourse)

	userCourse, _ := entities.NewUserCourse("user-123", createdLib.ID)
	userCourseRepo.Create(ctx, userCourse)

	// Retrieve
	retrieved, err := userCourseRepo.GetByUserAndCourse(ctx, "user-123", createdLib.ID)
	if err != nil {
		t.Fatalf("failed to get user course: %v", err)
	}

	if retrieved.UserID != "user-123" {
		t.Errorf("expected userID 'user-123', got '%s'", retrieved.UserID)
	}
}

func TestUserCourseRepository_Update(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Setup
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	libCourse, _ := entities.NewLibraryCourse("Test", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	createdLib, _ := libRepo.Create(ctx, libCourse)

	userCourse, _ := entities.NewUserCourse("user-123", createdLib.ID)
	created, _ := userCourseRepo.Create(ctx, userCourse)

	// Update progress
	created.UpdateProgress(50)
	updated, err := userCourseRepo.Update(ctx, created)

	if err != nil {
		t.Fatalf("failed to update user course: %v", err)
	}

	if updated.Progress != 50 {
		t.Errorf("expected progress 50, got %d", updated.Progress)
	}
}

func TestUserCourseRepository_ListByUser(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Create library courses
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	lib1, _ := entities.NewLibraryCourse("Course 1", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib1Created, _ := libRepo.Create(ctx, lib1)
	lib2, _ := entities.NewLibraryCourse("Course 2", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib2Created, _ := libRepo.Create(ctx, lib2)

	// Create user courses for user-123
	uc1, _ := entities.NewUserCourse("user-123", lib1Created.ID)
	userCourseRepo.Create(ctx, uc1)
	uc2, _ := entities.NewUserCourse("user-123", lib2Created.ID)
	userCourseRepo.Create(ctx, uc2)

	// Create user course for different user
	uc3, _ := entities.NewUserCourse("user-456", lib1Created.ID)
	userCourseRepo.Create(ctx, uc3)

	// List for user-123
	courses, total, err := userCourseRepo.ListByUser(ctx, "user-123", 10, 0)
	if err != nil {
		t.Fatalf("failed to list user courses: %v", err)
	}

	if total != 2 {
		t.Errorf("expected 2 courses for user-123, got %d", total)
	}
	if len(courses) != 2 {
		t.Errorf("expected 2 courses, got %d", len(courses))
	}
}

func TestUserCourseRepository_ListCompleted(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Setup
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	lib1, _ := entities.NewLibraryCourse("Course 1", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib1Created, _ := libRepo.Create(ctx, lib1)
	lib2, _ := entities.NewLibraryCourse("Course 2", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib2Created, _ := libRepo.Create(ctx, lib2)

	// Create one completed and one in-progress
	uc1, _ := entities.NewUserCourse("user-123", lib1Created.ID)
	uc1.UpdateProgress(100) // Complete
	created1, _ := userCourseRepo.Create(ctx, uc1)
	userCourseRepo.Update(ctx, created1)

	uc2, _ := entities.NewUserCourse("user-123", lib2Created.ID)
	uc2.UpdateProgress(50) // In progress
	created2, _ := userCourseRepo.Create(ctx, uc2)
	userCourseRepo.Update(ctx, created2)

	// List completed
	completed, total, err := userCourseRepo.ListCompleted(ctx, "user-123", 10, 0)
	if err != nil {
		t.Fatalf("failed to list completed: %v", err)
	}

	if total != 1 {
		t.Errorf("expected 1 completed course, got %d", total)
	}
	if len(completed) != 1 || completed[0].Progress != 100 {
		t.Errorf("expected completed course with progress 100")
	}
}

func TestUserCourseRepository_ListInProgress(t *testing.T) {
	db, cleanup := setupTestCourseDB(t)
	defer cleanup()

	libRepo := NewLibraryCourseRepository(db)
	userCourseRepo := NewUserCourseRepository(db)
	ctx := context.Background()

	// Setup
	lessons := []entities.Lesson{{Title: "Intro", Content: "Welcome", Order: 0}}
	lib1, _ := entities.NewLibraryCourse("Course 1", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib1Created, _ := libRepo.Create(ctx, lib1)
	lib2, _ := entities.NewLibraryCourse("Course 2", "Desc", lessons, "Author", entities.DifficultyBeginner, 5)
	lib2Created, _ := libRepo.Create(ctx, lib2)

	// Create one completed and one in-progress
	uc1, _ := entities.NewUserCourse("user-123", lib1Created.ID)
	uc1.UpdateProgress(100)
	created1, _ := userCourseRepo.Create(ctx, uc1)
	userCourseRepo.Update(ctx, created1)

	uc2, _ := entities.NewUserCourse("user-123", lib2Created.ID)
	uc2.UpdateProgress(50)
	created2, _ := userCourseRepo.Create(ctx, uc2)
	userCourseRepo.Update(ctx, created2)

	// List in-progress
	inProgress, total, err := userCourseRepo.ListInProgress(ctx, "user-123", 10, 0)
	if err != nil {
		t.Fatalf("failed to list in-progress: %v", err)
	}

	if total != 1 {
		t.Errorf("expected 1 in-progress course, got %d", total)
	}
	if len(inProgress) != 1 || inProgress[0].Progress == 100 {
		t.Errorf("expected in-progress course with progress < 100")
	}
}
