/**
 * VARIANT 16: SCANDINAVIAN / NORDIC (Light Theme) - Legal Theme
 * - Clean white space with parallax
 * - Muted colors
 * - Functional design
 * - Curved section transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 * - Wildcard: Scales of justice icon accent
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const }
  }
};

export function HomePageV16() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Nordic calm parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const imageY = useTransform(smoothProgress, [0, 0.4], [0, 40]);
  const quoteY = useTransform(smoothProgress, [0.3, 0.6], [50, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      {/* Header - Ultra-minimal Scandinavian: Logo LEFT as simple text, nav RIGHT */}
      <motion.header
        className="py-8 px-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.span
            className="text-lg font-light text-stone-800 tracking-wide"
            whileHover={{ scale: 1.02 }}
          >
            course tutor
          </motion.span>
          <nav className="flex gap-12 text-sm font-light text-stone-500">
            <Link to="/courses" className="hover:text-stone-900 transition-colors">courses</Link>
            <Link to="/about" className="hover:text-stone-900 transition-colors">about</Link>
            <Link to="/help" className="hover:text-stone-900 transition-colors">help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-stone-900 transition-colors">
              {isAuthenticated ? "dashboard" : "sign in"}
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Centered with lots of whitespace, single line headline */}
      <section className="py-32 px-4">
        <motion.div
          style={{ y: heroY }}
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-light text-stone-800 mb-16 leading-relaxed"
          >
            Simple learning, meaningful progress
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-stone-500 mb-6 max-w-lg mx-auto leading-relaxed">
            Clean, focused courses designed to help you learn without distractions.
            <span className="block mt-4 font-medium text-stone-700">87% of our graduates advance their careers.</span>
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm text-stone-400 mb-16">
            ★★★★★ 4.8/5 from 50,000+ reviews • <span className="text-emerald-600 font-medium">FREE to start</span>
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6">
                    Continue Learning →
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6">
                      Start Free Today →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-100 rounded-none px-12 py-6">
                      View Courses
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Image section with parallax */}
      <section className="px-4 pb-24">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 overflow-hidden"
          style={{ y: imageY }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop"
            alt="Minimal workspace"
            className="w-full h-80 object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Focused Content', desc: 'Every lesson serves a purpose. No filler, no fluff. 500+ courses crafted by experts.' },
              { title: 'Clear Progress', desc: 'See exactly where you are and where you\'re going. Celebrate every milestone.' },
              { title: 'Calm Environment', desc: 'A distraction-free space for deep learning. Learn at your own pace.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-8 h-px bg-stone-300 mb-6"
                  whileHover={{ width: 48 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-lg font-medium text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#fafaf9"
            d="M0,40L60,35C120,30,240,20,360,20C480,20,600,30,720,40C840,50,960,50,1080,45C1200,40,1320,30,1380,25L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Quote with parallax */}
      <section className="py-24 px-4 bg-stone-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          style={{ y: quoteY }}
        >
          <motion.div
            className="text-4xl mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.blockquote
            className="text-2xl font-light text-stone-600 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            "Simplicity is the ultimate sophistication."
          </motion.blockquote>
          <cite className="text-sm text-stone-400 mt-4 block">— Leonardo da Vinci</cite>
        </motion.div>
      </section>

      {/* Stats with curved section */}
      <div className="relative bg-stone-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#e7e5e4"
            d="M0,30L80,35C160,40,320,50,480,50C640,50,800,40,960,30C1120,20,1280,20,1360,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-stone-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '100K+', label: 'Happy Learners' },
              { value: '500+', label: 'Focused Courses' },
              { value: '87%', label: 'Career Success' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl font-light text-stone-800"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" as const }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs tracking-widest text-stone-500 mt-2">{stat.label.toUpperCase()}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="relative bg-stone-200">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-4xl mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💬
          </motion.div>
          <blockquote className="text-lg text-stone-600 mb-6">
            "The minimalist approach helped me focus on what matters. I learned more in 3 months than a year of scattered online tutorials."
          </blockquote>
          <div className="text-stone-800 font-medium">— Emma S., UX Designer at Spotify</div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-light text-stone-800 mb-4">Ready to begin?</h2>
          <p className="text-stone-500 mb-4">Start your learning journey today. Join 100,000+ focused learners.</p>
          <p className="text-sm text-stone-400 mb-8">
            <span className="text-emerald-600 font-medium">✓ Free to start</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6">
                {isAuthenticated ? "Browse Courses" : "Start Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-stone-400">
          <motion.span whileHover={{ scale: 1.02 }}>Course Tutor</motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-stone-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-stone-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-stone-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={16} />
    </div>
  );
}
