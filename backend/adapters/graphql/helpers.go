package graphql

import (
	"github.com/google/uuid"
	"github.com/project/backend/domain/entities"
)

// convertQuizInput converts QuizInput to entities.Quiz
func convertQuizInput(input *QuizInput) *entities.Quiz {
	if input == nil {
		return nil
	}
	questions := make([]entities.QuizQuestion, len(input.Questions))
	for i, q := range input.Questions {
		explanation := ""
		if q.Explanation != nil {
			explanation = *q.Explanation
		}
		questions[i] = entities.QuizQuestion{
			ID:           uuid.New().String(),
			Question:     q.Question,
			Options:      q.Options,
			CorrectIndex: q.CorrectIndex,
			Explanation:  explanation,
		}
	}
	return &entities.Quiz{Questions: questions}
}

// convertLessonInput recursively converts LessonInput to entities.Lesson
func convertLessonInput(input *LessonInput) entities.Lesson {
	lesson := entities.Lesson{
		Title:   input.Title,
		Content: input.Content,
		Order:   input.Order,
	}
	if len(input.Sublessons) > 0 {
		lesson.Sublessons = make([]entities.Lesson, len(input.Sublessons))
		for i, sub := range input.Sublessons {
			lesson.Sublessons[i] = convertLessonInput(sub)
		}
	}
	if input.Quiz != nil {
		lesson.Quiz = convertQuizInput(input.Quiz)
	}
	return lesson
}

// convertLessonsInput converts a slice of LessonInput to entities.Lesson
func convertLessonsInput(inputs []*LessonInput) []entities.Lesson {
	lessons := make([]entities.Lesson, len(inputs))
	for i, l := range inputs {
		lessons[i] = convertLessonInput(l)
	}
	return lessons
}
