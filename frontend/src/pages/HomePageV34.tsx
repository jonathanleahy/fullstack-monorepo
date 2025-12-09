/**
 * VARIANT 34: GITHUB/GITLAB DEVELOPER STYLE (LIGHT THEME)
 * Inspired by developer collaboration platforms
 * - Light backgrounds with green accents
 * - Code-focused aesthetic
 * - Contribution graph vibes
 * - Open source feel
 * - Full-width design
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV34() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const codeBlockY = useTransform(smoothProgress, [0.3, 0.5], [50, 0]);
  const featuresY = useTransform(smoothProgress, [0.2, 0.4], [80, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-700" style={{ fontFamily: "'Fira Code', monospace" }}>
      <style>{`
        @keyframes type-cursor {
          50% { border-color: transparent; }
        }
        .type-cursor {
          border-right: 2px solid #238636;
          animation: type-cursor 1s step-end infinite;
        }
        .contrib-0 { background-color: #ebedf0; }
        .contrib-1 { background-color: #9be9a8; }
        .contrib-2 { background-color: #40c463; }
        .contrib-3 { background-color: #30a14e; }
        .contrib-4 { background-color: #216e39; }
        .border-muted { border-color: #d0d7de; }
        .bg-muted { background-color: #f6f8fa; }
        .text-green { color: #1a7f37; }
        .bg-green { background-color: #1f883d; }
        .bg-green-hover:hover { background-color: #1a7f37; }
      `}</style>

      {/* Overlapping Header - Extends into hero with transparent to solid transition */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-full px-6 py-6"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.1],
              ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
            ),
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-slate-900 hover:text-slate-600 transition-colors">
                <motion.svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </motion.svg>
              </Link>
              <motion.div
                className="hidden md:flex items-center bg-white/50 rounded-md px-3 py-1.5 border border-slate-200"
                whileHover={{ scale: 1.02, borderColor: '#238636', backgroundColor: 'rgba(255,255,255,0.8)' }}
              >
                <svg className="w-4 h-4 text-slate-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm text-slate-500">Search courses...</span>
                <motion.span
                  className="ml-auto text-xs border border-slate-300 px-1.5 py-0.5 rounded"
                  whileHover={{ borderColor: '#1f883d', color: '#1f883d' }}
                >/</motion.span>
              </motion.div>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link to="/courses" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Courses</Link>
              <Link to="/about" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">About</Link>
              <Link to="/help" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">Help</Link>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-green bg-green-hover text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg">
                      Sign Up
                    </Button>
                  </motion.div>
                </Link>
              )}
            </nav>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero - Staggered cards layout with headline as largest card */}
      <section className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Staggered card layout with headline as the largest card */}
        <div className="w-full grid lg:grid-cols-12 gap-6">
          {/* LARGEST CARD: Headline */}
          <motion.div
            className="lg:col-span-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-12 shadow-xl border border-green-100"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            style={{ y: heroY }}
          >
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(35, 134, 54, 0.4)", "0 0 0 10px rgba(35, 134, 54, 0)", "0 0 0 0 rgba(35, 134, 54, 0.4)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-slate-600 font-medium">Open for learning</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Where developers
              <br />
              <motion.span
                className="text-green relative inline-block"
                animate={{ textShadow: ["0 0 10px rgba(31, 136, 61, 0.3)", "0 0 30px rgba(31, 136, 61, 0.6)", "0 0 10px rgba(31, 136, 61, 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              > learn.</motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              The world's largest developer learning platform.
              Level up your skills with courses built by the community.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(35, 134, 54, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-green bg-green-hover text-white px-8 py-4 rounded-lg text-lg shadow-lg">
                      Go to Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(35, 134, 54, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-green bg-green-hover text-white px-8 py-4 rounded-lg text-lg shadow-lg">
                        Sign up for free
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }} whileTap={{ scale: 0.95 }}>
                      <Button className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-lg text-lg bg-white">
                        Explore courses
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* SIDE CARDS: Staggered smaller cards */}
          <div className="lg:col-span-4 grid gap-6">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="text-4xl font-bold text-green mb-2">50K+</div>
              <div className="text-sm text-slate-600">Active Developers</div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
              initial={{ opacity: 0, x: 50, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="text-4xl font-bold text-green mb-2">500+</div>
              <div className="text-sm text-slate-600">Open Courses</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 shadow-lg text-white"
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: -3, boxShadow: "0 20px 40px rgba(31, 136, 61, 0.4)" }}
            >
              <div className="text-3xl mb-3">🚀</div>
              <div className="font-semibold">Start Learning Today</div>
              <div className="text-xs text-green-100 mt-1">Join the community</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Built for developers</motion.h2>
          <motion.p
            className="text-slate-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to become a better developer, all in one place.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            style={{ y: featuresY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '📁', title: 'Organized Learning', desc: 'Courses structured like repos with clear paths' },
              { icon: '🔀', title: 'Learn by Doing', desc: 'Fork projects and practice with real code' },
              { icon: '📊', title: 'Track Progress', desc: 'Contribution graph for your learning journey' },
              { icon: '👥', title: 'Community', desc: 'Learn alongside 50,000+ developers' },
              { icon: '🏷️', title: 'Certificates', desc: 'Verified badges for completed courses' },
              { icon: '⚡', title: 'Always Current', desc: 'Courses updated with latest practices' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-muted border border-muted rounded-lg p-6 cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  backgroundColor: '#ffffff',
                  borderColor: '#1f883d'
                }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >{feature.icon}</motion.div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code snippet section */}
      <section className="py-24 px-6 bg-muted border-y border-muted">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          style={{ y: codeBlockY }}
        >
          <motion.div
            className="bg-white rounded-lg border border-muted overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 0 40px rgba(31, 136, 61, 0.2)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-muted bg-slate-50">
              <div className="flex gap-1.5">
                <motion.div
                  className="w-3 h-3 rounded-full bg-red-500"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-yellow-500"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  whileHover={{ scale: 1.3 }}
                />
              </div>
              <span className="text-xs text-slate-500 ml-2">your-learning-journey.js</span>
            </div>
            <div className="p-6 font-mono text-sm">
              {[
                { parts: [{ text: 'const', color: 'text-teal-600' }, { text: ' developer', color: 'text-blue-600' }, { text: ' =', color: 'text-slate-900' }, { text: ' await', color: 'text-orange-600' }, { text: ' CourseTutor', color: 'text-blue-600' }, { text: '.', color: 'text-slate-900' }, { text: 'enroll', color: 'text-amber-600' }, { text: '();', color: 'text-slate-900' }] },
                { parts: [{ text: 'const', color: 'text-teal-600' }, { text: ' skills', color: 'text-blue-600' }, { text: ' =', color: 'text-slate-900' }, { text: ' developer', color: 'text-blue-600' }, { text: '.', color: 'text-slate-900' }, { text: 'learn', color: 'text-amber-600' }, { text: '([', color: 'text-slate-900' }], mt: true },
                { parts: [{ text: "  'react'", color: 'text-green-600' }, { text: ',', color: 'text-slate-900' }], indent: true },
                { parts: [{ text: "  'typescript'", color: 'text-green-600' }, { text: ',', color: 'text-slate-900' }], indent: true },
                { parts: [{ text: "  'node'", color: 'text-green-600' }, { text: ',', color: 'text-slate-900' }], indent: true },
                { parts: [{ text: ']);', color: 'text-slate-900' }] },
                { parts: [{ text: '// Output: "Dream job unlocked 🎉"', color: 'text-slate-500' }], mt: true },
                { parts: [{ text: 'console', color: 'text-blue-600' }, { text: '.', color: 'text-slate-900' }, { text: 'log', color: 'text-amber-600' }, { text: '(', color: 'text-slate-900' }, { text: 'developer', color: 'text-blue-600' }, { text: '.', color: 'text-slate-900' }, { text: 'career', color: 'text-blue-600' }, { text: ');', color: 'text-slate-900' }], cursor: true },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  className={line.mt ? 'mt-4' : line.indent ? 'ml-4' : 'mt-2'}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {line.parts.map((part, j) => (
                    <span key={j} className={part.color}>{part.text}</span>
                  ))}
                  {line.cursor && <span className="type-cursor ml-1" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Active developers' },
              { value: '500+', label: 'Open courses' },
              { value: '1M+', label: 'Contributions' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-green mb-2"
                  whileHover={{ scale: 1.1, textShadow: "0 0 30px rgba(31, 136, 61, 0.8)" }}
                >{stat.value}</motion.div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-muted border-t border-muted">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Ready to level up?
          </motion.h2>
          <p className="text-xl text-slate-600 mb-10">
            Join the community of developers learning together.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(31, 136, 61, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-green bg-green-hover text-white px-10 py-4 rounded-md text-lg">
                {isAuthenticated ? "Explore Courses" : "Sign up for free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-muted">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-slate-500">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={34} />
    </div>
  );
}
