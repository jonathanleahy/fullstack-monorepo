import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { courseService } from '../services/courseService';
import type { UserCourse, LibraryCourse } from '../types/course';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Progress,
  Badge,
} from '@repo/playbook';

export function DashboardPage() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<UserCourse[]>([]);
  const [authoredCourses, setAuthoredCourses] = useState<LibraryCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrolled, authored] = await Promise.all([
          courseService.getMyCourses({ limit: 5 }),
          courseService.getMyAuthoredCourses({ limit: 5 }),
        ]);
        setEnrolledCourses(enrolled.courses);
        setAuthoredCourses(authored.courses);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const completedCount = enrolledCourses.filter(c => c.completedAt).length;
  const inProgressCount = enrolledCourses.filter(c => !c.completedAt && c.progress > 0).length;
  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
    : 0;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Learner'}!</h1>
        <p className="text-muted-foreground">Here's your learning overview</p>
      </div>

      {error && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="pt-6 text-red-600">{error}</CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enrolled Courses</CardDescription>
            <CardTitle className="text-3xl">{enrolledCourses.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-green-600">{completedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{inProgressCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Progress</CardDescription>
            <CardTitle className="text-3xl">{totalProgress}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Enrolled Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Courses</h2>
            <Link to="/my-courses">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.map((uc) => (
                <Link key={uc.id} to={`/courses/${uc.libraryCourseId}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium truncate">{uc.libraryCourse?.title}</h3>
                        {uc.completedAt ? (
                          <Badge variant="success">Completed</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">{uc.progress}%</span>
                        )}
                      </div>
                      <Progress value={uc.progress} className="h-2" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Authored Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Courses You Created</h2>
            <Link to="/courses/new">
              <Button variant="ghost" size="sm">Create new</Button>
            </Link>
          </div>

          {authoredCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">You haven't created any courses yet.</p>
                <Button asChild>
                  <Link to="/courses/new">Create Course</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {authoredCourses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.lessons.length} lessons • {course.estimatedHours}h
                          </p>
                        </div>
                        <Link to={`/courses/${course.id}/edit`} onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                      </div>
                      {course.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {course.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/courses/new">Create Course</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/courses/import">Import Courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
