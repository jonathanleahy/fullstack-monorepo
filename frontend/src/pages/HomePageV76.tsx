import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV76() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();

  const stories = [
    { id: 1, user: 'Sarah M.', avatar: '👩‍🎓', color: 'bg-gradient-to-br from-rose-400 to-pink-500' },
    { id: 2, user: 'John D.', avatar: '👨‍💼', color: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
    { id: 3, user: 'Emma K.', avatar: '👩‍🔬', color: 'bg-gradient-to-br from-emerald-400 to-teal-500' },
    { id: 4, user: 'Alex P.', avatar: '👨‍🎨', color: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { id: 5, user: 'Lisa R.', avatar: '👩‍💻', color: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
  ];

  const posts = [
    {
      id: 1,
      user: 'Dr. Jennifer Smith',
      avatar: '👩‍🏫',
      time: '2h ago',
      content: 'Just launched our new Advanced React Patterns course! 🚀 Learn hooks, context, and performance optimization.',
      image: 'bg-gradient-to-br from-cyan-100 to-blue-200',
      likes: 342,
      comments: 28,
      shares: 15,
      course: 'React Mastery'
    },
    {
      id: 2,
      user: 'Prof. Michael Chen',
      avatar: '👨‍💼',
      time: '5h ago',
      content: 'Students who completed our Python bootcamp are now working at top tech companies! 💼 Success stories inspire us.',
      image: 'bg-gradient-to-br from-emerald-100 to-teal-200',
      likes: 567,
      comments: 43,
      shares: 31,
      course: 'Python Pro'
    },
    {
      id: 3,
      user: 'Sarah Williams',
      avatar: '👩‍🎓',
      time: '8h ago',
      content: 'Just finished the Data Science fundamentals module. The hands-on projects are incredible! 📊',
      image: 'bg-gradient-to-br from-rose-100 to-pink-200',
      likes: 198,
      comments: 12,
      shares: 8,
      course: 'Data Science 101'
    },
    {
      id: 4,
      user: 'Tom Anderson',
      avatar: '👨‍🔬',
      time: '12h ago',
      content: 'New certification available: Full Stack Development. Join 5,000+ students already enrolled! 🎓',
      image: 'bg-gradient-to-br from-amber-100 to-yellow-200',
      likes: 421,
      comments: 35,
      shares: 22,
      course: 'Full Stack Dev'
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                CT
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                CourseTutor
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
                Help
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
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
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Stories Carousel */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-full ${story.color} p-1`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl">
                  {story.avatar}
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-700 font-medium truncate w-20">
                {story.user}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{post.user}</h3>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Image */}
              <div className={`${post.image} h-80 flex items-center justify-center`}>
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📚</div>
                  <h4 className="text-2xl font-bold text-gray-800">{post.course}</h4>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments · {post.shares} shares</span>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-around">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium text-gray-700">Like</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium text-gray-700">Comment</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="font-medium text-gray-700">Share</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8">
            Load More Posts
          </Button>
        </motion.div>
      </div>

      <DesignNavigation currentVersion={76} />
    </div>
  );
}
