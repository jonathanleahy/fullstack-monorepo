package entities

import (
	"encoding/json"
	"time"
)

// QuestionType represents the type of quiz question
type QuestionType string

const (
	QuestionTypeMultipleChoice QuestionType = "multiple_choice"
	QuestionTypeTrueFalse      QuestionType = "true_false"
	QuestionTypeMultipleSelect QuestionType = "multiple_select"
	QuestionTypeCodeAnalysis   QuestionType = "code_analysis"
	QuestionTypeMatching       QuestionType = "matching"
	QuestionTypeOrdering       QuestionType = "ordering"
)

// ConfidenceLevel represents student confidence in their answer
type ConfidenceLevel string

const (
	ConfidenceLow    ConfidenceLevel = "low"
	ConfidenceMedium ConfidenceLevel = "medium"
	ConfidenceHigh   ConfidenceLevel = "high"
)

// MasteryLevel represents the student's mastery of a topic
type MasteryLevel string

const (
	MasteryNovice     MasteryLevel = "novice"      // 0-40%
	MasteryDeveloping MasteryLevel = "developing"  // 41-70%
	MasteryProficient MasteryLevel = "proficient"  // 71-85%
	MasteryExpert     MasteryLevel = "expert"      // 86-100%
)

// GetMasteryLevel returns the mastery level based on percentage score
func GetMasteryLevel(percentage float64) MasteryLevel {
	switch {
	case percentage >= 86:
		return MasteryExpert
	case percentage >= 71:
		return MasteryProficient
	case percentage >= 41:
		return MasteryDeveloping
	default:
		return MasteryNovice
	}
}

// ExtendedQuizQuestion represents a quiz question with all supported types
type ExtendedQuizQuestion struct {
	ID             string       `json:"id"`
	Type           QuestionType `json:"type"`
	Difficulty     int          `json:"difficulty"` // 1-5
	Concept        string       `json:"concept"`
	Question       string       `json:"question"`
	Explanation    string       `json:"explanation"`

	// For multiple_choice and code_analysis
	Options      []string `json:"options,omitempty"`
	CorrectIndex int      `json:"correctIndex,omitempty"`

	// For true_false
	CorrectAnswer *bool `json:"correctAnswer,omitempty"`

	// For multiple_select
	CorrectIndices []int `json:"correctIndices,omitempty"`
	MinSelections  int   `json:"minSelections,omitempty"`
	MaxSelections  int   `json:"maxSelections,omitempty"`

	// For code_analysis
	CodeSnippet string `json:"codeSnippet,omitempty"`
	Language    string `json:"language,omitempty"`

	// For matching
	LeftColumn   []string `json:"leftColumn,omitempty"`
	RightColumn  []string `json:"rightColumn,omitempty"`
	CorrectPairs [][]int  `json:"correctPairs,omitempty"`

	// For ordering
	Items        []string `json:"items,omitempty"`
	CorrectOrder []int    `json:"correctOrder,omitempty"`
}

// ExtendedQuiz represents a quiz with extended question types
type ExtendedQuiz struct {
	Version      string                 `json:"version"`
	SubchapterID string                 `json:"subchapterId"`
	LessonID     string                 `json:"lessonId"`
	Questions    []ExtendedQuizQuestion `json:"questions"`
}

// QuizAttempt represents a user's attempt at a quiz
type QuizAttempt struct {
	ID             string    `json:"id"`
	UserID         string    `json:"userId"`
	CourseID       string    `json:"courseId"`
	QuizType       string    `json:"quizType"` // "subchapter" or "chapter"
	QuizID         string    `json:"quizId"`   // e.g., "lesson-00-sub-01"
	Score          int       `json:"score"`    // Points earned
	MaxScore       int       `json:"maxScore"` // Max possible points
	TotalQuestions int       `json:"totalQuestions"`
	CorrectCount   int       `json:"correctCount"`
	Percentage     float64   `json:"percentage"`
	MasteryLevel   MasteryLevel `json:"masteryLevel"`
	CompletedAt    time.Time `json:"completedAt"`
}

// NewQuizAttempt creates a new quiz attempt
func NewQuizAttempt(userID, courseID, quizType, quizID string, score, maxScore, totalQuestions, correctCount int) *QuizAttempt {
	percentage := 0.0
	if maxScore > 0 {
		percentage = (float64(score) / float64(maxScore)) * 100
	}

	return &QuizAttempt{
		UserID:         userID,
		CourseID:       courseID,
		QuizType:       quizType,
		QuizID:         quizID,
		Score:          score,
		MaxScore:       maxScore,
		TotalQuestions: totalQuestions,
		CorrectCount:   correctCount,
		Percentage:     percentage,
		MasteryLevel:   GetMasteryLevel(percentage),
		CompletedAt:    time.Now(),
	}
}

