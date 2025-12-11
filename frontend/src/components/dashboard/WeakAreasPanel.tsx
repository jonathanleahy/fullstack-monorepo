import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@repo/playbook';
import { Link } from 'react-router-dom';
import type { CourseQuizSummary } from '../../services/quizStatsService';

interface WeakAreasPanelProps {
  courseSummaries: CourseQuizSummary[];
}

interface WeakArea {
  concept: string;
  courseId: string;
  courseTitle: string;
}

export function WeakAreasPanel({ courseSummaries }: WeakAreasPanelProps) {
  // Collect all weak concepts across courses
  const weakAreas: WeakArea[] = [];
  const strongAreas: { concept: string; courseTitle: string }[] = [];

  courseSummaries.forEach((summary) => {
    summary.weakConcepts.forEach((concept) => {
      weakAreas.push({
        concept,
        courseId: summary.courseId,
        courseTitle: summary.courseTitle || 'Unknown Course',
      });
    });
    summary.strongConcepts.forEach((concept) => {
      strongAreas.push({
        concept,
        courseTitle: summary.courseTitle || 'Unknown Course',
      });
    });
  });

  // Get courses with review items
  const reviewCourses = courseSummaries.filter((s) => s.reviewQueueSize > 0);
  const totalReviewItems = reviewCourses.reduce((sum, s) => sum + s.reviewQueueSize, 0);

  if (weakAreas.length === 0 && totalReviewItems === 0 && strongAreas.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <span>Study Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <div className="text-4xl mb-2">🎉</div>
            <p>No weak areas identified yet!</p>
            <p className="text-sm mt-1">Keep taking quizzes to track your progress.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>Study Recommendations</span>
          {totalReviewItems > 0 && (
            <Badge variant="destructive" className="ml-2">
              {totalReviewItems} to review
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weak Areas Section */}
        {weakAreas.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-1 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Areas to Improve ({weakAreas.length})
            </h4>
            <div className="space-y-2">
              {weakAreas.slice(0, 5).map((area, i) => (
                <div
                  key={`${area.courseId}-${area.concept}-${i}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 truncate">
                      {area.concept}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 truncate">
                      {area.courseTitle}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-100">
                    <Link to={`/courses/${area.courseId}`}>
                      Study
                    </Link>
                  </Button>
                </div>
              ))}
              {weakAreas.length > 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{weakAreas.length - 5} more areas
                </p>
              )}
            </div>
          </div>
        )}

        {/* Review Queue Section */}
        {totalReviewItems > 0 && (
          <div>
            <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-1 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Review Queue ({totalReviewItems})
            </h4>
            <div className="space-y-2">
              {reviewCourses.slice(0, 3).map((course) => (
                <div
                  key={course.courseId}
                  className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200 truncate">
                      {course.courseTitle || 'Course'}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      {course.reviewQueueSize} questions ready for review
                    </p>
                  </div>
                  <Button asChild size="sm" variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-100">
                    <Link to={`/courses/${course.courseId}`}>
                      Review
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strong Areas Section */}
        {strongAreas.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Strong Areas ({strongAreas.length})
            </h4>
            <div className="flex flex-wrap gap-1">
              {strongAreas.slice(0, 8).map((area, i) => (
                <Badge
                  key={`strong-${area.concept}-${i}`}
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  {area.concept}
                </Badge>
              ))}
              {strongAreas.length > 8 && (
                <Badge variant="outline">+{strongAreas.length - 8}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Study Tips */}
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Study Tips
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {weakAreas.length > 0 && (
              <li className="flex items-start gap-1">
                <span className="text-red-500">•</span>
                Focus on weak areas before moving to new content
              </li>
            )}
            {totalReviewItems > 0 && (
              <li className="flex items-start gap-1">
                <span className="text-orange-500">•</span>
                Complete your review queue for better retention
              </li>
            )}
            <li className="flex items-start gap-1">
              <span className="text-blue-500">•</span>
              Retake quizzes to improve your mastery level
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
