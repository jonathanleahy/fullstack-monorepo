import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV67() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-cyan-200 via-rose-200 to-amber-200">
      <DesignNavigation currentVersion={67} />

      {/* Retro 90s Header */}
      <header className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 border-b-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="flex items-center space-x-3"
            >
              <div className="w-14 h-14 bg-yellow-300 border-4 border-black rotate-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-black font-black text-2xl -rotate-12">CT</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8), 2px 2px 0px rgba(255,0,150,0.5)' }}>
                  COURSE TUTOR
                </h1>
                <div className="bg-yellow-300 border-2 border-black px-2 py-0.5 inline-block -rotate-2">
                  <span className="text-xs font-black">EST. 2025</span>
                </div>
              </div>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/courses">
                <div className="bg-rose-400 border-4 border-black px-6 py-2 font-black uppercase hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Courses
                </div>
              </Link>
              <Link to="/about">
                <div className="bg-amber-300 border-4 border-black px-6 py-2 font-black uppercase hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  About
                </div>
              </Link>
              <Link to="/help">
                <div className="bg-emerald-400 border-4 border-black px-6 py-2 font-black uppercase hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Help
                </div>
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <div className="bg-cyan-400 border-4 border-black px-6 py-2 font-black uppercase hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Dashboard
                  </div>
                </Link>
              ) : (
                <Link to="/signin">
                  <div className="bg-yellow-300 border-4 border-black px-6 py-2 font-black uppercase hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Sign In
                  </div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - 90s Web Style */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
        {/* Background decorations */}
        <motion.div
          style={{ y, rotate }}
          className="absolute top-10 right-10 w-32 h-32 bg-rose-400 border-8 border-black opacity-20"
        ></motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
          className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-cyan-400 border-8 border-black opacity-20"
        ></motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-yellow-300 border-8 border-black px-8 py-4 rotate-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-8">
              <h1 className="text-7xl md:text-9xl font-black" style={{
                textShadow: '6px 6px 0px rgba(0,0,0,1), 4px 4px 0px rgba(255,0,150,0.8)',
                background: 'linear-gradient(45deg, #06b6d4, #ec4899, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                TOTALLY<br/>RADICAL<br/>LEARNING!
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border-8 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-2xl font-black leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  🌟 Welcome to the COOLEST online learning platform! 🎓<br/>
                  Learn awesome skills and become a TOTAL PRO! 🚀
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/courses">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 border-8 border-black px-12 py-6 font-black text-2xl uppercase hover:translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
                  🎮 Start Learning!
                </div>
              </Link>
              <Link to="/about">
                <div className="bg-gradient-to-br from-rose-400 to-amber-400 border-8 border-black px-12 py-6 font-black text-2xl uppercase hover:translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
                  ℹ️ Learn More
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Under Construction Banner */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="bg-yellow-300 border-y-8 border-black py-4"
      >
        <div className="flex items-center space-x-8 whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl font-black">⚠️ NEW COURSES COMING SOON! ⚠️</span>
          ))}
        </div>
      </motion.div>

      {/* Course Cards - Chunky Style */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 border-8 border-black px-8 py-4 -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-5xl font-black text-white" style={{ textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
              🔥 HOT COURSES! 🔥
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Web Dev", emoji: "💻", color: "from-cyan-300 to-blue-400", border: "border-cyan-600" },
            { title: "Data Science", emoji: "📊", color: "from-emerald-300 to-teal-400", border: "border-emerald-600" },
            { title: "Design", emoji: "🎨", color: "from-rose-300 to-amber-400", border: "border-rose-600" },
            { title: "Business", emoji: "💼", color: "from-amber-300 to-yellow-400", border: "border-amber-600" },
            { title: "Mobile Apps", emoji: "📱", color: "from-blue-300 to-cyan-400", border: "border-blue-600" },
            { title: "Marketing", emoji: "📢", color: "from-teal-300 to-emerald-400", border: "border-teal-600" }
          ].map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`bg-gradient-to-br ${course.color} border-8 ${course.border} shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
            >
              <div className="p-8 text-center">
                <div className="text-7xl mb-4">{course.emoji}</div>
                <div className="bg-white border-4 border-black px-4 py-2 inline-block -rotate-2 mb-4">
                  <h3 className="text-3xl font-black">{course.title}</h3>
                </div>
                <div className="bg-black text-white border-4 border-black px-4 py-2 font-black text-sm mb-4">
                  ★★★★★ 5.0 RATING
                </div>
                <p className="text-lg font-bold mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  🌟 Super awesome course!<br/>Learn rad skills FAST! 🚀
                </p>
                <div className="bg-yellow-300 border-4 border-black px-6 py-3 font-black uppercase hover:translate-y-1 transition-transform inline-block">
                  ENROLL NOW!
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hit Counter Style Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 border-8 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "50000", label: "Students", icon: "👥" },
              { num: "500", label: "Courses", icon: "📚" },
              { num: "95", label: "Success %", icon: "🏆" },
              { num: "247", label: "Support", icon: "☎️" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-black border-4 border-white p-4 inline-block mb-4">
                  <div className="text-5xl font-black text-yellow-300 font-mono" style={{ textShadow: '2px 2px 0px rgba(255,0,150,0.8)' }}>
                    {stat.num}
                  </div>
                </div>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="bg-white border-4 border-black px-4 py-2 inline-block">
                  <span className="text-xl font-black">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Webring Style */}
      <footer className="bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 border-t-8 border-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="bg-white border-6 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black mb-4">COURSE TUTOR</h3>
              <p className="font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                The BEST place to learn online! 🌟
              </p>
            </div>
            {['Learning', 'Company', 'Support'].map((section, idx) => (
              <div key={idx} className="bg-white border-6 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="text-lg font-black uppercase mb-4 bg-yellow-300 border-2 border-black px-2 py-1 inline-block">
                  {section}
                </h4>
                <ul className="space-y-2 font-bold">
                  <li>• <Link to="#" className="hover:text-cyan-600">Link One</Link></li>
                  <li>• <Link to="#" className="hover:text-cyan-600">Link Two</Link></li>
                  <li>• <Link to="#" className="hover:text-cyan-600">Link Three</Link></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-black border-4 border-white p-6 text-center">
            <p className="font-black text-yellow-300 text-lg">© 2025 COURSE TUTOR - ALL RIGHTS RESERVED!</p>
            <p className="text-white font-bold mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🌐 Best viewed with any browser! 🌐
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
