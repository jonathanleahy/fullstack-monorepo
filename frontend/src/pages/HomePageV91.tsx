import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV91() {
  const { isAuthenticated } = useAuth();
  const [topCard, setTopCard] = useState(0);

  const courses = [
    { title: 'Advanced Mathematics', instructor: 'Dr. Sarah Chen', students: 1234, color: '#FF6B6B' },
    { title: 'Physics Fundamentals', instructor: 'Prof. Michael Ross', students: 892, color: '#4ECDC4' },
    { title: 'Computer Science 101', instructor: 'Dr. Alex Kumar', students: 2156, color: '#FFE66D' },
    { title: 'Chemistry Basics', instructor: 'Dr. Emma Watson', students: 756, color: '#95E1D3' },
  ];

  const dealNext = () => {
    setTopCard((prev) => (prev + 1) % courses.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DesignNavigation currentVersion={91} />

      {/* Floating Card Header */}
      <motion.header
        className="relative z-50 mx-auto max-w-7xl px-8 pt-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="bg-gradient-to-br from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold text-xl"
              whileHover={{ rotate: -2, scale: 1.05 }}
            >
              CourseDeck
            </motion.div>

            <nav className="flex gap-3">
              {['Courses', 'Instructors', 'About'].map((item, i) => (
                <motion.div
                  key={item}
                  className="bg-white border-2 border-slate-200 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  whileHover={{ y: -4, rotate: i % 2 === 0 ? -2 : 2 }}
                >
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-700 font-medium">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex gap-3">
              {!isAuthenticated ? (
                <>
                  <motion.div whileHover={{ y: -3, rotate: -1 }}>
                    <Link to="/login">
                      <Button variant="outline" className="bg-white shadow-md border-2 border-slate-300 rounded-lg">
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, rotate: 1 }}>
                    <Link to="/register">
                      <Button className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg rounded-lg">
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ y: -3 }}>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg rounded-lg">
                      Dashboard
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Stacked Card Deck */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">
            Deal Yourself In
          </h1>
          <p className="text-xl text-slate-600">
            Discover your next course from our carefully curated deck
          </p>
        </div>

        {/* Card Deck */}
        <div className="relative h-[500px] flex items-center justify-center mb-12">
          <div className="relative w-[600px] h-[400px]" style={{ perspective: '1000px' }}>
            {courses.map((course, index) => {
              const offset = (index - topCard + courses.length) % courses.length;
              const isTop = offset === 0;

              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl cursor-pointer"
                  style={{
                    zIndex: courses.length - offset,
                    backgroundColor: course.color,
                  }}
                  initial={false}
                  animate={{
                    y: offset * 8,
                    x: offset * 4,
                    rotate: offset * 2,
                    scale: 1 - offset * 0.05,
                    boxShadow: isTop
                      ? '0 30px 60px -15px rgba(0,0,0,0.4)'
                      : `0 ${20 + offset * 5}px ${40 + offset * 10}px -15px rgba(0,0,0,${0.2 + offset * 0.05})`,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={isTop ? dealNext : undefined}
                  whileHover={isTop ? { scale: 1.02, y: -10 } : {}}
                >
                  <div className="h-full p-12 flex flex-col justify-between text-white">
                    <div>
                      <div className="text-sm font-semibold opacity-90 mb-2">COURSE CARD #{index + 1}</div>
                      <h2 className="text-4xl font-bold mb-4">{course.title}</h2>
                      <p className="text-lg opacity-90">by {course.instructor}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-3xl font-bold">{course.students.toLocaleString()}</div>
                        <div className="text-sm opacity-90">Students Enrolled</div>
                      </div>

                      {isTop && (
                        <motion.div
                          className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-white/40 font-semibold"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        >
                          View Details
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deal Button */}
        <div className="text-center">
          <motion.button
            onClick={dealNext}
            className="bg-white text-slate-800 px-8 py-4 rounded-2xl shadow-xl font-bold text-lg border-2 border-slate-200"
            whileHover={{
              y: -8,
              rotate: 3,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95, rotate: 0 }}
          >
            Deal Next Card →
          </motion.button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6 mt-20">
          {[
            { icon: '🎯', title: 'Curated Selection', desc: 'Hand-picked courses from top instructors' },
            { icon: '⚡', title: 'Quick Access', desc: 'Jump right into learning with one click' },
            { icon: '🏆', title: 'Top Rated', desc: 'Only the highest quality courses make the deck' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-100"
              whileHover={{
                y: -12,
                rotate: i % 2 === 0 ? -2 : 2,
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
