import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLibraryCourse } from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import { analyticsService } from '../services/analyticsService';
import { useAuth } from '../hooks/useAuth';
import type { Difficulty, UserCourse, CourseAnalytics, Lesson } from '../types/course';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { BookmarkButton } from '../components/BookmarkButton';
import { EnrollButton } from '../components/EnrollButton';
import { LessonProgress } from '../components/LessonProgress';
import { Quiz } from '../components/Quiz';
import { Certificate } from '../components/Certificate';
import { Card, CardHeader, CardTitle, CardContent, Badge, Progress, Button } from '@repo/playbook';

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

// Helper to flatten lessons with sublessons into a navigation-friendly structure
interface FlatLesson {
  lesson: Lesson;
  depth: number;
  parentIndex: number | null;
  flatIndex: number;
  path: number[]; // Path to reach this lesson [parentIdx, subIdx, subSubIdx...]
}

function flattenLessons(lessons: Lesson[]): FlatLesson[] {
  const result: FlatLesson[] = [];

  function traverse(lessonList: Lesson[], depth: number, parentIndex: number | null, pathPrefix: number[]) {
    lessonList.forEach((lesson, idx) => {
      const path = [...pathPrefix, idx];
      result.push({
        lesson,
        depth,
        parentIndex,
        flatIndex: result.length,
        path,
      });
      if (lesson.sublessons && lesson.sublessons.length > 0) {
        traverse(lesson.sublessons, depth + 1, result.length - 1, path);
      }
    });
  }

  traverse(lessons, 0, null, []);
  return result;
}

// Component for rendering a single lesson item in the sidebar
interface LessonItemProps {
  flatLesson: FlatLesson;
  isSelected: boolean;
  isCompleted: boolean;
  displayNumber: string;
  onSelect: () => void;
  expandedLessons: Set<number>;
  onToggleExpand: (index: number) => void;
}

