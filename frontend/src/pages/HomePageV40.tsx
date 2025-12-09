/**
 * VARIANT 40: KHAN ACADEMY STYLE
 * Inspired by Khan Academy's educational platform
 * - Friendly, approachable design
 * - Progress and mastery focus
 * - Colorful subject icons (teal/emerald, cyan, sky/blue palette)
 * - Non-profit educational feel
 * - Full-width accessible design
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV40() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const subjectsY = useTransform(smoothProgress, [0.1, 0.3], [60, 0]);
  const masteryScale = useTransform(smoothProgress, [0.3, 0.5], [0.9, 1]);
  const masteryRotate = useTransform(smoothProgress, [0.3, 0.5], [-5, 0]);
  const statsY = useTransform(smoothProgress, [0.5, 0.7], [40, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Lexend', sans-serif" }}>
      {/* Header - App Style */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-4 py-3 flex items-center justify-between">
          {/* Back button placeholder (mobile-first) */}
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Centered title/logo */}
          <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <motion.div
              className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-lg">CT</span>
            </motion.div>
            <span className="text-lg font-bold text-gray-900">Course Tutor</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/courses" className="text-gray-600 hover:text-green-600 transition-colors">Courses</Link>
            <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">About</Link>
            <Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors">Help</Link>
          </nav>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-gray-700 hover:text-green-600 text-sm font-medium hidden sm:block">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero - Mobile-First Card Stack */}
      <section className="py-8 px-4 bg-gradient-to-b from-blue-50 to-white min-h-[80vh] flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div style={{ y: heroY }}>
            {/* Main hero card */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    For every student,
                    <motion.span
                      className="text-blue-600 block"
                      whileHover={{ scale: 1.02 }}
                    >every classroom.</motion.span>
                    <motion.span
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg mt-2 text-2xl transform -rotate-1"
                      whileHover={{ scale: 1.05, rotate: 0 }}
                    >Real results.</motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-lg text-gray-600 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    We're a nonprofit with the mission to provide a free, world-class education for anyone, anywhere.
                  </motion.p>
                </div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=350&fit=crop"
                    alt="Students learning"
                    className="rounded-xl shadow-lg w-full"
                    whileHover={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Stacked cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Card 1 - Learners */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">For Learners</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Start learning with interactive exercises and instant feedback.
                </p>
                {!isAuthenticated ? (
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3">
                        Learners, start here
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3">
                        Continue Learning
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </motion.div>

              {/* Card 2 - Teachers */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(22, 163, 74, 0.2)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">For Teachers</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Tools and insights to support your classroom and students.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full py-3">
                    Teachers, start here
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Subjects */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Explore subjects</motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ y: subjectsY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Math', icon: '📐', color: 'bg-blue-500', count: '50+ courses' },
              { name: 'Science', icon: '🔬', color: 'bg-green-500', count: '40+ courses' },
              { name: 'Computing', icon: '💻', color: 'bg-teal-500', count: '30+ courses' },
              { name: 'Arts', icon: '🎨', color: 'bg-pink-500', count: '20+ courses' },
              { name: 'Economics', icon: '📊', color: 'bg-yellow-500', count: '15+ courses' },
              { name: 'Reading', icon: '📚', color: 'bg-orange-500', count: '25+ courses' },
              { name: 'Life Skills', icon: '🌟', color: 'bg-teal-500', count: '35+ courses' },
              { name: 'Test Prep', icon: '📝', color: 'bg-red-500', count: '10+ courses' },
            ].map((subject, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-2xl mb-4`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {subject.icon}
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-1">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.count}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Feature */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Master any subject</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our learning system helps you understand and remember what you learn.
              Track your progress and earn points as you master new skills.
            </p>

            <div className="space-y-4">
              {[
                { skill: 'Algebra basics', progress: 85 },
                { skill: 'Geometry', progress: 60 },
                { skill: 'Statistics', progress: 40 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.skill}</span>
                    <motion.span
                      className="text-gray-500"
                      whileHover={{ scale: 1.2, color: '#16a34a' }}
                    >{item.progress}%</motion.span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" as const }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="hidden lg:flex justify-center"
            style={{ scale: masteryScale, rotate: masteryRotate }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <motion.div
                className="w-64 h-64 bg-green-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(22, 163, 74, 0.2)" }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-bold text-green-600"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring" as const, stiffness: 200, delay: 0.3 }}
                  >75%</motion.div>
                  <div className="text-gray-600">Mastery Level</div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{ y: statsY }}
        >
          {[
            { value: '150M+', label: 'Learners' },
            { value: '190+', label: 'Countries' },
            { value: '8B+', label: 'Problems solved' },
            { value: 'Free', label: 'Forever' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
              >{stat.value}</motion.div>
              <div className="text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-6 cursor-pointer inline-block"
            whileHover={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.5 }}
          >👋</motion.div>
          <blockquote className="text-2xl text-gray-700 mb-6">
            "Course Tutor has been a lifesaver for my kids' education.
            The personalized learning and immediate feedback are incredible."
          </blockquote>
          <div>
            <div className="font-bold text-gray-900">Maria Rodriguez</div>
            <div className="text-gray-500">Parent of 3</div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-green-600 text-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Start learning for free today
          </motion.h2>
          <p className="text-xl text-green-100 mb-10">
            All of our courses are free. No ads, no subscriptions, no paywalls. Ever.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-12 py-4 text-lg font-bold">
                {isAuthenticated ? "Continue Learning" : "Start Learning"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="w-full">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold">CT</span>
                </motion.div>
                <span className="font-bold text-white">Course Tutor</span>
              </div>
              <p className="text-sm">A nonprofit on a mission to provide free education for all.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/help" className="hover:text-white">Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/courses" className="hover:text-white">All Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/about" className="hover:text-white">Contact</Link></li>
                <li><Link to="/courses" className="hover:text-white">Browse Courses</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm">
            © 2024 Course Tutor. Free education for everyone.
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={40} />
    </div>
  );
}
