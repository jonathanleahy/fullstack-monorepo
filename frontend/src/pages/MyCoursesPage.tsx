import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyCourses, useCourseActions } from '../hooks/useCourses';
import type { Difficulty } from '../types/course';
import { ProgressChart } from '../components/ProgressChart';
import {
  Button,
  Badge,
  Progress,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@repo/playbook';

type TabType = 'all' | 'in-progress' | 'completed' | 'stats';

const difficultyVariant: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  BEGINNER: 'success',
  INTERMEDIATE: 'warning',
  ADVANCED: 'danger',
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
      case 'stats':
        fetchMyCourses(); // Need all courses for stats
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

  const renderCourseList = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading your courses...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6 text-red-600">
            {error}
          </CardContent>
        </Card>
      );
    }

    if (courses.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {activeTab === 'completed'
              ? "You haven't completed any courses yet."
              : activeTab === 'in-progress'
              ? "You don't have any courses in progress."
              : "You haven't enrolled in any courses yet."}
          </p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      );
    }

    return (
      <>
        <p className="text-sm text-muted-foreground mb-4">
          {total} course{total !== 1 ? 's' : ''}
        </p>
        <div className="space-y-4">
          {courses.map((userCourse) => {
            const course = userCourse.libraryCourse;
            if (!course) return null;

            return (
              <Link key={userCourse.id} to={`/courses/${course.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <Badge variant={difficultyVariant[course.difficulty]}>
                            {course.difficulty.toLowerCase()}
                          </Badge>
                          {userCourse.completedAt && (
                            <Badge variant="success">Completed</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground line-clamp-1">
                          {course.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDrop(userCourse.id, e)}
                        disabled={isDropping && droppingId === userCourse.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {isDropping && droppingId === userCourse.id ? 'Dropping...' : 'Drop'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{userCourse.progress}%</span>
                      </div>
                      <Progress value={userCourse.progress} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Lesson {userCourse.currentLessonIndex + 1} of {course.lessons.length}
                      </span>
                      <span>Started {new Date(userCourse.startedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderCourseList()}
        </TabsContent>

        <TabsContent value="in-progress">
          {renderCourseList()}
        </TabsContent>

        <TabsContent value="completed">
          {renderCourseList()}
        </TabsContent>

        <TabsContent value="stats">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading statistics...</p>
            </div>
          ) : (
            <ProgressChart courses={courses} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
