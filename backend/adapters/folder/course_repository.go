package folder

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/project/backend/domain/entities"
)

// FolderCourseRepository implements LibraryCourseRepository by reading from folder structure
type FolderCourseRepository struct {
	coursesPath string
	cache       map[string]*entities.LibraryCourse
	cacheMu     sync.RWMutex
	lastLoad    time.Time
	cacheTTL    time.Duration
}

// NewFolderCourseRepository creates a new folder-based course repository
func NewFolderCourseRepository(coursesPath string) *FolderCourseRepository {
	return &FolderCourseRepository{
		coursesPath: coursesPath,
		cache:       make(map[string]*entities.LibraryCourse),
		cacheTTL:    10 * time.Second, // Reload courses every 10 seconds (dev mode)
	}
}

// courseJSON represents the course.json file structure (supports both old and new formats)
type courseJSON struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Subtitle    string `json:"subtitle"`
	Description string `json:"description"`

	// New format: nested author object
	Author interface{} `json:"author"` // Can be string or object

	// New format: nested metadata object
	Metadata struct {
		Difficulty     string `json:"difficulty"`
		EstimatedHours int    `json:"estimated_hours"`
		LastUpdated    string `json:"last_updated"`
	} `json:"metadata"`

	// Old format: flat fields
	Difficulty     string `json:"difficulty"`
	EstimatedHours int    `json:"estimated_hours"`

	Tags       []string `json:"tags"`
	Categories struct {
		Primary   string   `json:"primary"`
		Secondary []string `json:"secondary"`
	} `json:"categories"`
}

// lessonJSON represents the lesson.json file structure
type lessonJSON struct {
	Title              string   `json:"title"`
	Order              int      `json:"order"`
	HasQuiz            bool     `json:"has_quiz"`
	EstimatedMinutes   int      `json:"estimated_minutes"`
	LearningObjectives []string `json:"learning_objectives"`
}

// quizJSON represents the legacy quiz.json file structure (capitalized keys)
type quizJSON struct {
	Questions []quizQuestionJSON `json:"Questions"`
}

type quizQuestionJSON struct {
	ID             string   `json:"ID"`
	Type           string   `json:"Type"` // multiple-choice, true-false, multiple-select, fill-blank
	Question       string   `json:"Question"`
	Options        []string `json:"Options"`
	CorrectIndex   int      `json:"CorrectIndex"`
	CorrectAnswer  bool     `json:"CorrectAnswer"`   // For true-false
	CorrectIndices []int    `json:"CorrectIndices"`  // For multiple-select
	CorrectAnswers []string `json:"CorrectAnswers"`  // For fill-blank
	Explanation    string   `json:"Explanation"`
}

// extendedQuizJSON represents the new quiz.json file structure (lowercase keys)
type extendedQuizJSON struct {
	Version      string                     `json:"version"`
	SubchapterID string                     `json:"subchapterId"`
	LessonID     string                     `json:"lessonId"`
	Questions    []extendedQuizQuestionJSON `json:"questions"`
}

type extendedQuizQuestionJSON struct {
	ID             string   `json:"id"`
	Type           string   `json:"type"`
	Difficulty     int      `json:"difficulty"`
	Concept        string   `json:"concept"`
	Question       string   `json:"question"`
	Explanation    string   `json:"explanation"`
	Options        []string `json:"options,omitempty"`
	CorrectIndex   int      `json:"correctIndex,omitempty"`
	CorrectAnswer  *bool    `json:"correctAnswer,omitempty"`
	CorrectIndices []int    `json:"correctIndices,omitempty"`
	MinSelections  int      `json:"minSelections,omitempty"`
	MaxSelections  int      `json:"maxSelections,omitempty"`
	CodeSnippet    string   `json:"codeSnippet,omitempty"`
	Language       string   `json:"language,omitempty"`
	LeftColumn     []string `json:"leftColumn,omitempty"`
	RightColumn    []string `json:"rightColumn,omitempty"`
	CorrectPairs   [][]int  `json:"correctPairs,omitempty"`
	Items          []string `json:"items,omitempty"`
	CorrectOrder   []int    `json:"correctOrder,omitempty"`
}

