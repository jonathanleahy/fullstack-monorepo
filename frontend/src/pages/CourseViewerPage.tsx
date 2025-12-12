import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLibraryCourse } from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import { useAuth } from '../hooks/useAuth';
import type { Difficulty, UserCourse, Lesson, ExtendedQuiz as ExtendedQuizType } from '../types/course';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { BookmarkButton } from '../components/BookmarkButton';
import { LessonProgress } from '../components/LessonProgress';
import { Quiz } from '../components/Quiz';
import { QuizContainer } from '../components/quiz';
import type { Quiz as NewQuizType, QuizQuestion as NewQuizQuestion } from '../components/quiz/types';
import { Progress, Button } from '@repo/playbook';
import { usePreferences } from '../hooks/usePreferences';

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

// Convert ExtendedQuiz from course types to the new Quiz format
function convertToQuizFormat(extendedQuiz: ExtendedQuizType): NewQuizType {
  return {
    version: extendedQuiz.version || '1.0',
    subchapterId: extendedQuiz.subchapterId || '',
    lessonId: extendedQuiz.lessonId || '',
    questions: extendedQuiz.questions.map((q): NewQuizQuestion => {
      const base = {
        id: q.id,
        difficulty: q.difficulty,
        concept: q.concept || '',
        question: q.question,
        explanation: q.explanation || '',
      };

      switch (q.type) {
        case 'multiple_choice':
          return { ...base, type: 'multiple_choice', options: q.options, correctIndex: q.correctIndex };
        case 'true_false':
          return { ...base, type: 'true_false', correctAnswer: q.correctAnswer };
        case 'multiple_select':
          return {
            ...base,
            type: 'multiple_select',
            options: q.options,
            correctIndices: q.correctIndices,
            minSelections: q.minSelections,
            maxSelections: q.maxSelections,
          };
        case 'code_analysis':
          return {
            ...base,
            type: 'code_analysis',
            codeSnippet: q.codeSnippet,
            language: q.language || 'bash',
            options: q.options,
            correctIndex: q.correctIndex,
          };
        case 'matching':
          return {
            ...base,
            type: 'matching',
            leftColumn: q.leftColumn,
            rightColumn: q.rightColumn,
            correctPairs: q.correctPairs,
          };
        case 'ordering':
          return {
            ...base,
            type: 'ordering',
            items: q.items,
            correctOrder: q.correctOrder,
          };
        default:
          // Fallback to multiple choice for any unknown type
          return { ...base, type: 'multiple_choice', options: [], correctIndex: 0 };
      }
    }),
  };
}

interface FlatLesson {
  lesson: Lesson;
  depth: number;
  parentIndex: number | null;
  flatIndex: number;
  path: number[];
  folderPath: number[]; // Path using folderIndex values (for backend save operations)
}

function flattenLessons(lessons: Lesson[]): FlatLesson[] {
  const result: FlatLesson[] = [];

  function traverse(lessonList: Lesson[], depth: number, parentIndex: number | null, pathPrefix: number[], folderPathPrefix: number[]) {
    lessonList.forEach((lesson, idx) => {
      const path = [...pathPrefix, idx];
      const folderPath = [...folderPathPrefix, lesson.folderIndex];
      result.push({
        lesson,
        depth,
        parentIndex,
        flatIndex: result.length,
        path,
        folderPath,
      });
      if (lesson.sublessons && lesson.sublessons.length > 0) {
        traverse(lesson.sublessons, depth + 1, result.length - 1, path, folderPath);
      }
    });
  }

  traverse(lessons, 0, null, [], []);
  return result;
}

interface LessonNavItemProps {
  flatLesson: FlatLesson;
  isSelected: boolean;
  isCompleted: boolean;
  displayNumber: string;
  onSelect: () => void;
  expandedLessons: Set<number>;
  onToggleExpand: (index: number) => void;
  sidebarCollapsed: boolean;
}

