import { graphqlClient } from './graphql';

export type MasteryLevel = 'NOVICE' | 'DEVELOPING' | 'PROFICIENT' | 'EXPERT';

export interface QuizAttempt {
  id: string;
  userId: string;
  courseId: string;
  quizType: string;
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
  courseTitle: string;
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

export interface ScoreDataPoint {
  date: string;
  score: number;
  courseId: string;
  courseName: string;
}

export interface DashboardQuizStats {
  totalQuizzesTaken: number;
  overallAverageScore: number;
  overallMastery: MasteryLevel;
  courseSummaries: CourseQuizSummary[];
  recentAttempts: QuizAttempt[];
  totalWeakConcepts: string[];
  totalStrongConcepts: string[];
  scoreHistory: ScoreDataPoint[];
}

const QUIZ_ATTEMPT_FIELDS = `
  id
  userId
  courseId
  quizType
  quizId
  score
  maxScore
  totalQuestions
  correctCount
  percentage
  masteryLevel
  completedAt
`;

const QUIZ_STATS_FIELDS = `
  quizId
  bestScore
  latestScore
  attemptCount
  bestMastery
  history {
    ${QUIZ_ATTEMPT_FIELDS}
  }
`;

const COURSE_QUIZ_SUMMARY_FIELDS = `
  courseId
  courseTitle
  totalQuizzes
  completedQuizzes
  averageScore
  overallMastery
  subchapterStats {
    ${QUIZ_STATS_FIELDS}
  }
  chapterStats {
    ${QUIZ_STATS_FIELDS}
  }
  weakConcepts
  strongConcepts
  reviewQueueSize
`;

const GET_DASHBOARD_QUIZ_STATS = `
  query GetDashboardQuizStats($fromDate: String, $toDate: String) {
    dashboardQuizStats(fromDate: $fromDate, toDate: $toDate) {
      totalQuizzesTaken
      overallAverageScore
      overallMastery
      courseSummaries {
        ${COURSE_QUIZ_SUMMARY_FIELDS}
      }
      recentAttempts {
        ${QUIZ_ATTEMPT_FIELDS}
      }
      totalWeakConcepts
      totalStrongConcepts
      scoreHistory {
        date
        score
        courseId
        courseName
      }
    }
  }
`;

const GET_QUIZ_STATS = `
  query GetQuizStats($courseId: ID!, $quizId: String!) {
    quizStats(courseId: $courseId, quizId: $quizId) {
      ${QUIZ_STATS_FIELDS}
    }
  }
`;

const GET_COURSE_QUIZ_SUMMARY = `
  query GetCourseQuizSummary($courseId: ID!) {
    courseQuizSummary(courseId: $courseId) {
      ${COURSE_QUIZ_SUMMARY_FIELDS}
    }
  }
`;

const SUBMIT_QUIZ_ATTEMPT = `
  mutation SubmitQuizAttempt($input: SubmitQuizAttemptInput!) {
    submitQuizAttempt(input: $input) {
      ${QUIZ_ATTEMPT_FIELDS}
    }
  }
`;

export interface QuizResponseInput {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  pointsPossible: number;
  confidence?: number;
  timeTakenSeconds?: number;
}

export interface SubmitQuizAttemptInput {
  courseId: string;
  quizType: string;
  quizId: string;
  score: number;
  maxScore: number;
  totalQuestions: number;
  correctCount: number;
  responses: QuizResponseInput[];
}

export const quizStatsService = {
  async getDashboardQuizStats(fromDate?: string, toDate?: string): Promise<DashboardQuizStats> {
    const data = await graphqlClient.request<{ dashboardQuizStats: DashboardQuizStats }>(
      GET_DASHBOARD_QUIZ_STATS,
      { fromDate, toDate }
    );
    return data.dashboardQuizStats;
  },

  async getQuizStats(courseId: string, quizId: string): Promise<QuizStats | null> {
    const data = await graphqlClient.request<{ quizStats: QuizStats | null }>(
      GET_QUIZ_STATS,
      { courseId, quizId }
    );
    return data.quizStats;
  },

  async getCourseQuizSummary(courseId: string): Promise<CourseQuizSummary | null> {
    const data = await graphqlClient.request<{ courseQuizSummary: CourseQuizSummary | null }>(
      GET_COURSE_QUIZ_SUMMARY,
      { courseId }
    );
    return data.courseQuizSummary;
  },

  async submitQuizAttempt(input: SubmitQuizAttemptInput): Promise<QuizAttempt> {
    const data = await graphqlClient.request<{ submitQuizAttempt: QuizAttempt }>(
      SUBMIT_QUIZ_ATTEMPT,
      { input }
    );
    return data.submitQuizAttempt;
  },
};
