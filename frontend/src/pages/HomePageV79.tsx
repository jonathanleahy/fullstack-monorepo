import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV79() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();

  const kpis = [
    {
      title: 'Total Students',
      value: '24,582',
      change: '+12.5%',
      trend: 'up',
      icon: '👥',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Course Completion',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: '✅',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Avg. Rating',
      value: '4.8/5.0',
      change: '+0.3',
      trend: 'up',
      icon: '⭐',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Revenue',
      value: '$1.2M',
      change: '+18.7%',
      trend: 'up',
      icon: '💰',
      color: 'from-rose-500 to-pink-600',
    },
  ];

  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 91 },
    { month: 'Jun', value: 87 },
  ];

  const topCourses = [
    { name: 'React Development', students: 3421, revenue: '$42,150', growth: 23 },
    { name: 'Python Bootcamp', students: 2876, revenue: '$35,890', growth: 18 },
    { name: 'UI/UX Design', students: 2134, revenue: '$28,450', growth: 15 },
    { name: 'Data Science', students: 1987, revenue: '$31,200', growth: 21 },
    { name: 'Digital Marketing', students: 1654, revenue: '$22,340', growth: 12 },
  ];

  const recentActivity = [
    { user: 'Sarah Johnson', action: 'completed React Module 5', time: '2 min ago', avatar: '👩‍🎓' },
    { user: 'Michael Chen', action: 'enrolled in Python Course', time: '5 min ago', avatar: '👨‍💼' },
    { user: 'Emily Rodriguez', action: 'left a 5-star review', time: '12 min ago', avatar: '👩‍🔬' },
    { user: 'James Anderson', action: 'achieved certification', time: '18 min ago', avatar: '👨‍🎨' },
    { user: 'Lisa Thompson', action: 'started Data Science track', time: '25 min ago', avatar: '👩‍💻' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                CT
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">CourseTutor</span>
                <p className="text-xs text-gray-500">Analytics Dashboard</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Help
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/signout">
                    <Button variant="outline">
                      Sign Out
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/signin">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Overview</h1>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {kpi.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  kpi.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Enrollment</h2>
                <p className="text-gray-600 text-sm">Monthly trend analysis</p>
              </div>
              <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
                <option>This year</option>
              </select>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-64 space-x-4">
              {chartData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg relative group cursor-pointer hover:from-cyan-600 hover:to-blue-700 transition-all"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                      {data.value}%
                    </div>
                  </motion.div>
                  <span className="text-sm font-medium text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium truncate">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Courses Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-700 font-bold">Course Name</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-bold">Students</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-bold">Revenue</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-bold">Growth</th>
                  <th className="text-right py-4 px-4 text-gray-700 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course, index) => (
                  <motion.tr
                    key={course.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg" />
                        <span className="font-medium text-gray-900">{course.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{course.students.toLocaleString()}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{course.revenue}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.growth * 4}%` }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                          />
                        </div>
                        <span className="text-emerald-700 font-bold text-sm">+{course.growth}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="outline" className="text-sm">
                        View Details
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <DesignNavigation currentVersion={79} />
    </div>
  );
}
