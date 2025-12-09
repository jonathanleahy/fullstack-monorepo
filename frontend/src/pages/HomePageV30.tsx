/**
 * VARIANT 30: VERCEL/NEXT.JS STYLE
 * Inspired by Vercel's light developer-focused UI
 * - Light theme with subtle gradients and Framer Motion
 * - Code-inspired typography
 * - Terminal aesthetics with parallax
 * - Sleek animations
 * - Full-width design
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV30() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const terminalY = useTransform(smoothProgress, [0, 0.3], [0, 30]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.3], [0.2, 0.05]);
  const featuresScale = useTransform(smoothProgress, [0.2, 0.4], [0.95, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .blink { animation: blink 1s step-end infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(148,163,184,0.15), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .border-gradient {
          border: 1px solid transparent;
          background: linear-gradient(#fff, #fff) padding-box,
                      linear-gradient(135deg, #e2e8f0, #cbd5e1) border-box;
        }
        .text-gradient-dark {
          background: linear-gradient(180deg, #0f172a 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .code-block {
          font-family: 'SF Mono', 'Fira Code', monospace;
        }
      `}</style>

      {/* Header - Developer-focused: logo with version badge, nav with code-style elements */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <motion.svg
                className="w-6 h-6"
                viewBox="0 0 76 65"
                fill="#0f172a"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </motion.svg>
              <span className="font-semibold">Course Tutor</span>
              {/* Version badge */}
              <motion.span
                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                whileHover={{ scale: 1.1 }}
              >
                v2.0
              </motion.span>
            </Link>
          </div>
          <nav className="flex items-center gap-6 text-sm font-mono">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">
              <span className="text-slate-400">&lt;</span>Courses<span className="text-slate-400">/&gt;</span>
            </Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
              <span className="text-slate-400">&lt;</span>About<span className="text-slate-400">/&gt;</span>
            </Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">
              <span className="text-slate-400">&lt;</span>Help<span className="text-slate-400">/&gt;</span>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors">
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 text-sm px-4 py-2 rounded-lg font-mono">
                    $ Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Grid background with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.2) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: gridOpacity
          }}
        />

        <motion.div
          className="w-full text-center relative z-10"
          style={{ y: heroY }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 border border-slate-300 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </motion.span>
            <span className="text-sm text-slate-600">Now with AI-powered recommendations</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 font-mono"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-slate-400">&gt;</span>{' '}
            <span className="text-gradient-dark">develop</span>
            <motion.span
              className="text-cyan-600"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ( )
            </motion.span>
            <br />
            <span className="text-slate-900 relative inline-block">
              your<span className="text-orange-500">.skills</span>
              {/* Code-style underline */}
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-orange-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 w-full mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The platform for ambitious learners. Start with any course,
            scale your knowledge, and ship real projects.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-xl font-medium">
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-xl font-medium">
                      Start Building
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="border-gradient bg-transparent text-slate-900 hover:bg-slate-50 px-8 py-6 rounded-xl font-medium">
                      View Courses
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Code snippet with parallax */}
          <motion.div
            className="mt-20 text-left w-full"
            style={{ y: terminalY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="border-gradient rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(148,163,184,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
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
                <span className="text-xs text-slate-500 ml-2">terminal</span>
              </div>
              <div className="p-6 code-block text-sm bg-white">
                <motion.div
                  className="text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  $ npx course-tutor start
                </motion.div>
                <motion.div
                  className="text-green-400 mt-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  ✓ Loading your personalized curriculum...
                </motion.div>
                <motion.div
                  className="text-green-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  ✓ AI recommendations ready
                </motion.div>
                <motion.div
                  className="text-green-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  ✓ Progress tracking enabled
                </motion.div>
                <motion.div
                  className="mt-4 text-slate-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <span className="text-blue-600">→</span> Ready to learn at <span className="text-cyan-600">localhost:3000</span>
                  <span className="blink">▋</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-32 px-6 bg-slate-50">
        <motion.div
          className="w-full"
          style={{ scale: featuresScale }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Built for developers</h2>
            <p className="text-xl text-slate-600 w-full">
              Everything you need to go from zero to production-ready skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Fast Learning', desc: 'Optimized curriculum that gets you building real projects quickly.', icon: '⚡' },
              { title: 'Edge Knowledge', desc: 'Stay current with courses updated for the latest technologies.', icon: '🌐' },
              { title: 'Analytics', desc: 'Real-time insights into your learning patterns and progress.', icon: '📊' },
              { title: 'Collaboration', desc: 'Learn alongside peers and get feedback on your projects.', icon: '👥' },
              { title: 'Certificates', desc: 'Verifiable credentials that prove your expertise.', icon: '🏆' },
              { title: 'API Access', desc: 'Integrate learning progress into your workflow.', icon: '🔌' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="border-gradient rounded-xl p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  boxShadow: '0 0 40px rgba(148,163,184,0.2)',
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 4 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Developers' },
              { value: '500+', label: 'Courses' },
              { value: '99.9%', label: 'Uptime' },
              { value: '<50ms', label: 'Response' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-gradient-dark mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-slate-100">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.blockquote
            className="text-2xl md:text-3xl text-slate-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            "Course Tutor is the only learning platform that keeps up with how fast
            web development moves. It's my go-to for staying current."
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <div className="text-slate-900 font-medium">David Chen</div>
              <div className="text-sm text-slate-500">Staff Engineer, Vercel</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 shimmer"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="w-full text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient-dark">Start building today.</span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Deploy your first project in minutes.
          </motion.p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 rounded-xl text-lg font-medium">
                {isAuthenticated ? "View Courses" : "Get Started"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="w-full flex justify-between items-center text-sm text-slate-500">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={30} />
    </div>
  );
}
