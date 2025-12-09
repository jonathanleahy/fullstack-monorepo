import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV90() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 overflow-hidden">
      <DesignNavigation currentVersion={90} />

      {/* CIRCULAR/RADIAL HEADER */}
      <header className="relative h-40 flex items-center justify-center">
        {/* Central Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="absolute z-20"
        >
          <Link to="/">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl border-4 border-white/30">
              <span className="text-white font-bold text-lg">CT</span>
            </div>
          </Link>
        </motion.div>

        {/* Orbiting Navigation */}
        <div className="absolute w-[500px] h-[500px]">
          {['Courses', 'About', 'Community', 'Pricing', 'Blog', !isAuthenticated && 'Login'].filter(Boolean).map((item, idx, arr) => {
            const angle = (idx / arr.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const itemStr = typeof item === 'string' ? item : 'Login';

            return (
              <motion.div
                key={itemStr}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
              >
                <Link to={`/${itemStr.toLowerCase()}`}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-xs font-semibold shadow-xl ${
                      itemStr === 'Login'
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900'
                        : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30'
                    }`}
                  >
                    {itemStr}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Rotating Ring */}
        <motion.div
          style={{ rotate }}
          className="absolute w-[450px] h-[450px] rounded-full border-2 border-dashed border-white/20"
        />
      </header>

      {/* RADIAL HERO SECTION */}
      <main className="relative px-8 py-24">
        <div className="max-w-7xl mx-auto">

          {/* Concentric Circles Hero */}
          <div className="relative flex items-center justify-center min-h-[600px] mb-32">

            {/* Outermost Circle - Background */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 blur-xl"
            />

            {/* Middle Circle - Content Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute w-[500px] h-[500px] rounded-full border-2 border-purple-400/30 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm shadow-2xl"
            />

            {/* Inner Circle - Main Content */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 flex items-center justify-center shadow-2xl"
            >
              <div className="text-center px-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-5xl font-black text-white mb-4 leading-tight"
                >
                  360° Learning
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-lg text-white/90 mb-6"
                >
                  Complete skill mastery from every angle
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring' }}
                >
                  <Link to="/courses">
                    <Button className="rounded-full px-8 py-3 bg-white text-purple-900 font-bold hover:bg-yellow-300 transition-all shadow-xl">
                      Begin Journey
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Stats */}
            {[
              { label: '15K+\nStudents', angle: 0, color: 'from-pink-500 to-rose-500' },
              { label: '200+\nCourses', angle: 90, color: 'from-cyan-500 to-blue-500' },
              { label: '95%\nSuccess', angle: 180, color: 'from-green-500 to-emerald-500' },
              { label: '50+\nExperts', angle: 270, color: 'from-purple-500 to-violet-500' }
            ].map((stat, idx) => {
              const angle = (stat.angle * Math.PI) / 180;
              const radius = 280;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + idx * 0.1, type: 'spring' }}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-xl border-4 border-white/30`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold text-white whitespace-pre-line leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Radial Progress Sections */}
          <div className="relative flex items-center justify-center mb-32">
            <svg className="w-full max-w-4xl" viewBox="0 0 800 800">
              {/* Circular Sections */}
              {[
                { title: 'Learn', desc: 'Fundamentals', color: '#ec4899', start: 0, end: 90 },
                { title: 'Practice', desc: 'Projects', color: '#8b5cf6', start: 90, end: 180 },
                { title: 'Build', desc: 'Portfolio', color: '#3b82f6', start: 180, end: 270 },
                { title: 'Master', desc: 'Expert', color: '#10b981', start: 270, end: 360 }
              ].map((section, idx) => {
                const startAngle = (section.start - 90) * (Math.PI / 180);
                const endAngle = (section.end - 90) * (Math.PI / 180);
                const radius = 350;
                const innerRadius = 250;

                const x1 = 400 + Math.cos(startAngle) * innerRadius;
                const y1 = 400 + Math.sin(startAngle) * innerRadius;
                const x2 = 400 + Math.cos(startAngle) * radius;
                const y2 = 400 + Math.sin(startAngle) * radius;
                const x3 = 400 + Math.cos(endAngle) * radius;
                const y3 = 400 + Math.sin(endAngle) * radius;
                const x4 = 400 + Math.cos(endAngle) * innerRadius;
                const y4 = 400 + Math.sin(endAngle) * innerRadius;

                const largeArcFlag = section.end - section.start > 180 ? 1 : 0;

                const textAngle = ((section.start + section.end) / 2 - 90) * (Math.PI / 180);
                const textRadius = 300;
                const textX = 400 + Math.cos(textAngle) * textRadius;
                const textY = 400 + Math.sin(textAngle) * textRadius;

                return (
                  <g key={idx}>
                    <motion.path
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      d={`M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`}
                      fill={section.color}
                      opacity="0.7"
                      className="hover:opacity-100 transition-opacity cursor-pointer"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      className="fill-white font-bold text-2xl"
                    >
                      {section.title}
                    </text>
                    <text
                      x={textX}
                      y={textY + 20}
                      textAnchor="middle"
                      className="fill-white/70 text-sm"
                    >
                      {section.desc}
                    </text>
                  </g>
                );
              })}

              {/* Center Circle */}
              <circle cx="400" cy="400" r="200" fill="url(#centerGradient)" />
              <text x="400" y="390" textAnchor="middle" className="fill-white font-bold text-3xl">
                Your Path
              </text>
              <text x="400" y="420" textAnchor="middle" className="fill-white/70 text-lg">
                to Mastery
              </text>

              <defs>
                <radialGradient id="centerGradient">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Circular Course Cards */}
          <div className="relative flex items-center justify-center min-h-[800px] mb-32">
            <div className="absolute w-[700px] h-[700px]">
              {[
                { title: 'Web Dev', color: 'from-pink-500 to-rose-500', angle: 0 },
                { title: 'Data Science', color: 'from-purple-500 to-violet-500', angle: 60 },
                { title: 'Mobile', color: 'from-blue-500 to-cyan-500', angle: 120 },
                { title: 'Cloud', color: 'from-cyan-500 to-teal-500', angle: 180 },
                { title: 'AI/ML', color: 'from-green-500 to-emerald-500', angle: 240 },
                { title: 'DevOps', color: 'from-yellow-500 to-orange-500', angle: 300 }
              ].map((course, idx) => {
                const angle = (course.angle * Math.PI) / 180 - Math.PI / 2;
                const radius = 300;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    className="absolute cursor-pointer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center shadow-2xl border-4 border-white/50`}>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm">{course.title}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Center CTA */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: 'spring' }}
              className="relative z-10"
            >
              <Link to="/browse">
                <Button className="rounded-full px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all">
                  Explore All Courses
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Final Circular CTA */}
          <div className="relative flex items-center justify-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 1.5 }}
              className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center shadow-2xl"
            >
              <div className="text-center px-8">
                <h2 className="text-4xl font-black text-white mb-4">Start Today</h2>
                <p className="text-white/90 mb-6">Join the learning revolution</p>
                {!isAuthenticated && (
                  <Link to="/signup">
                    <Button className="rounded-full px-8 py-3 bg-white text-purple-900 font-bold hover:bg-yellow-300 transition-all shadow-xl">
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
