/**
 * VARIANT 20: SPLIT SCREEN (Light Theme) - Fitness Theme
 * - Two-tone design with parallax
 * - High contrast balanced layout
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 * - Wildcard: Energy burst/progress bar accent
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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV20() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Split screen parallax effects
  const leftY = useTransform(smoothProgress, [0, 0.3], [0, -40]);
  const rightY = useTransform(smoothProgress, [0, 0.3], [0, 40]);
  const imageScale = useTransform(smoothProgress, [0.3, 0.6], [1, 1.05]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Header - Fitness/Dynamic: Slanted/italic styling, logo with dynamic element */}
      <motion.header
        className="py-5 px-4 border-b-2 border-emerald-600 bg-stone-50 relative overflow-hidden"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Dynamic energy accent */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-10 h-10 bg-emerald-600 flex items-center justify-center transform -skew-x-12"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-black text-lg transform skew-x-12">CT</span>
            </motion.div>
            <span className="font-black text-2xl text-stone-900 italic">
              Course Tutor
            </span>
          </motion.div>
          <nav className="flex gap-8 text-sm text-stone-600 items-center">
            <Link to="/courses" className="hover:text-emerald-600 transition-colors font-semibold italic">Courses</Link>
            <Link to="/about" className="hover:text-emerald-600 transition-colors font-semibold italic">About</Link>
            <Link to="/help" className="hover:text-emerald-600 transition-colors font-semibold italic">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold italic px-6 py-2 transform -skew-x-6">
                  <span className="block transform skew-x-6">{isAuthenticated ? "Dashboard" : "Sign In"}</span>
                </Button>
              </motion.div>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - True Split Screen: 50% image, 50% content with overlap element */}
      <section className="min-h-screen flex flex-col lg:flex-row relative">
        {/* Left - Image (50%) */}
        <motion.div
          style={{ y: leftY }}
          className="lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=1200&fit=crop"
            alt="Fitness learning"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-900/20" />
        </motion.div>

        {/* Right - Content (50%) */}
        <motion.div
          style={{ y: rightY }}
          className="lg:w-1/2 bg-stone-50 flex items-center justify-center p-8 lg:p-16 relative"
        >
          <motion.div
            className="max-w-md relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <motion.svg
                  className="w-10 h-10 text-emerald-600"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </motion.svg>
                <span className="text-xs text-stone-500 tracking-widest font-bold italic">
                  100,000+ LEARNERS • 87% SUCCESS
                </span>
              </div>
              <motion.div
                className="relative h-3 bg-stone-200 overflow-hidden transform -skew-x-12"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: "87%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-black text-stone-900 leading-tight mb-8 italic"
            >
              <motion.span
                className="block"
                whileHover={{ x: 8, skewX: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                Learn
              </motion.span>
              <motion.span
                className="block text-emerald-600"
                whileHover={{ x: 12, skewX: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                without
              </motion.span>
              <motion.span
                className="block"
                whileHover={{ x: 16, skewX: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                limits
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-stone-600 mb-4 leading-relaxed">
              Access world-class courses from anywhere. Your journey to mastery starts here.
              <span className="font-bold text-stone-800"> 500+ expert-led courses.</span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm text-stone-500 mb-10">
              ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-bold">FREE to start</span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div whileHover={{ scale: 1.05, skewX: -3 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-stone-900 text-white hover:bg-emerald-600 px-10 py-7 font-bold italic">
                      Dashboard →
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05, skewX: -3 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-stone-900 text-white hover:bg-emerald-600 px-10 py-7 font-bold italic">
                        Get Started Free →
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05, skewX: -3 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" variant="outline" className="border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-10 py-7 font-bold italic">
                        Browse
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Overlap element - energy burst crossing the split */}
          <motion.div
            className="hidden lg:block absolute -left-24 top-1/2 transform -translate-y-1/2 w-48 h-48 z-20"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.8, duration: 1.5, type: "spring" }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 bg-emerald-500 transform -skew-x-12"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute inset-4 bg-white transform -skew-x-12 flex items-center justify-center">
                <motion.svg
                  className="w-20 h-20 text-emerald-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </motion.svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>
      <section className="flex flex-col lg:flex-row bg-white">
        <motion.div
          className="lg:w-1/2 p-8 lg:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-stone-900 mb-6">
              What you get
            </motion.h2>
            <motion.ul className="space-y-4" variants={itemVariants}>
              {[
                'Unlimited course access',
                'Expert-led instruction',
                'Hands-on projects',
                'Completion certificates',
                'Community of 100K+ learners',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-stone-600"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-stone-900 rounded-full"
                    whileHover={{ scale: 1.5, backgroundColor: '#10b981' }}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 overflow-hidden"
          style={{ scale: imageScale }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
            alt="Learning"
            className="w-full h-full object-cover min-h-[400px]"
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </section>

      {/* Quote - Split */}
      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
            alt="Students"
            className="w-full h-full object-cover min-h-[400px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <motion.div
          className="lg:w-1/2 bg-stone-100 p-8 lg:p-16 flex items-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-4xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💬
            </motion.div>
            <blockquote className="text-2xl font-light text-stone-700 mb-6">
              "The best investment you can make is in yourself."
            </blockquote>
            <cite className="text-stone-500">— Warren Buffett</cite>
          </div>
        </motion.div>
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
            className="text-5xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🚀
          </motion.div>
          <blockquote className="text-xl text-stone-700 mb-6">
            "I went from complete beginner to senior engineer in 8 months. The split approach - learning theory and applying it immediately - was game-changing."
          </blockquote>
          <div className="text-stone-900 font-medium">— David M., Senior Engineer at Amazon</div>
        </motion.div>
      </section>

      {/* CTA - Split with curved top */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f5f5f4"
            d="M0,30L60,35C120,40,240,50,360,50C480,50,600,40,720,30C840,20,960,20,1080,25C1200,30,1320,40,1380,45L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="flex flex-col lg:flex-row">
        <motion.div
          className="lg:w-1/2 bg-stone-100 p-8 lg:p-16 flex items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Ready to start?</h2>
            <p className="text-stone-600 mb-4">
              Join 100,000+ learners already advancing their careers.
            </p>
            <p className="text-sm text-stone-500 mb-8">
              <span className="text-emerald-600 font-medium">✓ Free to start</span> • No credit card • Cancel anytime
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-stone-900 text-white hover:bg-stone-800 px-10 py-6">
                  {isAuthenticated ? "Browse Courses" : "Start Free"} →
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 bg-stone-50 p-8 lg:p-16 flex items-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <div className="text-sm text-stone-500 mb-4">TRUSTED BY LEARNERS AT</div>
            <motion.div
              className="flex flex-wrap justify-center gap-8 text-xl font-bold text-stone-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {['Google', 'Amazon', 'Meta', 'Apple'].map((name, i) => (
                <motion.span
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, color: '#1c1917' }}
                  className="cursor-default transition-colors"
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <motion.span className="font-bold text-stone-900" whileHover={{ scale: 1.02 }}>
            Course Tutor
          </motion.span>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link to="/courses" className="hover:text-stone-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-stone-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-stone-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={20} />
    </div>
  );
}
