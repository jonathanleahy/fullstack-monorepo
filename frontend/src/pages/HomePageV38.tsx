/**
 * VARIANT 38: SKILLSHARE CREATIVE STYLE
 * Inspired by Skillshare's creative learning platform
 * - Project-based emphasis
 * - Creative community feel
 * - Video preview thumbnails
 * - Subscription model messaging
 * - Full-width green accent theme
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV38() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const categoriesY = useTransform(smoothProgress, [0.2, 0.4], [80, 0]);
  const statsScale = useTransform(smoothProgress, [0.5, 0.7], [0.9, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        .green-glow {
          box-shadow: 0 0 30px rgba(0, 200, 120, 0.2);
        }
      `}</style>

      {/* Header - News Ticker Style */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Scrolling News Ticker */}
        <div className="bg-teal-600 text-white py-2 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap text-sm"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="flex items-center gap-2">
              <span className="text-yellow-300">NEW</span>
              Free trial: Start creating today
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-300">TRENDING</span>
              30,000+ creative classes available
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-300">OFFER</span>
              Starting at $13.99/month after trial
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-300">NEW</span>
              Free trial: Start creating today
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-300">TRENDING</span>
              30,000+ creative classes available
            </span>
          </motion.div>
        </div>

        {/* Main Nav */}
        <div className="w-full px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-sm">
          <Link to="/" className="text-2xl font-bold text-teal-600">
            <motion.span whileHover={{ scale: 1.05 }}>Course Tutor</motion.span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors">
              {isAuthenticated ? "My Classes" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-2 font-semibold">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Magazine Cover Layout */}
      <section className="min-h-screen flex items-center px-6 pt-32 relative overflow-hidden">
        {/* Magazine-style dramatic background */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1920&h=1080&fit=crop"
            alt="Magazine cover"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        </div>

        {/* Magazine-style content */}
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <motion.div
            className="max-w-2xl"
            style={{ y: heroY }}
          >
            {/* Issue/Edition label */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-px w-12 bg-teal-400" />
              <span className="text-teal-300 text-sm font-semibold tracking-widest uppercase">
                Winter 2024 Edition
              </span>
            </motion.div>

            {/* Dramatic headline */}
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 leading-none text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore your
              <motion.span
                className="block text-teal-400"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                creativity
              </motion.span>
            </motion.h1>

            {/* Byline/Subtitle */}
            <motion.div
              className="border-l-4 border-teal-400 pl-6 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Thousands of creative classes. Taught by the world's best.
                Get started with a free trial.
              </p>
            </motion.div>

            {/* Featured by line */}
            <motion.div
              className="flex items-center gap-4 mb-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>FEATURED BY</span>
              <div className="flex gap-4">
                <span className="font-semibold">The New York Times</span>
                <span>•</span>
                <span className="font-semibold">Wired</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {isAuthenticated ? (
                <Link to="/courses">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(20, 184, 166, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 px-10 py-6 text-lg font-bold green-glow">
                      Browse Classes
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(20, 184, 166, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 px-10 py-6 text-lg font-bold green-glow">
                        Start Free Trial
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg">
                        Read More
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>

            <motion.p
              className="text-gray-400 text-sm mt-6 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Starting at $13.99/month after trial. Cancel anytime.
            </motion.p>
          </motion.div>

          {/* Magazine-style sidebar stats */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 space-y-6">
              <div className="border-b border-white/20 pb-4">
                <div className="text-4xl font-bold text-teal-400">12M+</div>
                <div className="text-sm text-gray-300">Members</div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="text-4xl font-bold text-teal-400">30K+</div>
                <div className="text-sm text-gray-300">Classes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-400">4.7</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Categories */}
      <section className="py-20 px-6 bg-slate-50 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Explore creative classes</motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ y: categoriesY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Illustration', count: '1,000+', icon: '✏️' },
              { name: 'Design', count: '2,400+', icon: '🎨' },
              { name: 'Photography', count: '800+', icon: '📷' },
              { name: 'Animation', count: '500+', icon: '🎬' },
              { name: 'Writing', count: '600+', icon: '📝' },
              { name: 'Music', count: '400+', icon: '🎵' },
              { name: 'Film', count: '300+', icon: '🎥' },
              { name: 'Marketing', count: '700+', icon: '📈' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-6 cursor-pointer border border-slate-200"
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  backgroundColor: 'rgba(20, 184, 166, 0.05)',
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                >{cat.icon}</motion.div>
                <h3 className="font-semibold mb-1 text-slate-900">{cat.name}</h3>
                <p className="text-sm text-slate-500">{cat.count} classes</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-20 px-6 bg-white text-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Staff picks</h2>
            <Link to="/courses" className="text-teal-600 hover:underline">See all →</Link>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Procreate Dreams: Complete Animation Guide', instructor: 'Brad Woodard', duration: '2h 15m', img: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=300&h=200&fit=crop' },
              { title: 'Hand Lettering: 4 Easy Steps', instructor: 'Mary Kate McDevitt', duration: '1h 30m', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop' },
              { title: 'iPhone Photography: How to Take Pro Photos', instructor: 'Dale McManus', duration: '45m', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop' },
              { title: 'Watercolor Painting for Beginners', instructor: 'Yasmina Creates', duration: '1h 45m', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop' },
            ].map((course, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <motion.img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: '#14b8a6' }}
                    >
                      <svg className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-teal-600">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500">{course.instructor}</p>
                <p className="text-xs text-slate-400 mt-1">{course.duration}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-teal-50 text-slate-900">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{ scale: statsScale }}
        >
          {[
            { value: '12M+', label: 'Members' },
            { value: '30K+', label: 'Classes' },
            { value: '8K+', label: 'Teachers' },
            { value: '4.7', label: 'Avg Rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2 text-teal-600"
                whileHover={{ scale: 1.15, rotate: [0, -3, 3, 0] }}
              >{stat.value}</motion.div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-cyan-50 to-teal-50">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            whileHover={{ scale: 1.02 }}
          >
            Start creating today
          </motion.h2>
          <p className="text-xl text-slate-600 mb-10">
            Get unlimited access to thousands of creative classes.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(20, 184, 166, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 px-12 py-6 text-lg font-bold green-glow">
                {isAuthenticated ? "Browse Classes" : "Start Free Trial"}
              </Button>
            </motion.div>
          </Link>
          {!isAuthenticated && (
            <motion.p
              className="text-slate-500 text-sm mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              7 day free trial. Cancel anytime.
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="w-full flex justify-between items-center text-sm text-slate-500">
          <span className="text-teal-600 font-bold text-xl">Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900">Courses</Link>
            <Link to="/about" className="hover:text-slate-900">About</Link>
            <Link to="/help" className="hover:text-slate-900">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={38} />
    </div>
  );
}
