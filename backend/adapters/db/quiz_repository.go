package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/project/backend/domain/entities"
)

// QuizRepository handles quiz data persistence
type QuizRepository struct {
	db *sql.DB
}

// NewQuizRepository creates a new quiz repository
func NewQuizRepository(db *sql.DB) *QuizRepository {
	return &QuizRepository{db: db}
}

// SaveAttempt saves a quiz attempt
func (r *QuizRepository) SaveAttempt(ctx context.Context, attempt *entities.QuizAttempt) (*entities.QuizAttempt, error) {
	if attempt.ID == "" {
		attempt.ID = uuid.New().String()
	}

	_, err := r.db.ExecContext(ctx, `
		INSERT INTO quiz_attempts (
			id, user_id, course_id, quiz_type, quiz_id,
			score, max_score, total_questions, correct_count,
			percentage, mastery_level, completed_at
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`,
		attempt.ID,
		attempt.UserID,
		attempt.CourseID,
		attempt.QuizType,
		attempt.QuizID,
		attempt.Score,
		attempt.MaxScore,
		attempt.TotalQuestions,
		attempt.CorrectCount,
		attempt.Percentage,
		attempt.MasteryLevel,
		attempt.CompletedAt,
	)

	if err != nil {
		return nil, err
	}

	return attempt, nil
}

// SaveResponse saves a quiz response
func (r *QuizRepository) SaveResponse(ctx context.Context, response *entities.QuizResponse) (*entities.QuizResponse, error) {
	if response.ID == "" {
		response.ID = uuid.New().String()
	}

	_, err := r.db.ExecContext(ctx, `
		INSERT INTO quiz_responses (
			id, attempt_id, question_id, user_answer, is_correct,
			points_earned, points_possible, confidence, time_taken_seconds
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`,
		response.ID,
		response.AttemptID,
		response.QuestionID,
		response.UserAnswer,
		response.IsCorrect,
		response.PointsEarned,
		response.PointsPossible,
		response.Confidence,
		response.TimeTakenSec,
	)

	if err != nil {
		return nil, err
	}

	return response, nil
}

// GetAttemptsByQuiz returns all attempts for a specific quiz
func (r *QuizRepository) GetAttemptsByQuiz(ctx context.Context, userID, courseID, quizID string) ([]entities.QuizAttempt, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, course_id, quiz_type, quiz_id,
			   score, max_score, total_questions, correct_count,
			   percentage, mastery_level, completed_at
		FROM quiz_attempts
		WHERE user_id = ? AND course_id = ? AND quiz_id = ?
		ORDER BY completed_at DESC
	`, userID, courseID, quizID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attempts []entities.QuizAttempt
	for rows.Next() {
		var a entities.QuizAttempt
		err := rows.Scan(
			&a.ID, &a.UserID, &a.CourseID, &a.QuizType, &a.QuizID,
			&a.Score, &a.MaxScore, &a.TotalQuestions, &a.CorrectCount,
			&a.Percentage, &a.MasteryLevel, &a.CompletedAt,
		)
		if err != nil {
			return nil, err
		}
		attempts = append(attempts, a)
	}

	return attempts, rows.Err()
}

// GetQuizStats returns statistics for a specific quiz
func (r *QuizRepository) GetQuizStats(ctx context.Context, userID, courseID, quizID string) (*entities.QuizStats, error) {
	attempts, err := r.GetAttemptsByQuiz(ctx, userID, courseID, quizID)
	if err != nil {
		return nil, err
	}

	stats := &entities.QuizStats{
		QuizID:       quizID,
		AttemptCount: len(attempts),
		History:      attempts,
	}

	if len(attempts) > 0 {
		// Latest score is first (ordered by completed_at DESC)
		latestScore := attempts[0].Percentage
		stats.LatestScore = &latestScore

		// Find best score
		var bestScore float64
		var bestMastery entities.MasteryLevel = entities.MasteryNovice
		for _, a := range attempts {
			if a.Percentage > bestScore {
				bestScore = a.Percentage
				bestMastery = a.MasteryLevel
			}
		}
		stats.BestScore = &bestScore
		stats.BestMastery = bestMastery
	}

	return stats, nil
}

// GetCourseQuizSummary returns quiz summary for entire course
func (r *QuizRepository) GetCourseQuizSummary(ctx context.Context, userID, courseID string) (*entities.CourseQuizSummary, error) {
	// Get all unique quiz IDs for this course
	rows, err := r.db.QueryContext(ctx, `
		SELECT DISTINCT quiz_id, quiz_type
		FROM quiz_attempts
		WHERE user_id = ? AND course_id = ?
	`, userID, courseID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var subchapterStats []entities.QuizStats
	var chapterStats []entities.QuizStats
	var totalScore float64
	var quizCount int

	for rows.Next() {
		var quizID, quizType string
		if err := rows.Scan(&quizID, &quizType); err != nil {
			return nil, err
		}

		stats, err := r.GetQuizStats(ctx, userID, courseID, quizID)
		if err != nil {
			return nil, err
		}

		if quizType == "subchapter" {
			subchapterStats = append(subchapterStats, *stats)
		} else {
			chapterStats = append(chapterStats, *stats)
		}

		if stats.BestScore != nil {
			totalScore += *stats.BestScore
			quizCount++
		}
	}

	averageScore := 0.0
	if quizCount > 0 {
		averageScore = totalScore / float64(quizCount)
	}

	// Get weak and strong concepts
	weakConcepts, strongConcepts, err := r.getConceptStrengths(ctx, userID, courseID)
	if err != nil {
		return nil, err
	}

	// Get review queue size
	var reviewQueueSize int
	err = r.db.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM review_queue
		WHERE user_id = ? AND course_id = ? AND next_review <= ?
	`, userID, courseID, time.Now()).Scan(&reviewQueueSize)
	if err != nil {
		return nil, err
	}

	return &entities.CourseQuizSummary{
		CourseID:         courseID,
		TotalQuizzes:     len(subchapterStats) + len(chapterStats),
		CompletedQuizzes: quizCount,
		AverageScore:     averageScore,
		OverallMastery:   entities.GetMasteryLevel(averageScore),
		SubchapterStats:  subchapterStats,
		ChapterStats:     chapterStats,
		WeakConcepts:     weakConcepts,
		StrongConcepts:   strongConcepts,
		ReviewQueueSize:  reviewQueueSize,
	}, nil
}

