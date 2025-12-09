/**
 * VARIANT 24: CARD-BASED / BENTO (Light Theme)
 * - Bento box layout with parallax
 * - Various card sizes
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function HomePageV24() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Bento parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -30]);
  const statsY = useTransform(smoothProgress, [0, 0.3], [0, -15]);
  const cardsY = useTransform(smoothProgress, [0.1, 0.4], [30, 0]);
  const imageY = useTransform(smoothProgress, [0.2, 0.5], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-100">
      {/* Content - Header integrated as bento card */}
      <div className="p-4 md:p-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Bento Grid with integrated header */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Header Card - Integrated into bento grid */}
          <motion.div
            className="col-span-12 bg-white rounded-3xl p-6 md:p-8 mb-2"
            variants={itemVariants}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <Link to="/">
                <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
                  <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">CT</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">Course Tutor</span>
                </motion.div>
              </Link>
              <nav className="flex gap-6 md:gap-8 text-sm text-slate-600 items-center">
                <Link to="/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
                <Link to="/about" className="hover:text-teal-600 transition-colors hidden md:block">About</Link>
                <Link to="/help" className="hover:text-teal-600 transition-colors hidden md:block">Help</Link>
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-teal-600 transition-colors font-medium">
                  {isAuthenticated ? "Dashboard" : "Sign In"}
                </Link>
              </nav>
            </div>
          </motion.div>

          {/* Hero Card - Largest bento card with main message */}
          <motion.div
            style={{ y: heroY }}
            className="col-span-12 lg:col-span-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-0 mb-6 backdrop-blur-sm">
                100,000+ Learners • 87% Career Success
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="block"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Master new skills
              </motion.span>
              <motion.span
                className="block text-teal-100"
                whileHover={{ scale: 1.02 }}
              >
                with confidence
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg text-teal-50 mb-4 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Expert-led courses designed to help you learn efficiently and apply knowledge immediately.
              <span className="font-semibold text-white"> 500+ courses. FREE to start.</span>
            </motion.p>
            <motion.p
              className="text-sm text-teal-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ★★★★★ 4.9/5 from 50,000+ reviews
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-8">
                      Dashboard →
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-8">
                        Get Started Free →
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                        Browse Courses
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            style={{ y: statsY }}
            className="col-span-12 lg:col-span-4 bg-slate-900 text-white rounded-3xl p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="text-sm text-slate-400 mb-2">Active Learners Worldwide</div>
                <motion.div
                  className="text-5xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" as const }}
                >
                  100K+
                </motion.div>
              </div>
              <motion.div
                className="flex -space-x-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-slate-900"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
                <motion.div
                  className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold border-2 border-slate-900"
                  whileHover={{ scale: 1.2 }}
                >
                  +99K
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {[
            { icon: '✓', color: 'emerald', title: 'Verified Certificates', desc: 'Earn credentials recognized by top companies like Google, Amazon, Meta' },
            { icon: '📚', color: 'cyan', title: '500+ Expert Courses', desc: 'Learn anything from code to design. New courses added weekly.' },
            { icon: '⚡', color: 'amber', title: 'Learn 3x Faster', desc: 'Optimized content for quick understanding. 87% career success rate.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              style={{
                y: cardsY,
                rotate: i === 0 ? -1 : i === 1 ? 1 : -0.5  // Slightly rotated cards - wildcard element
              }}
              className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-3xl p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5, rotate: 0 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-xl"
                style={{
                  backgroundColor: feature.color === 'emerald' ? '#d1fae5' :
                                 feature.color === 'cyan' ? '#cffafe' : '#fef3c7'
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}

          {/* Image Card */}
          <motion.div
            style={{ y: imageY }}
            className="col-span-12 md:col-span-6 lg:col-span-6 rounded-3xl overflow-hidden relative h-64 md:h-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
              alt="Learning"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm opacity-80">Featured Course</div>
              <div className="text-xl font-bold">Full-Stack Web Development</div>
              <div className="text-sm text-emerald-400 mt-1">FREE to enroll</div>
            </motion.div>
          </motion.div>

          {/* Rating Card */}
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-3xl p-8 flex flex-col justify-center items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="flex gap-1 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </motion.div>
            <motion.div
              className="text-4xl font-bold text-slate-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const }}
            >
              4.9
            </motion.div>
            <div className="text-slate-500">From 50K+ Reviews</div>
          </motion.div>

          {/* Success Rate Card */}
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-teal-600 text-white rounded-3xl p-8 flex flex-col justify-center items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="text-5xl font-bold"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const }}
            >
              87%
            </motion.div>
            <div className="text-teal-200">Career Advancement</div>
            <div className="text-xs text-teal-300 mt-2">Within 6 months</div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            className="col-span-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-white text-center md:text-left">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to transform your career?
                </motion.h2>
                <p className="text-slate-400">
                  Join 100,000+ learners advancing their careers. <span className="text-emerald-400">FREE to start.</span>
                </p>
              </div>
              <Link to={isAuthenticated ? "/courses" : "/register"}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10">
                    {isAuthenticated ? "Browse Courses" : "Get Started Free"} →
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

          {/* Footer */}
          <motion.footer
            className="mt-8 text-center text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex gap-6 justify-center mb-4">
              <Link to="/courses" className="hover:text-slate-700 transition-colors">Courses</Link>
              <Link to="/about" className="hover:text-slate-700 transition-colors">About</Link>
              <Link to="/help" className="hover:text-slate-700 transition-colors">Help</Link>
            </div>
            <p>© 2024 Course Tutor. Trusted by learners at Google, Amazon, Meta, Apple.</p>
          </motion.footer>
        </motion.div>
      </div>
      <DesignNavigation currentVersion={24} />
    </div>
  );
}
