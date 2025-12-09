/**
 * VARIANT 31: FRAMER/DESIGN TOOL STYLE
 * Inspired by Framer's creative design tool aesthetic
 * - Vibrant gradients with Framer Motion
 * - Interactive components preview with parallax
 * - Creative, design-focused
 * - Playful yet professional
 * - Full-width sections
 * - Updated color scheme: teal/cyan accents
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV31() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const blobScale = useTransform(smoothProgress, [0, 0.5], [1, 1.3]);
  const cardsRotate = useTransform(smoothProgress, [0, 0.3], [0, 5]);
  const featuresScale = useTransform(smoothProgress, [0.2, 0.4], [0.9, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .morph { animation: morph 8s ease-in-out infinite; }
        .gradient-rotate {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient-rotate 15s ease infinite;
        }
        .text-gradient-vibrant {
          background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .border-glow {
          box-shadow: 0 0 30px rgba(20, 184, 166, 0.3);
        }
        .glass-light {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Sidebar Header - Vertical navigation on LEFT edge */}
      <motion.aside
        className="fixed left-0 top-0 h-full z-50 w-20 glass-light flex flex-col items-center py-6 gap-8"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo at top of sidebar */}
        <Link to="/" className="flex flex-col items-center gap-1">
          <motion.div
            className="w-12 h-12 gradient-rotate rounded-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.1 }}
          />
          <span className="text-xs font-bold text-slate-900 writing-mode-vertical transform rotate-180 mt-4">CT</span>
        </Link>

        {/* Vertical Navigation */}
        <nav className="flex flex-col items-center gap-6 text-xs mt-8">
          <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors writing-mode-vertical transform rotate-180">
            Courses
          </Link>
          <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors writing-mode-vertical transform rotate-180">
            About
          </Link>
          <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors writing-mode-vertical transform rotate-180">
            Help
          </Link>
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors writing-mode-vertical transform rotate-180">
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </Link>
          {!isAuthenticated && (
            <Link to="/register" className="mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button className="gradient-rotate text-white px-3 py-2 rounded-lg font-medium text-xs writing-mode-vertical transform rotate-180">
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          )}
        </nav>
      </motion.aside>

      {/* Hero - Content takes remaining space, RIGHT aligned */}
      <section className="min-h-screen flex items-center justify-end px-6 pt-24 pb-24 relative ml-20">
        {/* Animated background blobs with parallax */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-teal-200 opacity-40 blur-[100px] morph"
          style={{ scale: blobScale }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 opacity-40 blur-[100px] morph"
          style={{ scale: blobScale, animationDelay: '-4s' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200 opacity-30 blur-[150px] morph"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="w-full max-w-3xl text-right relative z-10"
          style={{ y: heroY }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-8 float-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
            <span className="text-sm text-slate-600">Introducing AI-powered learning paths</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Design your
            <br />
            <motion.span
              className="relative inline-block text-gradient-vibrant"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <motion.span
                className="absolute -left-6 -top-4 text-teal-400 opacity-50"
                style={{ fontSize: '0.5em', fontWeight: 900 }}
                animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >✦</motion.span>
              future.
              <motion.span
                className="absolute -right-6 -bottom-4 text-cyan-400 opacity-50"
                style={{ fontSize: '0.5em', fontWeight: 900 }}
                animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >✦</motion.span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 w-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create, learn, and grow with the most intuitive learning platform ever built.
            No limits. No boundaries.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" className="gradient-rotate text-white px-10 py-6 rounded-2xl text-lg font-semibold border-glow">
                    Open Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 40px rgba(20, 184, 166, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="gradient-rotate text-white px-10 py-6 rounded-2xl text-lg font-semibold border-glow">
                      Start Creating — it's free
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="glass-light hover:bg-slate-100 text-slate-900 px-10 py-6 rounded-2xl text-lg border border-slate-200">
                      Explore Courses
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Floating preview cards with parallax */}
          <motion.div
            className="mt-20 relative h-[400px] hidden md:block"
            style={{ rotate: cardsRotate }}
          >
            <motion.div
              className="absolute left-1/4 top-0 glass-light rounded-2xl p-6 w-64 border-glow"
              animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="flex gap-2 mb-4">
                <motion.div
                  className="w-3 h-3 rounded-full bg-red-400"
                  whileHover={{ scale: 1.5 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-yellow-400"
                  whileHover={{ scale: 1.5 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  whileHover={{ scale: 1.5 }}
                />
              </div>
              <div className="space-y-3">
                <motion.div
                  className="h-3 gradient-rotate rounded-full w-3/4"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <div className="h-3 bg-slate-200 rounded-full w-full" />
                <div className="h-3 bg-slate-200 rounded-full w-2/3" />
              </div>
            </motion.div>

            <motion.div
              className="absolute right-1/4 top-20 glass-light rounded-2xl p-6 w-72"
              animate={{ y: [0, 15, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                🎨
              </motion.div>
              <div className="text-xl font-bold mb-2">Design Fundamentals</div>
              <div className="text-sm text-slate-600">12 lessons • 3 hours</div>
              <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-rotate rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '66%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-1/3 bottom-0 glass-light rounded-2xl p-4"
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
              whileHover={{ scale: 1.15 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 gradient-rotate rounded-full flex items-center justify-center text-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  🏆
                </motion.div>
                <div>
                  <div className="font-semibold">Certificate Earned!</div>
                  <div className="text-xs text-slate-600">UI Design Mastery</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          style={{ scale: featuresScale }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need to
              <motion.span
                className="text-gradient-vibrant"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}succeed
              </motion.span>
            </h2>
            <p className="text-xl text-slate-600 w-full">
              Powerful features designed to accelerate your learning journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Smart Paths', desc: 'AI curates your perfect learning journey based on your goals' },
              { icon: '⚡', title: 'Interactive', desc: 'Hands-on exercises that make concepts stick' },
              { icon: '🎨', title: 'Beautiful UI', desc: 'A joy to use, designed with care and attention' },
              { icon: '📱', title: 'Cross-platform', desc: 'Learn anywhere on any device, seamlessly' },
              { icon: '🤝', title: 'Community', desc: 'Connect with learners and mentors worldwide' },
              { icon: '📊', title: 'Analytics', desc: 'Track your progress with detailed insights' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass-light rounded-2xl p-8 cursor-pointer"
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="text-4xl mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="gradient-rotate rounded-3xl p-12 md:p-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50K+', label: 'Creators' },
                { value: '500+', label: 'Courses' },
                { value: '98%', label: 'Happy Users' },
                { value: '4.9', label: 'Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-bold mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-8"
            animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💜
          </motion.div>
          <motion.blockquote
            className="text-2xl md:text-4xl font-light mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            "Course Tutor made learning feel like playing. I actually look forward to my daily sessions now."
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop&crop=face"
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-teal-500"
            />
            <div className="text-left">
              <div className="font-semibold">Maya Johnson</div>
              <div className="text-sm text-slate-600">Design Lead at Figma</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to start
            <motion.span
              className="text-gradient-vibrant"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {" "}creating?
            </motion.span>
          </motion.h2>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 50px rgba(20, 184, 166, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="gradient-rotate text-white px-16 py-8 rounded-2xl text-xl font-semibold border-glow">
                {isAuthenticated ? "Explore Courses" : "Get Started Free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 gradient-rotate rounded-md" />
            <span>Course Tutor</span>
          </div>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={31} />
    </div>
  );
}