// loadCourses loads all courses from the folder structure
func (r *FolderCourseRepository) loadCourses(ctx context.Context) error {
	r.cacheMu.Lock()
	defer r.cacheMu.Unlock()

	// Check if cache is still valid
	if time.Since(r.lastLoad) < r.cacheTTL && len(r.cache) > 0 {
		return nil
	}

	entries, err := os.ReadDir(r.coursesPath)
	if err != nil {
		return fmt.Errorf("failed to read courses directory: %w", err)
	}

	newCache := make(map[string]*entities.LibraryCourse)

	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		// Skip template folder
		if entry.Name() == "COURSE-TEMPLATE" {
			continue
		}

		coursePath := filepath.Join(r.coursesPath, entry.Name())
		course, err := r.loadCourse(ctx, coursePath)
		if err != nil {
			// Log error but continue loading other courses
			fmt.Printf("Warning: failed to load course %s: %v\n", entry.Name(), err)
			continue
		}

		newCache[course.ID] = course
	}

	r.cache = newCache
	r.lastLoad = time.Now()
	return nil
}

// loadCourse loads a single course from a folder
func (r *FolderCourseRepository) loadCourse(ctx context.Context, coursePath string) (*entities.LibraryCourse, error) {
	// Read course.json
	courseJSONPath := filepath.Join(coursePath, "course.json")
	courseData, err := os.ReadFile(courseJSONPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read course.json: %w", err)
	}

	var cj courseJSON
	if err := json.Unmarshal(courseData, &cj); err != nil {
		return nil, fmt.Errorf("failed to parse course.json: %w", err)
	}

	// Generate ID if not present
	courseID := cj.ID
	if courseID == "" || courseID == "GENERATE-UUID" {
		courseID = uuid.New().String()
	}

	// Load lessons
	lessonsPath := filepath.Join(coursePath, "lessons")
	lessons, err := r.loadLessons(ctx, lessonsPath)
	if err != nil {
		return nil, fmt.Errorf("failed to load lessons: %w", err)
	}

	// Parse difficulty (support both old flat format and new nested format)
	difficultyStr := cj.Metadata.Difficulty
	if difficultyStr == "" {
		difficultyStr = cj.Difficulty
	}
	difficulty := entities.DifficultyIntermediate
	switch strings.ToLower(difficultyStr) {
	case "beginner":
		difficulty = entities.DifficultyBeginner
	case "intermediate":
		difficulty = entities.DifficultyIntermediate
	case "advanced":
		difficulty = entities.DifficultyAdvanced
	}

	// Parse estimated hours (support both formats)
	estimatedHours := cj.Metadata.EstimatedHours
	if estimatedHours == 0 {
		estimatedHours = cj.EstimatedHours
	}

	// Parse author (support both string and object formats)
	var authorName string
	switch v := cj.Author.(type) {
	case string:
		authorName = v
	case map[string]interface{}:
		if name, ok := v["name"].(string); ok {
			authorName = name
		}
	}

	// Combine tags with categories
	tags := cj.Tags
	if cj.Categories.Primary != "" {
		tags = append(tags, cj.Categories.Primary)
	}
	tags = append(tags, cj.Categories.Secondary...)

	// Parse last updated date
	var updatedAt time.Time
	if cj.Metadata.LastUpdated != "" {
		updatedAt, _ = time.Parse("2006-01-02", cj.Metadata.LastUpdated)
	}
	if updatedAt.IsZero() {
		updatedAt = time.Now()
	}

	course := &entities.LibraryCourse{
		ID:             courseID,
		Title:          cj.Title,
		Description:    cj.Description,
		Lessons:        lessons,
		Author:         authorName,
		AuthorID:       "folder-author", // Folder-based courses don't have a real author ID
		Tags:           tags,
		Difficulty:     difficulty,
		EstimatedHours: estimatedHours,
		CreatedAt:      updatedAt,
		UpdatedAt:      updatedAt,
	}

	return course, nil
}

