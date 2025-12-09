/**
 * VARIANT 44: PLURALSIGHT STYLE (Light Theme)
 * Inspired by Pluralsight's tech skills platform
 * - Technology skills focus with parallax
 * - Skill assessments emphasis
 * - Purple/red accents on light background
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

export function HomePageV44() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Pluralsight parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const featuresY = useTransform(smoothProgress, [0.15, 0.4], [50, 0]);
  const pathsY = useTransform(smoothProgress, [0.3, 0.55], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header - Udemy Style: Marketplace with categories, wide search, cart icon, teach link */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b border-slate-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-3">
          <div className="flex justify-between items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-slate-900 shrink-0">
              Udemy
            </Link>
            <motion.button
              className="hidden lg:flex items-center gap-1 text-slate-700 hover:text-[#a435f0] text-sm px-3 py-2 hover:bg-slate-50 rounded"
              whileHover={{ scale: 1.02 }}
            >
              Categories
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full border border-slate-300 rounded-full px-6 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#a435f0] pl-12"
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <nav className="flex items-center gap-4 text-sm shrink-0">
              <Link to="/courses" className="hidden lg:block text-slate-700 hover:text-[#a435f0] transition-colors">
                Courses
              </Link>
              <Link to="/about" className="hidden md:block text-slate-700 hover:text-[#a435f0] transition-colors">
                About
              </Link>
              <Link to="/help" className="hidden md:block text-slate-700 hover:text-[#a435f0] transition-colors">
                Help
              </Link>
              <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-slate-700 hover:text-[#a435f0] transition-colors">
                {isAuthenticated ? "My Learning" : "Log in"}
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2">
                      Sign up
                    </Button>
                  </motion.div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero - Deal/Promotion Banner with Course Grid */}
      <section className="py-12 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-slate-900 relative overflow-hidden border-b-4 border-[#a435f0]">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <motion.div
            style={{ y: heroY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-[#a435f0]">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                <div className="bg-[#a435f0] text-white px-3 py-1 rounded text-xs font-bold">SPECIAL OFFER</div>
                <span className="text-sm text-slate-600">Limited time only</span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                Build tech skills that <span className="text-[#a435f0]">matter</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-700 mb-6">
                Measure your skills, close gaps, and get hands-on with technology you'll use at work.
                <span className="font-semibold text-slate-900"> 7,000+ courses from 1,400+ experts.</span>
              </motion.p>
              <motion.div variants={itemVariants} className="flex items-center gap-6 mb-6">
                <div>
                  <div className="text-sm text-slate-600">Courses starting at</div>
                  <div className="text-3xl font-bold text-[#a435f0]">$13.99</div>
                </div>
                <div className="h-12 w-px bg-slate-300" />
                <div className="text-sm text-slate-600">
                  ★★★★★ 4.8/5 from 500K+ reviews<br />
                  <span className="text-emerald-600 font-medium">10-day money-back guarantee</span>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-[#a435f0] hover:bg-[#8710d8] text-white px-10 py-4 text-lg font-bold">
                        Continue Learning →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-[#a435f0] hover:bg-[#8710d8] text-white px-10 py-4 text-lg font-bold">
                        Start Learning Now →
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Course Grid Preview */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Python Bootcamp', rating: 4.7, students: '450K', price: '$13.99', img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=150&fit=crop' },
              { title: 'React Complete Guide', rating: 4.8, students: '380K', price: '$13.99', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=150&fit=crop' },
              { title: 'Web Design Mastery', rating: 4.6, students: '250K', price: '$13.99', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=150&fit=crop' },
              { title: 'AWS Certified', rating: 4.9, students: '320K', price: '$13.99', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=150&fit=crop' },
            ].map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200"
              >
                <img src={course.img} alt={course.title} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-sm text-slate-900 mb-1 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-1 text-xs mb-1">
                    <span className="text-amber-500 font-bold">{course.rating}</span>
                    <span className="text-amber-400">★★★★★</span>
                    <span className="text-slate-500">({course.students})</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">{course.price}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f1f5f9" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.p
            className="text-center text-slate-500 text-sm mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted by 70% of the Fortune 500
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {['Microsoft', 'Salesforce', 'Adobe', 'Dell', 'VMware', 'Oracle'].map((company) => (
              <motion.div
                key={company}
                variants={itemVariants}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-lg font-semibold text-slate-400 cursor-default"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curved transition */}
      <div className="relative bg-slate-100">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <motion.div style={{ y: featuresY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-slate-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Build skills your way
          </motion.h2>
          <motion.p
            className="text-slate-600 text-center mb-16 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Whether you're looking to validate your skills or learn something new, we've got you covered.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: '📊', title: 'Skill IQ', desc: 'Measure your skills and find your gaps. Get personalized recommendations.' },
              { icon: '🛤️', title: 'Learning Paths', desc: 'Curated courses for specific roles and skills. 87% success rate.' },
              { icon: '🔬', title: 'Hands-on Labs', desc: 'Practice in real environments, not simulations. Build real experience.' },
              { icon: '📱', title: 'Learn Anywhere', desc: 'Mobile apps for learning on the go. Sync across all devices.' },
              { icon: '📈', title: 'Track Progress', desc: 'Analytics to measure team and individual growth. Data-driven learning.' },
              { icon: '🎓', title: 'Certifications', desc: 'Prep for AWS, Azure, Google Cloud, and more. Industry-recognized.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: '#e83b5a' }}
                className="p-8 rounded-xl border-2 border-slate-200 bg-white cursor-pointer transition-all"
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Paths with curved transition */}
      <div className="relative bg-white">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-20 px-6 bg-slate-50">
        <motion.div style={{ y: pathsY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Popular Learning Paths</h2>
            <Link to="/courses" className="text-[#e83b5a] hover:underline">View all →</Link>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'React Developer', courses: 24, hours: '48h', color: '#61dafb' },
              { title: 'Python Developer', courses: 18, hours: '35h', color: '#3776ab' },
              { title: 'AWS Solutions Architect', courses: 15, hours: '40h', color: '#ff9900' },
              { title: 'DevOps Engineer', courses: 22, hours: '55h', color: '#2496ed' },
            ].map((path, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: '#e83b5a' }}
                className="bg-white rounded-lg overflow-hidden border-2 border-slate-200 cursor-pointer transition-all"
              >
                <div className="h-2" style={{ backgroundColor: path.color }} />
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 mb-3">{path.title}</h3>
                  <p className="text-sm text-slate-500">{path.courses} courses · {path.hours}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

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
            { value: '7,000+', label: 'Courses' },
            { value: '1,400+', label: 'Expert Authors' },
            { value: '87%', label: 'Career Success' },
            { value: '1M+', label: 'Learners' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-[#e83b5a] mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const }}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#e83b5a"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-6 bg-gradient-to-r from-[#e83b5a] to-[#c72d4c] text-white">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Start building skills today
          </motion.h2>
          <p className="text-xl text-white/90 mb-4">
            10-day free trial. Join 1M+ learners.
          </p>
          <p className="text-sm text-white/80 mb-10">
            <span className="text-yellow-300 font-medium">✓ No credit card required</span> • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-white text-[#e83b5a] hover:bg-slate-100 px-12 py-6 text-lg font-bold">
                {isAuthenticated ? "Continue Learning" : "Start Free Trial"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-100 border-t border-slate-200">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 text-sm text-slate-600">
          <motion.span className="font-bold" whileHover={{ scale: 1.02 }}>
            <span className="text-[#e83b5a]">Plural</span><span className="text-slate-800">sight</span>
          </motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-[#e83b5a] transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-[#e83b5a] transition-colors">About</Link>
            <Link to="/help" className="hover:text-[#e83b5a] transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={44} />
    </div>
  );
}
