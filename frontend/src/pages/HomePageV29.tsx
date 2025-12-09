/**
 * VARIANT 29: NOTION STYLE
 * Inspired by Notion's clean productivity UI
 * - Clean, readable typography with Framer Motion
 * - Subtle shadows and borders
 * - Productivity-focused layout
 * - Emoji icons with animations
 * - Light and airy
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV29() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const emojiRotate = useTransform(smoothProgress, [0, 0.2], [0, 15]);
  const featuresScale = useTransform(smoothProgress, [0.2, 0.4], [0.95, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .notion-shadow {
          box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px,
                      rgba(15, 15, 15, 0.1) 0px 2px 4px;
        }
        .notion-shadow-hover:hover {
          box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px,
                      rgba(15, 15, 15, 0.2) 0px 3px 6px,
                      rgba(15, 15, 15, 0.1) 0px 9px 24px;
        }
      `}</style>

      {/* Header - Playful with emoji accents, friendly typography */}
      <motion.header
        className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-6 py-3 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              📚
            </motion.span>
            <span className="font-semibold text-gray-900">Course Tutor</span>
          </motion.div>
          <nav className="flex items-center gap-2 text-sm">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/courses" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                <span>📖</span> Courses
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                <span>✨</span> About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/help" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                <span>💬</span> Help
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                {isAuthenticated ? "Dashboard" : "Log in"}
              </Link>
            </motion.div>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-4 py-2 rounded-lg">
                    Get Started 🚀
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Illustrated style with character/icon, text alongside illustration */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-50/50 to-white">
        <motion.div
          className="w-full grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
          style={{ y: heroY }}
        >
          {/* Text alongside */}
          <div className="text-left">
            <motion.div
              className="text-6xl mb-6 inline-block"
              style={{ rotate: emojiRotate }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
            >
              🎓
            </motion.div>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Learn anything,
              <br />
              <motion.span
                className="text-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                your way
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your all-in-one workspace for learning. Organize courses, track progress,
              and master new skills—all in one place.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg">
                      Open Dashboard →
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg">
                        Get Course Tutor free →
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
            <motion.p
              className="text-sm text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Free for personal use. No credit card required.
            </motion.p>
          </div>

          {/* Illustration alongside */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md">
              {/* Illustrated character/icon elements */}
              <motion.div
                className="absolute top-0 left-1/4 text-8xl"
                animate={{ rotate: [0, 10, -10, 0], y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                📚
              </motion.div>
              <motion.div
                className="absolute top-20 right-1/4 text-6xl"
                animate={{ rotate: [0, -10, 10, 0], y: [0, 15, 0] }}
                transition={{ duration: 5, delay: 0.5, repeat: Infinity }}
              >
                💡
              </motion.div>
              <motion.div
                className="absolute bottom-20 left-1/3 text-7xl"
                animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, delay: 1, repeat: Infinity }}
              >
                🎯
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-1/3 text-6xl"
                animate={{ rotate: [0, -15, 15, 0], y: [0, 20, 0] }}
                transition={{ duration: 5.5, delay: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.div>
              {/* Center large illustration */}
              <motion.div
                className="text-[12rem] text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🚀
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Trusted by */}
      <section className="py-12 px-6 border-t border-b border-gray-100">
        <div className="w-full">
          <motion.p
            className="text-center text-sm text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted by learners at
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-12 opacity-50"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['Google', 'Apple', 'Meta', 'Amazon', 'Netflix'].map((company) => (
              <motion.div
                key={company}
                className="text-xl font-bold text-gray-400"
                variants={itemVariants}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features with icons */}
      <section className="py-24 px-6">
        <motion.div
          className="w-full"
          style={{ scale: featuresScale }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to learn effectively
            </h2>
            <p className="text-lg text-gray-600">
              Simple, powerful, and designed for how you actually learn.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { emoji: '📝', title: 'Structured Courses', desc: 'Clear learning paths with organized modules and lessons' },
              { emoji: '✅', title: 'Progress Tracking', desc: 'Visual progress bars and completion tracking' },
              { emoji: '🎯', title: 'Learning Goals', desc: 'Set targets and celebrate when you achieve them' },
              { emoji: '📊', title: 'Analytics', desc: 'Insights into your learning habits and patterns' },
              { emoji: '🏆', title: 'Certificates', desc: 'Earn credentials to showcase your achievements' },
              { emoji: '💬', title: 'Community', desc: 'Connect with fellow learners and mentors' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl border border-gray-200 notion-shadow cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.1) 0px 9px 24px'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Checklist section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why learners love us</h2>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 notion-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {[
                'Expert-led courses from industry professionals',
                'Learn at your own pace, anytime, anywhere',
                'Hands-on projects to build your portfolio',
                'Certificates recognized by top employers',
                'Money-back guarantee if not satisfied',
                'Lifetime access to all course materials',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="w-6 h-6 bg-green-500 rounded flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" as const, stiffness: 500 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.span>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Happy learners', emoji: '😊' },
              { value: '500+', label: 'Expert courses', emoji: '📚' },
              { value: '98%', label: 'Completion rate', emoji: '🎯' },
              { value: '4.9', label: 'Average rating', emoji: '⭐' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-2xl mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.emoji}
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-orange-50">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl mb-8"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💭
          </motion.div>
          <motion.blockquote
            className="text-2xl text-gray-800 mb-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Wildcard: Large decorative quotation marks */}
            <motion.span
              className="absolute -top-8 -left-4 text-8xl text-orange-300/40 font-serif leading-none"
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 200 }}
            >
              "
            </motion.span>
            "Course Tutor changed how I approach learning. It's like having a personal tutor
            that's available 24/7. I've completed 12 courses in just 3 months!"
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Sarah Miller</div>
              <div className="text-sm text-gray-600">Product Designer at Figma</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-8"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🚀
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Start learning today
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join 50,000+ learners who are advancing their careers with Course Tutor.
          </motion.p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-12 py-6 text-lg">
                {isAuthenticated ? "Browse Courses" : "Get Started for Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="w-full flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>📚</span>
            <span>Course Tutor</span>
          </div>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-gray-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-gray-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={29} />
    </div>
  );
}