// loadLessons loads all lessons (chapters) from the lessons folder
func (r *FolderCourseRepository) loadLessons(ctx context.Context, lessonsPath string) ([]entities.Lesson, error) {
	entries, err := os.ReadDir(lessonsPath)
	if err != nil {
		if os.IsNotExist(err) {
			return []entities.Lesson{}, nil
		}
		return nil, fmt.Errorf("failed to read lessons directory: %w", err)
	}

	var lessons []entities.Lesson

	// Sort entries by name to maintain order (00-xxx, 01-xxx, etc.)
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Name() < entries[j].Name()
	})

	folderIndex := 0
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		lessonPath := filepath.Join(lessonsPath, entry.Name())
		lesson, err := r.loadLesson(ctx, lessonPath)
		if err != nil {
			fmt.Printf("Warning: failed to load lesson %s: %v\n", entry.Name(), err)
			folderIndex++
			continue
		}

		// Set the folder index for this lesson (position in alphabetically sorted list)
		lesson.FolderIndex = folderIndex
		lessons = append(lessons, *lesson)
		folderIndex++
	}

	return lessons, nil
}

// loadLesson loads a single lesson (chapter) from a folder
func (r *FolderCourseRepository) loadLesson(ctx context.Context, lessonPath string) (*entities.Lesson, error) {
	// Read lesson.json for metadata
	lessonJSONPath := filepath.Join(lessonPath, "lesson.json")
	var lj lessonJSON

	lessonData, err := os.ReadFile(lessonJSONPath)
	if err == nil {
		if err := json.Unmarshal(lessonData, &lj); err != nil {
			return nil, fmt.Errorf("failed to parse lesson.json: %w", err)
		}
	}

	// Read content.md
	contentPath := filepath.Join(lessonPath, "content.md")
	content, err := os.ReadFile(contentPath)
	if err != nil {
		// If no content.md, create empty content
		content = []byte("")
	}

	// Load quiz if present - try extended format first, then legacy
	var quiz *entities.Quiz
	var extendedQuiz *entities.ExtendedQuiz
	quizPath := filepath.Join(lessonPath, "quiz.json")

	// Try loading as extended quiz first
	extendedQuiz, err = r.loadExtendedQuiz(quizPath)
	if err != nil {
		// Fall back to legacy quiz format
		quiz, _ = r.loadQuiz(quizPath)
	}

	// Load sublessons
	sublessonsPath := filepath.Join(lessonPath, "sublessons")
	sublessons, err := r.loadSublessons(ctx, sublessonsPath)
	if err != nil {
		// Non-fatal: some lessons may not have sublessons
		sublessons = []entities.Lesson{}
	}

	// Derive order from folder name prefix if not set in lesson.json
	order := lj.Order
	if order == 0 && lj.Title == "" {
		// Try to parse order from folder name (e.g., "11-sqs-and-sns" -> 11)
		folderName := filepath.Base(lessonPath)
		if len(folderName) >= 2 {
			var parsed int
			if _, err := fmt.Sscanf(folderName, "%d-", &parsed); err == nil {
				order = parsed
			}
		}
	}

	lesson := &entities.Lesson{
		Title:        lj.Title,
		Content:      string(content),
		Order:        order,
		Sublessons:   sublessons,
		Quiz:         quiz,
		ExtendedQuiz: extendedQuiz,
	}

	// If title is empty, derive from folder name
	if lesson.Title == "" {
		lesson.Title = filepath.Base(lessonPath)
	}

	return lesson, nil
}

