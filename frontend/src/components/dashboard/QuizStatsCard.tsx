import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import type { CourseQuizSummary, MasteryLevel } from '../../services/quizStatsService';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

function ProgressRing({
  percentage,
  size = 100,
  strokeWidth = 8,
  color = 'stroke-primary',
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        {label && <span className="text-xl font-bold">{label}</span>}
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  );
}

function getMasteryColor(level: MasteryLevel): string {
  switch (level) {
    case 'EXPERT':
      return 'stroke-green-500';
    case 'PROFICIENT':
      return 'stroke-blue-500';
    case 'DEVELOPING':
      return 'stroke-yellow-500';
    case 'NOVICE':
    default:
      return 'stroke-red-500';
  }
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

function getMasteryLabel(level: MasteryLevel): string {
  switch (level) {
    case 'EXPERT':
      return 'Expert';
    case 'PROFICIENT':
      return 'Proficient';
    case 'DEVELOPING':
      return 'Developing';
    case 'NOVICE':
    default:
      return 'Novice';
  }
}

interface QuizStatsCardProps {
  summary: CourseQuizSummary;
  onClick?: () => void;
}

export function QuizStatsCard({ summary, onClick }: QuizStatsCardProps) {
  const completionPercentage = summary.totalQuizzes > 0
    ? Math.round((summary.completedQuizzes / summary.totalQuizzes) * 100)
    : 0;

  return (
    <Card
      className={`transition-all ${onClick ? 'cursor-pointer hover:shadow-lg hover:border-primary/50' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-2xl">{getMasteryEmoji(summary.overallMastery)}</span>
          <span className="truncate">{summary.courseTitle || 'Course'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          {/* Score Ring */}
          <div className="flex flex-col items-center">
            <ProgressRing
              percentage={summary.averageScore}
              size={80}
              strokeWidth={6}
              color={getMasteryColor(summary.overallMastery)}
              label={`${Math.round(summary.averageScore)}%`}
            />
            <span className="mt-1 text-xs text-muted-foreground">Avg Score</span>
          </div>

          {/* Completion Ring */}
          <div className="flex flex-col items-center">
            <ProgressRing
              percentage={completionPercentage}
              size={80}
              strokeWidth={6}
              color="stroke-primary"
              label={`${summary.completedQuizzes}/${summary.totalQuizzes}`}
            />
            <span className="mt-1 text-xs text-muted-foreground">Completed</span>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                summary.overallMastery === 'EXPERT' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                summary.overallMastery === 'PROFICIENT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                summary.overallMastery === 'DEVELOPING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {getMasteryLabel(summary.overallMastery)}
              </span>
            </div>
            {summary.reviewQueueSize > 0 && (
              <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">{summary.reviewQueueSize} to review</span>
              </div>
            )}
            {summary.weakConcepts.length > 0 && (
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-xs">{summary.weakConcepts.length} weak areas</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OverallStatsCardProps {
  totalQuizzesTaken: number;
  overallAverageScore: number;
  overallMastery: MasteryLevel;
  totalCourses: number;
}

export function OverallStatsCard({
  totalQuizzesTaken,
  overallAverageScore,
  overallMastery,
  totalCourses,
}: OverallStatsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quiz Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-around gap-4">
          {/* Overall Score Ring */}
          <div className="flex flex-col items-center">
            <ProgressRing
              percentage={overallAverageScore}
              size={100}
              strokeWidth={8}
              color={getMasteryColor(overallMastery)}
              label={`${Math.round(overallAverageScore)}%`}
              sublabel="Average"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalQuizzesTaken}</div>
              <div className="text-xs text-muted-foreground">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalCourses}</div>
              <div className="text-xs text-muted-foreground">Courses</div>
            </div>
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{getMasteryEmoji(overallMastery)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  overallMastery === 'EXPERT' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  overallMastery === 'PROFICIENT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  overallMastery === 'DEVELOPING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {getMasteryLabel(overallMastery)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
