import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV95() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-gradient-to-b from-sky-50 to-blue-50">
      <DesignNavigation currentVersion={95} />

      {/* Floating Header - Slowest parallax */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg"
        style={{ y: y4 }}
      >
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              LayerLearn
            </motion.div>

            <nav className="flex gap-8">
              {['Courses', 'Instructors', 'About'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-700 font-medium hover:text-blue-600 transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <motion.div whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
                      <Button variant="outline" className="shadow-md">Sign In</Button>
                    </motion.div>
                  </Link>
                  <Link to="/register">
                    <motion.div whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)' }}>
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard">
                  <motion.div whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)' }}>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                      Dashboard
                    </Button>
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Layered Hero Content */}
      <div className="relative min-h-screen pt-32 overflow-hidden">
        {/* Background Layer - Fastest movement */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: y1, opacity: opacity1 }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Floating Islands Layer 1 - Fast */}
        <motion.div
          className="absolute top-32 right-20 z-10"
          style={{ y: y2 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 w-64"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
            whileHover={{
              y: -10,
              boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3 },
            }}
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">2,000+</h3>
            <p className="text-slate-600">Courses Available</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-80 left-24 z-10"
          style={{ y: y2 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 w-64"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            whileHover={{
              y: -10,
              boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">500+</h3>
            <p className="text-slate-600">Expert Instructors</p>
          </motion.div>
        </motion.div>

        {/* Main Content Layer - Medium speed */}
        <motion.div
          className="relative z-20 max-w-7xl mx-auto px-8"
          style={{ y: y3, opacity: opacity2 }}
        >
          <div className="text-center mb-16">
            <motion.h1
              className="text-7xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Learn in
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Multiple Dimensions
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover courses that elevate your skills across every layer of knowledge
            </motion.p>
          </div>

          {/* Floating Action Buttons */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/courses">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-xl text-lg font-semibold shadow-xl"
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Courses
              </motion.button>
            </Link>

            <motion.button
              className="bg-white text-slate-700 px-10 py-5 rounded-xl text-lg font-semibold shadow-xl border-2 border-slate-200"
              whileHover={{
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                borderColor: '#3b82f6',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Islands Layer 2 - Slower */}
        <motion.div
          className="absolute bottom-40 right-32 z-15"
          style={{ y: y3 }}
        >
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-8 w-72 text-white"
            style={{
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.5)',
            }}
            whileHover={{
              y: -10,
              boxShadow: '0 35px 60px -15px rgba(59, 130, 246, 0.6)',
            }}
          >
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-2">50K+</h3>
            <p className="text-blue-100">Students Worldwide</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Cards with Depth */}
      <div className="relative z-30 max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Personalized Learning',
              desc: 'AI-powered recommendations tailored to your goals',
              color: 'from-blue-500 to-blue-600',
              shadow: 'shadow-blue-500/30',
            },
            {
              icon: '⚡',
              title: 'Interactive Content',
              desc: 'Hands-on projects and real-world applications',
              color: 'from-cyan-500 to-cyan-600',
              shadow: 'shadow-cyan-500/30',
            },
            {
              icon: '🌟',
              title: 'Lifetime Access',
              desc: 'Learn at your own pace, keep access forever',
              color: 'from-sky-500 to-sky-600',
              shadow: 'shadow-sky-500/30',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Shadow layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform translate-y-2`}></div>

              {/* Main card */}
              <motion.div
                className="relative bg-white rounded-2xl p-8 shadow-xl"
                whileHover={{
                  y: -12,
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>

                {/* Depth indicator */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br ${feature.color} rounded-2xl -z-10`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
