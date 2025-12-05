import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import { Progress, Badge } from '@repo/playbook';
import type { CourseAnalytics } from '../types/course';
import type { LibraryCourse } from '../types/course';

interface AnalyticsCardProps {
  analytics: CourseAnalytics;
  course?: LibraryCourse;
}

export function AnalyticsCard({ analytics, course }: AnalyticsCardProps) {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(1)}%`;
  };

  const getCompletionRateVariant = (rate: number): 'success' | 'warning' | 'danger' => {
    if (rate >= 70) return 'success';
    if (rate >= 40) return 'warning';
    return 'danger';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">
              {course ? (
                <Link
                  to={`/courses/${analytics.libraryCourseId}`}
                  className="hover:text-primary transition-colors"
                >
                  {course.title}
                </Link>
              ) : (
                <Link
                  to={`/courses/${analytics.libraryCourseId}`}
                  className="hover:text-primary transition-colors"
                >
                  View Course
                </Link>
              )}
            </CardTitle>
            {course && (
              <p className="text-sm text-muted-foreground mt-1">
                {course.description.length > 100
                  ? `${course.description.substring(0, 100)}...`
                  : course.description}
              </p>
            )}
          </div>
          <Badge variant={getCompletionRateVariant(analytics.completionRate)}>
            {formatPercentage(analytics.completionRate)} completion
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatNumber(analytics.totalViews)}
            </div>
            <div className="text-xs text-muted-foreground">Total Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {formatNumber(analytics.uniqueViews)}
            </div>
            <div className="text-xs text-muted-foreground">Unique Views</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-primary">
              {formatNumber(analytics.totalEnrollments)}
            </div>
            <div className="text-xs text-muted-foreground">Total Enrollments</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Progress</span>
            <span className="font-medium">{formatPercentage(analytics.averageProgress)}</span>
          </div>
          <Progress value={analytics.averageProgress} max={100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
