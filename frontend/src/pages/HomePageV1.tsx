/**
 * VARIANT 1: STUDENTS
 *
 * See full persona brief in: docs/website-brief.md → "V1 - HomePageV1.tsx (Students)"
 *
 * Target: College students supplementing education (Age 18-24)
 * Tone: Casual, peer-like, motivating - "Level up" mentality
 * Design: Sky blue primary, cyan accents, elevated shadows (shadow-xl shadow-sky-500/15)
 * Effects: Solar flares (sky/cyan), light geometric textures
 * Sales: Highlight portfolio building, flexible schedule, career prep
 * Layout Flow: Split hero → Icon row → Centered text → 3-col courses → Vertical timeline →
 *              2-col testimonials → Full-width banner → CTA
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

export function HomePageV1() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const popularCourses = [
    { title: 'Intro to Python', level: 'Beginner', duration: '6 weeks', icon: '🐍' },
    { title: 'Web Development Basics', level: 'Beginner', duration: '8 weeks', icon: '🌐' },
    { title: 'Data Analysis with Excel', level: 'Beginner', duration: '4 weeks', icon: '📊' },
  ];

  const benefits = [
    { icon: '⏰', title: 'Flexible Schedule' },
    { icon: '💰', title: 'Student Pricing' },
    { icon: '📱', title: 'Mobile Access' },
    { icon: '🎯', title: 'Career Ready' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50/30">
      {/* Header - V1: Logo LEFT, nav CENTER, auth RIGHT (standard) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-sky-600">Course Tutor</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-500/20">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Split layout with image and solar flares */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
        {/* Geometric texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/90 via-white/80 to-cyan-50/70" />

        {/* Solar flares */}
        <motion.div
          className="absolute top-10 right-1/3 w-72 h-72 bg-sky-200/25 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-[70px]" />

        {/* Floating emoji decorations */}
        <motion.div
          className="absolute top-20 left-[15%] text-4xl"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🚀
        </motion.div>
        <motion.div
          className="absolute top-40 right-[20%] text-3xl"
          animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
        >
          💡
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[10%] text-3xl"
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
        >
          ⭐
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-sky-100 text-sky-700 shadow-sm">Perfect for Students</Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              >
                Level Up Your Skills
                <span className="block bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  While You Study
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6 leading-relaxed">
                Course Tutor offers online courses in programming, design, and data analysis.
                No deadlines, no pressure. Learn when it works for your schedule.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-5 shadow-xl shadow-sky-500/25">
                      Start Building Today
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8 py-5 border-sky-200 hover:bg-sky-50 shadow-lg shadow-sky-500/10">
                    Explore Free Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-sky-500/15">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop"
                  alt="Students learning together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <div className="relative h-16 bg-gradient-to-b from-sky-50 to-white">
        <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full h-16" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,40 C360,90 1080,10 1440,50 L1440,100 L0,100 Z"/>
        </svg>
      </div>

      {/* SECTION 2: Benefits - Horizontal icon row */}
      <section className="py-12 px-4 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-slate-700 font-medium">{benefit.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What is Course Tutor - Centered text block */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What is Course Tutor?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            An online learning platform where you can take courses in web development,
            data science, design, and more. Each course includes video lessons, hands-on
            projects, and quizzes to help you learn effectively. Perfect for students
            looking to build skills alongside their studies.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4: Popular Courses - 3-column cards */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-slate-50/95" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Popular Beginner Courses</h2>
            <p className="text-slate-600">Start here if you're new to coding or design</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
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
                className="bg-white rounded-xl p-6 shadow-xl shadow-sky-500/10 border border-sky-100 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                <div className="flex gap-3 text-sm text-slate-500">
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded">{course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/courses" className="text-sky-600 hover:text-sky-700 font-medium transition-colors">
              View all courses →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works - Vertical timeline style */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Getting Started</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-cyan-200 to-sky-200 transform md:-translate-x-0.5" />

            <div className="space-y-12">
              {[
                { step: '1', title: 'Create Free Account', desc: 'Sign up in seconds with your email', side: 'left' },
                { step: '2', title: 'Pick a Course', desc: 'Browse topics that interest you', side: 'right' },
                { step: '3', title: 'Learn at Your Pace', desc: 'Watch videos between classes or on weekends', side: 'left' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: item.side === 'left' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-6 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-sky-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-sky-500/30 z-10" />
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${item.side === 'right' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl p-6 shadow-lg shadow-sky-500/10 border border-sky-100">
                      <div className="text-sky-600 font-bold mb-1">Step {item.step}</div>
                      <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonials - 2-column layout */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-cyan-50/50" />

        {/* Solar flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-100/20 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Student Success</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Alex T.', quote: 'Landed an internship after completing the web dev track. Great for building a portfolio!', role: 'CS Student → Software Intern' },
              { name: 'Maya P.', quote: 'The flexible schedule let me learn Python alongside my classes. Now I can automate my homework.', role: 'Engineering Student' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-xl shadow-sky-500/10 border border-sky-100"
              >
                <p className="text-slate-600 italic mb-6 text-lg leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-sky-500/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sky-600 text-sm">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Full-width image banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=400&fit=crop"
          alt="Students collaborating"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-cyan-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Learn on Your Schedule
            </h2>
            <p className="text-sky-100 text-lg">No deadlines. No pressure. Just learning.</p>
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="relative h-16 overflow-hidden">
        <svg viewBox="0 0 1440 100" className="absolute top-0 w-full h-16" preserveAspectRatio="none">
          <path fill="#0284c7" d="M0,20 C480,70 960,5 1440,35 L1440,0 L0,0 Z"/>
        </svg>
      </div>

      {/* SECTION 8: CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700" />
        {/* Solar flare on CTA */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-[80px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-sky-100 mb-8">
              Create a free account and explore courses today.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 px-10 py-5 font-medium shadow-xl shadow-black/20">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold text-sky-600">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={1} />
    </div>
  );
}
