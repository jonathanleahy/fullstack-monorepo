/**
 * VARIANT 17: JAPANESE / ZEN (Light Theme) - Small Business Theme
 * - Asymmetric balance with parallax
 * - Plenty of white space
 * - Subtle accent colors
 * - Curved mindful transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 * - Wildcard: ROI calculator preview with bold numbers
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
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

export function HomePageV17() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Zen parallax effects - slow and deliberate
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -40]);
  const badgeY = useTransform(smoothProgress, [0, 0.3], [0, -20]);
  const quoteY = useTransform(smoothProgress, [0.4, 0.7], [60, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      {/* Header - Japanese/Zen: Horizontal with red accent */}
      <motion.header
        className="py-6 px-4 border-b border-red-400 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-1 h-12 bg-red-400" />
              <span className="text-2xl font-light text-stone-800 tracking-wide">
                Course Tutor
              </span>
            </motion.div>
          </Link>
          <nav className="flex gap-10 text-sm text-stone-600 items-center">
            <Link to="/courses" className="hover:text-red-600 transition-colors font-light">Courses</Link>
            <Link to="/about" className="hover:text-red-600 transition-colors font-light">About</Link>
            <Link to="/help" className="hover:text-red-600 transition-colors font-light">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="sm"
                  variant={isAuthenticated ? "default" : "ghost"}
                  className={isAuthenticated
                    ? "bg-stone-800 hover:bg-red-600 text-white rounded-none px-6 py-2"
                    : "text-stone-600 hover:text-red-600 rounded-none px-6 py-2"
                  }
                >
                  {isAuthenticated ? "Dashboard" : "Sign In"}
                </Button>
              </motion.div>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Asymmetric: Text RIGHT with empty space LEFT (Zen aesthetic) */}
      <section className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* LEFT - Empty space with subtle accent */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <motion.div
                className="w-24 h-px bg-red-400"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>

            {/* RIGHT - Content */}
            <motion.div
              style={{ y: heroY }}
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-light text-stone-800 mb-10 leading-tight"
              >
                The path to
                <motion.span
                  className="block font-medium mt-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  mastery
                </motion.span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-stone-500 mb-6 leading-relaxed max-w-xl">
                Learning is a journey, not a destination. Take each step mindfully and
                progress will follow naturally. <span className="font-medium text-stone-700">87% of our students achieve their career goals.</span>
              </motion.p>
              <motion.p variants={itemVariants} className="text-sm text-stone-400 mb-12">
                ★★★★★ 4.9/5 • 100,000+ learners • <span className="text-emerald-600 font-medium">FREE to start</span>
              </motion.p>
              <motion.div variants={itemVariants} className="flex gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-stone-800 hover:bg-red-600 text-white rounded-none px-10 py-6">
                        Continue Path →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-stone-800 hover:bg-red-600 text-white rounded-none px-10 py-6">
                          Begin Free →
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" variant="ghost" className="text-stone-600 hover:text-red-600 rounded-none px-10 py-6">
                          Explore
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </motion.div>

              {/* ROI Badge - repositioned */}
              <motion.div
                style={{ y: badgeY }}
                className="mt-16 bg-white p-6 shadow-lg border border-red-100 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-xs text-red-600 font-medium mb-2">ROI CALCULATOR</div>
                <motion.div
                  className="text-4xl font-bold text-emerald-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" as const }}
                >
                  3.2x
                </motion.div>
                <div className="text-xs text-stone-500 mt-1">Avg. salary increase</div>
                <div className="mt-3 pt-3 border-t border-stone-200">
                  <div className="text-2xl font-bold text-stone-800">$47K</div>
                  <div className="text-xs text-stone-400">first-year gains</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Philosophy section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="text-red-400 text-sm tracking-widest mb-4">PHILOSOPHY</div>
              <h2 className="text-3xl font-light text-stone-800 mb-6">
                Less, but better
              </h2>
              <p className="text-stone-500 leading-relaxed">
                We believe in quality over quantity. Each of our 500+ courses is carefully crafted
                to deliver maximum value with minimum waste. Focus on what matters.
              </p>
            </motion.div>
            <motion.div className="space-y-8" variants={itemVariants}>
              {[
                { title: 'Clarity', desc: 'Clear objectives, clear outcomes' },
                { title: 'Depth', desc: 'Understanding over memorization' },
                { title: 'Practice', desc: 'Knowledge through application' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <motion.div
                    className="w-px bg-stone-200"
                    whileHover={{ backgroundColor: '#f87171' }}
                  />
                  <div>
                    <h3 className="text-stone-800 font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image break with parallax quote */}
      <section className="relative h-96 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-stone-900/30" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ y: quoteY }}
        >
          <motion.blockquote
            className="text-white text-2xl md:text-3xl font-light text-center max-w-2xl px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "A journey of a thousand miles begins with a single step."
          </motion.blockquote>
        </motion.div>
      </section>

      {/* Stats with curved section */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#fafaf9"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-32 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            className="grid grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '500+', label: 'Courses' },
              { value: '87%', label: 'Success Rate' },
              { value: '4.9★', label: 'Rating' },
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
                <div className="text-xs text-stone-400 tracking-wider mt-2">{stat.label.toUpperCase()}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <blockquote className="text-lg text-stone-600 mb-6">
            "The mindful approach transformed how I learn. I went from scattered tutorials to focused mastery. Now I'm a lead developer."
          </blockquote>
          <div className="text-stone-800 font-medium">— Kenji T., Tech Lead at Nintendo</div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f5f5f4"
            d="M0,30L80,35C160,40,320,50,480,50C640,50,800,40,960,30C1120,20,1280,20,1360,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-32 px-4 bg-stone-100">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-12 h-px bg-red-400 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
          />
          <h2 className="text-3xl font-light text-stone-800 mb-4">
            Begin your journey
          </h2>
          <p className="text-stone-500 mb-4">
            The first step is often the hardest. We're here to guide 100,000+ learners.
          </p>
          <p className="text-sm text-stone-400 mb-10">
            <span className="text-emerald-600 font-medium">✓ Free to start</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6">
                {isAuthenticated ? "View Courses" : "Start Now"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-stone-400">
          <motion.span whileHover={{ scale: 1.02 }}>Course Tutor</motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-stone-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-stone-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-stone-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={17} />
    </div>
  );
}
