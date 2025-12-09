/**
 * VARIANT 32: RAYCAST/SUPERHUMAN STYLE
 * Inspired by productivity apps with light themes
 * - Clean, sleek interface
 * - Keyboard-first aesthetic
 * - Command palette vibes
 * - Teal/cyan accents
 * - Speed-focused messaging
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV32() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const commandPaletteScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const featuresY = useTransform(smoothProgress, [0.2, 0.5], [100, 0]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .typing-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
          color: #14b8a6;
        }
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.1), transparent);
          animation: shine 3s infinite;
        }
        .kbd {
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          border: 1px solid #cbd5e1;
          box-shadow: 0 2px 0 #94a3b8;
        }
        .glass-light {
          background: rgba(241, 245, 249, 0.8);
          border: 1px solid rgba(203, 213, 225, 0.5);
        }
      `}</style>

      {/* Bottom-positioned nav bar (fixed at bottom) */}
      <motion.header
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold">Course Tutor</span>
          </motion.div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg text-sm">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Full viewport height with content vertically centered */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div className="w-full text-center" style={{ y: heroY }}>
          {/* Command palette preview */}
          <motion.div
            className="inline-flex items-center gap-2 glass-light rounded-lg px-4 py-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="kbd px-2 py-1 rounded text-xs font-mono text-slate-700"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(20, 184, 166, 0.5)" }}
            >⌘</motion.span>
            <motion.span
              className="kbd px-2 py-1 rounded text-xs font-mono text-slate-700"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(20, 184, 166, 0.5)" }}
            >K</motion.span>
            <span className="text-slate-600 text-sm ml-2">to start learning</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Learn at the
            <br />
            <motion.span
              className="relative inline-block"
            >
              <motion.span
                className="text-teal-400"
                animate={{
                  textShadow: ["0 0 20px rgba(20, 184, 166, 0.3)", "0 0 40px rgba(20, 184, 166, 0.6)", "0 0 20px rgba(20, 184, 166, 0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >speed</motion.span>
              <motion.span
                className="absolute -top-2 -right-12 bg-teal-500 text-white px-2 py-1 rounded text-xs font-mono"
                initial={{ rotate: -5, scale: 0 }}
                animate={{ rotate: 5, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" as const }}
              >⚡ FAST</motion.span>
              <span className="text-teal-400"> of thought</span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 w-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The fastest way to master new skills. Blazingly fast courses with
            keyboard-first navigation and AI-powered recommendations.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(20, 184, 166, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-6 rounded-xl">
                    Open Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(20, 184, 166, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{ opacity: glowOpacity }}
                  >
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-6 rounded-xl">
                      Start Free Trial
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="glass-light hover:bg-slate-100 text-slate-900 px-8 py-6 rounded-xl">
                      Explore
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Command palette mockup */}
          <motion.div
            className="w-full"
            style={{ scale: commandPaletteScale }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="glass-light rounded-2xl overflow-hidden border border-slate-300 shadow-lg"
              animate={{ boxShadow: ["0 0 20px rgba(20, 184, 166, 0.2)", "0 0 40px rgba(20, 184, 166, 0.4)", "0 0 20px rgba(20, 184, 166, 0.2)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-slate-600 typing-cursor">Search for courses...</span>
              </div>
              <div className="divide-y divide-slate-200">
                {[
                  { icon: '⚡', title: 'JavaScript Fundamentals', shortcut: '↵' },
                  { icon: '🎨', title: 'UI/UX Design Mastery', shortcut: '↵' },
                  { icon: '🐍', title: 'Python for Data Science', shortcut: '↵' },
                  { icon: '📱', title: 'React Native Development', shortcut: '↵' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 ${i === 0 ? 'bg-teal-500/10' : 'bg-white'} cursor-pointer`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ backgroundColor: i === 0 ? 'rgba(20, 184, 166, 0.15)' : 'rgba(241, 245, 249, 1)', x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.span
                        className="text-xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >{item.icon}</motion.span>
                      <span className={i === 0 ? 'text-slate-900 font-medium' : 'text-slate-600'}>{item.title}</span>
                    </div>
                    <span className="kbd px-2 py-1 rounded text-xs text-slate-600">{item.shortcut}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Designed for speed</h2>
            <p className="text-xl text-slate-600 w-full">
              Every interaction optimized. Every second counts.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            style={{ y: featuresY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '⚡', title: 'Instant Access', desc: 'Jump into any course in milliseconds' },
              { icon: '⌨️', title: 'Keyboard First', desc: 'Navigate entirely with shortcuts' },
              { icon: '🧠', title: 'AI Powered', desc: 'Smart recommendations and summaries' },
              { icon: '📊', title: 'Progress Sync', desc: 'Your progress, everywhere, always' },
              { icon: '🎯', title: 'Focus Mode', desc: 'Distraction-free learning environment' },
              { icon: '🔒', title: 'Private', desc: 'Your data stays yours, period' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl p-8 cursor-pointer shadow-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  borderColor: 'rgba(20, 184, 166, 0.5)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(20, 184, 166, 0.2)'
                }}
                style={{ border: '1px solid rgba(203, 213, 225, 0.5)' }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >{feature.icon}</motion.div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '<100ms', label: 'Load time' },
              { value: '50K+', label: 'Power users' },
              { value: '500+', label: 'Courses' },
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
                  className="text-4xl md:text-5xl font-bold text-teal-600 mb-2"
                  whileHover={{ scale: 1.1, textShadow: "0 0 30px rgba(20, 184, 166, 0.4)" }}
                >{stat.value}</motion.div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shortcuts section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Master the shortcuts</motion.h2>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { keys: ['⌘', 'K'], action: 'Open course search' },
              { keys: ['⌘', 'J'], action: 'Continue learning' },
              { keys: ['⌘', '.'], action: 'Toggle settings' },
              { keys: ['⌘', 'B'], action: 'View bookmarks' },
              { keys: ['⌘', '/'], action: 'Show all shortcuts' },
            ].map((shortcut, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200"
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(241, 245, 249, 1)', x: 10 }}
              >
                <span className="text-slate-600">{shortcut.action}</span>
                <div className="flex gap-2">
                  {shortcut.keys.map((key, j) => (
                    <motion.span
                      key={j}
                      className="kbd px-3 py-1 rounded text-sm font-mono text-slate-700"
                      whileHover={{ scale: 1.15, boxShadow: "0 0 15px rgba(20, 184, 166, 0.6)" }}
                    >{key}</motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900">
            Ready to go
            <motion.span
              className="text-teal-600"
              animate={{ textShadow: ["0 0 20px rgba(20, 184, 166, 0.3)", "0 0 40px rgba(20, 184, 166, 0.5)", "0 0 20px rgba(20, 184, 166, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            > fast?</motion.span>
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Join thousands of learners who've already made the switch.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white px-12 py-6 rounded-xl text-lg shine-effect">
                {isAuthenticated ? "View Courses" : "Get Started Free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-slate-600">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={32} />
    </div>
  );
}
