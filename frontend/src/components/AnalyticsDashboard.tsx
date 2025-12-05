import { useState, useMemo } from 'react';
import { AnalyticsCard } from './AnalyticsCard';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import type { CourseAnalytics, LibraryCourse } from '../types/course';

interface AnalyticsDashboardProps {
  analytics: CourseAnalytics[];
  courses: LibraryCourse[];
}

type SortBy = 'views' | 'enrollments' | 'completion' | 'progress';

export function AnalyticsDashboard({ analytics, courses }: AnalyticsDashboardProps) {
  const [sortBy, setSortBy] = useState<SortBy>('views');

  // Create a map for quick course lookup
  const coursesMap = useMemo(() => {
    const map = new Map<string, LibraryCourse>();
    courses.forEach(course => map.set(course.id, course));
    return map;
  }, [courses]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    return analytics.reduce(
      (acc, item) => ({
        totalViews: acc.totalViews + item.totalViews,
        totalEnrollments: acc.totalEnrollments + item.totalEnrollments,
        avgCompletionRate: acc.avgCompletionRate + item.completionRate,
        avgProgress: acc.avgProgress + item.averageProgress,
      }),
      { totalViews: 0, totalEnrollments: 0, avgCompletionRate: 0, avgProgress: 0 }
    );
  }, [analytics]);

  const coursesCount = analytics.length;
  const averageCompletionRate = coursesCount > 0 ? summaryStats.avgCompletionRate / coursesCount : 0;
  const averageProgress = coursesCount > 0 ? summaryStats.avgProgress / coursesCount : 0;

  // Sort analytics
  const sortedAnalytics = useMemo(() => {
    const sorted = [...analytics];
    switch (sortBy) {
      case 'views':
        return sorted.sort((a, b) => b.totalViews - a.totalViews);
      case 'enrollments':
        return sorted.sort((a, b) => b.totalEnrollments - a.totalEnrollments);
      case 'completion':
        return sorted.sort((a, b) => b.completionRate - a.completionRate);
      case 'progress':
        return sorted.sort((a, b) => b.averageProgress - a.averageProgress);
      default:
        return sorted;
    }
  }, [analytics, sortBy]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(1)}%`;
  };

  if (analytics.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">No Analytics Yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't authored any courses yet. Create your first course to start tracking analytics!
          </p>
          <a
            href="/courses/new"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Create Your First Course
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatNumber(summaryStats.totalViews)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {coursesCount} {coursesCount === 1 ? 'course' : 'courses'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatNumber(summaryStats.totalEnrollments)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Students learning
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatPercentage(averageCompletionRate)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Course completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatPercentage(averageProgress)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Student progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSortBy('views')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'views'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Views
          </button>
          <button
            onClick={() => setSortBy('enrollments')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'enrollments'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Enrollments
          </button>
          <button
            onClick={() => setSortBy('completion')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'completion'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Completion Rate
          </button>
          <button
            onClick={() => setSortBy('progress')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'progress'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Avg Progress
          </button>
        </div>
      </div>

      {/* Course Analytics List */}
      <div className="space-y-4">
        {sortedAnalytics.map((item) => (
          <AnalyticsCard
            key={item.libraryCourseId}
            analytics={item}
            course={coursesMap.get(item.libraryCourseId)}
          />
        ))}
      </div>
    </div>
  );
}
