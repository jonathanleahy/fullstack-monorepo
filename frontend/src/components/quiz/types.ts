// Quiz question types
export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'multiple_select'
  | 'code_analysis'
  | 'matching'
  | 'ordering';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type MasteryLevel = 'novice' | 'developing' | 'proficient' | 'expert';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: number; // 1-5
  concept: string;
  question: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple_select';
  options: string[];
  correctIndices: number[];
  minSelections?: number;
  maxSelections?: number;
}

export interface CodeAnalysisQuestion extends BaseQuestion {
  type: 'code_analysis';
  codeSnippet: string;
  language: string;
  options: string[];
  correctIndex: number;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  leftColumn: string[];
  rightColumn: string[];
  correctPairs: [number, number][];
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  items: string[];
  correctOrder: number[];
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MultipleSelectQuestion
  | CodeAnalysisQuestion
  | MatchingQuestion
  | OrderingQuestion;

export interface Quiz {
  version: string;
  subchapterId: string;
  lessonId: string;
  questions: QuizQuestion[];
}

// Type alias for question answers
export type QuestionAnswer = number | boolean | number[] | [number, number][];

export interface QuizResponse {
  questionId: string;
  userAnswer: QuestionAnswer;
  isCorrect: boolean;
  pointsEarned: number;
  pointsPossible: number;
  confidence?: ConfidenceLevel;
  timeTakenSeconds?: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  courseId: string;
  quizType: 'subchapter' | 'chapter';
  quizId: string;
  score: number;
  maxScore: number;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  masteryLevel: MasteryLevel;
  completedAt: string;
}

export interface QuizStats {
  quizId: string;
  bestScore: number | null;
  latestScore: number | null;
  attemptCount: number;
  bestMastery: MasteryLevel;
  history: QuizAttempt[];
}

export interface CourseQuizSummary {
  courseId: string;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  overallMastery: MasteryLevel;
  subchapterStats: QuizStats[];
  chapterStats: QuizStats[];
  weakConcepts: string[];
  strongConcepts: string[];
  reviewQueueSize: number;
}

// Quiz state management
export interface QuizState {
  status: 'idle' | 'in_progress' | 'completed';
  currentQuestionIndex: number;
  responses: QuizResponse[];
  startTime: number | null;
  questionStartTime: number | null;
}

// Props for question components
export interface QuestionProps<T extends QuizQuestion = QuizQuestion> {
  question: T;
  onAnswer: (answer: QuestionAnswer) => void;
  showFeedback: boolean;
  selectedAnswer: QuestionAnswer | null;
  disabled: boolean;
}

// Mastery level helpers
export const getMasteryLevel = (percentage: number): MasteryLevel => {
  if (percentage >= 86) return 'expert';
  if (percentage >= 71) return 'proficient';
  if (percentage >= 41) return 'developing';
  return 'novice';
};

export const getMasteryEmoji = (level: MasteryLevel): string => {
  switch (level) {
    case 'expert': return '⭐⭐⭐⭐';
    case 'proficient': return '⭐⭐⭐';
    case 'developing': return '⭐⭐';
    case 'novice': return '⭐';
  }
};

export const getMasteryColor = (level: MasteryLevel): string => {
  switch (level) {
    case 'expert': return 'text-yellow-500';
    case 'proficient': return 'text-green-500';
    case 'developing': return 'text-blue-500';
    case 'novice': return 'text-gray-500';
  }
};

// Calculate score with difficulty weighting
export const calculateScore = (
  questions: QuizQuestion[],
  responses: { isCorrect: boolean; difficulty?: number }[]
): { score: number; maxScore: number; percentage: number } => {
  let score = 0;
  let maxScore = 0;

  questions.forEach((q, index) => {
    const response = responses[index];
    const points = q.difficulty;
    maxScore += points;
    if (response?.isCorrect) {
      score += points;
    }
  });

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return { score, maxScore, percentage };
};
