/**
 * VARIANT 45: CODECADEMY STYLE (Light Theme)
 * Inspired by Codecademy's interactive learning
 * - Interactive code emphasis
 * - Yellow/white light theme
 * - Hands-on learning focus
 * - Beginner-friendly messaging
 * - Full-width coding aesthetic
 * - Framer Motion animations
 * - Parallax scrolling effects
 * - Curved SVG transitions
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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV45() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const codeEditorY = useTransform(smoothProgress, [0, 0.3], [0, -30]);
  const languagesY = useTransform(smoothProgress, [0.1, 0.4], [30, -20]);
  const pathsY = useTransform(smoothProgress, [0.2, 0.5], [40, -20]);
  const featuresY = useTransform(smoothProgress, [0.3, 0.6], [30, -15]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Header - edX Style: Academic/university partnership with partner logos, formal nav */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-cyan-600">
        <div className="w-full">
          <div className="bg-slate-50 border-b border-slate-200 py-2 px-6">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-6 text-slate-600">
                <span className="font-semibold">Partner Institutions:</span>
                {['Harvard', 'MIT', 'Berkeley', 'Stanford'].map((uni) => (
                  <motion.span
                    key={uni}
                    className="font-serif hover:text-cyan-700 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {uni}
                  </motion.span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link to="/help" className="hover:text-cyan-700 transition-colors">Help</Link>
                <Link to="/about" className="hover:text-cyan-700 transition-colors">About</Link>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-slate-900">
                edX
              </Link>
              <nav className="hidden md:flex gap-6 text-sm font-medium">
                <motion.button
                  className="flex items-center gap-1 text-slate-700 hover:text-cyan-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Programs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <Link to="/courses" className="text-slate-700 hover:text-cyan-700 transition-colors">
                  Courses
                </Link>
                <motion.button className="text-slate-700 hover:text-cyan-700 transition-colors">
                  Online Degrees
                </motion.button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-700 hover:text-cyan-700 transition-colors text-sm font-medium">
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 font-semibold">
                      Register
                    </Button>
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Credential-focused with Certificate Preview & Institution Badges */}
      <section className="py-20 px-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-50">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            style={{ y: heroY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-600 text-white px-3 py-1 rounded text-xs font-bold">ACCREDITED</div>
                <div className="bg-emerald-600 text-white px-3 py-1 rounded text-xs font-bold">UNIVERSITY BACKED</div>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900"
              >
                Earn credentials from
                <span className="block text-cyan-700">world-class universities</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-700 mb-4">
                Access 4,000+ courses from 160+ institutions. Earn verified certificates and accredited degrees from Harvard, MIT, Berkeley, and more.
                <span className="font-semibold text-slate-900"> 77M+ learners worldwide.</span>
              </motion.p>
              <motion.p variants={itemVariants} className="text-sm text-slate-600 mb-8">
                ★★★★★ 4.8/5 from 1M+ reviews • <span className="text-emerald-600 font-medium">FREE courses available</span>
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                {isAuthenticated ? (
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 text-lg font-semibold">
                        Explore Courses →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 text-lg font-semibold">
                          Create Free Account →
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="border-2 border-cyan-600 hover:bg-cyan-50 text-cyan-700 px-10 py-4 text-lg font-semibold">
                          Browse Courses
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="font-semibold">77M+ learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="font-semibold">160+ institutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">87% success rate</span>
                </div>
              </motion.div>
            </div>

            {/* Certificate Preview with Institution Badges */}
            <motion.div
              className="hidden lg:block"
              style={{ y: codeEditorY }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-2xl border-4 border-cyan-600 p-8 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600" />
                <div className="text-center mb-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Verified Certificate</h3>
                  <p className="text-sm text-slate-600 mb-1">Data Science Professional Certificate</p>
                  <p className="text-xs text-slate-500">Issued by Harvard University</p>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['Harvard', 'MIT', 'Berkeley'].map((uni, i) => (
                      <motion.div
                        key={uni}
                        className="bg-slate-50 rounded p-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xs font-serif font-semibold text-slate-700">{uni}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500">Verified on blockchain</p>
                    <p className="text-xs text-cyan-600 font-mono">ID: #EDX-2024-DS-12345</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Languages */}
      <motion.section
        className="py-16 px-6 bg-slate-100"
        style={{ y: languagesY }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Start with a language
          </motion.h2>
          <motion.p
            className="text-slate-600 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            500+ courses across 14+ programming languages
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Python', color: '#3776ab' },
              { name: 'JavaScript', color: '#f7df1e' },
              { name: 'HTML/CSS', color: '#e34c26' },
              { name: 'SQL', color: '#00758f' },
              { name: 'Java', color: '#007396' },
              { name: 'C++', color: '#00599C' },
            ].map((lang, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.03, rotate: i % 2 === 0 ? 2 : -2 }}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors cursor-pointer text-center shadow-sm hover:shadow-md"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: lang.color + '20' }}
                  whileHover={{ rotate: 5 }}
                >
                  <span style={{ color: lang.color }}>{'</>'}</span>
                </motion.div>
                <div className="font-semibold text-slate-800">{lang.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Curved transition */}
      <div className="relative bg-slate-100">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Career Paths */}
      <motion.section
        className="py-20 px-6 bg-white"
        style={{ y: pathsY }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold">Career paths</h2>
              <p className="text-slate-600 text-sm mt-1">87% of graduates get hired within 6 months</p>
            </motion.div>
            <Link to="/courses" className="text-amber-600 hover:text-amber-700 font-medium">View all →</Link>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Front-End Engineer', skills: 'HTML, CSS, JavaScript, React', duration: '6 months', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=150&fit=crop', salary: '$85K avg' },
              { title: 'Data Scientist', skills: 'Python, SQL, Machine Learning', duration: '8 months', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=150&fit=crop', salary: '$120K avg' },
              { title: 'Full-Stack Engineer', skills: 'Front-end, Back-end, Databases', duration: '10 months', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=150&fit=crop', salary: '$105K avg' },
            ].map((path, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm hover:shadow-lg"
              >
                <div className="relative">
                  <img src={path.img} alt={path.title} className="w-full h-32 object-cover" />
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {path.salary}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-amber-600 font-semibold">CAREER PATH</span>
                  <h3 className="text-lg font-bold mt-2 mb-2 text-slate-800">{path.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{path.skills}</p>
                  <p className="text-xs text-slate-500">{path.duration} average</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Curved transition */}
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f1f5f9"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Why Us */}
      <motion.section
        className="py-20 px-6 bg-slate-100"
        style={{ y: featuresY }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why learn with us?
          </motion.h2>
          <motion.p
            className="text-slate-600 text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We've helped over 100,000 people learn to code and launch new careers.
            <span className="font-semibold text-slate-800"> Here's why they chose us.</span>
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '💻', title: 'Learn by Doing', desc: 'Write real code in your browser from day one. No setup required.', stat: '1M+ code exercises' },
              { icon: '🎯', title: 'Personalized Path', desc: 'Learning plans tailored to your goals and current skill level.', stat: 'AI-powered' },
              { icon: '🤝', title: 'Community Support', desc: 'Get help from our global community of learners and mentors.', stat: '24/7 forums' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="text-center p-8 bg-white rounded-xl border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
              >
                <motion.div
                  className="text-5xl mb-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 mb-4">{feature.desc}</p>
                <span className="text-xs font-semibold text-amber-600">{feature.stat}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🚀
          </motion.div>
          <blockquote className="text-xl text-slate-700 mb-6">
            "I went from zero coding knowledge to landing a $95K front-end developer job in just 7 months. The hands-on approach made all the difference."
          </blockquote>
          <div className="text-amber-600 font-semibold">— Maria S., Front-End Developer at Stripe</div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-slate-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '100K+', label: 'Active Learners' },
            { value: '500+', label: 'Expert Courses' },
            { value: '87%', label: 'Career Success' },
            { value: 'Free', label: 'To start' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-amber-500 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const }}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-slate-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f59e0b"
            d="M0,30L60,35C120,40,240,50,360,50C480,50,600,40,720,30C840,20,960,20,1080,25C1200,30,1320,40,1380,45L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900">
        <motion.div
          className="w-full max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Start coding today
          </motion.h2>
          <p className="text-xl text-slate-800 mb-4">
            Join 100,000+ learners who've transformed their careers with us.
          </p>
          <p className="text-sm text-slate-700 mb-10">
            <span className="font-bold">✓ Free to start</span> • No credit card required • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 text-lg font-bold shadow-xl">
                {isAuthenticated ? "Continue Learning →" : "Start Learning Free →"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-50 text-slate-900">
        <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6 text-sm">
          <motion.span className="font-bold text-lg" whileHover={{ scale: 1.02 }}>
            <span className="text-amber-500">&lt;</span>
            Code
            <span className="text-amber-500">/&gt;</span>
          </motion.span>
          <div className="flex gap-6 text-slate-600">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={45} />
    </div>
  );
}
