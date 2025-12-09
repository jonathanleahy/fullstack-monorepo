import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV87() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden">
      <DesignNavigation currentVersion={87} />

      {/* ORGANIC WAVY HEADER */}
      <header className="relative z-50">
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q360,20 720,50 T1440,50 L1440,0 L0,0 Z"
            fill="rgba(255, 255, 255, 0.95)"
            className="drop-shadow-lg"
          />
        </svg>
        <div className="relative pt-8 pb-12 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CoursetuTor
              </div>
              <svg className="absolute -inset-4 -z-10" viewBox="0 0 200 80">
                <ellipse cx="100" cy="40" rx="95" ry="35" fill="rgba(168, 85, 247, 0.1)" />
              </svg>
            </motion.div>

            <nav className="flex items-center gap-2">
              {['Courses', 'About', 'Community'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="relative px-6 py-3 text-sm font-medium text-purple-700 hover:text-purple-900 transition-all"
                  >
                    <span className="relative z-10">{item}</span>
                    <svg className="absolute inset-0 w-full h-full -z-10 opacity-0 hover:opacity-100 transition-opacity" viewBox="0 0 120 50">
                      <ellipse cx="60" cy="25" rx="55" ry="22" fill="rgba(168, 85, 247, 0.15)" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/login">
                    <Button className="relative px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium shadow-lg overflow-hidden group">
                      <span className="relative z-10">Sign In</span>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 60">
                        <path
                          d="M10,30 Q35,10 70,30 T130,30 Q135,30 135,35 T130,40 Q105,50 70,40 T10,40 Q5,40 5,35 T10,30"
                          fill="currentColor"
                          className="opacity-100 group-hover:opacity-80 transition-opacity"
                        />
                      </svg>
                    </Button>
                  </Link>
                </motion.div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* BLOB HERO SECTION */}
      <main className="relative px-8 py-16">
        {/* Floating Background Blobs */}
        <motion.div style={{ y: y1 }} className="absolute top-0 left-20 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-3xl" />
        <motion.div style={{ y: y2 }} className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-[60%_40%_30%_70%/40%_70%_30%_60%] blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          {/* Main Hero Blob */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <svg className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] -z-10" viewBox="0 0 800 600">
              <path
                d="M400,50 Q600,100 700,300 Q650,500 400,550 Q150,500 100,300 Q200,100 400,50"
                fill="url(#blobGradient1)"
                className="drop-shadow-2xl"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M400,50 Q600,100 700,300 Q650,500 400,550 Q150,500 100,300 Q200,100 400,50;
                    M400,80 Q580,120 680,300 Q620,480 400,520 Q180,480 120,300 Q220,120 400,80;
                    M400,50 Q600,100 700,300 Q650,500 400,550 Q150,500 100,300 Q200,100 400,50
                  "
                />
              </path>
              <defs>
                <linearGradient id="blobGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative bg-white/70 backdrop-blur-sm rounded-[40%_60%_50%_50%/60%_40%_60%_40%] p-16 shadow-2xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
              >
                Learn in Flow,<br />Grow Naturally
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-purple-800 mb-8 max-w-2xl leading-relaxed"
              >
                Embrace organic learning paths that adapt to your rhythm.
                No rigid structures, just natural progression.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                <Link to="/courses">
                  <Button className="relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg overflow-hidden group shadow-lg">
                    <span className="relative z-10">Start Learning</span>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 70">
                      <ellipse cx="100" cy="35" rx="95" ry="32" fill="currentColor" className="opacity-100 group-hover:opacity-90 transition-opacity" />
                    </svg>
                  </Button>
                </Link>

                <Link to="/explore">
                  <Button className="relative px-8 py-4 bg-white/50 backdrop-blur text-purple-700 font-semibold text-lg overflow-hidden group shadow-lg">
                    <span className="relative z-10">Explore Paths</span>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 70">
                      <ellipse cx="100" cy="35" rx="95" ry="32" fill="white" className="opacity-50 group-hover:opacity-70 transition-opacity" />
                    </svg>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Stats Blobs */}
          <div className="grid grid-cols-3 gap-8 mt-24">
            {[
              { value: '10K+', label: 'Happy Learners', color: 'from-pink-400 to-rose-400' },
              { value: '200+', label: 'Courses', color: 'from-purple-400 to-violet-400' },
              { value: '95%', label: 'Success Rate', color: 'from-blue-400 to-cyan-400' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, type: 'spring' }}
                className="relative"
              >
                <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] -z-10" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r="140" fill={`url(#statGradient${idx})`} opacity="0.2">
                    <animate
                      attributeName="r"
                      dur="3s"
                      repeatCount="indefinite"
                      values="140;145;140"
                    />
                  </circle>
                  <defs>
                    <linearGradient id={`statGradient${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={idx === 0 ? '#ec4899' : idx === 1 ? '#a855f7' : '#3b82f6'} />
                      <stop offset="100%" stopColor={idx === 0 ? '#f43f5e' : idx === 1 ? '#8b5cf6' : '#06b6d4'} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="relative bg-white/80 backdrop-blur rounded-[50%] p-8 text-center shadow-xl">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-purple-700 mt-2 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Course Blobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32 mb-32">
            {[
              { title: 'Web Development', desc: 'Flow through modern web technologies', color: 'from-pink-500 to-rose-500', delay: 0 },
              { title: 'Data Science', desc: 'Natural patterns in data analysis', color: 'from-purple-500 to-violet-500', delay: 0.2 },
              { title: 'Mobile Design', desc: 'Organic user experiences', color: 'from-blue-500 to-cyan-500', delay: 0.4 },
              { title: 'Cloud Architecture', desc: 'Fluid infrastructure solutions', color: 'from-indigo-500 to-purple-500', delay: 0.6 }
            ].map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: course.delay }}
                viewport={{ once: true }}
                className="relative group"
              >
                <svg className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] -z-10" viewBox="0 0 500 400">
                  <path
                    d="M250,50 Q400,100 450,200 Q400,300 250,350 Q100,300 50,200 Q100,100 250,50"
                    fill={`url(#courseGradient${idx})`}
                    opacity="0.15"
                    className="group-hover:opacity-25 transition-opacity"
                  >
                    <animate
                      attributeName="d"
                      dur="8s"
                      repeatCount="indefinite"
                      values="
                        M250,50 Q400,100 450,200 Q400,300 250,350 Q100,300 50,200 Q100,100 250,50;
                        M250,70 Q380,120 430,200 Q380,280 250,330 Q120,280 70,200 Q120,120 250,70;
                        M250,50 Q400,100 450,200 Q400,300 250,350 Q100,300 50,200 Q100,100 250,50
                      "
                    />
                  </path>
                  <defs>
                    <linearGradient id={`courseGradient${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={idx === 0 ? '#ec4899' : idx === 1 ? '#a855f7' : idx === 2 ? '#3b82f6' : '#6366f1'} />
                      <stop offset="100%" stopColor={idx === 0 ? '#f43f5e' : idx === 1 ? '#8b5cf6' : idx === 2 ? '#06b6d4' : '#a855f7'} />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="relative bg-white/90 backdrop-blur rounded-[40%_60%_40%_60%/50%_50%_50%_50%] p-10 shadow-xl hover:shadow-2xl transition-all">
                  <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                    {course.title}
                  </h3>
                  <p className="text-purple-700 mb-6 text-lg">{course.desc}</p>
                  <Button className={`relative px-6 py-3 bg-gradient-to-r ${course.color} text-white font-medium overflow-hidden shadow-lg`}>
                    <span className="relative z-10">Explore Course</span>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 180 60">
                      <ellipse cx="90" cy="30" rx="85" ry="28" fill="currentColor" />
                    </svg>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
