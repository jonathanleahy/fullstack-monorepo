import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV100() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotate: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    }),
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 overflow-auto">
      <DesignNavigation currentVersion={100} />

      {/* Kinetic Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="px-8 h-20 flex items-center justify-between">
          <Link to="/" className="relative">
            <motion.div className="flex items-center gap-1">
              {'COURSETUTOR'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-3xl font-black text-gray-900 inline-block"
                  initial={{ y: 0 }}
                  whileHover={{
                    y: -10,
                    color: '#3b82f6',
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link to="/courses">
              <motion.span
                className="text-base font-bold text-gray-900"
                whileHover={{
                  scale: 1.2,
                  color: '#3b82f6',
                  transition: { duration: 0.2 }
                }}
              >
                Courses
              </motion.span>
            </Link>
            <Link to="/tutors">
              <motion.span
                className="text-base font-bold text-gray-900"
                whileHover={{
                  scale: 1.2,
                  color: '#3b82f6',
                  transition: { duration: 0.2 }
                }}
              >
                Tutors
              </motion.span>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  className="px-6 py-2 bg-gray-900 text-white rounded-full font-bold"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  Dashboard
                </motion.div>
              </Link>
            ) : (
              <Link to="/login">
                <motion.div
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  Sign In
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Kinetic Typography */}
      <div className="relative px-8 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Main Animated Headline */}
          <div className="mb-20 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              {['Transform', 'Your', 'Learning'].map((word, i) => (
                <motion.h1
                  key={i}
                  className="text-9xl font-black text-gray-900"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -2, 2, 0],
                    color: '#3b82f6',
                    transition: { duration: 0.3 }
                  }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {['with', 'Expert', 'Tutors'].map((word, i) => (
                <motion.span
                  key={i}
                  className="text-5xl font-bold text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.15,
                    color: '#3b82f6',
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <motion.div className="flex items-center gap-2">
                  {'START NOW'.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block px-4 py-4 bg-blue-600 text-white text-2xl font-black rounded-xl"
                      whileHover={{
                        y: -10,
                        rotate: [0, -10, 10, 0],
                        backgroundColor: '#1e40af',
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </Link>
          </div>

          {/* Floating Feature Words */}
          <div className="grid grid-cols-4 gap-8 mb-20">
            {[
              { word: 'LIVE', size: 'text-7xl', color: 'text-blue-600' },
              { word: 'VIDEO', size: 'text-6xl', color: 'text-green-600' },
              { word: 'INTERACTIVE', size: 'text-5xl', color: 'text-orange-600' },
              { word: 'SMART', size: 'text-8xl', color: 'text-red-600' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-center justify-center p-8 bg-white rounded-3xl border-2 border-gray-200"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <motion.h2
                  className={`${item.size} font-black ${item.color}`}
                  variants={floatingVariants}
                  animate="float"
                  transition={{ delay: index * 0.2 }}
                >
                  {item.word}
                </motion.h2>
              </motion.div>
            ))}
          </div>

          {/* Bouncing Stats */}
          <div className="grid grid-cols-3 gap-12">
            {[
              { number: '10,000', label: 'STUDENTS', words: ['TEN', 'THOUSAND'] },
              { number: '500', label: 'TUTORS', words: ['FIVE', 'HUNDRED'] },
              { number: '98%', label: 'SUCCESS', words: ['NINETY', 'EIGHT'] },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative text-center bg-white rounded-3xl p-12 border-2 border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              >
                <motion.div
                  className="flex flex-col items-center gap-2 mb-4"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  {stat.words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="text-5xl font-black text-gray-900"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: i * 0.1 + index * 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex justify-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
                >
                  {stat.label.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="text-xl font-bold text-blue-600"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: i * 0.05 + index * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Animated Feature List */}
          <div className="mt-20 bg-white rounded-3xl p-16 border-2 border-gray-200">
            <div className="flex flex-wrap justify-center gap-6">
              {[
                'WHITEBOARD',
                'SCHEDULING',
                'RECORDING',
                'ANALYTICS',
                'CHAT',
                'SCREEN SHARE',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                >
                  <motion.span
                    className="text-4xl font-black text-gray-900 inline-block cursor-pointer"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -5, 5, -5, 0],
                      color: '#3b82f6',
                      transition: { duration: 0.5 }
                    }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    {feature}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
