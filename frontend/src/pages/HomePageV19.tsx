/**
 * VARIANT 19: BAUHAUS / MODERNIST (Light Theme) - Gamers Theme
 * - Primary colors (red, yellow, blue) on light background
 * - Geometric shapes with parallax
 * - Strong typography
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 * - Wildcard: Glowing neon accent, achievement badge
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV19() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Bauhaus geometric parallax
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const blueBlockY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const yellowBlockY = useTransform(smoothProgress, [0, 0.5], [0, -50]);
  const redCircleY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const rotateShape = useTransform(smoothProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-100">
      {/* Header - Bauhaus: Geometric shapes integrated, bold primary colors */}
      <motion.header
        className="py-5 px-4 bg-stone-100 relative z-20 overflow-hidden"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Geometric accent shapes */}
        <div className="absolute top-0 left-0 w-16 h-full bg-red-500" />
        <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-400" />
        <div className="absolute bottom-0 right-1/4 w-8 h-8 bg-blue-500 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center relative z-10">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-slate-900 flex items-center justify-center">
              <span className="text-white font-black text-lg">CT</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              COURSE TUTOR
            </span>
          </motion.div>
          <nav className="flex gap-10 items-center text-sm font-bold">
            <Link to="/courses" className="hover:text-blue-600 transition-colors relative group">
              COURSES
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link to="/about" className="hover:text-red-500 transition-colors relative group">
              ABOUT
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link to="/help" className="hover:text-yellow-600 transition-colors relative group">
              HELP
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="bg-slate-900 text-white px-8 py-3 hover:bg-blue-600 transition-colors font-black"
            >
              {isAuthenticated ? "DASHBOARD" : "SIGN IN"}
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Overlapping geometric shapes with text integrated */}
      <section className="min-h-screen relative overflow-hidden bg-stone-100">
        {/* Geometric shapes with parallax - overlapping design */}
        <motion.div
          style={{ y: blueBlockY }}
          className="absolute top-0 right-0 w-2/5 h-3/4 bg-blue-500 z-0"
        />
        <motion.div
          style={{ y: yellowBlockY, rotate: rotateShape }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-400 z-0"
        />
        <motion.div
          style={{ y: redCircleY }}
          className="absolute top-1/3 right-1/3 w-40 h-40 bg-red-500 rounded-full z-0"
        />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 w-full">
            <motion.div
              className="max-w-3xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <motion.div
                  className="relative"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-16 bg-white flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-black px-2 py-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    +1
                  </motion.div>
                </motion.div>
                <div className="bg-white px-6 py-3">
                  <span className="text-xs font-black text-red-600 tracking-widest">
                    100,000+ LEARNERS • 87% CAREER SUCCESS
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-7xl md:text-9xl font-black leading-none mb-10 mix-blend-multiply"
              >
                <motion.span
                  className="block bg-white inline-block px-6 py-2"
                  whileHover={{ x: 10, rotate: -1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  LEARN
                </motion.span>
                <motion.span
                  className="block text-blue-600 bg-white inline-block px-6 py-2 mt-2"
                  whileHover={{ x: 15, rotate: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  CREATE
                </motion.span>
                <motion.span
                  className="block bg-white inline-block px-6 py-2 mt-2"
                  whileHover={{ x: 20, rotate: -1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  GROW
                </motion.span>
              </motion.h1>

              <motion.div variants={itemVariants} className="bg-white p-6 max-w-xl mb-8">
                <p className="text-xl text-stone-600 mb-3 font-medium">
                  Education designed with purpose. Every element serves a function. 500+ courses to master any skill.
                </p>
                <p className="text-sm text-stone-500">
                  ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-bold">FREE to start</span>
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-slate-900 text-white hover:bg-blue-600 rounded-none px-12 py-7 text-lg font-black">
                        DASHBOARD →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-slate-900 text-white hover:bg-blue-600 rounded-none px-12 py-7 text-lg font-black">
                          START FREE →
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-none px-12 py-7 text-lg font-black">
                          EXPLORE
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { color: 'bg-red-500', title: 'STRUCTURE', desc: 'Organized curriculum for optimal learning. Clear paths from beginner to expert.' },
              { color: 'bg-yellow-400', title: 'PRACTICE', desc: 'Hands-on projects to apply knowledge. Build portfolio-worthy work.' },
              { color: 'bg-blue-500', title: 'MASTERY', desc: 'Deep understanding through repetition. 87% career advancement rate.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative"
              >
                <motion.div
                  className={`${item.color} h-4`}
                  whileHover={{ height: 24 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-8 border-b border-r border-stone-200 last:border-r-0">
                  <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                  <p className="text-stone-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats with curved geometric section */}
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f1f5f9"
            d="M0,30L60,35C120,40,240,50,360,50C480,50,600,40,720,30C840,20,960,20,1080,25C1200,30,1320,40,1380,45L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-slate-100 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            className="grid grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '100K+', label: 'STUDENTS' },
              { value: '500+', label: 'COURSES' },
              { value: '87%', label: 'SUCCESS RATE' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-black"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" as const }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm tracking-widest text-slate-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="relative bg-slate-100">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f5f5f4"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Philosophy */}
      <section className="py-24 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div
                className="w-32 h-32 bg-red-500 rounded-full mb-8"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-4xl font-black mb-6">FORM FOLLOWS FUNCTION</h2>
              <p className="text-stone-600 mb-6">
                Every element of our courses serves a purpose. We eliminate the unnecessary
                to focus on what truly matters: your learning. Join 100,000+ who've transformed their careers.
              </p>
              <Link to="/courses">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-slate-900 text-white hover:bg-blue-600 rounded-none font-bold">
                    VIEW COURSES
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                className="aspect-square bg-yellow-400 relative"
                whileHover={{ rotate: 2 }}
              >
                <motion.div
                  className="absolute inset-8 bg-blue-500"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.div
                  className="absolute inset-16 bg-white flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-6xl font-black">CT</span>
                </motion.div>
              </motion.div>
            </motion.div>
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
            className="text-5xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎨
          </motion.div>
          <blockquote className="text-xl text-stone-700 mb-6">
            "The purposeful design helped me learn faster than anywhere else. Now I'm a lead designer at a major tech company."
          </blockquote>
          <div className="text-blue-600 font-bold">— Sarah L., Design Lead at Figma</div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#3b82f6"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-blue-500 text-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            BEGIN TODAY
          </motion.h2>
          <p className="text-blue-100 mb-4">
            Join 100,000+ learning with purpose and intention.
          </p>
          <p className="text-sm text-blue-200 mb-10">
            <span className="text-yellow-400 font-bold">✓ Free to start</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-none px-12 py-6 text-lg font-black">
                {isAuthenticated ? "BROWSE COURSES" : "GET STARTED FREE"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <motion.span className="font-black text-xl" whileHover={{ scale: 1.02 }}>
            COURSE TUTOR
          </motion.span>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-yellow-400 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link to="/help" className="hover:text-yellow-400 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={19} />
    </div>
  );
}
