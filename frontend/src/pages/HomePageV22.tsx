/**
 * VARIANT 22: MONO / DUOTONE (Light Theme)
 * - Single accent color with parallax
 * - Black, white, and emerald
 * - High contrast
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
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

export function HomePageV22() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Duotone parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const lineWidth = useTransform(smoothProgress, [0, 0.2], [64, 128]);
  const featuresY = useTransform(smoothProgress, [0.2, 0.5], [60, 0]);
  const imageY = useTransform(smoothProgress, [0.4, 0.7], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - High contrast black/white, logo prominent */}
      <motion.header
        className="py-8 px-4 bg-black border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 bg-white flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-black font-bold text-xl">CT</span>
              </motion.div>
              <span className="font-bold text-2xl text-white">Course Tutor</span>
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-wider uppercase">
            <Link to="/courses" className="text-white/70 hover:text-emerald-400 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-white/70 hover:text-emerald-400 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-white/70 hover:text-emerald-400 transition-colors font-medium">Help</Link>
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-white/70 hover:text-white transition-colors hidden sm:block text-xs uppercase tracking-wider">
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-white hover:bg-emerald-400 text-black font-bold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero - Large monochrome image with contrasting text box */}
      <section className="relative h-[600px] md:h-[700px]">
        {/* Large monochrome background image */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop"
            alt="Learning"
            className="w-full h-full object-cover mix-blend-luminosity opacity-30"
            style={{ y: heroY }}
          />
        </motion.div>

        {/* Contrasting text overlay box */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            className="bg-white p-12 md:p-16 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <motion.span
                className="inline-block h-1 bg-black w-20"
                style={{ width: lineWidth }}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="text-xs text-black font-bold mb-6 tracking-[0.2em] uppercase">
              100,000+ Learners • 87% Career Success
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-black mb-8 leading-none"
            >
              Learn skills that{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="relative z-10 bg-emerald-500 text-white px-3">matter</span>
              </motion.span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-800 mb-6 font-medium">
              Focused courses designed for real-world application. No fluff, just the knowledge you need.
              <span className="font-bold text-black"> 500+ expert-led courses.</span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm text-gray-600 mb-10">
              ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-bold">FREE to start</span>
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-10 py-6 font-bold">
                      Dashboard →
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-black hover:bg-gray-900 text-white px-10 py-6 font-bold">
                        Start Free →
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" variant="outline" className="border-black border-2 hover:bg-black hover:text-white px-10 py-6 font-bold">
                        View Courses
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f9fafb"
            d="M0,30L120,35C240,40,480,50,720,50C960,50,1200,40,1320,35L1440,30L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-wrap justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '100,000+', label: 'Active learners' },
              { value: '500+', label: 'Expert courses' },
              { value: '87%', label: 'Career advancement' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="text-3xl font-bold text-gray-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" as const }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="relative bg-gray-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Features */}
      <section className="py-24 px-4">
        <motion.div
          style={{ y: featuresY }}
          className="max-w-6xl mx-auto px-4 md:px-6"
        >
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block w-8 h-1 bg-emerald-500 mb-6"
              whileHover={{ width: 64 }}
            />
            <h2 className="text-3xl font-bold text-gray-900">
              What <span className="relative inline-block px-2 py-1">
                <span className="relative z-10">you</span>
                {/* Simple skewed marker highlight */}
                <motion.span
                  className="absolute inset-0 bg-emerald-300/60"
                  style={{
                    borderRadius: '3px 7px 4px 6px',
                    transform: 'rotate(-1.5deg) skewX(-4deg) scaleX(1.15)'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
              </span> get
            </h2>
          </motion.div>

          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Structured curriculum', desc: 'Clear learning paths from beginner to expert. Know exactly what to learn next.' },
              { title: 'Hands-on projects', desc: 'Apply what you learn with real-world exercises. Build a portfolio that impresses employers.' },
              { title: 'Expert feedback', desc: 'Get guidance from experienced professionals who\'ve worked at top companies.' },
              { title: 'Verified certificates', desc: 'Prove your skills with industry-recognized credentials. Stand out in job applications.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex gap-8 items-start"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <motion.div
                  className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold flex-shrink-0"
                  whileHover={{ backgroundColor: '#10b981', color: '#ffffff' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Course Categories */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block w-8 h-1 bg-emerald-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">Popular categories</h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { name: 'Web Development', count: '120+ courses' },
              { name: 'Data Science', count: '85+ courses' },
              { name: 'Design', count: '60+ courses' },
              { name: 'Business', count: '45+ courses' },
            ].map((category, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span className="inline-block w-8 h-1 bg-emerald-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { step: '01', title: 'Watch lessons', desc: 'Learn from expert-led video courses at your own pace.' },
              { step: '02', title: 'Do projects', desc: 'Apply what you learn with hands-on exercises and real-world projects.' },
              { step: '03', title: 'Get certified', desc: 'Earn certificates to prove your skills to employers.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative"
              >
                <span className="text-6xl font-bold text-emerald-100">{item.step}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image section with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ecfdf5"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-emerald-50">
        <motion.div
          style={{ y: imageY }}
          className="max-w-6xl mx-auto px-4 md:px-6"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block w-8 h-1 bg-emerald-500 mb-6"
                whileHover={{ width: 64 }}
              />
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Learn by <span className="relative inline-block px-1">
                  <span className="relative z-10">doing</span>
                  {/* Simple skewed underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-emerald-400/50"
                    style={{
                      transform: 'skewX(-4deg)',
                      borderRadius: '1px 3px 2px 4px'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </span>
              </h2>
              <p className="text-slate-600 mb-4">
                Our courses emphasize practical application. Every concept is reinforced
                with exercises and real-world projects. 87% of our students get hired within 6 months.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                <span className="text-emerald-600 font-medium">✓ Free to start</span> • No credit card required
              </p>
              <Link to="/courses">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Explore Courses →
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=400&fit=crop"
                alt="Learning"
                className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <div className="relative bg-emerald-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Testimonial */}
      <section className="py-24 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-4xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💬
          </motion.div>
          <blockquote className="text-2xl font-light text-gray-700 mb-8">
            "The focused approach helped me learn faster than any other platform. I landed my dream job at Amazon in just 4 months."
          </blockquote>
          <div>
            <div className="font-semibold text-gray-900">Michael Torres</div>
            <div className="text-gray-500">Senior Engineer at Amazon</div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#10b981"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-emerald-500">
        <motion.div
          className="max-w-2xl mx-auto text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Start learning today
          </motion.h2>
          <p className="text-emerald-100 mb-4">
            Join 100,000+ learners advancing their careers with focused learning.
          </p>
          <p className="text-sm text-emerald-200 mb-10">
            <span className="text-yellow-300 font-medium">✓ Free to start</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-white text-emerald-500 hover:bg-gray-100 px-12 py-6">
                {isAuthenticated ? "Browse Courses" : "Get Started Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-gray-500">
          <motion.span className="font-semibold text-gray-900" whileHover={{ scale: 1.02 }}>
            Course Tutor
          </motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-emerald-500 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-emerald-500 transition-colors">About</Link>
            <Link to="/help" className="hover:text-emerald-500 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={22} />
    </div>
  );
}