// loadSublessons loads all sublessons from a sublessons folder
func (r *FolderCourseRepository) loadSublessons(ctx context.Context, sublessonsPath string) ([]entities.Lesson, error) {
	entries, err := os.ReadDir(sublessonsPath)
	if err != nil {
		if os.IsNotExist(err) {
			return []entities.Lesson{}, nil
		}
		return nil, fmt.Errorf("failed to read sublessons directory: %w", err)
	}

	var sublessons []entities.Lesson

	// Sort entries by name
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Name() < entries[j].Name()
	})

	folderIndex := 0
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		sublessonPath := filepath.Join(sublessonsPath, entry.Name())

		// Read content.md
		contentPath := filepath.Join(sublessonPath, "content.md")
		content, err := os.ReadFile(contentPath)
		if err != nil {
			content = []byte("")
		}

		// Load quiz if present - try extended format first, then legacy
		var quiz *entities.Quiz
		var extendedQuiz *entities.ExtendedQuiz
		quizPath := filepath.Join(sublessonPath, "quiz.json")

		// Try loading as extended quiz first
		extendedQuiz, err = r.loadExtendedQuiz(quizPath)
		if err != nil {
			// Fall back to legacy quiz format
			quiz, _ = r.loadQuiz(quizPath)
		}

		sublesson := entities.Lesson{
			Title:        entry.Name(),
			Content:      string(content),
			Order:        folderIndex,
			FolderIndex:  folderIndex,
			Sublessons:   nil, // Sublessons don't have nested sublessons
			Quiz:         quiz,
			ExtendedQuiz: extendedQuiz,
		}

		sublessons = append(sublessons, sublesson)
		folderIndex++
	}

	return sublessons, nil
}

// loadQuiz loads a quiz from a quiz.json file
func (r *FolderCourseRepository) loadQuiz(quizPath string) (*entities.Quiz, error) {
	data, err := os.ReadFile(quizPath)
	if err != nil {
		return nil, err
	}

	var qj quizJSON
	if err := json.Unmarshal(data, &qj); err != nil {
		return nil, fmt.Errorf("failed to parse quiz.json: %w", err)
	}

	var questions []entities.QuizQuestion
	for _, q := range qj.Questions {
		question := entities.QuizQuestion{
			ID:           q.ID,
			Question:     q.Question,
			Options:      q.Options,
			CorrectIndex: q.CorrectIndex,
			Explanation:  q.Explanation,
		}
		questions = append(questions, question)
	}

	return &entities.Quiz{Questions: questions}, nil
}

// loadExtendedQuiz loads an extended quiz from a quiz.json file (new format with lowercase keys)
func (r *FolderCourseRepository) loadExtendedQuiz(quizPath string) (*entities.ExtendedQuiz, error) {
	data, err := os.ReadFile(quizPath)
	if err != nil {
		return nil, err
	}

	var eqj extendedQuizJSON
	if err := json.Unmarshal(data, &eqj); err != nil {
		return nil, fmt.Errorf("failed to parse quiz.json: %w", err)
	}

	// Check if this is the new format (has version or lowercase questions)
	if eqj.Version == "" && len(eqj.Questions) == 0 {
		return nil, fmt.Errorf("not an extended quiz format")
	}

	var questions []entities.ExtendedQuizQuestion
	for _, q := range eqj.Questions {
		question := entities.ExtendedQuizQuestion{
			ID:             q.ID,
			Type:           entities.QuestionType(q.Type),
			Difficulty:     q.Difficulty,
			Concept:        q.Concept,
			Question:       q.Question,
			Explanation:    q.Explanation,
			Options:        q.Options,
			CorrectIndex:   q.CorrectIndex,
			CorrectAnswer:  q.CorrectAnswer,
			CorrectIndices: q.CorrectIndices,
			MinSelections:  q.MinSelections,
			MaxSelections:  q.MaxSelections,
			CodeSnippet:    q.CodeSnippet,
			Language:       q.Language,
			LeftColumn:     q.LeftColumn,
			RightColumn:    q.RightColumn,
			CorrectPairs:   q.CorrectPairs,
			Items:          q.Items,
			CorrectOrder:   q.CorrectOrder,
		}
		questions = append(questions, question)
	}

	return &entities.ExtendedQuiz{
		Version:      eqj.Version,
		SubchapterID: eqj.SubchapterID,
		LessonID:     eqj.LessonID,
		Questions:    questions,
	}, nil
}

// ---- LibraryCourseRepository Interface Implementation ----

// Create is not supported for folder-based repository (read-only)
func (r *FolderCourseRepository) Create(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error) {
	return nil, fmt.Errorf("folder-based repository is read-only")
}

