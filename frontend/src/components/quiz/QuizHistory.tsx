import { useMemo } from 'react';
import { getMasteryLevel, getMasteryEmoji, getMasteryColor } from './types';

interface QuizAttempt {
  id: string;
  quizId: string;
  quizType: 'subchapter' | 'chapter';
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

interface QuizHistoryProps {
  attempts: QuizAttempt[];
  showChart?: boolean;
  showList?: boolean;
  maxListItems?: number;
}

export function QuizHistory({
  attempts,
  showChart = true,
  showList = true,
  maxListItems = 10,
}: QuizHistoryProps) {
  const sortedAttempts = useMemo(
    () =>
      [...attempts].sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      ),
    [attempts]
  );

  const chartData = useMemo(() => {
    // Get last 10 attempts for chart (oldest to newest for left-to-right display)
    return sortedAttempts.slice(0, 10).reverse();
  }, [sortedAttempts]);

  const stats = useMemo(() => {
    if (attempts.length === 0) return null;

    const percentages = attempts.map((a) => a.percentage);
    const best = Math.max(...percentages);
    const latest = sortedAttempts[0]?.percentage ?? 0;
    const average = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);

    return { best, latest, average, total: attempts.length };
  }, [attempts, sortedAttempts]);

  if (attempts.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <svg
            className="w-12 h-12 mx-auto mb-3 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p>No quiz attempts yet</p>
          <p className="text-sm mt-1">Complete a quiz to see your history here</p>
        </div>
      </div>
    );
  }

  const maxBarHeight = 120;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Stats summary */}
      {stats && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Attempts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.best}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Best Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {stats.average}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Average</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                {stats.latest}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Latest</div>
            </div>
          </div>
        </div>
      )}

      {/* Chart visualization */}
      {showChart && chartData.length > 0 && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
            Score History
          </h3>
          <div className="flex items-end justify-center gap-2" style={{ height: maxBarHeight + 30 }}>
            {chartData.map((attempt, index) => {
              const mastery = getMasteryLevel(attempt.percentage);
              const barHeight = (attempt.percentage / 100) * maxBarHeight;

              return (
                <div key={attempt.id} className="flex flex-col items-center">
                  {/* Score label */}
                  <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {attempt.percentage}%
                  </span>
                  {/* Bar */}
                  <div
                    className={`w-8 rounded-t-md transition-all ${
                      mastery === 'expert'
                        ? 'bg-green-500'
                        : mastery === 'proficient'
                        ? 'bg-blue-500'
                        : mastery === 'developing'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ height: barHeight }}
                    title={`${attempt.percentage}% - ${new Date(attempt.completedAt).toLocaleDateString()}`}
                  />
                  {/* Attempt number */}
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span>Expert (86%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span>Proficient (71-85%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-500" />
              <span>Developing (41-70%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span>Novice (0-40%)</span>
            </div>
          </div>
        </div>
      )}

      {/* List of attempts */}
      {showList && (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {sortedAttempts.slice(0, maxListItems).map((attempt, index) => {
            const mastery = getMasteryLevel(attempt.percentage);
            const date = new Date(attempt.completedAt);

            return (
              <div
                key={attempt.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  {/* Mastery emoji */}
                  <span className="text-2xl">{getMasteryEmoji(mastery)}</span>

                  {/* Attempt info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getMasteryColor(mastery)}`}>
                        {attempt.percentage}%
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        ({attempt.score}/{attempt.totalQuestions} correct)
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          Latest
                        </span>
                      )}
                      {attempt.percentage === stats?.best && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                          Best
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Quiz type badge */}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    attempt.quizType === 'chapter'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {attempt.quizType === 'chapter' ? 'Chapter Quiz' : 'Subchapter Quiz'}
                </span>
              </div>
            );
          })}

          {sortedAttempts.length > maxListItems && (
            <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Showing {maxListItems} of {sortedAttempts.length} attempts
            </div>
          )}
        </div>
      )}
    </div>
  );
}
