/**
 * VARIANT 35: FIGMA/MIRO COLLABORATION STYLE
 * Inspired by design collaboration tools
 * - Colorful cursors/avatars (emerald/cyan/coral theme)
 * - Canvas-like feel
 * - Real-time collaboration vibes
 * - Playful but professional
 * - Full-width design
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV35() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const cursor1X = useTransform(smoothProgress, [0, 0.5], [0, 100]);
  const cursor1Y = useTransform(smoothProgress, [0, 0.5], [0, -50]);
  const cursor2X = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const cursor2Y = useTransform(smoothProgress, [0, 0.5], [0, 60]);
  const cursor3X = useTransform(smoothProgress, [0, 0.5], [0, 50]);
  const cursor3Y = useTransform(smoothProgress, [0, 0.5], [0, 80]);
  const cardsRotate = useTransform(smoothProgress, [0.2, 0.5], [5, 0]);
  const featuresScale = useTransform(smoothProgress, [0.3, 0.5], [0.95, 1]);

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
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 overflow-hidden" style={{ fontFamily: "'General Sans', sans-serif" }}>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .gradient-border {
          border: 2px solid transparent;
          background: linear-gradient(#ffffff, #ffffff) padding-box,
                      linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3) border-box;
        }
      `}</style>

      {/* Breadcrumb-style Header - Minimal and functional */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-3 flex justify-between items-center">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition-colors font-medium">Home</Link>
            <span className="text-slate-400">›</span>
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-900 font-semibold">Learn</span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors text-sm">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero - Full-bleed image background with frosted glass text container */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Learning together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-pink-900/40 to-orange-900/60" />
        </div>

        {/* Floating cursors with parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div
            className="absolute top-1/4 left-1/4"
            style={{ x: cursor1X, y: cursor1Y }}
            animate={{
              x: [0, 50, 20, -30, 0],
              y: [0, -30, 40, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <div className="relative">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
              </svg>
              <motion.div
                className="absolute -bottom-6 left-4 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Sarah
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4"
            style={{ x: cursor2X, y: cursor2Y }}
            animate={{
              x: [0, -40, 30, 60, 0],
              y: [0, 20, -50, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <div className="relative">
              <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
              </svg>
              <motion.div
                className="absolute -bottom-6 left-4 bg-cyan-400 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Mike
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 left-1/3"
            style={{ x: cursor3X, y: cursor3Y }}
            animate={{
              x: [0, 70, -50, 10, 0],
              y: [0, 40, -20, 60, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <div className="relative">
              <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
              </svg>
              <motion.div
                className="absolute -bottom-6 left-4 bg-orange-400 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                Emma
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Frosted glass container for text */}
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-8"
          style={{ y: heroY }}
        >
          <motion.div
            className="glass-card rounded-3xl p-12 md:p-16 text-center backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Live badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 mb-10 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm">50,432 learning right now</span>
            <div className="flex -space-x-2">
              {['#10b981', '#22d3ee', '#fb923c', '#f472b6'].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
              ))}
            </div>
          </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Learn <motion.span
                className="relative inline-block px-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative z-10">together</span>
                <span
                  className="absolute inset-0 bg-white/20 -z-10"
                  style={{
                    transform: 'rotate(-1.5deg) skewX(-3deg) scaleX(1.1)',
                    borderRadius: '3px 8px 4px 6px'
                  }}
                />
              </motion.span>,
              <br />
              <motion.span
                className="bg-gradient-to-r from-emerald-300 via-pink-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                grow together.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/90 w-full mb-12 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              The collaborative learning platform where you can study alongside
              peers, share insights, and build skills together in real-time.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-50 px-10 py-6 rounded-xl text-lg font-semibold shadow-2xl">
                      Open Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-50 px-10 py-6 rounded-xl text-lg font-semibold shadow-2xl">
                        Start collaborating — free
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white px-10 py-6 rounded-xl text-lg backdrop-blur-sm shadow-xl">
                        Explore courses
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating collaboration cards - moved outside glass container */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 z-10 px-6"
          style={{ rotate: cardsRotate }}
        >
          <div className="max-w-6xl mx-auto relative h-[200px] hidden lg:block">
            <motion.div
              className="absolute left-0 top-0 bg-white/95 backdrop-blur-lg rounded-2xl p-4 w-48 cursor-pointer shadow-2xl"
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.9, type: "spring" as const }}
              whileHover={{ scale: 1.1, rotate: 5, y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            >
              <motion.div
                className="text-2xl mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >🎨</motion.div>
              <div className="font-semibold text-sm mb-1">Design Workshop</div>
              <div className="text-xs text-slate-600 mb-3">23 participants</div>
              <div className="flex -space-x-2">
                {['#10b981', '#22d3ee', '#fb923c'].map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                  />
                ))}
                <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-xs text-white">+20</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 top-10 bg-white/95 backdrop-blur-lg rounded-2xl p-4 w-56 cursor-pointer shadow-2xl"
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 1.0, type: "spring" as const }}
              whileHover={{ scale: 1.1, rotate: -3, y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face"
                  alt=""
                  className="w-8 h-8 rounded-full"
                  whileHover={{ scale: 1.2 }}
                />
                <div>
                  <div className="text-sm font-medium">Sarah just completed</div>
                  <div className="text-xs text-slate-600">React Fundamentals</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" as const }}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="absolute left-1/3 bottom-0 bg-white/95 backdrop-blur-lg rounded-2xl p-4 cursor-pointer shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, type: "spring" as const }}
              whileHover={{ scale: 1.1, y: -15, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            >
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >87%</motion.div>
              <div className="text-xs text-slate-600">Course completion rate</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for collaboration</h2>
            <p className="text-xl text-slate-600 w-full">
              Learning is better together. Experience features designed for group learning.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            style={{ scale: featuresScale }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { color: 'from-emerald-500 to-pink-500', icon: '👥', title: 'Study Groups', desc: 'Form groups and tackle courses together' },
              { color: 'from-cyan-400 to-blue-500', icon: '💬', title: 'Live Chat', desc: 'Discuss concepts in real-time with peers' },
              { color: 'from-orange-400 to-red-500', icon: '🖐️', title: 'Raise Hand', desc: 'Get help from instructors instantly' },
              { color: 'from-green-400 to-teal-500', icon: '📊', title: 'Shared Progress', desc: 'Track group achievements and milestones' },
              { color: 'from-pink-400 to-emerald-500', icon: '🎯', title: 'Challenges', desc: 'Compete with friends on quizzes' },
              { color: 'from-yellow-400 to-orange-500', icon: '🏆', title: 'Leaderboards', desc: "See who's learning the most" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-8 cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotate: [0, -2, 2, 0],
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Collaborators', color: 'text-emerald-400' },
              { value: '500+', label: 'Courses', color: 'text-cyan-400' },
              { value: '10K+', label: 'Study groups', color: 'text-orange-400' },
              { value: '4.9', label: 'Rating', color: 'text-pink-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
              >
                <motion.div
                  className={`text-5xl md:text-6xl font-bold ${stat.color} mb-2`}
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                >{stat.value}</motion.div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-emerald-50 via-pink-50 to-orange-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8"
            whileHover={{ scale: 1.02 }}
          >
            Ready to join the
            <motion.span
              className="bg-gradient-to-r from-emerald-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            > collaboration?</motion.span>
          </motion.h2>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 rounded-xl text-xl font-semibold">
                {isAuthenticated ? "Explore Courses" : "Get started — it's free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-emerald-500 via-pink-500 to-orange-400 rounded-md"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <span>Course Tutor</span>
          </div>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={35} />
    </div>
  );
}