// GetByID retrieves a library course by ID
func (r *FolderCourseRepository) GetByID(ctx context.Context, id string) (*entities.LibraryCourse, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	course, ok := r.cache[id]
	if !ok {
		return nil, fmt.Errorf("course not found: %s", id)
	}

	return course, nil
}

// Update is not supported for folder-based repository (read-only)
func (r *FolderCourseRepository) Update(ctx context.Context, course *entities.LibraryCourse) (*entities.LibraryCourse, error) {
	return nil, fmt.Errorf("folder-based repository is read-only")
}

// Delete is not supported for folder-based repository (read-only)
func (r *FolderCourseRepository) Delete(ctx context.Context, id string) error {
	return fmt.Errorf("folder-based repository is read-only")
}

// List retrieves all library courses with pagination
func (r *FolderCourseRepository) List(ctx context.Context, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, 0, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	// Convert map to slice
	var courses []*entities.LibraryCourse
	for _, course := range r.cache {
		courses = append(courses, course)
	}

	// Sort by title
	sort.Slice(courses, func(i, j int) bool {
		return courses[i].Title < courses[j].Title
	})

	total := len(courses)

	// Apply pagination
	if offset >= len(courses) {
		return []*entities.LibraryCourse{}, total, nil
	}

	end := offset + limit
	if end > len(courses) {
		end = len(courses)
	}

	return courses[offset:end], total, nil
}

// ListByDifficulty retrieves courses filtered by difficulty
func (r *FolderCourseRepository) ListByDifficulty(ctx context.Context, difficulty entities.Difficulty, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, 0, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	var filtered []*entities.LibraryCourse
	for _, course := range r.cache {
		if course.Difficulty == difficulty {
			filtered = append(filtered, course)
		}
	}

	// Sort by title
	sort.Slice(filtered, func(i, j int) bool {
		return filtered[i].Title < filtered[j].Title
	})

	total := len(filtered)

	// Apply pagination
	if offset >= len(filtered) {
		return []*entities.LibraryCourse{}, total, nil
	}

	end := offset + limit
	if end > len(filtered) {
		end = len(filtered)
	}

	return filtered[offset:end], total, nil
}

// Search finds courses by title or description
func (r *FolderCourseRepository) Search(ctx context.Context, query string, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, 0, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	queryLower := strings.ToLower(query)
	var results []*entities.LibraryCourse

	for _, course := range r.cache {
		if strings.Contains(strings.ToLower(course.Title), queryLower) ||
			strings.Contains(strings.ToLower(course.Description), queryLower) {
			results = append(results, course)
		}
	}

	// Sort by title
	sort.Slice(results, func(i, j int) bool {
		return results[i].Title < results[j].Title
	})

	total := len(results)

	// Apply pagination
	if offset >= len(results) {
		return []*entities.LibraryCourse{}, total, nil
	}

	end := offset + limit
	if end > len(results) {
		end = len(results)
	}

	return results[offset:end], total, nil
}

// GetByAuthorID retrieves courses by author ID (folder-based courses use "folder-author")
func (r *FolderCourseRepository) GetByAuthorID(ctx context.Context, authorID string, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, 0, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	var filtered []*entities.LibraryCourse
	for _, course := range r.cache {
		if course.AuthorID == authorID {
			filtered = append(filtered, course)
		}
	}

	// Sort by title
	sort.Slice(filtered, func(i, j int) bool {
		return filtered[i].Title < filtered[j].Title
	})

	total := len(filtered)

	// Apply pagination
	if offset >= len(filtered) {
		return []*entities.LibraryCourse{}, total, nil
	}

	end := offset + limit
	if end > len(filtered) {
		end = len(filtered)
	}

	return filtered[offset:end], total, nil
}