function LessonNavItem({
  flatLesson,
  isSelected,
  isCompleted,
  displayNumber,
  onSelect,
  expandedLessons,
  onToggleExpand,
  sidebarCollapsed,
}: LessonNavItemProps) {
  const { lesson, depth, flatIndex } = flatLesson;
  const hasSublessons = lesson.hasSublessons && lesson.sublessons && lesson.sublessons.length > 0;
  const isExpanded = expandedLessons.has(flatIndex);
  const paddingLeft = sidebarCollapsed ? 8 : depth * 12 + 12;

  if (sidebarCollapsed) {
    return (
      <button
        onClick={onSelect}
        className={`w-full p-2 flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-primary text-primary-foreground'
            : isCompleted
            ? 'bg-green-50 text-green-700 hover:bg-green-100'
            : 'hover:bg-gray-100'
        }`}
        title={`${displayNumber}: ${lesson.title}`}
      >
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
          isCompleted && !isSelected ? 'bg-green-100 text-green-600' : ''
        }`}>
          {isCompleted ? '✓' : displayNumber.split('.')[0]}
        </span>
      </button>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`w-full text-left py-2 pr-3 transition-colors cursor-pointer ${
        isSelected
          ? 'bg-primary/10 border-l-3 border-primary text-primary font-medium'
          : isCompleted
          ? 'text-green-700 hover:bg-green-50'
          : 'hover:bg-gray-50'
      }`}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <div className="flex items-center gap-2">
        {hasSublessons && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(flatIndex);
            }}
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg
              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {!hasSublessons && depth > 0 && <span className="w-4" />}
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-200 text-gray-600'
        }`}>
          {isCompleted ? '✓' : displayNumber.split('.').pop()}
        </span>
        <span className={`truncate text-sm ${depth > 0 ? 'text-xs' : ''}`}>
          {lesson.title}
        </span>
      </div>
    </div>
  );
}

