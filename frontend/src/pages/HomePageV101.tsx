import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV101() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const cubeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <DesignNavigation currentVersion={101} />

      {/* Isometric Header */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Isometric Logo Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 15 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-3 transform skew-y-[-3deg] shadow-lg">
                <div className="transform skew-y-[3deg]">
                  <h1 className="text-2xl font-bold text-white">CourseHub</h1>
                  <div className="h-1 w-16 bg-yellow-400 mt-1 transform -skew-x-12" />
                </div>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-800/40 transform skew-y-[-3deg]" />
            </motion.div>

            {/* Floating 3D Platform Nav */}
            <nav className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-cyan-500/20 transform translate-y-1 skew-x-[-5deg]" />
              <div className="relative bg-white/90 backdrop-blur-sm px-8 py-3 transform skew-x-[-5deg] shadow-lg border-t-2 border-cyan-400">
                <div className="flex gap-6 transform skew-x-[5deg]">
                  <Link to="/courses" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Courses</Link>
                  <Link to="/about" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">About</Link>
                  <Link to="/pricing" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Pricing</Link>
                </div>
              </div>
            </nav>

            {/* Isometric Auth Button */}
            {!isAuthenticated && (
              <motion.div whileHover={{ translateY: -2 }} className="relative">
                <div className="absolute inset-0 bg-yellow-500 transform translate-x-1 translate-y-1" />
                <Link to="/login">
                  <div className="relative bg-gradient-to-br from-yellow-400 to-orange-400 px-6 py-3 border-2 border-yellow-600 font-bold text-gray-800 hover:from-yellow-300 hover:to-orange-300 transition-all">
                    Login
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Isometric Hero Scene */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-cyan-100 px-4 py-2 transform -skew-x-6 mb-6">
                <span className="transform skew-x-6 inline-block text-cyan-700 font-semibold">Learn Anywhere</span>
              </div>

              <h2 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
                Build Your Future
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                  One Cube at a Time
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stack skills like building blocks. Master courses designed by experts,
                rendered in an immersive learning environment.
              </p>

              {/* 3D Isometric Buttons */}
              <div className="flex gap-4">
                <motion.div whileHover={{ translateY: -3 }} className="relative group">
                  <div className="absolute inset-0 bg-blue-700 transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                  <Link to="/courses">
                    <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 px-8 py-4 border-2 border-blue-700 font-bold text-white text-lg">
                      Explore Courses →
                    </div>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ translateY: -3 }} className="relative group">
                  <div className="absolute inset-0 bg-gray-400 transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                  <Link to="/demo">
                    <div className="relative bg-white px-8 py-4 border-2 border-gray-400 font-bold text-gray-800 text-lg">
                      Watch Demo
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Isometric 3D Scene */}
            <motion.div
              style={{ rotateY: cubeRotate }}
              className="relative h-[500px]"
            >
              {/* Main Platform */}
              <div className="absolute inset-0">
                {/* Large Cube - Book */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 left-20 w-40 h-40"
                >
                  <div className="relative w-full h-full">
                    {/* Top face */}
                    <div className="absolute w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 transform -skew-x-[30deg] -skew-y-[15deg] origin-bottom-left shadow-lg">
                      <div className="p-4 transform skew-x-[30deg] skew-y-[15deg]">
                        <div className="text-white font-bold text-sm">📚</div>
                      </div>
                    </div>
                    {/* Right face */}
                    <div className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 transform skew-y-[15deg] origin-top-left translate-x-full shadow-lg" />
                    {/* Front face */}
                    <div className="absolute w-full h-full bg-gradient-to-br from-orange-300 to-orange-400 transform skew-x-[30deg] origin-top-left translate-y-full shadow-lg" />
                  </div>
                </motion.div>

                {/* Medium Cube - Laptop */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-40 right-32 w-32 h-32"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-full bg-gradient-to-br from-cyan-400 to-cyan-500 transform -skew-x-[30deg] -skew-y-[15deg] origin-bottom-left shadow-lg">
                      <div className="p-4 transform skew-x-[30deg] skew-y-[15deg]">
                        <div className="text-white font-bold text-sm">💻</div>
                      </div>
                    </div>
                    <div className="absolute w-full h-full bg-gradient-to-br from-cyan-500 to-cyan-600 transform skew-y-[15deg] origin-top-left translate-x-full shadow-lg" />
                    <div className="absolute w-full h-full bg-gradient-to-br from-cyan-300 to-cyan-400 transform skew-x-[30deg] origin-top-left translate-y-full shadow-lg" />
                  </div>
                </motion.div>

                {/* Small Cube - Trophy */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-10 right-20 w-24 h-24"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-500 transform -skew-x-[30deg] -skew-y-[15deg] origin-bottom-left shadow-lg">
                      <div className="p-3 transform skew-x-[30deg] skew-y-[15deg]">
                        <div className="text-white font-bold text-xs">🏆</div>
                      </div>
                    </div>
                    <div className="absolute w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 transform skew-y-[15deg] origin-top-left translate-x-full shadow-lg" />
                    <div className="absolute w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-400 transform skew-x-[30deg] origin-top-left translate-y-full shadow-lg" />
                  </div>
                </motion.div>

                {/* Base Platform */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-300 to-gray-400 transform -skew-x-[30deg] shadow-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-32 bg-gradient-to-b from-gray-400 to-gray-500 transform skew-y-[15deg] shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(45deg, #06b6d4 1px, transparent 1px), linear-gradient(-45deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </section>

      {/* Isometric Features */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 px-6 py-2 transform -rotate-2 mb-4">
              <span className="transform rotate-2 inline-block text-blue-700 font-bold">Features</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900">Built For Learning</h3>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Learning', color: 'from-yellow-400 to-orange-400', border: 'yellow-600' },
              { icon: '🎯', title: 'Goal Tracking', color: 'from-red-400 to-pink-400', border: 'red-600' },
              { icon: '🌟', title: 'Expert Tutors', color: 'from-cyan-400 to-blue-400', border: 'cyan-600' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ translateY: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-${feature.border} transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform`} />
                <div className={`relative bg-gradient-to-br ${feature.color} p-8 border-2 border-${feature.border} transform -skew-y-2`}>
                  <div className="transform skew-y-2">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
