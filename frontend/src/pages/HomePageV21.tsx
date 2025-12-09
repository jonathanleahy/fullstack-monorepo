/**
 * VARIANT 21: SOFT GRADIENT (Light Theme)
 * - Subtle color transitions with parallax
 * - Soft shadows
 * - Rounded elements
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent } from '@repo/playbook/molecules';
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV21() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Soft gradient parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const badgeY = useTransform(smoothProgress, [0, 0.3], [0, -20]);
  const cardsY = useTransform(smoothProgress, [0.2, 0.5], [60, 0]);
  const statsY = useTransform(smoothProgress, [0.3, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Header - Glassmorphism floating style */}
      <motion.header
        className="fixed top-4 left-4 right-4 z-50 py-6 px-6 border border-teal-200/50 rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg shadow-teal-500/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.span
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"
            whileHover={{ scale: 1.05 }}
          >
            Course Tutor
          </motion.span>
          <nav className="flex gap-8 text-sm font-medium text-slate-700">
            <Link to="/courses" className="hover:text-teal-600 transition-all hover:scale-105">Courses</Link>
            <Link to="/about" className="hover:text-teal-600 transition-all hover:scale-105">About</Link>
            <Link to="/help" className="hover:text-teal-600 transition-all hover:scale-105">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-teal-600 transition-all hover:scale-105">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Flowing with gradient curves */}
      <section className="pt-32 pb-32 px-4 relative overflow-hidden">
        {/* Flowing organic background shapes */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-200/40 to-emerald-200/40 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-300/30 to-cyan-300/30 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          style={{ y: heroY }}
          className="max-w-6xl mx-auto px-4 md:px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            style={{ y: badgeY }}
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <Badge className="bg-teal-100/80 backdrop-blur-sm text-teal-700 border-0 px-6 py-2">
              Trusted by 100,000+ learners
            </Badge>
          </motion.div>

          {/* Text flows with the gradient curves */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center"
          >
            <motion.span
              className="block text-slate-800"
              style={{
                transform: "rotate(-2deg) translateX(-10px)",
                display: "inline-block"
              }}
              whileHover={{ rotate: -1, x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Advance your
            </motion.span>
            <motion.span
              className="block text-slate-800"
              style={{
                transform: "rotate(1deg) translateX(10px)",
                display: "inline-block"
              }}
              whileHover={{ rotate: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              career with
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"
              style={{
                transform: "rotate(-1deg)",
                display: "inline-block"
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              expert courses
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto text-center">
            Learn in-demand skills with structured courses designed by industry professionals.
            <span className="font-semibold text-slate-800"> 87% of our graduates advance their careers within 6 months.</span>
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm text-slate-500 mb-10 text-center">
            ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-medium">FREE to start</span>
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/25 px-8 py-6 rounded-2xl">
                    Go to Dashboard →
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/25 px-8 py-6 rounded-2xl">
                      Start Learning Free →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-50 shadow-sm px-8 py-6 rounded-2xl">
                      Browse Courses
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,30L120,35C240,40,480,50,720,50C960,50,1200,40,1320,35L1440,30L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why 100,000+ learners choose us</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Everything you need to succeed in your learning journey and advance your career.
            </p>
          </motion.div>

          <motion.div
            style={{ y: cardsY }}
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Expert Instructors', desc: 'Learn from professionals with real-world experience at top companies like Google, Amazon, and Meta' },
              { title: 'Flexible Learning', desc: 'Study at your own pace, on any device. Lifetime access to all course materials' },
              { title: 'Certificates', desc: 'Earn recognized credentials upon completion. Boost your resume and LinkedIn profile' },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur h-full">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            d="M0,40L60,35C120,30,240,20,360,20C480,20,600,30,720,40C840,50,960,50,1080,45C1200,40,1320,30,1380,25L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Stats */}
      <section className="py-24 px-4 bg-slate-50">
        <motion.div
          style={{ y: statsY }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="grid md:grid-cols-4 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { value: '100K+', label: 'Active Learners' },
                { value: '500+', label: 'Expert Courses' },
                { value: '87%', label: 'Career Success' },
                { value: '4.9', label: 'Average Rating' },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" as const }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-slate-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Testimonial */}
      <section className="py-24 px-4 bg-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex gap-1 justify-center mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </motion.div>
          <blockquote className="text-2xl text-slate-700 mb-6">
            "This platform transformed my career. I went from junior developer to senior engineer in just 8 months. The courses are incredibly well-structured and practical."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <motion.img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face"
              alt=""
              className="w-12 h-12 rounded-full"
              whileHover={{ scale: 1.1 }}
            />
            <div className="text-left">
              <div className="font-semibold text-slate-800">Sarah Chen</div>
              <div className="text-sm text-slate-500">Senior Engineer at Google</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#0d9488"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-gradient-to-r from-teal-600 to-emerald-600">
        <motion.div
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Ready to transform your career?
          </motion.h2>
          <p className="text-teal-100 mb-4">
            Join 100,000+ learners already advancing their careers with expert-led courses.
          </p>
          <p className="text-sm text-teal-200 mb-8">
            <span className="text-yellow-300 font-medium">✓ Free to start</span> • No credit card required • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 shadow-lg px-10 py-6">
                {isAuthenticated ? "Browse Courses" : "Get Started Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white/50">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center text-sm text-slate-500">
          <motion.span className="font-semibold text-slate-700" whileHover={{ scale: 1.02 }}>
            Course Tutor
          </motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-700 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-700 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-700 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={21} />
    </div>
  );
}
