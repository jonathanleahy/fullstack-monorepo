import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV77() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'Development'];

  const breakingNews = {
    title: 'BREAKING: New AI-Powered Learning Platform Launches Today',
    time: '5 min ago',
  };

  const mainStory = {
    title: 'The Future of Online Education: How AI is Transforming Learning',
    subtitle: 'Industry experts predict revolutionary changes in education technology by 2026',
    author: 'Dr. Sarah Johnson',
    date: 'December 6, 2025',
    readTime: '8 min read',
    image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    category: 'Technology',
  };

  const stories = [
    {
      id: 1,
      title: 'Top 10 Programming Languages to Learn in 2025',
      author: 'Michael Chen',
      date: '2 hours ago',
      category: 'Development',
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'How Remote Work is Changing Corporate Training',
      author: 'Emily Rodriguez',
      date: '4 hours ago',
      category: 'Business',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      readTime: '6 min',
    },
    {
      id: 3,
      title: 'UI/UX Design Trends That Will Dominate 2025',
      author: 'James Anderson',
      date: '6 hours ago',
      category: 'Design',
      image: 'bg-gradient-to-br from-rose-400 to-pink-500',
      readTime: '7 min',
    },
    {
      id: 4,
      title: 'Digital Marketing Strategies for Course Creators',
      author: 'Lisa Thompson',
      date: '8 hours ago',
      category: 'Marketing',
      image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      readTime: '9 min',
    },
  ];

  const trending = [
    { title: 'Machine Learning Basics Course Released', views: '12.5K' },
    { title: 'Student Success Stories: From Zero to Hero', views: '8.2K' },
    { title: 'New Certification Programs Announced', views: '6.7K' },
    { title: 'Expert Interview: Future of EdTech', views: '5.1K' },
    { title: 'Course Completion Rates Hit All-Time High', views: '4.8K' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breaking News Banner */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-3">
              <span className="bg-white text-rose-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                LIVE
              </span>
              <p className="text-sm font-medium">{breakingNews.title}</p>
              <span className="text-xs opacity-90">{breakingNews.time}</span>
            </div>
          </div>

          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                CT
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">CourseTutor</span>
                <p className="text-xs text-gray-500">Education News</p>
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

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide py-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stories */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Story */}
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className={`${mainStory.image} h-96 flex items-end p-8`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 w-full">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    {mainStory.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {mainStory.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{mainStory.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {mainStory.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{mainStory.author}</p>
                        <p className="text-sm text-gray-500">{mainStory.date}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{mainStory.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Story Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {stories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className={`${story.image} h-48`} />
                  <div className="p-6">
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {story.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {story.author.charAt(0)}
                        </div>
                        <span className="font-medium">{story.author}</span>
                      </div>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-32"
            >
              <div className="flex items-center space-x-2 mb-6">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              </div>

              <div className="space-y-4">
                {trending.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <span className="text-2xl font-bold text-gray-300">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                View All Trending
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <DesignNavigation currentVersion={77} />
    </div>
  );
}
