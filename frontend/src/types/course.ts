export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Lesson {
  title: string;
  content: string;
  order: number;
  sublessons?: Lesson[];
  hasSublessons: boolean;
  quiz?: Quiz;
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
