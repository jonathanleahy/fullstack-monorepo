import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/playbook';
import type { UserCourse } from '../types/course';

interface ProgressChartProps {
  courses: UserCourse[];
}

const COLORS = {
  completed: '#22c55e',
  inProgress: '#3b82f6',
  notStarted: '#e5e7eb'
};

export function ProgressChart({ courses }: ProgressChartProps) {
  // Calculate overall statistics
  const completedCount = courses.filter(c => c.completedAt).length;
  const inProgressCount = courses.filter(c => !c.completedAt && c.progress > 0).length;
  const notStartedCount = courses.filter(c => !c.completedAt && c.progress === 0).length;

  const pieData = [
    { name: 'Completed', value: completedCount, color: COLORS.completed },
    { name: 'In Progress', value: inProgressCount, color: COLORS.inProgress },
    { name: 'Not Started', value: notStartedCount, color: COLORS.notStarted }
  ].filter(d => d.value > 0);

  // Prepare bar chart data for individual course progress
  const barData = courses
    .filter(c => c.libraryCourse)
    .slice(0, 8)
    .map(c => ({
      name: c.libraryCourse!.title.length > 20
        ? c.libraryCourse!.title.slice(0, 20) + '...'
        : c.libraryCourse!.title,
      progress: c.progress,
      completed: c.completedAt ? 100 : c.progress
    }));

  // Calculate average progress
  const averageProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
    : 0;

  // Calculate total hours completed (estimated)
  const totalHoursCompleted = courses
    .filter(c => c.completedAt && c.libraryCourse)
    .reduce((sum, c) => sum + (c.libraryCourse?.estimatedHours || 0), 0);

  if (courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No courses enrolled yet. Start learning to see your progress!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{averageProgress}%</div>
            <div className="text-sm text-muted-foreground">Avg. Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{totalHoursCompleted}h</div>
            <div className="text-sm text-muted-foreground">Hours Learned</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart - Course Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Individual Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Progress']}
                  />
                  <Bar
                    dataKey="progress"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    background={{ fill: '#f3f4f6' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
