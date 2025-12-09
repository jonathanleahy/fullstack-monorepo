/**
 * VARIANT 39: MASTERCLASS STYLE
 * Inspired by MasterClass premium learning
 * - Cinematic hero video/images
 * - Celebrity instructor emphasis
 * - Premium, luxury feel
 * - Light theme with gold accents
 * - Full-width immersive design
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV39() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const instructorsY = useTransform(smoothProgress, [0.2, 0.4], [80, 0]);
  const featuredScale = useTransform(smoothProgress, [0.3, 0.5], [0.95, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Lora', serif" }}>
      <style>{`
        .shimmer-gold {
          background: linear-gradient(90deg, #c9a227 0%, #f4e5b0 50%, #c9a227 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-gold 3s linear infinite;
        }
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-border {
          border: 1px solid rgba(201, 162, 39, 0.3);
        }
      `}</style>

      {/* Header - Command Palette Style */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold shimmer-gold">
            Course Tutor
          </Link>

          {/* Command palette-style search */}
          <motion.div
            className="flex-1 max-w-2xl mx-8"
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses, instructors, topics..."
                className="w-full pl-12 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent group-hover:bg-white transition-colors"
              />
              <div className="absolute inset-y-0 right-4 flex items-center gap-2 pointer-events-none">
                <kbd className="px-2 py-1 text-xs bg-white border border-slate-300 rounded shadow-sm">Cmd</kbd>
                <kbd className="px-2 py-1 text-xs bg-white border border-slate-300 rounded shadow-sm">K</kbd>
              </div>
            </div>
          </motion.div>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors hidden md:block">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors hidden md:block">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors hidden md:block">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-600 hover:text-slate-900 transition-colors">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-2">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Dashboard Preview */}
      <section className="min-h-screen relative overflow-hidden flex items-center pt-24 px-8 bg-gradient-to-br from-slate-50 to-white">
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto"
          style={{ y: heroY }}
        >
          {/* Quick stats dashboard */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-[#c9a227] text-sm tracking-[0.2em] uppercase mb-2"
            >Learn from the best</motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              World-class learning,
              <motion.span className="block shimmer-gold">at your fingertips.</motion.span>
            </motion.h1>
          </motion.div>

          {/* Dashboard-like preview cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Metric Card 1 */}
            <motion.div
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500 font-medium">Total Classes</span>
                <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">150+</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span>+12 this month</span>
              </div>
            </motion.div>

            {/* Metric Card 2 */}
            <motion.div
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500 font-medium">Active Students</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">2.4M</div>
              <div className="text-xs text-slate-500">Across all classes</div>
            </motion.div>

            {/* Metric Card 3 */}
            <motion.div
              className="bg-gradient-to-br from-[#c9a227] to-[#8b6f1f] rounded-xl p-6 shadow-lg text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(201, 162, 39, 0.3)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium opacity-90">Your Progress</span>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-xs opacity-90">Average completion</div>
            </motion.div>
          </div>

          {/* Quick actions */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isAuthenticated ? (
              <Link to="/courses">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-4 text-lg font-semibold">
                    Browse Classes
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-4 text-lg font-semibold">
                      Get All-Access
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 162, 39, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="gold-border bg-transparent hover:bg-slate-50 text-slate-900 px-10 py-4 text-lg">
                      View Classes
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          <motion.p
            className="text-slate-500 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Join 2.4M+ students learning from world-class instructors
          </motion.p>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Instructors */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Your instructors</motion.h2>
          <motion.p
            className="text-slate-600 text-center mb-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Learn directly from the people who've achieved extraordinary things in their fields.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ y: instructorsY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Gordon Ramsay', field: 'Cooking', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face' },
              { name: 'Anna Wintour', field: 'Leadership', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face' },
              { name: 'Hans Zimmer', field: 'Film Scoring', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face' },
              { name: 'Serena Williams', field: 'Tennis', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face' },
            ].map((instructor, i) => (
              <motion.div
                key={i}
                className="relative group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={instructor.img}
                    alt={instructor.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.p
                    className="text-xs text-[#c9a227] uppercase tracking-widest mb-1"
                    whileHover={{ x: 5 }}
                  >{instructor.field}</motion.p>
                  <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Class */}
      <section className="py-24 px-8 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          style={{ scale: featuredScale }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop"
                alt="Featured class"
                className="w-full rounded-lg"
                whileHover={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(201, 162, 39, 0.3)', boxShadow: "0 0 40px rgba(201, 162, 39, 0.4)" }}
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#c9a227] text-sm uppercase tracking-widest mb-4">Featured Class</p>
              <h2 className="text-4xl font-bold mb-6">Teaches Cooking</h2>
              <p className="text-slate-600 text-lg mb-8">
                In 20 video lessons, the Michelin-starred chef teaches you his techniques—
                from creating a perfect omelet to his famous beef Wellington.
              </p>
              <div className="flex items-center gap-4 mb-8 text-sm text-slate-500">
                <span>20 video lessons</span>
                <span className="text-slate-300">•</span>
                <span>4 hours of content</span>
                <span className="text-slate-300">•</span>
                <span>Workbook included</span>
              </div>
              <Link to="/courses">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 162, 39, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="gold-border bg-transparent hover:bg-[#c9a227]/20 text-slate-900 px-8 py-4">
                    Watch Trailer
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-8 bg-slate-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Unlimited access</h2>
          <p className="text-slate-600 mb-12">Stream all 150+ classes for one annual membership</p>

          <motion.div
            className="gold-border rounded-2xl p-12 bg-white inline-block shadow-lg"
            whileHover={{ boxShadow: "0 0 50px rgba(201, 162, 39, 0.2)" }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                className="text-5xl font-bold shimmer-gold"
                whileHover={{ scale: 1.1 }}
              >$180</motion.span>
              <span className="text-slate-600">/year</span>
            </div>
            <p className="text-slate-600 mb-8">That's only $15/month, billed annually</p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-16 py-6 text-lg font-semibold w-full">
                  {isAuthenticated ? "Browse Classes" : "Get All-Access Pass"}
                </Button>
              </motion.div>
            </Link>
            <p className="text-slate-400 text-sm mt-6">30-day money-back guarantee</p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 relative overflow-hidden bg-white">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1920&h=600&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-white/70" />
        </motion.div>
        <motion.div
          className="w-full text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start your journey
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Learn from legends. Become one yourself.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 text-lg font-semibold">
                {isAuthenticated ? "Explore Classes" : "Get Started"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-slate-200">
        <div className="w-full flex justify-between items-center text-sm text-slate-500">
          <span className="shimmer-gold font-bold">Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={39} />
    </div>
  );
}
