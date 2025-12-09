/**
 * VARIANT 42: DUOLINGO STYLE (Light Theme)
 * Inspired by Duolingo's gamified learning
 * - Bright, playful colors on light background
 * - Mascot/character focused with parallax
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function HomePageV42() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Duolingo playful parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -40]);
  const mascotY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const streakY = useTransform(smoothProgress, [0.1, 0.4], [50, 0]);
  const coursesY = useTransform(smoothProgress, [0.3, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header - Duolingo Style: Playful with mascot, streak counter, profile */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b-4 border-[#58cc02]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦉
            </motion.div>
            <span className="text-xl font-bold text-[#58cc02]">Course Tutor</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/courses" className="text-gray-600 hover:text-[#58cc02] transition-colors text-sm font-semibold">
              Courses
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#58cc02] transition-colors text-sm font-semibold">
              About
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-[#58cc02] transition-colors text-sm font-semibold">
              Help
            </Link>
            {isAuthenticated && (
              <motion.div
                className="flex items-center gap-2 bg-[#ffc800] px-3 py-1 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">🔥</span>
                <span className="font-bold text-sm">7 day streak</span>
              </motion.div>
            )}
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? (
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-[#58cc02] to-[#4caf00] rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  U
                </motion.div>
              ) : (
                <span className="text-gray-600 hover:text-[#58cc02] transition-colors text-sm font-semibold">Sign In</span>
              )}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-[#58cc02] hover:bg-[#4caf00] text-white px-6 py-2 font-bold rounded-xl shadow-[0_4px_0_#3a8a01]">
                    Get started
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Gamified Layout with Level & Daily Goal */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#58cc02]/10 to-white">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: heroY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-[#58cc02]">
                <div className="text-xs text-gray-600">YOUR LEVEL</div>
                <div className="text-2xl font-bold text-[#58cc02]">Level 12</div>
              </div>
              <div className="flex-1 bg-white rounded-full h-4 overflow-hidden border-2 border-gray-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#58cc02] to-[#4caf00]"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold text-gray-600">65% to Level 13</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              The free, <motion.span
                className="inline-block relative"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="bg-[#ffc800] text-gray-900 px-2 rounded-lg">fun</span>
              </motion.span>, and
              <span className="block text-[#58cc02]">effective way to learn!</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-6">
              Learn new skills with bite-sized lessons. It's like a game, and addictively fun!
              <span className="font-bold text-gray-800"> 87% of learners improve their skills.</span>
            </motion.p>
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-800">Daily Goal</span>
                <span className="text-sm text-gray-600">3/5 lessons</span>
              </div>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-3 rounded-full ${i <= 3 ? 'bg-[#58cc02]' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Keep going! 2 more lessons to reach your goal 🎯</p>
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm text-gray-500 mb-6">
              ★★★★★ 4.9/5 from 50M+ reviews • <span className="text-[#58cc02] font-bold">100% FREE</span>
            </motion.p>
            <motion.div variants={itemVariants}>
              {isAuthenticated ? (
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95, y: 4 }}>
                    <Button size="lg" className="bg-[#58cc02] hover:bg-[#4caf00] text-white px-10 py-6 text-lg font-bold rounded-2xl shadow-[0_4px_0_#3a8a01]">
                      Continue Learning →
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95, y: 4 }}>
                    <Button size="lg" className="bg-[#58cc02] hover:bg-[#4caf00] text-white px-10 py-6 text-lg font-bold rounded-2xl shadow-[0_4px_0_#3a8a01]">
                      Start Learning Free →
                    </Button>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Mascot with achievements */}
          <motion.div
            className="hidden lg:flex justify-center"
            style={{ y: mascotY }}
          >
            <div className="relative">
              <motion.div
                className="text-[180px]"
                animate={{
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
              >
                🦉
              </motion.div>
              <motion.div
                className="absolute top-10 -right-8 bg-white text-gray-800 rounded-2xl p-4 shadow-lg border-2 border-[#ffc800]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" as const }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <p className="font-bold text-sm">Ready to learn? 🎉</p>
                <p className="text-xs text-gray-600">500M+ learners</p>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-0 bg-[#58cc02] text-white rounded-2xl px-4 py-2 shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" as const }}
                whileHover={{ scale: 1.1 }}
              >
                <p className="font-bold text-sm">🏆 #1 Education App</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#fff9e6" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Streak Section */}
      <section className="py-16 px-6 bg-[#fff9e6]">
        <motion.div style={{ y: streakY }} className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 mb-8 shadow-lg border-2 border-[#ffc800]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-5xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <div className="text-left">
              <div className="text-3xl font-bold text-[#ff9600]">7 day streak!</div>
              <div className="text-gray-600">Keep it going!</div>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why learners love us
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { emoji: '🎮', title: 'Fun & Effective', desc: 'Game-like lessons make learning addictive! 87% improvement rate.' },
              { emoji: '⚡', title: 'Quick Lessons', desc: 'Just 5 minutes a day keeps your skills sharp. Perfect for busy schedules.' },
              { emoji: '🏆', title: 'Earn Rewards', desc: 'Get XP, unlock achievements, climb the ranks. Track your progress!' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100"
              >
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: "spring" as const }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-[#fff9e6]">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#1cb0f6"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Courses Preview */}
      <section className="py-16 px-6 bg-[#1cb0f6] text-white">
        <motion.div style={{ y: coursesY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose your adventure
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { emoji: '💻', name: 'Coding', color: 'bg-[#58cc02]' },
              { emoji: '🎨', name: 'Design', color: 'bg-[#ce82ff]' },
              { emoji: '📊', name: 'Data', color: 'bg-[#ff9600]' },
              { emoji: '📈', name: 'Business', color: 'bg-[#ff4b4b]' },
              { emoji: '🎵', name: 'Music', color: 'bg-[#2b70c9]' },
              { emoji: '📝', name: 'Writing', color: 'bg-[#1cb0f6]' },
              { emoji: '🌐', name: 'Languages', color: 'bg-[#58cc02]' },
              { emoji: '🧠', name: 'AI', color: 'bg-[#ce82ff]' },
            ].map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`${course.color} rounded-2xl p-6 text-center cursor-pointer shadow-lg`}
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {course.emoji}
                </motion.div>
                <div className="font-bold">{course.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-[#1cb0f6]">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { value: '500M+', label: 'Learners', emoji: '👥' },
            { value: '100+', label: 'Courses', emoji: '📚' },
            { value: '87%', label: 'Improve Skills', emoji: '✅' },
            { value: '#1', label: 'Education App', emoji: '🏆' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.1 }}>
              <motion.div
                className="text-3xl mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {stat.emoji}
              </motion.div>
              <motion.div
                className="text-4xl font-bold text-[#58cc02]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffc800"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-16 px-6 bg-[#ffc800]">
        <motion.div
          className="w-full text-center text-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐⭐⭐⭐⭐
          </motion.div>
          <blockquote className="text-2xl font-bold mb-6">
            "I never thought learning could be this fun! I've completed 3 courses just by doing a few minutes each day."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <motion.div
              className="text-4xl"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              🧑‍💻
            </motion.div>
            <div>
              <div className="font-bold">Carlos M.</div>
              <div className="text-sm text-gray-700">127 day streak</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <div className="relative bg-[#ffc800]">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#58cc02"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-20 px-6 bg-[#58cc02] text-white">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🦉
          </motion.div>
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Ready to start learning?
          </motion.h2>
          <p className="text-xl text-white/90 mb-4">
            Join 500 million learners today. It's free forever!
          </p>
          <p className="text-sm text-white/80 mb-10">
            <span className="text-yellow-300 font-bold">✓ 100% FREE</span> • No credit card • Start in seconds
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95, y: 4 }}>
              <Button size="lg" className="bg-white text-[#58cc02] hover:bg-gray-100 px-16 py-6 text-xl font-bold rounded-2xl shadow-[0_4px_0_#e0e0e0]">
                {isAuthenticated ? "Keep Learning" : "Get Started Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-green-50 text-gray-700">
        <div className="w-full flex justify-between items-center text-sm">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <span className="text-2xl">🦉</span>
            <span>Course Tutor</span>
          </motion.div>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-green-700 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-green-700 transition-colors">About</Link>
            <Link to="/help" className="hover:text-green-700 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={42} />
    </div>
  );
}