// getConceptStrengths analyzes responses to identify weak and strong concepts
func (r *QuizRepository) getConceptStrengths(ctx context.Context, userID, courseID string) (weak, strong []string, err error) {
	// This would require storing concepts in responses
	// For now, return empty slices - can be enhanced later
	return []string{}, []string{}, nil
}

// AddToReviewQueue adds a question to the spaced repetition review queue
func (r *QuizRepository) AddToReviewQueue(ctx context.Context, item *entities.ReviewQueueItem) error {
	if item.ID == "" {
		item.ID = uuid.New().String()
	}

	_, err := r.db.ExecContext(ctx, `
		INSERT INTO review_queue (
			id, user_id, course_id, quiz_id, question_id, concept,
			wrong_count, last_attempt, next_review, stability
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT(user_id, course_id, question_id) DO UPDATE SET
			wrong_count = wrong_count + 1,
			last_attempt = excluded.last_attempt,
			next_review = excluded.next_review,
			stability = excluded.stability * 0.8
	`,
		item.ID,
		item.UserID,
		item.CourseID,
		item.QuizID,
		item.QuestionID,
		item.Concept,
		item.WrongCount,
		item.LastAttempt,
		item.NextReview,
		item.Stability,
	)

	return err
}

// GetReviewQueue returns questions due for review
func (r *QuizRepository) GetReviewQueue(ctx context.Context, userID, courseID string, limit int) ([]entities.ReviewQueueItem, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, course_id, quiz_id, question_id, concept,
			   wrong_count, last_attempt, next_review, stability
		FROM review_queue
		WHERE user_id = ? AND course_id = ? AND next_review <= ?
		ORDER BY next_review ASC
		LIMIT ?
	`, userID, courseID, time.Now(), limit)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []entities.ReviewQueueItem
	for rows.Next() {
		var item entities.ReviewQueueItem
		err := rows.Scan(
			&item.ID, &item.UserID, &item.CourseID, &item.QuizID,
			&item.QuestionID, &item.Concept, &item.WrongCount,
			&item.LastAttempt, &item.NextReview, &item.Stability,
		)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, rows.Err()
}

// RemoveFromReviewQueue removes a question from review queue (when answered correctly)
func (r *QuizRepository) RemoveFromReviewQueue(ctx context.Context, userID, courseID, questionID string) error {
	_, err := r.db.ExecContext(ctx, `
		DELETE FROM review_queue
		WHERE user_id = ? AND course_id = ? AND question_id = ?
	`, userID, courseID, questionID)
	return err
}

// GetDashboardQuizStats returns aggregated quiz stats for the dashboard
func (r *QuizRepository) GetDashboardQuizStats(ctx context.Context, userID string, fromDate, toDate *time.Time) (*entities.DashboardQuizStats, error) {
	// Build date filter
	dateFilter := ""
	args := []interface{}{userID}
	if fromDate != nil {
		dateFilter += " AND completed_at >= ?"
		args = append(args, *fromDate)
	}
	if toDate != nil {
		dateFilter += " AND completed_at <= ?"
		args = append(args, *toDate)
	}

	// Get all course IDs with quiz attempts
	rows, err := r.db.QueryContext(ctx, `
		SELECT DISTINCT course_id
		FROM quiz_attempts
		WHERE user_id = ?`+dateFilter,
		args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courseIDs []string
	for rows.Next() {
		var courseID string
		if err := rows.Scan(&courseID); err != nil {
			return nil, err
		}
		courseIDs = append(courseIDs, courseID)
	}

	stats := &entities.DashboardQuizStats{
		TotalQuizzesTaken:   0,
		OverallAverageScore: 0,
		OverallMastery:      entities.MasteryNovice,
		CourseSummaries:     make([]*entities.CourseQuizSummary, 0),
		RecentAttempts:      make([]entities.QuizAttempt, 0),
		TotalWeakConcepts:   make([]string, 0),
		TotalStrongConcepts: make([]string, 0),
		ScoreHistory:        make([]entities.ScoreDataPoint, 0),
	}

	// Get summary for each course
	var totalScore float64
	for _, courseID := range courseIDs {
		summary, err := r.GetCourseQuizSummary(ctx, userID, courseID)
		if err != nil {
			continue
		}
		stats.CourseSummaries = append(stats.CourseSummaries, summary)
		stats.TotalQuizzesTaken += summary.CompletedQuizzes
		totalScore += summary.AverageScore * float64(summary.CompletedQuizzes)

		// Aggregate weak/strong concepts
		stats.TotalWeakConcepts = append(stats.TotalWeakConcepts, summary.WeakConcepts...)
		stats.TotalStrongConcepts = append(stats.TotalStrongConcepts, summary.StrongConcepts...)
	}

	if stats.TotalQuizzesTaken > 0 {
		stats.OverallAverageScore = totalScore / float64(stats.TotalQuizzesTaken)
		stats.OverallMastery = entities.GetMasteryLevel(stats.OverallAverageScore)
	}

	// Get recent attempts (last 10)
	recentArgs := []interface{}{userID}
	recentDateFilter := ""
	if fromDate != nil {
		recentDateFilter += " AND completed_at >= ?"
		recentArgs = append(recentArgs, *fromDate)
	}
	if toDate != nil {
		recentDateFilter += " AND completed_at <= ?"
		recentArgs = append(recentArgs, *toDate)
	}

	recentRows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, course_id, quiz_type, quiz_id,
			   score, max_score, total_questions, correct_count,
			   percentage, mastery_level, completed_at
		FROM quiz_attempts
		WHERE user_id = ?`+recentDateFilter+`
		ORDER BY completed_at DESC
		LIMIT 10`,
		recentArgs...)
	if err != nil {
		return nil, err
	}
	defer recentRows.Close()

	for recentRows.Next() {
		var a entities.QuizAttempt
		err := recentRows.Scan(
			&a.ID, &a.UserID, &a.CourseID, &a.QuizType, &a.QuizID,
			&a.Score, &a.MaxScore, &a.TotalQuestions, &a.CorrectCount,
			&a.Percentage, &a.MasteryLevel, &a.CompletedAt,
		)
		if err != nil {
			return nil, err
		}
		stats.RecentAttempts = append(stats.RecentAttempts, a)
	}

	// Get score history (for charts)
	historyArgs := []interface{}{userID}
	historyDateFilter := ""
	if fromDate != nil {
		historyDateFilter += " AND completed_at >= ?"
		historyArgs = append(historyArgs, *fromDate)
	}
	if toDate != nil {
		historyDateFilter += " AND completed_at <= ?"
		historyArgs = append(historyArgs, *toDate)
	}

	historyRows, err := r.db.QueryContext(ctx, `
		SELECT course_id, date(completed_at) as date, AVG(percentage) as avg_score
		FROM quiz_attempts
		WHERE user_id = ?`+historyDateFilter+`
		GROUP BY course_id, date(completed_at)
		ORDER BY date(completed_at) ASC`,
		historyArgs...)
	if err != nil {
		return nil, err
	}
	defer historyRows.Close()

	for historyRows.Next() {
		var dp entities.ScoreDataPoint
		if err := historyRows.Scan(&dp.CourseID, &dp.Date, &dp.Score); err != nil {
			return nil, err
		}
		stats.ScoreHistory = append(stats.ScoreHistory, dp)
	}

	return stats, nil
}

// GetResponsesByAttempt returns all responses for an attempt
func (r *QuizRepository) GetResponsesByAttempt(ctx context.Context, attemptID string) ([]entities.QuizResponse, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, attempt_id, question_id, user_answer, is_correct,
			   points_earned, points_possible, confidence, time_taken_seconds
		FROM quiz_responses
		WHERE attempt_id = ?
	`, attemptID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var responses []entities.QuizResponse
	for rows.Next() {
		var resp entities.QuizResponse
		var confidence sql.NullString
		var timeTaken sql.NullInt64

		err := rows.Scan(
			&resp.ID, &resp.AttemptID, &resp.QuestionID,
			&resp.UserAnswer, &resp.IsCorrect,
			&resp.PointsEarned, &resp.PointsPossible,
			&confidence, &timeTaken,
		)
		if err != nil {
			return nil, err
		}

		if confidence.Valid {
			resp.Confidence = entities.ConfidenceLevel(confidence.String)
		}
		if timeTaken.Valid {
			resp.TimeTakenSec = int(timeTaken.Int64)
		}

		responses = append(responses, resp)
	}

	return responses, rows.Err()
}
