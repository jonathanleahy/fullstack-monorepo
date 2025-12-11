import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import { Link } from 'react-router-dom';
import type { QuizAttempt, MasteryLevel } from '../../services/quizStatsService';

interface RecentAttemptsPanelProps {
  attempts: QuizAttempt[];
  courseTitles?: Record<string, string>;
}

function getMasteryEmoji(level: MasteryLevel): string {
  switch (level) {
    case 'EXPERT':
      return '🏆';
    case 'PROFICIENT':
      return '⭐';
    case 'DEVELOPING':
      return '📈';
    case 'NOVICE':
    default:
      return '🌱';
  }
}

function getMasteryColor(level: MasteryLevel): string {
  switch (level) {
    case 'EXPERT':
      return 'text-green-600 dark:text-green-400';
    case 'PROFICIENT':
      return 'text-blue-600 dark:text-blue-400';
    case 'DEVELOPING':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'NOVICE':
    default:
      return 'text-red-600 dark:text-red-400';
  }
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatQuizType(quizType: string, quizId: string): string {
  if (quizType === 'chapter') return 'Chapter Quiz';
  // Extract lesson/sublesson from quizId like "lesson-00-sub-01"
  const match = quizId.match(/lesson-(\d+)-sub-(\d+)/);
  if (match) {
    return `Section ${parseInt(match[1]) + 1}.${parseInt(match[2]) + 1}`;
  }
  return 'Section Quiz';
}

export function RecentAttemptsPanel({ attempts, courseTitles = {} }: RecentAttemptsPanelProps) {
  if (attempts.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Quiz Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <div className="text-4xl mb-2">📝</div>
            <p>No quiz attempts yet</p>
            <p className="text-sm mt-1">Take a quiz to see your activity here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Quiz Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {attempts.map((attempt) => (
            <Link
              key={attempt.id}
              to={`/courses/${attempt.courseId}`}
              className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
            >
              <span className="text-2xl">{getMasteryEmoji(attempt.masteryLevel)}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {courseTitles[attempt.courseId] || 'Course'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatQuizType(attempt.quizType, attempt.quizId)} • {formatRelativeTime(attempt.completedAt)}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${getMasteryColor(attempt.masteryLevel)}`}>
                  {Math.round(attempt.percentage)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {attempt.correctCount}/{attempt.totalQuestions}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
