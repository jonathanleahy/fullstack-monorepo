/**
 * VARIANT 28: APPLE STYLE
 * Inspired by Apple's product pages
 * - Cinematic hero with large typography and Framer Motion
 * - Scroll-triggered animations with parallax
 * - Product-focused layout
 * - Clean minimalism
 * - Full-width immersive sections
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV28() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const orbGlow = useTransform(smoothProgress, [0, 0.3], [0.2, 0.5]);
  const imageScale = useTransform(smoothProgress, [0.15, 0.35], [0.95, 1]);
  const statsY = useTransform(smoothProgress, [0.25, 0.45], [100, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        .gradient-text {
          background: linear-gradient(180deg, #1e293b 0%, #64748b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Header - Minimal Apple-style: small centered logo, compact nav */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-center gap-12">
            {/* Centered logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.svg
                className="h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring" as const, stiffness: 400 }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </motion.svg>
            </Link>

            {/* Compact nav */}
            <nav className="flex gap-8 text-sm">
              <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
              <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
              <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help</Link>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors">
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero - Cinematic large text, single powerful headline, elegant spacing */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 relative overflow-hidden bg-white">
        {/* Subtle background gradient orb */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: orbGlow }}
        >
          <motion.div
            className="w-[800px] h-[800px] bg-blue-100 rounded-full blur-[250px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </motion.div>

        <motion.div
          className="text-center relative z-10 max-w-6xl mx-auto"
          style={{ scale: heroScale, opacity: heroOpacity, y: titleY }}
        >
          {/* Single powerful cinematic headline */}
          <motion.h1
            className="text-[clamp(4rem,12vw,10rem)] font-semibold leading-[0.9] tracking-tight mb-12 relative"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5 }}
          >
            <span className="gradient-text block">Learn.</span>
            <span className="gradient-text block">Create.</span>
            <span className="gradient-text block">Transform.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            The most powerful learning platform ever created. Where ambition meets excellence.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
                    Open Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-transparent border border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-6 rounded-full text-lg">
                      Explore
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <span className="text-xs text-slate-500">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Feature highlight 1 */}
      <section className="py-32 px-4 md:px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-semibold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-slate-400">Expert-led.</span>
            <br />
            <motion.span
              className="text-slate-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Industry-proven.
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 w-full mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our courses are created by professionals from leading companies like Google, Apple, and Meta.
          </motion.p>

          <motion.div
            style={{ scale: imageScale }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop"
              alt="Learning"
              className="w-full rounded-3xl shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats - Full width light */}
      <section className="py-24 px-4 md:px-6 bg-slate-50">
        <motion.div
          className="max-w-6xl mx-auto"
          style={{ y: statsY }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Active Learners' },
              { value: '500+', label: 'Expert Courses' },
              { value: '98%', label: 'Success Rate' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-semibold text-blue-600 mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Feature grid */}
      <section className="py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-semibold text-center mb-20 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Designed for the way you learn
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Interactive Lessons',
                desc: 'Hands-on exercises that reinforce concepts in real-time.',
                img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
              },
              {
                title: 'Progress Tracking',
                desc: 'Detailed analytics to monitor your learning journey.',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
              },
              {
                title: 'Expert Mentorship',
                desc: 'Direct access to industry professionals for guidance.',
                img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
              },
              {
                title: 'Career Support',
                desc: 'Job placement assistance and portfolio reviews.',
                img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-slate-300">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-32 px-4 md:px-6 bg-blue-50">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.blockquote
            className="text-3xl md:text-5xl font-light text-slate-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            "The quality of education here rivals top universities,
            but with the flexibility of learning from anywhere."
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <div className="text-slate-900">Emma Wilson</div>
              <div className="text-sm text-slate-600">VP of Engineering</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-4 md:px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <div className="w-[800px] h-[800px] bg-blue-300 rounded-full blur-[300px]" />
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-semibold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Your future starts here.</span>
          </motion.h2>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-12 py-6 rounded-full text-lg font-medium shadow-lg shadow-blue-600/30">
                {isAuthenticated ? "View Courses" : "Start Learning"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-slate-600">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={28} />
    </div>
  );
}