// GetByTag retrieves courses by tag
func (r *FolderCourseRepository) GetByTag(ctx context.Context, tag string, limit, offset int) ([]*entities.LibraryCourse, int, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, 0, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	tagLower := strings.ToLower(tag)
	var filtered []*entities.LibraryCourse

	for _, course := range r.cache {
		for _, t := range course.Tags {
			if strings.ToLower(t) == tagLower {
				filtered = append(filtered, course)
				break
			}
		}
	}

	// Sort by title
	sort.Slice(filtered, func(i, j int) bool {
		return filtered[i].Title < filtered[j].Title
	})

	total := len(filtered)

	// Apply pagination
	if offset >= len(filtered) {
		return []*entities.LibraryCourse{}, total, nil
	}

	end := offset + limit
	if end > len(filtered) {
		end = len(filtered)
	}

	return filtered[offset:end], total, nil
}

// GetAllTags retrieves all unique tags
func (r *FolderCourseRepository) GetAllTags(ctx context.Context) ([]string, error) {
	if err := r.loadCourses(ctx); err != nil {
		return nil, err
	}

	r.cacheMu.RLock()
	defer r.cacheMu.RUnlock()

	tagSet := make(map[string]bool)
	for _, course := range r.cache {
		for _, tag := range course.Tags {
			tagSet[tag] = true
		}
	}

	var tags []string
	for tag := range tagSet {
		tags = append(tags, tag)
	}

	sort.Strings(tags)
	return tags, nil
}

// RefreshCache forces a reload of courses from disk
func (r *FolderCourseRepository) RefreshCache(ctx context.Context) error {
	r.cacheMu.Lock()
	r.lastLoad = time.Time{} // Reset last load to force reload
	r.cacheMu.Unlock()

	return r.loadCourses(ctx)
}

// UpdateLessonContent updates the content.md file for a specific lesson
// It creates a .bak backup before saving
func (r *FolderCourseRepository) UpdateLessonContent(ctx context.Context, courseID string, lessonPath []int, newContent string) error {
	// Find the course folder by ID
	course, err := r.GetByID(ctx, courseID)
	if err != nil {
		return fmt.Errorf("course not found: %w", err)
	}

	// Find the course folder path by scanning for matching course.json
	entries, err := os.ReadDir(r.coursesPath)
	if err != nil {
		return fmt.Errorf("failed to read courses directory: %w", err)
	}

	var courseFolderPath string
	for _, entry := range entries {
		if !entry.IsDir() || entry.Name() == "COURSE-TEMPLATE" {
			continue
		}

		testPath := filepath.Join(r.coursesPath, entry.Name())
		courseJSONPath := filepath.Join(testPath, "course.json")
		data, err := os.ReadFile(courseJSONPath)
		if err != nil {
			continue
		}

		var cj courseJSON
		if err := json.Unmarshal(data, &cj); err != nil {
			continue
		}

		// Check if this course matches
		testID := cj.ID
		if testID == "" || testID == "GENERATE-UUID" {
			// For generated UUIDs, match by title
			if cj.Title == course.Title {
				courseFolderPath = testPath
				break
			}
		} else if testID == courseID {
			courseFolderPath = testPath
			break
		}
	}

	if courseFolderPath == "" {
		return fmt.Errorf("course folder not found for ID: %s", courseID)
	}

	// Build the path to the content.md file based on lessonPath
	// lessonPath is like [0] for first chapter, [0, 2] for first chapter's third sublesson
	contentPath := filepath.Join(courseFolderPath, "lessons")

	// Get sorted lesson folders
	lessonEntries, err := os.ReadDir(contentPath)
	if err != nil {
		return fmt.Errorf("failed to read lessons directory: %w", err)
	}

	var lessonFolders []string
	for _, e := range lessonEntries {
		if e.IsDir() {
			lessonFolders = append(lessonFolders, e.Name())
		}
	}
	sort.Strings(lessonFolders)

	if len(lessonPath) == 0 {
		return fmt.Errorf("empty lesson path")
	}

	// Navigate to the lesson folder
	if lessonPath[0] >= len(lessonFolders) {
		return fmt.Errorf("lesson index %d out of range", lessonPath[0])
	}
	contentPath = filepath.Join(contentPath, lessonFolders[lessonPath[0]])

	// If there are more path segments, navigate to sublessons
	for i := 1; i < len(lessonPath); i++ {
		sublessonsPath := filepath.Join(contentPath, "sublessons")
		sublessonEntries, err := os.ReadDir(sublessonsPath)
		if err != nil {
			return fmt.Errorf("failed to read sublessons directory: %w", err)
		}

		var sublessonFolders []string
		for _, e := range sublessonEntries {
			if e.IsDir() {
				sublessonFolders = append(sublessonFolders, e.Name())
			}
		}
		sort.Strings(sublessonFolders)

		if lessonPath[i] >= len(sublessonFolders) {
			return fmt.Errorf("sublesson index %d out of range", lessonPath[i])
		}
		contentPath = filepath.Join(sublessonsPath, sublessonFolders[lessonPath[i]])
	}

	contentFilePath := filepath.Join(contentPath, "content.md")

	// Create backup
	existingContent, err := os.ReadFile(contentFilePath)
	if err == nil {
		backupPath := contentFilePath + ".bak"
		if err := os.WriteFile(backupPath, existingContent, 0644); err != nil {
			return fmt.Errorf("failed to create backup: %w", err)
		}
	}

	// Write new content
	if err := os.WriteFile(contentFilePath, []byte(newContent), 0644); err != nil {
		return fmt.Errorf("failed to write content: %w", err)
	}

	// Invalidate cache so next request gets fresh content
	r.cacheMu.Lock()
	r.lastLoad = time.Time{}
	r.cache = nil // Clear cache to force full reload
	r.cacheMu.Unlock()

	return nil
}

