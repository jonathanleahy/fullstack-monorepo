export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Lesson {
  title: string;
  content: string;
  order: number;
}

export interface LibraryCourse {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  author: string;
  difficulty: Difficulty;
  estimatedHours: number;
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
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
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
}

export interface CreateLibraryCourseInput {
  title: string;
  description: string;
  lessons: LessonInput[];
  author: string;
  difficulty: Difficulty;
  estimatedHours: number;
}

export interface UpdateLibraryCourseInput {
  title?: string;
  description?: string;
  lessons?: LessonInput[];
  author?: string;
  difficulty?: Difficulty;
  estimatedHours?: number;
}