// QuizResponse represents a user's response to a single question
type QuizResponse struct {
	ID              string          `json:"id"`
	AttemptID       string          `json:"attemptId"`
	QuestionID      string          `json:"questionId"`
	UserAnswer      json.RawMessage `json:"userAnswer"` // JSON to handle different answer types
	IsCorrect       bool            `json:"isCorrect"`
	PointsEarned    int             `json:"pointsEarned"`
	PointsPossible  int             `json:"pointsPossible"`
	Confidence      ConfidenceLevel `json:"confidence"`
	TimeTakenSec    int             `json:"timeTakenSeconds"`
}

// QuizStats represents statistics for a specific quiz
type QuizStats struct {
	QuizID       string        `json:"quizId"`
	BestScore    *float64      `json:"bestScore"`
	LatestScore  *float64      `json:"latestScore"`
	AttemptCount int           `json:"attemptCount"`
	BestMastery  MasteryLevel  `json:"bestMastery"`
	History      []QuizAttempt `json:"history"`
}

// CourseQuizSummary represents quiz statistics for an entire course
type CourseQuizSummary struct {
	CourseID            string       `json:"courseId"`
	CourseTitle         string       `json:"courseTitle"`
	TotalQuizzes        int          `json:"totalQuizzes"`
	CompletedQuizzes    int          `json:"completedQuizzes"`
	AverageScore        float64      `json:"averageScore"`
	OverallMastery      MasteryLevel `json:"overallMastery"`
	SubchapterStats     []QuizStats  `json:"subchapterStats"`
	ChapterStats        []QuizStats  `json:"chapterStats"`
	WeakConcepts        []string     `json:"weakConcepts"`    // Concepts with low scores
	StrongConcepts      []string     `json:"strongConcepts"`  // Concepts with high scores
	ReviewQueueSize     int          `json:"reviewQueueSize"` // Questions to review (spaced repetition)
}

// ScoreDataPoint represents a single data point for score history charts
type ScoreDataPoint struct {
	Date       string `json:"date"`
	Score      float64 `json:"score"`
	CourseID   string `json:"courseId"`
	CourseName string `json:"courseName"`
}

// DashboardQuizStats represents aggregated quiz stats for the dashboard
type DashboardQuizStats struct {
	TotalQuizzesTaken    int                  `json:"totalQuizzesTaken"`
	OverallAverageScore  float64              `json:"overallAverageScore"`
	OverallMastery       MasteryLevel         `json:"overallMastery"`
	CourseSummaries      []*CourseQuizSummary `json:"courseSummaries"`
	RecentAttempts       []QuizAttempt        `json:"recentAttempts"`
	TotalWeakConcepts    []string             `json:"totalWeakConcepts"`
	TotalStrongConcepts  []string             `json:"totalStrongConcepts"`
	ScoreHistory         []ScoreDataPoint     `json:"scoreHistory"`
}

// QuizConfig represents quiz configuration for a course
type QuizConfig struct {
	AllowedTypes           []QuestionType     `json:"allowedTypes"`
	QuestionsPerSubchapter int                `json:"questionsPerSubchapter"`
	QuestionsPerChapter    int                `json:"questionsPerChapter"`
	PassingScore           int                `json:"passingScore"`
	TestOutThreshold       int                `json:"testOutThreshold"`
	DifficultyDistribution map[string]float64 `json:"difficultyDistribution"`
}

// DefaultQuizConfig returns the default quiz configuration
func DefaultQuizConfig() QuizConfig {
	return QuizConfig{
		AllowedTypes: []QuestionType{
			QuestionTypeMultipleChoice,
			QuestionTypeTrueFalse,
			QuestionTypeMultipleSelect,
			QuestionTypeCodeAnalysis,
			QuestionTypeMatching,
			QuestionTypeOrdering,
		},
		QuestionsPerSubchapter: 6,
		QuestionsPerChapter:    10,
		PassingScore:           70,
		TestOutThreshold:       80,
		DifficultyDistribution: map[string]float64{
			"easy":   0.2,
			"medium": 0.5,
			"hard":   0.3,
		},
	}
}

// ReviewQueueItem represents a question in the spaced repetition review queue
type ReviewQueueItem struct {
	ID           string    `json:"id"`
	UserID       string    `json:"userId"`
	CourseID     string    `json:"courseId"`
	QuizID       string    `json:"quizId"`
	QuestionID   string    `json:"questionId"`
	Concept      string    `json:"concept"`
	WrongCount   int       `json:"wrongCount"`
	LastAttempt  time.Time `json:"lastAttempt"`
	NextReview   time.Time `json:"nextReview"`
	Stability    float64   `json:"stability"` // Spaced repetition stability score
}
