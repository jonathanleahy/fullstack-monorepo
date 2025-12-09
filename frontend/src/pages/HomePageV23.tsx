/**
 * VARIANT 23: ARCHITECT / BLUEPRINT (Light Theme)
 * - Technical precision with parallax
 * - Grid lines visible
 * - Blueprint aesthetic
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

export function HomePageV23() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Blueprint parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.5], [0.03, 0.06]);
  const specsY = useTransform(smoothProgress, [0.1, 0.4], [40, 0]);
  const imageY = useTransform(smoothProgress, [0.3, 0.6], [60, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 relative">
      {/* Grid background with parallax opacity */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: gridOpacity
        }}
      />

      {/* Header - Technical drawing aesthetic, thin lines, precise spacing */}
      <motion.header
        className="border-b border-slate-300 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 border-x border-slate-200">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Logo with technical drawing style */}
            <div className="col-span-3 border-r border-dashed border-slate-300 pr-4">
              <motion.div
                className="font-mono text-xs font-bold text-slate-900 tracking-tight"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-[10px] text-slate-400 mb-1">PROJECT:</div>
                <div>COURSE_TUTOR</div>
                <div className="text-[8px] text-slate-400 mt-1">v2.0.0</div>
              </motion.div>
            </div>

            {/* Navigation with precise spacing */}
            <nav className="col-span-6 flex justify-center gap-12 text-[11px] font-mono text-slate-600 tracking-wide">
              <Link to="/courses" className="hover:text-slate-900 transition-colors uppercase border-b border-transparent hover:border-slate-900 pb-1">Courses</Link>
              <Link to="/about" className="hover:text-slate-900 transition-colors uppercase border-b border-transparent hover:border-slate-900 pb-1">About</Link>
              <Link to="/help" className="hover:text-slate-900 transition-colors uppercase border-b border-transparent hover:border-slate-900 pb-1">Help</Link>
            </nav>

            {/* Auth section */}
            <div className="col-span-3 border-l border-dashed border-slate-300 pl-4 text-right">
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="font-mono text-[11px] text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wide">
                {isAuthenticated ? "Dashboard_→" : "Login_→"}
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero - Blueprint grid with technical annotations */}
      <section className="py-24 px-4 relative border-b border-slate-200">
        <motion.div
          style={{ y: heroY }}
          className="max-w-6xl mx-auto px-4 md:px-6 border-x border-slate-200 px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Technical annotation style */}
          <motion.div variants={itemVariants} className="font-mono text-[10px] text-slate-400 mb-8 flex items-center gap-4">
            <span className="border border-slate-300 px-2 py-1">NOTE_01</span>
            <span>ONLINE EDUCATION PLATFORM • 100,000+ LEARNERS • 87% SUCCESS RATE</span>
          </motion.div>

          {/* Title positioned like technical drawing labels */}
          <div className="relative mb-12">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
            >
              <motion.span
                className="block relative"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="absolute -left-12 top-0 font-mono text-[10px] text-slate-400">A1</span>
                Build your
              </motion.span>
              <motion.span
                className="block text-slate-400 relative"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="absolute -left-12 top-0 font-mono text-[10px] text-slate-400">A2</span>
                knowledge
              </motion.span>
              <motion.span
                className="block relative"
                whileHover={{ x: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="absolute -left-12 top-0 font-mono text-[10px] text-slate-400">A3</span>
                foundation
              </motion.span>
            </motion.h1>

            {/* Technical dimension lines */}
            <motion.div
              className="absolute -right-8 top-0 bottom-0 w-px bg-slate-300"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute -right-8 top-0 w-2 h-px bg-slate-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div
              className="absolute -right-8 bottom-0 w-2 h-px bg-slate-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </div>

          <motion.p variants={itemVariants} className="text-base text-slate-600 mb-4 max-w-xl font-mono border-l-2 border-slate-300 pl-4">
            Structured courses engineered for effective learning.
            Every lesson precisely designed for maximum retention.
          </motion.p>
          <motion.p variants={itemVariants} className="text-xs text-slate-500 mb-12 font-mono">
            ★★★★★ 4.9/5 from 50K+ reviews • <span className="text-emerald-600">FREE_TO_START</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-mono px-10 py-6 rounded-none border border-slate-900">
                    ACCESS_DASHBOARD →
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white font-mono px-10 py-6 rounded-none border border-slate-900">
                      INITIALIZE →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="border-slate-300 font-mono px-10 py-6 rounded-none">
                      VIEW_CATALOG
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Technical specs table */}
          <motion.div
            style={{ y: specsY }}
            className="pt-8 border-t border-slate-300"
          >
            <div className="font-mono text-[10px] text-slate-400 mb-4 flex items-center gap-2">
              <span className="border border-slate-300 px-2 py-1">TABLE_01</span>
              <span>SPECIFICATIONS</span>
            </div>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-slate-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { label: 'COURSES', value: '500+' },
                { label: 'STUDENTS', value: '100K+' },
                { label: 'SUCCESS_RATE', value: '87%' },
                { label: 'UPTIME', value: '99.9%' },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className="font-mono p-4 border-r border-b border-slate-300 last:border-r-0"
                  variants={itemVariants}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                >
                  <div className="text-[10px] text-slate-400 mb-1">{spec.label}</div>
                  <motion.div
                    className="text-xl font-bold text-slate-900"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {spec.value}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,30L120,35C240,40,480,50,720,50C960,50,1200,40,1320,35L1440,30L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="font-mono text-xs text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // CORE FEATURES
          </motion.div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { id: '01', title: 'Structured Learning Paths', desc: 'Clear progression from fundamentals to advanced. 87% of learners complete their courses.' },
              { id: '02', title: 'Practical Exercises', desc: 'Hands-on projects to reinforce concepts. Build a portfolio that impresses employers.' },
              { id: '03', title: 'Progress Tracking', desc: 'Detailed metrics on your learning journey. Know exactly where you stand.' },
              { id: '04', title: 'Certified Completion', desc: 'Industry-recognized credentials. Boost your resume and LinkedIn profile.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex gap-6 items-start border-l-2 border-slate-200 pl-6"
                variants={itemVariants}
                whileHover={{ borderColor: '#0f172a', x: 5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <motion.div
                  className="font-mono text-sm text-slate-400 w-8"
                  whileHover={{ color: '#0f172a' }}
                >
                  {feature.id}
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Image section with parallax */}
      <section className="py-24 px-4 bg-slate-50">
        <motion.div
          style={{ y: imageY }}
          className="max-w-6xl mx-auto px-4 md:px-6"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute -inset-4 border border-dashed border-slate-300"
                whileHover={{ borderColor: '#0f172a' }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                alt="Analytics"
                className="w-full relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-xs text-slate-400 mb-4">// METHODOLOGY</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Engineered for results
              </h2>
              <p className="text-slate-600 mb-4">
                Our curriculum is designed using data-driven methodologies.
                Every element is optimized for knowledge retention and practical application.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                <span className="text-emerald-600 font-mono">✓ FREE_TO_START</span> • No credit card required
              </p>
              <Link to="/courses">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="font-mono border-slate-300">
                    LEARN MORE →
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-slate-50">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="font-mono text-4xl mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {"</>"}
          </motion.div>
          <blockquote className="text-xl text-slate-700 font-mono mb-6">
            "The structured approach helped me go from bootcamp grad to senior engineer in 8 months. The courses are incredibly well-designed."
          </blockquote>
          <div className="font-mono">
            <div className="text-slate-900">Alex_Martinez</div>
            <div className="text-xs text-slate-500">Senior_Engineer @ Meta</div>
          </div>
        </motion.div>
      </section>

      {/* CTA with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f1f5f9"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-slate-100">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-xs text-slate-500 mb-4">// READY TO START?</div>
          <motion.h2
            className="text-3xl font-bold text-slate-900 mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Begin your build
          </motion.h2>
          <p className="text-slate-600 mb-4 font-mono">
            Initialize your learning environment today. Join 100,000+ learners.
          </p>
          <p className="text-sm text-slate-500 mb-10 font-mono">
            <span className="text-emerald-600">✓ FREE_TO_START</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 font-mono px-12 py-6">
                {isAuthenticated ? "ACCESS COURSES" : "CREATE ACCOUNT"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center font-mono text-xs text-slate-500">
          <motion.span whileHover={{ scale: 1.02 }}>COURSE_TUTOR_v2.0</motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">COURSES</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">ABOUT</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">HELP</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={23} />
    </div>
  );
}
