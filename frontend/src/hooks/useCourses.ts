import { useState, useCallback } from 'react';
import { courseService } from '../services/courseService';
import type {
  LibraryCourse,
  LibraryCourseConnection,
  UserCourse,
  UserCourseConnection,
  Difficulty,
  PaginationInput,
} from '../types/course';

interface UseLibraryCoursesResult {
  courses: LibraryCourse[];
  total: number;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  fetchCourses: (pagination?: PaginationInput, difficulty?: Difficulty) => Promise<void>;
  searchCourses: (query: string, pagination?: PaginationInput) => Promise<void>;
}

export function useLibraryCourses(): UseLibraryCoursesResult {
  const [data, setData] = useState<LibraryCourseConnection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async (pagination?: PaginationInput, difficulty?: Difficulty) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.getLibraryCourses(pagination, difficulty);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchCourses = useCallback(async (query: string, pagination?: PaginationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.searchLibraryCourses(query, pagination);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    courses: data?.courses ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    hasMore: data?.hasMore ?? false,
    isLoading,
    error,
    fetchCourses,
    searchCourses,
  };
}

interface UseLibraryCourseResult {
  course: LibraryCourse | null;
  isLoading: boolean;
  error: string | null;
  fetchCourse: (id: string) => Promise<void>;
}

export function useLibraryCourse(): UseLibraryCourseResult {
  const [course, setCourse] = useState<LibraryCourse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.getLibraryCourse(id);
      setCourse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { course, isLoading, error, fetchCourse };
}

interface UseMyCoursesResult {
  courses: UserCourse[];
  total: number;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  fetchMyCourses: (pagination?: PaginationInput) => Promise<void>;
  fetchInProgress: (pagination?: PaginationInput) => Promise<void>;
  fetchCompleted: (pagination?: PaginationInput) => Promise<void>;
}

export function useMyCourses(): UseMyCoursesResult {
  const [data, setData] = useState<UserCourseConnection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyCourses = useCallback(async (pagination?: PaginationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.getMyCourses(pagination);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchInProgress = useCallback(async (pagination?: PaginationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.getMyInProgressCourses(pagination);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCompleted = useCallback(async (pagination?: PaginationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.getMyCompletedCourses(pagination);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    courses: data?.courses ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    hasMore: data?.hasMore ?? false,
    isLoading,
    error,
    fetchMyCourses,
    fetchInProgress,
    fetchCompleted,
  };
}

interface UseCourseActionsResult {
  isLoading: boolean;
  error: string | null;
  startCourse: (libraryCourseId: string) => Promise<UserCourse | null>;
  updateProgress: (userCourseId: string, progress: number, currentLessonIndex?: number) => Promise<UserCourse | null>;
  dropCourse: (id: string) => Promise<boolean>;
}

export function useCourseActions(): UseCourseActionsResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCourse = useCallback(async (libraryCourseId: string): Promise<UserCourse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.startCourse({ libraryCourseId });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start course');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (
    userCourseId: string,
    progress: number,
    currentLessonIndex?: number
  ): Promise<UserCourse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await courseService.updateProgress({
        userCourseId,
        progress,
        currentLessonIndex,
      });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dropCourse = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      return await courseService.dropCourse(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to drop course');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, startCourse, updateProgress, dropCourse };
}
