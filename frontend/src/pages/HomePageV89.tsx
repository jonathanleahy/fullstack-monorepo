import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV89() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const skewY = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <DesignNavigation currentVersion={89} />

      {/* DIAGONAL SPLIT HEADER */}
      <header className="relative h-24 overflow-hidden">
        {/* Top Left Section */}
        <div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-purple-600 to-pink-600"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)'
          }}
        >
          <div className="flex items-center h-full px-8">
            <Link to="/">
              <div className="text-3xl font-bold text-white transform -skew-x-12">
                CoursetuTor
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Right Section */}
        <div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-blue-600 to-cyan-600"
          style={{
            clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 0 100%)'
          }}
        >
          <div className="flex items-center justify-end h-full px-8">
            <nav className="flex items-center gap-6">
              {['Courses', 'About', 'Community'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-white font-semibold hover:text-yellow-300 transition-colors transform skew-x-12 text-sm"
                >
                  {item}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link to="/login">
                  <Button
                    className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 hover:bg-yellow-300 transition-all shadow-lg"
                    style={{ transform: 'skewX(-12deg)' }}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* DIAGONAL SPLIT HERO */}
      <main className="relative px-8 py-16">
        <div className="max-w-7xl mx-auto">

          {/* Main Diagonal Split Section */}
          <div className="relative h-[600px] mb-32">
            {/* Left Side - Purple Gradient */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 shadow-2xl"
              style={{
                clipPath: 'polygon(0 0, 65% 0, 45% 100%, 0 100%)',
                transform: 'skewY(-2deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-start px-16" style={{ transform: 'skewY(2deg)' }}>
                <div className="max-w-xl">
                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-7xl font-black text-white leading-tight mb-6 transform -skew-x-6"
                  >
                    Learn.<br />
                    Build.<br />
                    Excel.
                  </motion.h1>
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-purple-100 mb-8 leading-relaxed"
                  >
                    Break through traditional learning barriers. Master skills that matter.
                  </motion.p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Link to="/courses">
                      <Button
                        className="bg-yellow-400 text-slate-900 font-bold px-8 py-4 text-lg hover:bg-yellow-300 transition-all shadow-xl"
                        style={{ transform: 'skewX(-12deg)' }}
                      >
                        <span style={{ transform: 'skewX(12deg)', display: 'inline-block' }}>
                          Start Now
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Cyan Gradient with Image */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-bl from-cyan-500 via-blue-600 to-blue-900 shadow-2xl"
              style={{
                clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 65% 100%)',
                transform: 'skewY(-2deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-end px-16" style={{ transform: 'skewY(2deg)' }}>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {[
                    { num: '15K+', label: 'Students' },
                    { num: '200+', label: 'Courses' },
                    { num: '95%', label: 'Success' },
                    { num: '50+', label: 'Experts' }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, type: 'spring' }}
                      className="bg-white/10 backdrop-blur-sm p-6 border-2 border-white/30 shadow-lg"
                      style={{ transform: 'skewX(12deg)' }}
                    >
                      <div style={{ transform: 'skewX(-12deg)' }}>
                        <div className="text-4xl font-bold text-white">{stat.num}</div>
                        <div className="text-sm text-cyan-100">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Diagonal Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 54%, rgba(255,255,255,0.5) 54%, rgba(255,255,255,0.5) 56%, transparent 56%)'
              }}
            />
          </div>

          {/* Course Cards - Parallelogram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: 'Web Development',
                desc: 'Full stack mastery from frontend to backend',
                level: 'Beginner → Advanced',
                color: 'from-purple-600 to-pink-600',
                icon: '</>'
              },
              {
                title: 'Data Science',
                desc: 'Analytics, ML, and AI fundamentals',
                level: 'Intermediate',
                color: 'from-blue-600 to-cyan-600',
                icon: '📊'
              },
              {
                title: 'Mobile Apps',
                desc: 'Cross-platform development excellence',
                level: 'Beginner',
                color: 'from-indigo-600 to-purple-600',
                icon: '📱'
              },
              {
                title: 'Cloud Computing',
                desc: 'AWS, Azure, and modern infrastructure',
                level: 'Advanced',
                color: 'from-cyan-600 to-blue-600',
                icon: '☁️'
              },
              {
                title: 'UI/UX Design',
                desc: 'Create stunning user experiences',
                level: 'Beginner → Intermediate',
                color: 'from-pink-600 to-rose-600',
                icon: '🎨'
              },
              {
                title: 'DevOps',
                desc: 'CI/CD, Docker, Kubernetes mastery',
                level: 'Advanced',
                color: 'from-violet-600 to-purple-600',
                icon: '⚙️'
              }
            ].map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="group"
              >
                <div
                  className={`relative bg-gradient-to-br ${course.color} p-8 shadow-xl overflow-hidden`}
                  style={{ transform: 'skewY(-3deg)' }}
                >
                  <div style={{ transform: 'skewY(3deg)' }}>
                    <div className="text-5xl mb-4">{course.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-white/90 mb-4 text-sm">{course.desc}</p>
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 text-xs text-white font-semibold mb-6">
                      {course.level}
                    </div>
                    <div className="mt-4">
                      <Link to={`/course/${idx}`}>
                        <Button
                          className="bg-white text-slate-900 font-bold px-6 py-3 hover:bg-yellow-300 transition-all shadow-lg w-full"
                          style={{ transform: 'skewX(-12deg)' }}
                        >
                          <span style={{ transform: 'skewX(12deg)', display: 'inline-block' }}>
                            Explore Course
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Diagonal Stripe Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Diagonal CTA Section */}
          <div className="relative h-64 mb-16">
            <motion.div
              style={{ skewY }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-between px-16" style={{ transform: 'skewY(2deg)' }}>
                <div>
                  <h2 className="text-5xl font-black text-white mb-4">Ready to Transform?</h2>
                  <p className="text-xl text-white/90">Join thousands learning smarter, not harder.</p>
                </div>
                <div className="flex gap-4">
                  <Link to="/signup">
                    <Button
                      className="bg-white text-slate-900 font-bold px-8 py-4 text-lg hover:bg-yellow-100 transition-all shadow-xl"
                      style={{ transform: 'skewX(-12deg)' }}
                    >
                      <span style={{ transform: 'skewX(12deg)', display: 'inline-block' }}>
                        Get Started Free
                      </span>
                    </Button>
                  </Link>
                  <Link to="/browse">
                    <Button
                      className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 text-lg hover:bg-white hover:text-slate-900 transition-all"
                      style={{ transform: 'skewX(-12deg)' }}
                    >
                      <span style={{ transform: 'skewX(12deg)', display: 'inline-block' }}>
                        Browse All
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