// GetLessonContentPath returns the file path for a lesson's content.md
func (r *FolderCourseRepository) GetLessonContentPath(ctx context.Context, courseID string, lessonPath []int) (string, error) {
	// This is a helper to get the path without modifying anything
	course, err := r.GetByID(ctx, courseID)
	if err != nil {
		return "", fmt.Errorf("course not found: %w", err)
	}

	entries, err := os.ReadDir(r.coursesPath)
	if err != nil {
		return "", fmt.Errorf("failed to read courses directory: %w", err)
	}

	var courseFolderPath string
	for _, entry := range entries {
		if !entry.IsDir() || entry.Name() == "COURSE-TEMPLATE" {
			continue
		}

		testPath := filepath.Join(r.coursesPath, entry.Name())
		courseJSONPath := filepath.Join(testPath, "course.json")
		data, err := os.ReadFile(courseJSONPath)
		if err != nil {
			continue
		}

		var cj courseJSON
		if err := json.Unmarshal(data, &cj); err != nil {
			continue
		}

		testID := cj.ID
		if testID == "" || testID == "GENERATE-UUID" {
			if cj.Title == course.Title {
				courseFolderPath = testPath
				break
			}
		} else if testID == courseID {
			courseFolderPath = testPath
			break
		}
	}

	if courseFolderPath == "" {
		return "", fmt.Errorf("course folder not found")
	}

	contentPath := filepath.Join(courseFolderPath, "lessons")

	lessonEntries, err := os.ReadDir(contentPath)
	if err != nil {
		return "", err
	}

	var lessonFolders []string
	for _, e := range lessonEntries {
		if e.IsDir() {
			lessonFolders = append(lessonFolders, e.Name())
		}
	}
	sort.Strings(lessonFolders)

	if len(lessonPath) == 0 || lessonPath[0] >= len(lessonFolders) {
		return "", fmt.Errorf("invalid lesson path")
	}

	contentPath = filepath.Join(contentPath, lessonFolders[lessonPath[0]])

	for i := 1; i < len(lessonPath); i++ {
		sublessonsPath := filepath.Join(contentPath, "sublessons")
		sublessonEntries, err := os.ReadDir(sublessonsPath)
		if err != nil {
			return "", err
		}

		var sublessonFolders []string
		for _, e := range sublessonEntries {
			if e.IsDir() {
				sublessonFolders = append(sublessonFolders, e.Name())
			}
		}
		sort.Strings(sublessonFolders)

		if lessonPath[i] >= len(sublessonFolders) {
			return "", fmt.Errorf("invalid sublesson path")
		}
		contentPath = filepath.Join(sublessonsPath, sublessonFolders[lessonPath[i]])
	}

	return filepath.Join(contentPath, "content.md"), nil
}
