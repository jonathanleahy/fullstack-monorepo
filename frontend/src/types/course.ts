export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// Question type definitions for extended quiz system
export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'multiple_select'
  | 'code_analysis'
  | 'matching'
  | 'ordering';

// Legacy quiz question (simple multiple choice)
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

// Extended question types for the new quiz system
export interface BaseQuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  difficulty: number; // 1-5
  concept?: string;
  explanation?: string;
}

export interface MultipleChoiceQuestion extends BaseQuizQuestion {
  type: 'multiple_choice';
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuizQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export interface MultipleSelectQuestion extends BaseQuizQuestion {
  type: 'multiple_select';
  options: string[];
  correctIndices: number[];
  minSelections?: number;
  maxSelections?: number;
}

export interface CodeAnalysisQuestion extends BaseQuizQuestion {
  type: 'code_analysis';
  codeSnippet: string;
  language?: string;
  options: string[];
  correctIndex: number;
}

export interface MatchingQuestion extends BaseQuizQuestion {
  type: 'matching';
  leftColumn: string[];
  rightColumn: string[];
  correctPairs: [number, number][];
}

export interface OrderingQuestion extends BaseQuizQuestion {
  type: 'ordering';
  items: string[];
  correctOrder: number[];
}

export type ExtendedQuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MultipleSelectQuestion
  | CodeAnalysisQuestion
  | MatchingQuestion
  | OrderingQuestion;

// Extended quiz with new question types
export interface ExtendedQuiz {
  version?: string;
  subchapterId?: string;
  lessonId?: string;
  questions: ExtendedQuizQuestion[];
}

// Legacy quiz (for backwards compatibility)
export interface Quiz {
  questions: QuizQuestion[];
}

export interface Lesson {
  title: string;
  content: string;
  order: number;
  folderIndex: number;
  sublessons?: Lesson[];
  hasSublessons: boolean;
  quiz?: Quiz;
  extendedQuiz?: ExtendedQuiz;
}

export interface LibraryCourse {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  author: string;
  authorId: string;
  tags: string[];
  difficulty: Difficulty;
  estimatedHours: number;
  totalLessonCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserCourse {
  id: string;
  userId: string;
  libraryCourseId: string;
  libraryCourse?: LibraryCourse;
  progress: number;
  currentLessonIndex: number;
  completedLessons: number[];
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface LibraryCourseConnection {
  courses: LibraryCourse[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UserCourseConnection {
  courses: UserCourse[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface StartCourseInput {
  libraryCourseId: string;
}

export interface UpdateProgressInput {
  userCourseId: string;
  progress: number;
  currentLessonIndex?: number;
}

export interface LessonInput {
  title: string;
  content: string;
  order: number;
  sublessons?: LessonInput[];
}

export interface CreateLibraryCourseInput {
  title: string;
  description: string;
  lessons: LessonInput[];
  author: string;
  difficulty: Difficulty;
  estimatedHours: number;
  tags?: string[];
}

export interface UpdateLibraryCourseInput {
  title?: string;
  description?: string;
  lessons?: LessonInput[];
  author?: string;
  difficulty?: Difficulty;
  estimatedHours?: number;
  tags?: string[];
}

export interface ImportCoursesInput {
  courses: CreateLibraryCourseInput[];
}

export interface Bookmark {
  id: string;
  userId: string;
  libraryCourseId: string;
  lessonIndex: number;
  note: string | null;
  createdAt: string;
}

export interface Attachment {
  id: string;
  libraryCourseId: string;
  lessonIndex: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  downloadUrl: string;
}

export interface CourseAnalytics {
  libraryCourseId: string;
  totalViews: number;
  uniqueViews: number;
  totalEnrollments: number;
  completionRate: number;
  averageProgress: number;
}