export function CourseViewerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { course, isLoading, error, fetchCourse } = useLibraryCourse();

  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [modifiedContent, setModifiedContent] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { preferences } = usePreferences();

  const flatLessons = useMemo(() => {
    return course ? flattenLessons([...course.lessons].sort((a, b) => a.order - b.order)) : [];
  }, [course]);

  const toggleExpand = useCallback((flatIndex: number) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(flatIndex)) {
        next.delete(flatIndex);
      } else {
        next.add(flatIndex);
      }
      return next;
    });
  }, []);

  const isLessonVisible = useCallback((flatLesson: FlatLesson): boolean => {
    if (flatLesson.depth === 0) return true;
    let currentPath = flatLesson.path.slice(0, -1);
    while (currentPath.length > 0) {
      const parentFlat = flatLessons.find(fl =>
        fl.path.length === currentPath.length &&
        fl.path.every((v, i) => v === currentPath[i])
      );
      if (parentFlat && !expandedLessons.has(parentFlat.flatIndex)) {
        return false;
      }
      currentPath = currentPath.slice(0, -1);
    }
    return true;
  }, [flatLessons, expandedLessons]);

  // Auto-expand parent lessons
  useEffect(() => {
    if (flatLessons.length === 0) return;
    const currentFlatLesson = flatLessons[selectedLesson];
    if (!currentFlatLesson || currentFlatLesson.depth === 0) return;

    const parentsToExpand: number[] = [];
    let currentPath = currentFlatLesson.path.slice(0, -1);

    while (currentPath.length > 0) {
      const parentFlat = flatLessons.find(fl =>
        fl.path.length === currentPath.length &&
        fl.path.every((v, i) => v === currentPath[i])
      );
      if (parentFlat) {
        parentsToExpand.push(parentFlat.flatIndex);
      }
      currentPath = currentPath.slice(0, -1);
    }

    if (parentsToExpand.length > 0) {
      setExpandedLessons(prev => {
        const needsUpdate = parentsToExpand.some(idx => !prev.has(idx));
        if (!needsUpdate) return prev;
        const next = new Set(prev);
        parentsToExpand.forEach(idx => next.add(idx));
        return next;
      });
    }
  }, [selectedLesson, flatLessons]);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id, fetchCourse]);

  // Load user enrollment
  useEffect(() => {
    const loadEnrollment = async () => {
      if (!isAuthenticated || !id) return;
      try {
        const enrollment = await courseService.getUserCourseByLibraryCourse(id);
        if (enrollment) {
          setUserCourse(enrollment);
          setSelectedLesson(enrollment.currentLessonIndex);
        }
      } catch {
        // Not enrolled - redirect to course detail page
        navigate(`/courses/${id}`);
      }
    };
    loadEnrollment();
  }, [isAuthenticated, id, navigate]);

  const handleProgressUpdate = useCallback((updated: UserCourse) => {
    setUserCourse(updated);
  }, []);

  const handleSelectLesson = useCallback(async (index: number) => {
    setSelectedLesson(index);
    setShowQuiz(false);

    if (userCourse && course) {
      try {
        const updated = await courseService.setCurrentLesson(course.id, index);
        setUserCourse(updated);
      } catch (err) {
        console.error('Failed to update current lesson:', err);
      }
    }
  }, [userCourse, course]);

  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (!course || flatLessons.length === 0) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'j':
        if (selectedLesson > 0) handleSelectLesson(selectedLesson - 1);
        break;
      case 'ArrowRight':
      case 'k':
        if (selectedLesson < flatLessons.length - 1) handleSelectLesson(selectedLesson + 1);
        break;
      case 'b':
        setSidebarCollapsed(prev => !prev);
        break;
      case 'e':
        if (!hasUnsavedChanges) {
          setEditMode(prev => !prev);
        }
        break;
    }
  }, [course, flatLessons.length, selectedLesson, handleSelectLesson, hasUnsavedChanges]);

  // Handle content changes from edit mode
  const handleContentChange = useCallback((newContent: string) => {
    setModifiedContent(newContent);
    setHasUnsavedChanges(true);
  }, []);

  // Cancel edit mode and discard changes
  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    setHasUnsavedChanges(false);
    setModifiedContent(null);
  }, []);

  // Save changes
  const handleSaveChanges = useCallback(async () => {
    if (!course || !modifiedContent) return;

    const currentFlatLessonForSave = flatLessons[selectedLesson];
    if (!currentFlatLessonForSave) return;

    setIsSaving(true);
    try {
      // Use folderPath (based on folderIndex) for backend save operations
      // This ensures we save to the correct folder regardless of display sort order
      const lessonPath = currentFlatLessonForSave.folderPath;

      await courseService.updateLessonContent(course.id, lessonPath, modifiedContent);

      // Refresh the course to get updated content
      await fetchCourse(course.id);

      setEditMode(false);
      setHasUnsavedChanges(false);
      setModifiedContent(null);
    } catch (err) {
      console.error('Failed to save content:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [course, flatLessons, selectedLesson, modifiedContent, fetchCourse]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
          <Link to="/courses" className="text-primary hover:underline">
            ← Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const currentFlatLesson = flatLessons[selectedLesson];
  const currentLesson = currentFlatLesson?.lesson;
  const isCompleted = userCourse?.completedAt != null;

  const getDisplayNumber = (flatLesson: FlatLesson): string => {
    return flatLesson.path.map(p => p + 1).join('.');
  };

  const completedCount = userCourse?.completedLessons?.length || 0;
  const totalLessons = flatLessons.length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-white border-b flex items-center px-4 gap-4 flex-shrink-0">
        {/* Left: Sidebar toggle + Course title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar (b)' : 'Collapse sidebar (b)'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={() => setShowCourseInfo(!showCourseInfo)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors min-w-0"
          >
            <h1 className="font-semibold truncate">{course.title}</h1>
            <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${showCourseInfo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Center: Progress */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <div className="w-32">
            <Progress value={userCourse?.progress || 0} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {completedCount}/{totalLessons} lessons
          </span>
        </div>

        {/* Right: Navigation + Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => handleSelectLesson(selectedLesson - 1)}
            disabled={selectedLesson === 0}
            className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-md"
            title="Previous lesson (←)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="px-2 text-sm text-muted-foreground">
            {selectedLesson + 1} / {totalLessons}
          </span>
          <button
            onClick={() => handleSelectLesson(selectedLesson + 1)}
            disabled={selectedLesson === flatLessons.length - 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-md"
            title="Next lesson (→)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Layout Edit Mode Toggle / Save-Cancel */}
          {hasUnsavedChanges ? (
            // Show Save/Cancel when there are unsaved changes
            <div className="flex items-center gap-1">
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-3 py-1.5 text-sm bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {isSaving ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            // Show edit toggle when no unsaved changes
            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-2 rounded-md transition-colors ${
                editMode
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
              title={editMode ? 'Exit layout edit mode (e)' : 'Edit diagram layouts (e)'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </button>
          )}

          {isAuthenticated && user?.id === course.authorId && (
            <Link
              to={`/courses/${course.id}/edit`}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Edit course"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
          )}

          <Link
            to={`/courses/${course.id}/info`}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Course overview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>

          <Link
            to="/settings"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Reading preferences"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Course Info Panel (expandable) */}
      {showCourseInfo && (
        <div className="bg-white border-b px-4 py-4 flex-shrink-0">
          <div className="max-w-4xl">
            <p className="text-muted-foreground mb-3">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyColors[course.difficulty]}`}>
                {course.difficulty.toLowerCase()}
              </span>
              <span className="text-muted-foreground">By {course.author}</span>
              <span className="text-muted-foreground">{course.estimatedHours} hours</span>
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {course.tags.slice(0, 5).map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 5 && (
                    <span className="px-2 py-0.5 text-xs text-muted-foreground">
                      +{course.tags.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
            {isCompleted && userCourse?.completedAt && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                ✓ Completed on {new Date(userCourse.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Lesson Navigation */}
        <aside
          className={`bg-white border-r flex-shrink-0 overflow-y-auto transition-all duration-200 ${
            sidebarCollapsed ? 'w-14' : 'w-72'
          }`}
        >
          {!sidebarCollapsed && (
            <div className="p-3 border-b bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Contents</span>
                <span className="text-muted-foreground">{userCourse?.progress || 0}%</span>
              </div>
              <Progress value={userCourse?.progress || 0} className="h-1.5 mt-2" />
            </div>
          )}

          <nav className="divide-y">
            {flatLessons
              .filter(flatLesson => isLessonVisible(flatLesson))
              .map((flatLesson) => (
                <LessonNavItem
                  key={flatLesson.flatIndex}
                  flatLesson={flatLesson}
                  isSelected={flatLesson.flatIndex === selectedLesson}
                  isCompleted={userCourse?.completedLessons?.includes(flatLesson.flatIndex) ?? false}
                  displayNumber={getDisplayNumber(flatLesson)}
                  onSelect={() => handleSelectLesson(flatLesson.flatIndex)}
                  expandedLessons={expandedLessons}
                  onToggleExpand={toggleExpand}
                  sidebarCollapsed={sidebarCollapsed}
                />
              ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {currentLesson && currentFlatLesson && (
            <div className={`mx-auto p-6 lg:p-8 ${
              preferences.font.contentWidth === 'narrow' ? 'max-w-2xl' :
              preferences.font.contentWidth === 'wide' ? 'max-w-6xl' : 'max-w-4xl'
            }`}>
              {/* Lesson Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {currentFlatLesson.depth > 0 ? 'Section' : 'Lesson'} {getDisplayNumber(currentFlatLesson)}
                    </p>
                    <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <LessonProgress
                      lessonIndex={selectedLesson}
                      userCourse={userCourse}
                      libraryCourseId={course.id}
                      onProgressUpdate={handleProgressUpdate}
                    />
                    {isAuthenticated && (
                      <BookmarkButton
                        libraryCourseId={course.id}
                        lessonIndex={selectedLesson}
                        courseTitle={course.title}
                        lessonTitle={currentLesson.title}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Mode Banner */}
              {editMode && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-800">Layout Edit Mode</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          Select a layout for each diagram. Changes will appear as Save/Cancel buttons in the header.
                          {hasUnsavedChanges && <span className="font-medium"> You have unsaved changes.</span>}
                        </p>
                      </div>
                    </div>
                    {!hasUnsavedChanges && (
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-3 py-1.5 text-sm bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition-colors flex items-center gap-1"
                      >
                        <span>Done</span>
                        <kbd className="text-xs opacity-60">(e)</kbd>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Lesson Content */}
              <article className={`prose prose-gray max-w-none prose-p:my-6 prose-h2:mt-20 prose-h2:mb-8 prose-h3:mt-14 prose-h3:mb-6 prose-li:my-2 prose-ul:my-6 prose-ol:my-6 ${
                // Font size
                preferences.font.size === 'small' ? 'prose-sm' :
                preferences.font.size === 'large' ? 'prose-lg' :
                preferences.font.size === 'xlarge' ? 'prose-xl' : 'prose-base'
              } ${
                // Font family
                preferences.font.family === 'serif' ? 'font-serif' :
                preferences.font.family === 'mono' ? 'font-mono' :
                preferences.font.family === 'sans' ? 'font-sans' :
                preferences.font.family === 'dyslexic' ? 'font-dyslexic' : ''
              } ${
                // Line height
                preferences.font.lineHeight === 'compact' ? '[&_p]:leading-snug' :
                preferences.font.lineHeight === 'relaxed' ? '[&_p]:leading-relaxed' : ''
              }`}>
                <MarkdownRenderer content={modifiedContent ?? currentLesson.content} editMode={editMode} onContentChange={handleContentChange} />
              </article>

              {/* Quiz Section - New Extended Quiz System */}
              {currentLesson.extendedQuiz && currentLesson.extendedQuiz.questions.length > 0 && (
                <div className="mt-10 pt-8 border-t">
                  <QuizContainer
                    key={`quiz-${selectedLesson}-${currentLesson.extendedQuiz.subchapterId}`}
                    quiz={convertToQuizFormat(currentLesson.extendedQuiz)}
                    onComplete={(score, _total, percentage) => {
                      console.log(`Quiz completed: ${score} points, ${percentage}%`);
                      // TODO: Save to backend via GraphQL
                    }}
                    onAbandon={() => {
                      // User chose to continue learning
                    }}
                  />
                </div>
              )}

              {/* Legacy Quiz Section */}
              {!currentLesson.extendedQuiz && currentLesson.quiz && currentLesson.quiz.questions.length > 0 && (
                <div className="mt-10 pt-8 border-t">
                  {!showQuiz ? (
                    <div className="bg-primary/5 rounded-lg p-6 text-center">
                      <h3 className="font-semibold mb-2">Knowledge Check</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        Test your understanding with a quick quiz
                      </p>
                      <Button onClick={() => setShowQuiz(true)}>
                        Take Quiz
                      </Button>
                    </div>
                  ) : (
                    <Quiz
                      quiz={currentLesson.quiz}
                      onComplete={(score, total) => {
                        console.log(`Quiz completed: ${score}/${total}`);
                      }}
                      onClose={() => setShowQuiz(false)}
                    />
                  )}
                </div>
              )}

              {/* Continue Learning CTA */}
              {selectedLesson < flatLessons.length - 1 && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => handleSelectLesson(selectedLesson + 1)}
                    className="px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors rounded-md flex items-center gap-2 text-sm font-medium"
                  >
                    <span>Continue: {flatLessons[selectedLesson + 1]?.lesson.title}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <button
                  onClick={() => handleSelectLesson(selectedLesson - 1)}
                  disabled={selectedLesson === 0}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">
                    {selectedLesson > 0 ? flatLessons[selectedLesson - 1]?.lesson.title : 'Previous'}
                  </span>
                  <span className="sm:hidden">Previous</span>
                </button>

                <div className="text-xs text-muted-foreground hidden sm:block">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">←</kbd> / <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">→</kbd> navigate
                </div>

                <button
                  onClick={() => handleSelectLesson(selectedLesson + 1)}
                  disabled={selectedLesson === flatLessons.length - 1}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">
                    {selectedLesson < flatLessons.length - 1 ? flatLessons[selectedLesson + 1]?.lesson.title : 'Next'}
                  </span>
                  <span className="sm:hidden">Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
