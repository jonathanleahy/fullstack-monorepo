package repositories

import (
	"context"
	"time"

	"github.com/project/backend/domain/entities"
)

// QuizRepository defines the interface for quiz data access
type QuizRepository interface {
	// SaveAttempt stores a quiz attempt
	SaveAttempt(ctx context.Context, attempt *entities.QuizAttempt) (*entities.QuizAttempt, error)

	// SaveResponse stores a quiz response
	SaveResponse(ctx context.Context, response *entities.QuizResponse) (*entities.QuizResponse, error)

	// GetAttemptsByQuiz retrieves all attempts for a specific quiz
	GetAttemptsByQuiz(ctx context.Context, userID, courseID, quizID string) ([]entities.QuizAttempt, error)

	// GetQuizStats retrieves statistics for a specific quiz
	GetQuizStats(ctx context.Context, userID, courseID, quizID string) (*entities.QuizStats, error)

	// GetCourseQuizSummary retrieves quiz summary for entire course
	GetCourseQuizSummary(ctx context.Context, userID, courseID string) (*entities.CourseQuizSummary, error)

	// GetDashboardQuizStats retrieves aggregated quiz stats for the dashboard
	GetDashboardQuizStats(ctx context.Context, userID string, fromDate, toDate *time.Time) (*entities.DashboardQuizStats, error)

	// AddToReviewQueue adds a question to the spaced repetition review queue
	AddToReviewQueue(ctx context.Context, item *entities.ReviewQueueItem) error

	// GetReviewQueue retrieves questions due for review
	GetReviewQueue(ctx context.Context, userID, courseID string, limit int) ([]entities.ReviewQueueItem, error)

	// RemoveFromReviewQueue removes a question from review queue
	RemoveFromReviewQueue(ctx context.Context, userID, courseID, questionID string) error

	// GetResponsesByAttempt retrieves all responses for an attempt
	GetResponsesByAttempt(ctx context.Context, attemptID string) ([]entities.QuizResponse, error)
}
