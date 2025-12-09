import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV83() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cyan-50">
      <DesignNavigation currentVersion={83} />

      {/* Header - Music Streaming Style */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-amber-500 rounded-lg" />
              <div className="absolute inset-1 bg-white rounded-md flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">CourseTune</span>
              <div className="text-xs text-gray-500">Learn Your Way</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Browse
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Help
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full px-6 py-2 font-medium">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full px-6 py-2 font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Music Streaming Theme */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              style={{ y }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-full"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <span className="text-sm font-medium">Now Streaming Knowledge</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight"
              >
                Your Learning
                <span className="block bg-gradient-to-r from-rose-600 via-amber-600 to-cyan-600 bg-clip-text text-transparent">
                  Playlist
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Discover courses curated just for you. Mix and match topics,
                create your perfect learning rhythm, and grow at your own tempo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex space-x-4"
              >
                <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg">
                  Start Listening
                </Button>
                <Button className="bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-4 text-lg font-semibold">
                  Browse Genres
                </Button>
              </motion.div>

              {/* Genre Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 pt-4"
              >
                {['Development', 'Design', 'Business', 'Marketing', 'Data Science'].map((genre, index) => (
                  <span
                    key={index}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-rose-500 hover:text-rose-600 cursor-pointer transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Album Art Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Web Dev Hits', color: 'from-rose-400 to-rose-600', icon: '💻' },
                  { title: 'Design Classics', color: 'from-amber-400 to-amber-600', icon: '🎨' },
                  { title: 'Business Beats', color: 'from-cyan-400 to-cyan-600', icon: '📊' },
                  { title: 'Now Playing', color: 'from-blue-400 to-blue-600', icon: '▶️', large: true }
                ].map((album, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    className={`relative ${album.large ? 'col-span-2 h-64' : 'h-48'} bg-gradient-to-br ${album.color} rounded-2xl shadow-xl overflow-hidden cursor-pointer group`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="text-6xl mb-3">{album.icon}</div>
                      <div className="text-white font-bold text-xl text-center">{album.title}</div>
                      {album.large && (
                        <motion.div
                          className="mt-4 flex items-center space-x-3"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-1 h-8 bg-white rounded-full" />
                          <div className="w-1 h-12 bg-white rounded-full" />
                          <div className="w-1 h-6 bg-white rounded-full" />
                          <div className="w-1 h-10 bg-white rounded-full" />
                          <div className="w-1 h-4 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>

                    {/* Play Button on Hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Equalizer Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl flex items-center space-x-2"
              >
                {[4, 7, 3, 8, 5].map((height, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: [`${height * 4}px`, `${height * 6}px`, `${height * 4}px`] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                    className="w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full"
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">Playing...</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Learning Playlists
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked collections for every skill level
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Beginner Essentials',
                courses: '12 courses',
                duration: '24 hours',
                color: 'from-rose-400 to-rose-500',
                icon: '🎵'
              },
              {
                title: 'Advanced Mastery',
                courses: '18 courses',
                duration: '36 hours',
                color: 'from-amber-400 to-amber-500',
                icon: '🎸'
              },
              {
                title: 'Quick Bites',
                courses: '24 courses',
                duration: '12 hours',
                color: 'from-cyan-400 to-cyan-500',
                icon: '🎧'
              }
            ].map((playlist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className={`w-full h-48 bg-gradient-to-br ${playlist.color} rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                  {playlist.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {playlist.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{playlist.courses}</span>
                  <span>{playlist.duration}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Start Learning</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Music Style */}
      <section className="py-20 px-6 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Active Learners', icon: '👥' },
              { value: '500+', label: 'Course Tracks', icon: '📚' },
              { value: '1M+', label: 'Hours Streamed', icon: '⏱️' },
              { value: '95%', label: 'Satisfaction', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-500 to-amber-500 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Hit Play?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start your learning journey with unlimited access to all courses
              </p>
              <Button className="bg-white text-rose-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg">
                Get Started Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <span className="font-bold text-xl">CourseTune</span>
          </div>
          <p className="text-gray-400">© 2024 CourseTune. Stream your success.</p>
        </div>
      </footer>
    </div>
  );
}