function LessonItem({
  flatLesson,
  isSelected,
  isCompleted,
  displayNumber,
  onSelect,
  expandedLessons,
  onToggleExpand,
}: LessonItemProps) {
  const { lesson, depth, flatIndex } = flatLesson;
  const hasSublessons = lesson.hasSublessons && lesson.sublessons && lesson.sublessons.length > 0;
  const isExpanded = expandedLessons.has(flatIndex);
  const paddingLeft = depth * 16 + 16; // 16px base + 16px per depth level

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
      className={`w-full text-left p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
        isSelected ? 'bg-primary/5 border-l-4 border-primary' : ''
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
            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        {!hasSublessons && depth > 0 && <span className="w-5" />}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
          isCompleted
            ? 'bg-green-100 text-green-600'
            : isSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isCompleted ? '✓' : displayNumber}
        </div>
        <span className={`truncate ${isSelected ? 'font-medium' : ''} ${depth > 0 ? 'text-sm' : ''}`}>
          {lesson.title}
        </span>
      </div>
    </div>
  );
}

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { course, isLoading, error, fetchCourse } = useLibraryCourse();

  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);

  // Flatten lessons for navigation - memoize to prevent infinite loops
  const flatLessons = useMemo(() => {
    return course ? flattenLessons([...course.lessons].sort((a, b) => a.order - b.order)) : [];
  }, [course]);

  // Toggle lesson expansion
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

  // Check if a lesson should be visible (all ancestors expanded)
  const isLessonVisible = useCallback((flatLesson: FlatLesson): boolean => {
    if (flatLesson.depth === 0) return true;
    // Check if all parent lessons are expanded
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

  // Auto-expand parent lessons when navigating to a subchapter
  useEffect(() => {
    if (flatLessons.length === 0) return;

    const currentFlatLesson = flatLessons[selectedLesson];
    if (!currentFlatLesson || currentFlatLesson.depth === 0) return;

    // Find all parent lessons and expand them
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
        // Only update if there are new parents to expand
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
      // Record course view
      analyticsService.recordCourseView(id).catch(() => {
        // Silently fail - view tracking is non-critical
      });
    }
  }, [id, fetchCourse]);


  // Load analytics if user is the author
  useEffect(() => {
    const loadAnalytics = async () => {
      if (!course || !user || user.id !== course.authorId) return;

      try {
        const analyticsData = await analyticsService.getCourseAnalytics(course.id);
        setAnalytics(analyticsData);
      } catch {
        // Analytics loading is non-critical
      }
    };

    loadAnalytics();
  }, [course, user]);

  const handleEnrollmentChange = useCallback((enrolled: UserCourse | null) => {
    setUserCourse(enrolled);
    if (enrolled) {
      setSelectedLesson(enrolled.currentLessonIndex);
    }
  }, []);

  const handleProgressUpdate = useCallback((updated: UserCourse) => {
    setUserCourse(updated);
  }, []);

  const handleSelectLesson = useCallback(async (index: number) => {
    setSelectedLesson(index);
    setShowQuiz(false); // Reset quiz when changing lessons

    // Update current lesson index if enrolled
    if (userCourse && course) {
      try {
        const updated = await courseService.setCurrentLesson(course.id, index);
        setUserCourse(updated);
      } catch (err) {
        console.error('Failed to update current lesson:', err);
      }
    }
  }, [userCourse, course]);

  // Keyboard navigation (uses flat index for navigating through all lessons including sublessons)
  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (!course || flatLessons.length === 0) return;

    // Don't handle if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'j':
        if (selectedLesson > 0) {
          handleSelectLesson(selectedLesson - 1);
        }
        break;
      case 'ArrowRight':
      case 'k':
        if (selectedLesson < flatLessons.length - 1) {
          handleSelectLesson(selectedLesson + 1);
        }
        break;
    }
  }, [course, flatLessons.length, selectedLesson, handleSelectLesson]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
        <Link to="/courses" className="text-primary hover:underline">
          &larr; Back to courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground mb-4">Course not found.</p>
        <Link to="/courses" className="text-primary hover:underline">
          &larr; Back to courses
        </Link>
      </div>
    );
  }

  const currentFlatLesson = flatLessons[selectedLesson];
  const currentLesson = currentFlatLesson?.lesson;
  const isCompleted = userCourse?.completedAt != null;

  // Generate display number for a lesson (e.g., "1", "1.1", "1.1.2")
  const getDisplayNumber = (flatLesson: FlatLesson): string => {
    return flatLesson.path.map(p => p + 1).join('.');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link to="/courses" className="text-muted-foreground hover:text-foreground">
          Courses
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-foreground">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Course header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm rounded-full ${difficultyColors[course.difficulty]}`}>
                  {course.difficulty.toLowerCase()}
                </span>
                {isAuthenticated && user?.id === course.authorId && (
                  <Link
                    to={`/courses/${course.id}/edit`}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {course.author}</span>
              <span>&bull;</span>
              <span>{course.estimatedHours} hours</span>
              <span>&bull;</span>
              <span>{course.totalLessonCount || flatLessons.length} lessons</span>
            </div>
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {course.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-muted rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Analytics Summary (if author) */}
          {analytics && user?.id === course.authorId && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Course Analytics</CardTitle>
                  <Link
                    to="/analytics"
                    className="text-sm text-primary hover:underline"
                  >
                    View Full Analytics
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {analytics.totalViews.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {analytics.uniqueViews.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Unique Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {analytics.totalEnrollments.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Enrollments</div>
                  </div>
                  <div>
                    <Badge variant={
                      analytics.completionRate >= 70 ? 'success' :
                      analytics.completionRate >= 40 ? 'warning' : 'danger'
                    }>
                      {analytics.completionRate.toFixed(1)}% completion
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress bar (if enrolled) */}
          {userCourse && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Your Progress</span>
                <span>{userCourse.progress}%</span>
              </div>
              <Progress value={userCourse.progress} className="h-3" />
              {isCompleted && userCourse.completedAt && (
                <p className="mt-2 text-sm text-green-600">
                  Completed on {new Date(userCourse.completedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {/* Certificate (if completed) */}
          {isCompleted && userCourse && user && (
            <div className="mb-6">
              <Certificate
                userCourse={userCourse}
                userName={user.name || user.email}
              />
            </div>
          )}

          {/* Lesson content */}
          {currentLesson && currentFlatLesson && (
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {currentFlatLesson.depth > 0 ? 'Section' : 'Lesson'} {getDisplayNumber(currentFlatLesson)}: {currentLesson.title}
                </h2>
                <div className="flex items-center gap-3">
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
              <div className="prose max-w-none">
                <MarkdownRenderer content={currentLesson.content} />
              </div>

              {/* Quiz section */}
              {currentLesson.quiz && currentLesson.quiz.questions.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  {!showQuiz ? (
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">
                        Test your understanding with a quick quiz!
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

              <div className="mt-4 text-xs text-muted-foreground text-center">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">←</kbd> or <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">j</kbd> Previous lesson &nbsp;|&nbsp;
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">→</kbd> or <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">k</kbd> Next lesson
              </div>

              {/* Lesson navigation */}
              {userCourse && (
                <div className="mt-8 flex items-center justify-between pt-6 border-t">
                  <button
                    onClick={() => handleSelectLesson(selectedLesson - 1)}
                    disabled={selectedLesson === 0}
                    className="px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => handleSelectLesson(selectedLesson + 1)}
                    disabled={selectedLesson === flatLessons.length - 1}
                    className="px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Enrollment card */}
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {userCourse ? 'Your Progress' : 'Start Learning'}
            </h3>
            <EnrollButton
              course={course}
              onEnrollmentChange={handleEnrollmentChange}
            />
          </div>

          {/* Lessons list */}
          <div className="border rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 border-b bg-gray-50">
              Course Content
            </h3>
            <div className="divide-y">
              {flatLessons
                .filter(flatLesson => isLessonVisible(flatLesson))
                .map((flatLesson) => {
                  const isCurrentLesson = flatLesson.flatIndex === selectedLesson;
                  const isCompletedLesson = userCourse?.completedLessons?.includes(flatLesson.flatIndex) ?? false;

                  return (
                    <LessonItem
                      key={flatLesson.flatIndex}
                      flatLesson={flatLesson}
                      isSelected={isCurrentLesson}
                      isCompleted={isCompletedLesson}
                      displayNumber={getDisplayNumber(flatLesson)}
                      onSelect={() => handleSelectLesson(flatLesson.flatIndex)}
                      expandedLessons={expandedLessons}
                      onToggleExpand={toggleExpand}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
