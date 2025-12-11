import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import type { ScoreDataPoint } from '../../services/quizStatsService';

interface ScoreTrendChartProps {
  data: ScoreDataPoint[];
  title?: string;
  height?: number;
}

export function ScoreTrendChart({ data, title = 'Score Trend', height = 200 }: ScoreTrendChartProps) {
  const chartData = useMemo(() => {
    if (data.length === 0) return null;

    // Group by date and calculate average
    const byDate = data.reduce((acc, point) => {
      if (!acc[point.date]) {
        acc[point.date] = { scores: [], courses: new Set<string>() };
      }
      acc[point.date].scores.push(point.score);
      acc[point.date].courses.add(point.courseId);
      return acc;
    }, {} as Record<string, { scores: number[]; courses: Set<string> }>);

    const points = Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, { scores }]) => ({
        date,
        score: scores.reduce((a, b) => a + b, 0) / scores.length,
      }));

    // Take last 30 days max
    const recentPoints = points.slice(-30);

    if (recentPoints.length === 0) return null;

    const minScore = Math.min(...recentPoints.map((p) => p.score));
    const maxScore = Math.max(...recentPoints.map((p) => p.score));

    // Normalize to 0-100 for display, with some padding
    const paddedMin = Math.max(0, minScore - 10);
    const paddedMax = Math.min(100, maxScore + 10);
    const paddedRange = paddedMax - paddedMin || 1;

    return {
      points: recentPoints,
      minScore: paddedMin,
      maxScore: paddedMax,
      range: paddedRange,
    };
  }, [data]);

  if (!chartData || chartData.points.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            No quiz data yet. Take some quizzes to see your progress!
          </div>
        </CardContent>
      </Card>
    );
  }

  const { points, minScore, maxScore, range } = chartData;
  const width = 100;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xStep = points.length > 1 ? chartWidth / (points.length - 1) : chartWidth;

  // Create path for the line
  const linePath = points
    .map((point, i) => {
      const x = padding.left + (points.length > 1 ? i * xStep : chartWidth / 2);
      const y = padding.top + chartHeight - ((point.score - minScore) / range) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Create path for the area fill
  const areaPath = `${linePath} L ${padding.left + (points.length > 1 ? (points.length - 1) * xStep : chartWidth / 2)} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

  // Y-axis labels
  const yLabels = [minScore, (minScore + maxScore) / 2, maxScore].map((val) => Math.round(val));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ height: `${height}px` }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {yLabels.map((label, i) => {
            const y = padding.top + chartHeight - ((label - minScore) / range) * chartHeight;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
                <text
                  x={padding.left - 5}
                  y={y + 1}
                  className="fill-slate-500 dark:fill-slate-400"
                  fontSize="3"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {label}%
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path
            d={areaPath}
            className="fill-primary/10"
          />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            className="stroke-primary"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => {
            const x = padding.left + (points.length > 1 ? i * xStep : chartWidth / 2);
            const y = padding.top + chartHeight - ((point.score - minScore) / range) * chartHeight;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="1.5"
                  className="fill-primary"
                />
                {/* Tooltip area */}
                <title>{`${point.date}: ${Math.round(point.score)}%`}</title>
              </g>
            );
          })}

          {/* X-axis labels (show first, middle, last) */}
          {points.length > 0 && (
            <>
              <text
                x={padding.left}
                y={height - 5}
                className="fill-slate-500 dark:fill-slate-400"
                fontSize="2.5"
                textAnchor="start"
              >
                {formatDate(points[0].date)}
              </text>
              {points.length > 2 && (
                <text
                  x={padding.left + chartWidth / 2}
                  y={height - 5}
                  className="fill-slate-500 dark:fill-slate-400"
                  fontSize="2.5"
                  textAnchor="middle"
                >
                  {formatDate(points[Math.floor(points.length / 2)].date)}
                </text>
              )}
              {points.length > 1 && (
                <text
                  x={width - padding.right}
                  y={height - 5}
                  className="fill-slate-500 dark:fill-slate-400"
                  fontSize="2.5"
                  textAnchor="end"
                >
                  {formatDate(points[points.length - 1].date)}
                </text>
              )}
            </>
          )}
        </svg>

        {/* Legend showing last score */}
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {points.length} data point{points.length !== 1 ? 's' : ''}
          </span>
          <span className="font-medium text-foreground">
            Latest: {Math.round(points[points.length - 1].score)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
