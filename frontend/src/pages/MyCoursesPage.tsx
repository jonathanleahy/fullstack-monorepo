import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyCourses, useCourseActions } from '../hooks/useCourses';
import type { Difficulty } from '../types/course';

type TabType = 'all' | 'in-progress' | 'completed';

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

export function MyCoursesPage() {
  const { courses, total, isLoading, error, fetchMyCourses, fetchInProgress, fetchCompleted } = useMyCourses();
  const { dropCourse, isLoading: isDropping } = useCourseActions();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [droppingId, setDroppingId] = useState<string | null>(null);

  useEffect(() => {
    switch (activeTab) {
      case 'in-progress':
        fetchInProgress();
        break;
      case 'completed':
        fetchCompleted();
        break;
      default:
        fetchMyCourses();
    }
  }, [activeTab, fetchMyCourses, fetchInProgress, fetchCompleted]);

  const handleDrop = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to drop this course? Your progress will be lost.')) {
      return;
    }

    setDroppingId(id);
    const success = await dropCourse(id);
    setDroppingId(null);

    if (success) {
      // Refresh the list
      switch (activeTab) {
        case 'in-progress':
          fetchInProgress();
          break;
        case 'completed':
          fetchCompleted();
          break;
        default:
          fetchMyCourses();
      }
    }
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: 'all', label: 'All Courses' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading your courses...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Results count */}
      {!isLoading && !error && (
        <p className="text-sm text-muted-foreground mb-4">
          {total} course{total !== 1 ? 's' : ''}
        </p>
      )}

      {/* Course list */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {courses.map((userCourse) => {
            const course = userCourse.libraryCourse;
            if (!course) return null;

            return (
              <Link
                key={userCourse.id}
                to={`/courses/${course.id}`}
                className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold">{course.title}</h2>
                      <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[course.difficulty]}`}>
                        {course.difficulty.toLowerCase()}
                      </span>
                      {userCourse.completedAt && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-1">
                      {course.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{userCourse.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${userCourse.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Lesson {userCourse.currentLessonIndex + 1} of {course.lessons.length}
                      </span>
                      <span>Started {new Date(userCourse.startedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDrop(userCourse.id, e)}
                    disabled={isDropping && droppingId === userCourse.id}
                    className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                  >
                    {isDropping && droppingId === userCourse.id ? 'Dropping...' : 'Drop'}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {activeTab === 'completed'
              ? "You haven't completed any courses yet."
              : activeTab === 'in-progress'
              ? "You don't have any courses in progress."
              : "You haven't enrolled in any courses yet."}
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}
