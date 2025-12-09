/**
 * VARIANT 47: RETIREES & LIFELONG LEARNERS
 *
 * Target: 60+ adults learning for enrichment and mental stimulation
 * Tone: Friendly, encouraging, patient - "Learn at your own pace"
 * Design: Warm amber/gold, soft cream backgrounds, sage green accents
 * Typography: Larger base font (18px+), excellent contrast
 * Effects: Gentle floating book/lightbulb icons
 * Layout Flow: Welcoming hero → Why Learn Now → Popular hobby courses →
 *              Simple How it Works → Testimonial → Accessible CTA → Large footer
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const floatVariants = {
  float: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export function HomePageV47() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const popularCourses = [
    { title: 'Digital Photography', level: 'Beginner Friendly', icon: '📷', duration: 'Self-paced' },
    { title: 'World History', level: 'All Levels', icon: '🏛️', duration: 'Self-paced' },
    { title: 'Conversational Spanish', level: 'Beginner', icon: '🗣️', duration: 'Self-paced' },
  ];

  const benefits = [
    { icon: '🕐', title: 'No Rush, No Pressure', desc: 'Learn when it suits you' },
    { icon: '🎓', title: 'Keep Your Mind Active', desc: 'Stimulating content' },
    { icon: '🤝', title: 'Connect with Peers', desc: 'Join our community' },
  ];

  const howItWorks = [
    { step: '1', title: 'Choose What Interests You', desc: 'Browse topics you have always wanted to explore' },
    { step: '2', title: 'Learn at Your Speed', desc: 'Pause, rewind, or replay lessons anytime' },
    { step: '3', title: 'Enjoy the Journey', desc: 'No tests unless you want them' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50/30 text-lg">
      {/* Header - Extra Large Touch Targets, High Contrast, Simple 3-item Nav */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-amber-400 shadow-xl">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex flex-col gap-6">
            {/* Logo - Extra Large */}
            <div className="flex items-center justify-between">
              <Link to="/" className="font-bold text-3xl text-amber-600">Course Tutor</Link>
              <div className="flex items-center gap-5">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="text-xl px-8 py-6 min-h-[60px] border-2">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="text-slate-800 hover:text-amber-600 text-xl font-semibold min-h-[60px] flex items-center px-4">Sign In</Link>
                    <Link to="/register">
                      <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-10 py-6 min-h-[60px] shadow-lg">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Simple 3-item navigation - Extra Large Touch Targets */}
            <nav className="flex gap-4">
              <Link
                to="/courses"
                className="flex-1 bg-amber-100 hover:bg-amber-200 text-slate-900 text-center py-5 px-6 rounded-xl text-xl font-semibold transition-all border-2 border-amber-200 hover:border-amber-400 min-h-[70px] flex items-center justify-center"
              >
                📚 Courses
              </Link>
              <Link
                to="/about"
                className="flex-1 bg-amber-100 hover:bg-amber-200 text-slate-900 text-center py-5 px-6 rounded-xl text-xl font-semibold transition-all border-2 border-amber-200 hover:border-amber-400 min-h-[70px] flex items-center justify-center"
              >
                ℹ️ About
              </Link>
              <Link
                to="/help"
                className="flex-1 bg-amber-100 hover:bg-amber-200 text-slate-900 text-center py-5 px-6 rounded-xl text-xl font-semibold transition-all border-2 border-amber-200 hover:border-amber-400 min-h-[70px] flex items-center justify-center"
              >
                ❓ Help
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* SECTION 1: Single Column Hero - Very Large Text, Happy Learner Photo, One Clear CTA */}
      <section className="relative py-20 px-8 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        {/* Gentle floating decoration */}
        <motion.div
          className="absolute top-20 right-[10%] text-6xl opacity-50"
          variants={floatVariants}
          animate="float"
        >
          📚
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto">
          {/* Single column centered layout */}
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Badge className="bg-amber-500 text-white text-2xl px-8 py-4 rounded-full">
                Perfect for Lifelong Learners
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight"
            >
              It's Never Too Late to
              <span className="block text-amber-600 mt-3">
                Learn Something New
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-slate-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Explore your interests and keep your mind active.
              Learn at your own comfortable pace, with no deadlines or pressure.
            </motion.p>

            {/* Photo of Happy Learner */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white max-w-2xl mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                  alt="Happy older adult smiling while learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Single Clear CTA */}
            <motion.div variants={itemVariants}>
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-16 py-8 text-3xl font-bold shadow-2xl rounded-2xl min-h-[90px]"
                  >
                    Start Learning Today →
                  </Button>
                </motion.div>
              </Link>
              <p className="text-xl text-slate-600 mt-6">No credit card required • Start free</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Why Learn Now? Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Learn Now?</h2>
            <p className="text-xl text-slate-600">The benefits of lifelong learning</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 text-center shadow-md shadow-amber-500/10 border border-amber-200"
              >
                <motion.div
                  className="text-6xl mb-6"
                  variants={floatVariants}
                  whileHover="float"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="font-bold text-slate-900 mb-3 text-2xl">{benefit.title}</h3>
                <p className="text-slate-600 text-lg">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Popular Hobby Courses */}
      <section className="py-20 px-6 bg-gradient-to-b from-sage-50 to-amber-50/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Courses</h2>
            <p className="text-xl text-slate-600">Explore topics you've always been curious about</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {popularCourses.map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-md shadow-amber-500/10 border-2 border-amber-100 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
              >
                <div className="text-6xl mb-6">{course.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3 text-2xl">{course.title}</h3>
                <div className="space-y-2 text-lg">
                  <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg inline-block">
                    {course.level}
                  </div>
                  <p className="text-slate-600">{course.duration}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/courses" className="text-amber-600 hover:text-amber-700 font-bold text-xl transition-colors">
              See All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Simple 3-Step How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple and easy to get started</p>
          </motion.div>

          <div className="space-y-12">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md shadow-amber-500/20">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-slate-900 mb-2 text-2xl">{item.title}</h3>
                  <p className="text-slate-600 text-xl leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Testimonial from Fellow Retiree */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-12 shadow-md shadow-amber-500/20 border-2 border-amber-100"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md">
                  R
                </div>
              </div>
              <div className="flex-1">
                <p className="text-2xl text-slate-700 italic mb-6 leading-relaxed">
                  "After retiring, I wanted to keep learning. Course Tutor made it so easy!
                  I've completed three photography courses and even started a small side business.
                  The instructors are patient, and I can go back and watch lessons as many times
                  as I need. It's wonderful!"
                </p>
                <div>
                  <div className="font-bold text-slate-900 text-xl">Robert Chen</div>
                  <div className="text-amber-600 text-lg">Retired Teacher, Photography Enthusiast</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Accessibility-Focused CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-8"
              variants={floatVariants}
              animate="float"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">🎓</span>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-amber-100 mb-10 text-2xl leading-relaxed">
              Join our community of lifelong learners. No experience needed—just curiosity!
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 px-12 py-6 text-2xl font-bold shadow-lg">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Large and Readable */}
      <footer className="bg-slate-100 text-slate-700 py-12 border-t-4 border-amber-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="font-bold text-3xl text-amber-600">Course Tutor</span>
            <div className="flex flex-wrap justify-center gap-8 text-xl">
              <Link to="/courses" className="hover:text-amber-600 transition-colors font-medium">Courses</Link>
              <Link to="/about" className="hover:text-amber-600 transition-colors font-medium">About</Link>
              <Link to="/help" className="hover:text-amber-600 transition-colors font-medium">Help</Link>
              <Link to="/accessibility" className="hover:text-amber-600 transition-colors font-medium">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={47} />
    </div>
  );
}
