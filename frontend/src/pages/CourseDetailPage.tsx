import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLibraryCourse, useCourseActions } from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import { useAuth } from '../hooks/useAuth';
import type { Difficulty, UserCourse } from '../types/course';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { course, isLoading, error, fetchCourse } = useLibraryCourse();
  const { startCourse, updateProgress, isLoading: isActioning } = useCourseActions();

  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [isLoadingUserCourse, setIsLoadingUserCourse] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id, fetchCourse]);

  // Check if user is enrolled when course loads
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!course || !isAuthenticated) return;

      setIsLoadingUserCourse(true);
      try {
        const myCourses = await courseService.getMyCourses();
        const enrolled = myCourses.courses.find(
          (uc) => uc.libraryCourseId === course.id
        );
        if (enrolled) {
          setUserCourse(enrolled);
          setSelectedLesson(enrolled.currentLessonIndex);
        }
      } catch {
        // Not enrolled or error - that's fine
      } finally {
        setIsLoadingUserCourse(false);
      }
    };

    checkEnrollment();
  }, [course, isAuthenticated]);

  const handleEnroll = async () => {
    if (!course) return;

    const result = await startCourse(course.id);
    if (result) {
      setUserCourse(result);
    }
  };

  const handleLessonComplete = async () => {
    if (!userCourse || !course) return;

    const nextLesson = selectedLesson + 1;
    const progress = Math.round(((nextLesson) / course.lessons.length) * 100);

    const result = await updateProgress(
      userCourse.id,
      Math.min(progress, 100),
      Math.min(nextLesson, course.lessons.length - 1)
    );

    if (result) {
      setUserCourse(result);
      if (nextLesson < course.lessons.length) {
        setSelectedLesson(nextLesson);
      }
    }
  };

  const handleSelectLesson = useCallback(async (index: number) => {
    setSelectedLesson(index);

    // Update current lesson index if enrolled
    if (userCourse) {
      const result = await updateProgress(
        userCourse.id,
        userCourse.progress,
        index
      );
      if (result) {
        setUserCourse(result);
      }
    }
  }, [userCourse, updateProgress]);

  // Keyboard navigation
  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (!course) return;

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
        if (selectedLesson < course.lessons.length - 1) {
          handleSelectLesson(selectedLesson + 1);
        }
        break;
    }
  }, [course, selectedLesson, handleSelectLesson]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  if (isLoading || isLoadingUserCourse) {
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

  const currentLesson = course.lessons[selectedLesson];
  const isCompleted = userCourse?.completedAt != null;
  const isLastLesson = selectedLesson === course.lessons.length - 1;

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
              <span>{course.lessons.length} lessons</span>
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

          {/* Progress bar (if enrolled) */}
          {userCourse && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Your Progress</span>
                <span>{userCourse.progress}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                  style={{ width: `${userCourse.progress}%` }}
                />
              </div>
              {isCompleted && (
                <p className="mt-2 text-sm text-green-600">
                  Completed on {new Date(userCourse.completedAt!).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {/* Lesson content */}
          {currentLesson && (
            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Lesson {selectedLesson + 1}: {currentLesson.title}
                </h2>
              </div>
              <div className="prose max-w-none">
                <MarkdownRenderer content={currentLesson.content} />
              </div>

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

                  {!isCompleted && (
                    <button
                      onClick={handleLessonComplete}
                      disabled={isActioning}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isActioning
                        ? 'Saving...'
                        : isLastLesson
                        ? 'Complete Course'
                        : 'Mark Complete & Continue'}
                    </button>
                  )}

                  <button
                    onClick={() => handleSelectLesson(selectedLesson + 1)}
                    disabled={selectedLesson === course.lessons.length - 1}
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
          {!userCourse && (
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Start Learning</h3>
              {isAuthenticated ? (
                <button
                  onClick={handleEnroll}
                  disabled={isActioning}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isActioning ? 'Enrolling...' : 'Enroll Now'}
                </button>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to enroll in this course and track your progress.
                  </p>
                  <button
                    onClick={() => navigate('/login', { state: { from: `/courses/${id}` } })}
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Sign In to Enroll
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Lessons list */}
          <div className="border rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 border-b bg-gray-50">
              Course Content
            </h3>
            <div className="divide-y">
              {course.lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson, index) => {
                  const isCurrentLesson = index === selectedLesson;
                  const isCompletedLesson = userCourse && index < userCourse.currentLessonIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectLesson(index)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        isCurrentLesson ? 'bg-primary/5 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isCompletedLesson
                            ? 'bg-green-100 text-green-600'
                            : isCurrentLesson
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isCompletedLesson ? '✓' : index + 1}
                        </div>
                        <span className={isCurrentLesson ? 'font-medium' : ''}>
                          {lesson.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
