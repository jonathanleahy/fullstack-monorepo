import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV96() {
  const { isAuthenticated } = useAuth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  const sections = [
    {
      title: 'Master Your Skills',
      subtitle: 'Learn from Expert Tutors',
      description: 'Access personalized tutoring in mathematics, science, languages, and more. Our platform connects you with certified educators.',
      cta: 'Start Learning',
      color: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Live Sessions',
      subtitle: 'Real-time Interaction',
      description: 'Connect face-to-face with tutors through our integrated video platform. Share screens, use whiteboards, and collaborate in real-time.',
      cta: 'Book Session',
      color: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Track Progress',
      subtitle: 'Data-Driven Learning',
      description: 'Monitor your improvement with detailed analytics. Review session history, track milestones, and celebrate achievements.',
      cta: 'View Dashboard',
      color: 'from-orange-50 to-amber-50',
    },
    {
      title: 'Flexible Scheduling',
      subtitle: 'Learn On Your Time',
      description: 'Choose sessions that fit your schedule. Book tutors across time zones with our intelligent scheduling system.',
      cta: 'Browse Tutors',
      color: 'from-red-50 to-rose-50',
    },
    {
      title: 'Community Support',
      subtitle: 'Join Thousands of Learners',
      description: 'Access study groups, discussion forums, and peer support. Learning is better together.',
      cta: 'Join Community',
      color: 'from-teal-50 to-cyan-50',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <DesignNavigation currentVersion={96} />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900">
            CourseFlow
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/courses" className="text-sm text-gray-600 hover:text-gray-900">Courses</Link>
            <Link to="/tutors" className="text-sm text-gray-600 hover:text-gray-900">Tutors</Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="h-1 bg-blue-600"
          style={{ width: progressWidth }}
        />
      </header>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="h-screen pt-16 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex h-full">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className={`min-w-full h-full flex-shrink-0 bg-gradient-to-br ${section.color} flex items-center justify-center px-12`}
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h1>
                  <h2 className="text-2xl text-gray-600 mb-6">
                    {section.subtitle}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {section.description}
                  </p>
                  <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
                    <Button
                      size="lg"
                      className="px-12 py-4 rounded-full text-base font-semibold"
                    >
                      {section.cta}
                    </Button>
                  </Link>
                </motion.div>

                {/* Vertical Feature Cards */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + item * 0.1, duration: 0.5 }}
                      viewport={{ once: false, amount: 0.5 }}
                      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-xl mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Feature {item}</h3>
                      <p className="text-sm text-gray-600">Enhance your learning experience</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Section Number Indicator */}
              <div className="absolute bottom-8 right-8 text-9xl font-bold text-gray-900/5">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200"
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span>Scroll horizontally</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );
}
