// +build ignore

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

type QuizQuestion struct {
	ID           string   `json:"ID"`
	Question     string   `json:"Question"`
	Options      []string `json:"Options"`
	CorrectIndex int      `json:"CorrectIndex"`
	Explanation  string   `json:"Explanation"`
}

type Quiz struct {
	Questions []QuizQuestion `json:"Questions"`
}

type Lesson struct {
	Title      string   `json:"Title"`
	Content    string   `json:"Content"`
	Order      int      `json:"Order"`
	Sublessons []Lesson `json:"Sublessons,omitempty"`
	Quiz       *Quiz    `json:"Quiz,omitempty"`
}

type Course struct {
	ID             string   `json:"id"`
	Title          string   `json:"title"`
	Description    string   `json:"description"`
	Author         string   `json:"author"`
	Difficulty     string   `json:"difficulty"`
	EstimatedHours int      `json:"estimated_hours"`
	Lessons        []Lesson `json:"lessons"`
}

func main() {
	dbPath := "data/seed.db"
	outputDir := "data/courses"

	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Find the hex architecture course
	var course Course
	var lessonsJSON string
	err = db.QueryRow(`
		SELECT id, title, description, author, difficulty, estimated_hours, lessons
		FROM library_courses
		WHERE title LIKE '%Hexagonal%'
		LIMIT 1
	`).Scan(&course.ID, &course.Title, &course.Description, &course.Author, &course.Difficulty, &course.EstimatedHours, &lessonsJSON)
	if err != nil {
		log.Fatal("Could not find Hexagonal Architecture course:", err)
	}

	if err := json.Unmarshal([]byte(lessonsJSON), &course.Lessons); err != nil {
		log.Fatal("Failed to parse lessons:", err)
	}

	// Create course directory
	courseSlug := slugify(course.Title)
	courseDir := filepath.Join(outputDir, courseSlug)
	if err := os.MkdirAll(courseDir, 0755); err != nil {
		log.Fatal("Failed to create course directory:", err)
	}

	// Write course metadata
	metadataPath := filepath.Join(courseDir, "course.json")
	metadata := map[string]interface{}{
		"id":              course.ID,
		"title":           course.Title,
		"description":     course.Description,
		"author":          course.Author,
		"difficulty":      course.Difficulty,
		"estimated_hours": course.EstimatedHours,
		"lesson_count":    len(course.Lessons),
	}
	metadataJSON, _ := json.MarshalIndent(metadata, "", "  ")
	if err := os.WriteFile(metadataPath, metadataJSON, 0644); err != nil {
		log.Fatal("Failed to write course metadata:", err)
	}
	fmt.Printf("Created: %s\n", metadataPath)

	// Create lessons directory
	lessonsDir := filepath.Join(courseDir, "lessons")
	if err := os.MkdirAll(lessonsDir, 0755); err != nil {
		log.Fatal("Failed to create lessons directory:", err)
	}

	// Write each lesson
	for i, lesson := range course.Lessons {
		lessonDir := filepath.Join(lessonsDir, fmt.Sprintf("%02d-%s", i, slugify(lesson.Title)))
		if err := os.MkdirAll(lessonDir, 0755); err != nil {
			log.Fatal("Failed to create lesson directory:", err)
		}

		// Write lesson content as markdown
		contentPath := filepath.Join(lessonDir, "content.md")
		if err := os.WriteFile(contentPath, []byte(lesson.Content), 0644); err != nil {
			log.Fatal("Failed to write lesson content:", err)
		}
		fmt.Printf("Created: %s\n", contentPath)

		// Write lesson metadata
		lessonMetaPath := filepath.Join(lessonDir, "lesson.json")
		lessonMeta := map[string]interface{}{
			"title":    lesson.Title,
			"order":    i,
			"has_quiz": lesson.Quiz != nil,
		}
		lessonMetaJSON, _ := json.MarshalIndent(lessonMeta, "", "  ")
		if err := os.WriteFile(lessonMetaPath, lessonMetaJSON, 0644); err != nil {
			log.Fatal("Failed to write lesson metadata:", err)
		}
		fmt.Printf("Created: %s\n", lessonMetaPath)

		// Write quiz if present
		if lesson.Quiz != nil && len(lesson.Quiz.Questions) > 0 {
			quizPath := filepath.Join(lessonDir, "quiz.json")
			quizJSON, _ := json.MarshalIndent(lesson.Quiz, "", "  ")
			if err := os.WriteFile(quizPath, quizJSON, 0644); err != nil {
				log.Fatal("Failed to write quiz:", err)
			}
			fmt.Printf("Created: %s\n", quizPath)
		}

		// Handle sublessons
		if len(lesson.Sublessons) > 0 {
			sublessonsDir := filepath.Join(lessonDir, "sublessons")
			if err := os.MkdirAll(sublessonsDir, 0755); err != nil {
				log.Fatal("Failed to create sublessons directory:", err)
			}

			for j, sublesson := range lesson.Sublessons {
				sublessonDir := filepath.Join(sublessonsDir, fmt.Sprintf("%02d-%s", j, slugify(sublesson.Title)))
				if err := os.MkdirAll(sublessonDir, 0755); err != nil {
					log.Fatal("Failed to create sublesson directory:", err)
				}

				subContentPath := filepath.Join(sublessonDir, "content.md")
				if err := os.WriteFile(subContentPath, []byte(sublesson.Content), 0644); err != nil {
					log.Fatal("Failed to write sublesson content:", err)
				}
				fmt.Printf("Created: %s\n", subContentPath)

				if sublesson.Quiz != nil && len(sublesson.Quiz.Questions) > 0 {
					subQuizPath := filepath.Join(sublessonDir, "quiz.json")
					subQuizJSON, _ := json.MarshalIndent(sublesson.Quiz, "", "  ")
					if err := os.WriteFile(subQuizPath, subQuizJSON, 0644); err != nil {
						log.Fatal("Failed to write sublesson quiz:", err)
					}
					fmt.Printf("Created: %s\n", subQuizPath)
				}
			}
		}
	}

	fmt.Printf("\nCourse extracted to: %s\n", courseDir)
}

func slugify(s string) string {
	// Convert to lowercase
	s = strings.ToLower(s)
	// Replace spaces and special chars with hyphens
	reg := regexp.MustCompile(`[^a-z0-9]+`)
	s = reg.ReplaceAllString(s, "-")
	// Remove leading/trailing hyphens
	s = strings.Trim(s, "-")
	return s
}
