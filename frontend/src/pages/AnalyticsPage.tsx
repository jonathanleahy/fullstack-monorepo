import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { analyticsService } from '../services/analyticsService';
import { courseService } from '../services/courseService';
import type { CourseAnalytics, LibraryCourse } from '../types/course';

export function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<CourseAnalytics[]>([]);
  const [courses, setCourses] = useState<LibraryCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [analyticsData, coursesData] = await Promise.all([
          analyticsService.getMyAuthoredCoursesAnalytics(),
          courseService.getMyAuthoredCourses(),
        ]);

        setAnalytics(analyticsData);
        setCourses(coursesData.courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
        <Link to="/dashboard" className="text-primary hover:underline">
          &larr; Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">Analytics</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Track performance and engagement for your authored courses
            </p>
          </div>
          <Link
            to="/courses/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Create New Course
          </Link>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard analytics={analytics} courses={courses} />
    </div>
  );
}
