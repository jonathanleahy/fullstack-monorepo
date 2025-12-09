/**
 * VARIANT 41: LINKEDIN LEARNING STYLE (Light Theme)
 * Inspired by LinkedIn Learning's professional platform
 * - Career-focused messaging with parallax
 * - Professional blue theme on light background
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV41() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // LinkedIn Learning parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const skillsY = useTransform(smoothProgress, [0.1, 0.4], [40, 0]);
  const pathsY = useTransform(smoothProgress, [0.2, 0.5], [50, 0]);
  const certY = useTransform(smoothProgress, [0.3, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header - LinkedIn Style: Professional network with centered search */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white font-bold text-sm">in</span>
            </motion.div>
            <span className="font-semibold text-xl text-gray-900">Learning</span>
          </Link>
          <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for skills, subjects, or software"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/courses" className="text-gray-600 hover:text-[#0a66c2] transition-colors">
              Courses
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#0a66c2] transition-colors">
              About
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-[#0a66c2] transition-colors">
              Help
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-gray-600 hover:text-[#0a66c2] transition-colors">
              {isAuthenticated ? "Dashboard" : "Sign in"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-2">
                    Start free trial
                  </Button>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Profile Card Style with Professional Imagery */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <motion.div
          style={{ y: heroY }}
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[#0a66c2] to-[#004182]" />
            <div className="px-8 pb-8 -mt-16 grid lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <motion.div
                  className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
                    alt="Professional"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                  Build the skills you need
                  <span className="block text-[#0a66c2]">for today's jobs</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-4">
                  Join 27M+ professionals learning business, tech, and creative skills to achieve their goals.
                </motion.p>
                <motion.div variants={itemVariants} className="flex gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0a66c2]">100K+</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                  <div className="w-px bg-gray-300" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0a66c2]">27M+</div>
                    <div className="text-xs text-gray-600">Learners</div>
                  </div>
                  <div className="w-px bg-gray-300" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0a66c2]">87%</div>
                    <div className="text-xs text-gray-600">Success</div>
                  </div>
                </motion.div>
                <motion.p variants={itemVariants} className="text-sm text-gray-600 mb-6">
                  ★★★★★ 4.9/5 from 500,000+ reviews • <span className="text-emerald-600 font-medium">FREE trial</span>
                </motion.p>
                <motion.div variants={itemVariants}>
                  {isAuthenticated ? (
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-4 font-semibold">
                          Continue Learning →
                        </Button>
                      </motion.div>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-4 font-semibold">
                          Start my free month →
                        </Button>
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              </div>
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { skill: 'Leadership', level: 85 },
                    { skill: 'Data Analysis', level: 78 },
                    { skill: 'Project Mgmt', level: 92 },
                    { skill: 'Communication', level: 88 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-blue-50 p-4 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="text-sm font-semibold text-gray-800 mb-2">{item.skill}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#0a66c2] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{item.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f9fafb" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Skills in Demand */}
      <section className="py-16 px-6 bg-gray-50">
        <motion.div style={{ y: skillsY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills in demand right now
          </motion.h2>
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              'Project Management',
              'Data Analysis',
              'Python',
              'Excel',
              'Leadership',
              'Communication',
              'SQL',
              'AWS',
              'Machine Learning',
              'Agile',
              'Power BI',
              'Tableau',
            ].map((skill, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.1, borderColor: '#0a66c2', color: '#0a66c2' }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 cursor-pointer transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-gray-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Learning Paths */}
      <section className="py-16 px-6">
        <motion.div style={{ y: pathsY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Build career-ready skills</h2>
            <Link to="/courses" className="text-[#0a66c2] hover:underline text-sm">
              View all learning paths →
            </Link>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Become a Data Analyst', courses: 11, hours: '24h', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=150&fit=crop' },
              { title: 'Become a Project Manager', courses: 8, hours: '18h', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=150&fit=crop' },
              { title: 'Become a Software Developer', courses: 15, hours: '35h', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=150&fit=crop' },
            ].map((path, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all"
              >
                <motion.img
                  src={path.img}
                  alt={path.title}
                  className="w-full h-36 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <p className="text-xs text-[#0a66c2] font-semibold mb-1">LEARNING PATH</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-sm text-gray-500">{path.courses} courses · {path.hours}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Certificate Section with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f3f2ef"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-16 px-6 bg-[#f3f2ef]">
        <motion.div
          style={{ y: certY }}
          className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Earn certificates to showcase your skills
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Add certificates of completion to your LinkedIn profile and resume
              to stand out to recruiters and hiring managers.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              <span className="text-emerald-600 font-medium">✓ FREE trial</span> • 87% of learners advance their careers
            </p>
            <ul className="space-y-4">
              {[
                'Recognized by employers worldwide',
                'Shareable on your LinkedIn profile',
                'Verified proof of your expertise',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-6 h-6 bg-[#0a66c2] rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>
              <h3 className="font-bold text-gray-900 mb-2">Certificate of Completion</h3>
              <p className="text-sm text-gray-500">Data Analysis</p>
              <p className="text-xs text-gray-400 mt-2">Issued Dec 2024</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="relative bg-[#f3f2ef]">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-16 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { value: '21,000+', label: 'Courses' },
            { value: '27M+', label: 'Learners' },
            { value: '87%', label: 'Career Success' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#0a66c2] mb-1"
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

      {/* CTA with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#0a66c2"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-16 px-6 bg-[#0a66c2] text-white">
        <motion.div
          className="w-full text-center"
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
            Start learning today
          </motion.h2>
          <p className="text-xl text-blue-100 mb-4">
            Get one month of unlimited access free. Join 27M+ learners.
          </p>
          <p className="text-sm text-blue-200 mb-10">
            <span className="text-yellow-300 font-medium">✓ Free to start</span> • No credit card required • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-white text-[#0a66c2] hover:bg-gray-100 px-12 py-4 text-lg font-semibold">
                {isAuthenticated ? "Browse Courses" : "Start Free Trial"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 text-gray-600">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 text-sm">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
            <div className="w-6 h-6 bg-[#0a66c2] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">in</span>
            </div>
            <span>© 2024 LinkedIn Learning</span>
          </motion.div>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-[#0a66c2] transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-[#0a66c2] transition-colors">About</Link>
            <Link to="/help" className="hover:text-[#0a66c2] transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={41} />
    </div>
  );
}
