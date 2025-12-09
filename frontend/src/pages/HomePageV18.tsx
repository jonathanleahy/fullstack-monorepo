/**
 * VARIANT 18: SWISS / INTERNATIONAL (Light Theme) - Nonprofit Theme
 * - Strong grid system with parallax
 * - Sans-serif typography
 * - Red/black/white palette on light background
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 * - Wildcard: Heart/community icon floating
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

export function HomePageV18() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Swiss precision parallax
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const statsY = useTransform(smoothProgress, [0, 0.3], [0, 20]);
  const imageY = useTransform(smoothProgress, [0.3, 0.6], [50, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50 text-black">
      {/* Header - Swiss Grid-based: Logo in grid cell, nav in separate grid area */}
      <motion.header
        className="border-b-2 border-black bg-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 border-l-2 border-black">
            <motion.div
              className="col-span-3 border-r-2 border-black p-4 flex items-center"
              whileHover={{ backgroundColor: '#fef2f2' }}
            >
              <motion.span
                className="text-xl font-bold tracking-tight"
                whileHover={{ scale: 1.02 }}
              >
                Course Tutor
              </motion.span>
            </motion.div>
            <nav className="col-span-9 flex items-center">
              <div className="grid grid-cols-4 w-full h-full">
                <Link to="/courses" className="flex items-center justify-center border-r-2 border-black hover:bg-red-50 transition-colors">
                  <span className="text-sm font-medium">Courses</span>
                </Link>
                <Link to="/about" className="flex items-center justify-center border-r-2 border-black hover:bg-red-50 transition-colors">
                  <span className="text-sm font-medium">About</span>
                </Link>
                <Link to="/help" className="flex items-center justify-center border-r-2 border-black hover:bg-red-50 transition-colors">
                  <span className="text-sm font-medium">Help</span>
                </Link>
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                  <span className="text-sm font-bold">{isAuthenticated ? "Dashboard" : "Login"}</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero - Strong typography hierarchy aligned to grid */}
      <section className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 border-l-2 border-black">
            <motion.div
              style={{ y: heroY }}
              className="col-span-12 lg:col-span-8 p-12 lg:p-20 border-r-2 border-black"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-8 gap-4 mb-8">
                <div className="col-span-1 flex items-start pt-1">
                  <motion.svg
                    className="w-8 h-8 text-red-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </motion.svg>
                </div>
                <div className="col-span-7">
                  <span className="text-xs text-red-600 font-bold tracking-wider">
                    ONLINE EDUCATION • 100,000+ LEARNERS
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-8 gap-4">
                <div className="col-span-8">
                  <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-12">
                    <motion.span whileHover={{ x: 5 }} className="block">Learn</motion.span>
                    <motion.span whileHover={{ x: 10 }} className="block">better.</motion.span>
                    <motion.span
                      whileHover={{ x: 15 }}
                      className="block text-red-600"
                    >
                      Faster.
                    </motion.span>
                  </motion.h1>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-8 gap-4 mb-8">
                <div className="col-span-1"></div>
                <div className="col-span-7">
                  <motion.p className="text-xl mb-4 leading-tight">
                    Structured courses designed with clarity and purpose.
                    No distractions, just knowledge. <span className="font-bold">87% of graduates advance their careers.</span>
                  </motion.p>
                  <motion.p className="text-sm text-gray-500">
                    ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-bold">FREE to start</span>
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-8 gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-7 flex gap-4">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-black text-white hover:bg-red-600 rounded-none px-10 py-6">
                          Dashboard →
                        </Button>
                      </motion.div>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                          <Button size="lg" className="bg-black text-white hover:bg-red-600 rounded-none px-10 py-6">
                            Start Free →
                          </Button>
                        </motion.div>
                      </Link>
                      <Link to="/courses">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                          <Button size="lg" variant="outline" className="border-2 border-black hover:bg-black hover:text-white rounded-none px-10 py-6">
                            Browse
                          </Button>
                        </motion.div>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: statsY }}
              className="hidden lg:block col-span-4 bg-red-600 p-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="h-full flex flex-col justify-between text-white">
                {[
                  { value: '100K', label: 'Active Students' },
                  { value: '500+', label: 'Expert Courses' },
                  { value: '87%', label: 'Career Success' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-7xl font-bold">{stat.value}</div>
                    <div className="text-sm mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features Grid */}
      <section className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 border-l-2 border-black"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { num: '01', title: 'Structured Learning', desc: 'Clear paths from beginner to expert' },
              { num: '02', title: 'Expert Instructors', desc: 'Learn from industry professionals' },
              { num: '03', title: 'Practical Projects', desc: 'Apply knowledge immediately' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ backgroundColor: '#fef2f2' }}
                className="p-8 border-r-2 border-b-2 md:border-b-0 border-black last:border-b-0 transition-colors"
              >
                <motion.div
                  className="text-sm text-red-600 font-bold mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.num}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image section with parallax */}
      <section className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 border-l-2 border-black">
            <motion.div
              className="col-span-12 lg:col-span-6 border-r-2 border-black overflow-hidden"
              style={{ y: imageY }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team learning"
                className="w-full h-80 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <motion.div
              className="col-span-12 lg:col-span-6 p-8 flex items-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="text-sm text-red-600 font-bold mb-4">WHY US</div>
                <h2 className="text-3xl font-bold mb-4">
                  Function over form
                </h2>
                <p className="text-gray-600 mb-6">
                  We focus on what works. Clear content, logical structure,
                  and measurable results. 87% of our students achieve their career goals.
                </p>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white rounded-none">
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-stone-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💬
          </motion.div>
          <blockquote className="text-xl text-gray-700 mb-6">
            "The structured approach made all the difference. Clear objectives, measurable progress, real results."
          </blockquote>
          <div className="text-red-600 font-bold">— Marcus K., Engineering Manager at Apple</div>
        </motion.div>
      </section>

      {/* CTA with curved top */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="bg-slate-50 text-slate-900">
        <motion.div
          className="max-w-6xl mx-auto px-4 py-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Ready to begin?
          </motion.h2>
          <p className="text-slate-600 mb-4">Join 100,000+ learners advancing their careers.</p>
          <p className="text-sm text-slate-500 mb-8">
            <span className="text-emerald-600 font-bold">✓ Free to start</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-none px-12 py-6">
                {isAuthenticated ? "Browse Courses" : "Get Started Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
          <motion.span className="font-bold" whileHover={{ scale: 1.02 }}>
            Course Tutor © 2024
          </motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-red-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-red-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-red-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={18} />
    </div>
  );
}
