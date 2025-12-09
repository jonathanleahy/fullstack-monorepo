import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV71() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const episodes = [
    { id: 1, title: 'Getting Started with TypeScript', duration: '45:30', plays: '12.5K', status: 'playing' },
    { id: 2, title: 'Advanced React Patterns', duration: '52:15', plays: '18.2K', status: 'new' },
    { id: 3, title: 'Building Scalable APIs', duration: '38:45', plays: '9.8K', status: 'popular' },
    { id: 4, title: 'Database Design Fundamentals', duration: '41:20', plays: '15.1K', status: 'trending' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <DesignNavigation currentVersion={71} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-cyan-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">AudioLearn</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Help</Link>
          </div>

          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Audio Waveform Visual */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-100 to-teal-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Learn Through
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
                  Audio Courses
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Tune in to expert-led courses. Listen, learn, and level up your skills anytime, anywhere.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-8 py-3 text-lg">
                  Start Listening
                </Button>
                <Button variant="outline" className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-8 py-3 text-lg">
                  Browse Catalog
                </Button>
              </div>
            </motion.div>

            {/* Animated Waveform Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-80"
            >
              <div className="absolute inset-0 flex items-center justify-center space-x-1">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-cyan-500 to-teal-400 rounded-full"
                    style={{
                      height: `${Math.random() * 60 + 20}%`,
                    }}
                    animate={{
                      height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center group"
                >
                  <svg className="w-10 h-10 text-cyan-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Episode Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Episodes</h2>
            <p className="text-xl text-gray-600">Top picks from our audio course library</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {episodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {episode.status === 'new' && (
                        <span className="px-2 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">NEW</span>
                      )}
                      {episode.status === 'popular' && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">POPULAR</span>
                      )}
                      {episode.status === 'trending' && (
                        <span className="px-2 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">TRENDING</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{episode.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {episode.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                        {episode.plays} plays
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                </div>

                {/* Mini Waveform */}
                <div className="flex items-center space-x-0.5 h-12 mt-4">
                  {[...Array(60)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-400 to-teal-300 rounded-full"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        opacity: episode.status === 'playing' && i < 30 ? 0.4 : 1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Player Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Getting Started with TypeScript</p>
                <p className="text-sm text-gray-600">Episode 1 • 45:30</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-cyan-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>

              <button className="text-gray-600 hover:text-cyan-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                </svg>
              </button>

              <button className="text-gray-600 hover:text-cyan-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex justify-end">
              <span className="text-sm text-gray-600">12:45 / 45:30</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 bg-gray-200 h-1 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-600"
              style={{ width: '28%' }}
              initial={{ width: '0%' }}
              animate={{ width: '28%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
}
