/**
 * VARIANT 43: EDX STYLE (Light Theme)
 * Inspired by edX's academic learning platform
 * - University partnership focus with parallax
 * - Academic credibility
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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV43() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // edX parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const partnersY = useTransform(smoothProgress, [0.05, 0.25], [30, 0]);
  const programsY = useTransform(smoothProgress, [0.15, 0.4], [50, 0]);
  const coursesY = useTransform(smoothProgress, [0.3, 0.55], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Lora', Georgia, serif" }}>
      {/* Header - Coursera Style: Educational platform with categories dropdown, search, enterprise link */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-[#02b5e4]">
                Coursera
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <motion.button
                  className="flex items-center gap-1 text-gray-700 hover:text-[#02b5e4] text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="border border-gray-300 rounded-full px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#02b5e4]"
                  />
                </div>
              </div>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/courses" className="text-gray-700 hover:text-[#02b5e4] transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#02b5e4] transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-[#02b5e4] transition-colors font-medium">
                Help
              </Link>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-[#02b5e4] hover:text-[#01a3cf] transition-colors font-medium">
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-[#02b5e4] hover:bg-[#01a3cf] text-white px-6 py-2 rounded-sm">
                      Join for Free
                    </Button>
                  </motion.div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero - Course Carousel Preview with Featured Course */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50 to-cyan-50">
        <motion.div
          style={{ y: heroY }}
          className="w-full max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <motion.p variants={itemVariants} className="text-teal-700 text-sm font-semibold mb-4 tracking-wide">
                FEATURED COURSE
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900"
              >
                Learn from the world's best universities
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-slate-700 mb-4">
                Access 4,000+ courses from 160+ institutions. Earn credentials from Harvard, MIT, Berkeley, and more.
              </motion.p>
              <motion.p variants={itemVariants} className="text-sm text-slate-600 mb-6">
                ★★★★★ 4.8/5 from 1M+ reviews • <span className="text-emerald-600 font-medium">FREE to start</span>
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-[#02b5e4] hover:bg-[#01a3cf] text-white px-8 py-4 font-semibold">
                        Explore Courses →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-[#02b5e4] hover:bg-[#01a3cf] text-white px-8 py-4 font-semibold">
                        Join for Free →
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
              <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4 text-xs text-slate-600">
                <span>77M+ Learners</span>
                <span>•</span>
                <span>160+ Institutions</span>
                <span>•</span>
                <span>87% Success Rate</span>
              </motion.div>
            </div>
            <motion.div
              className="lg:col-span-3 hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Machine Learning', uni: 'Stanford', enrolled: '2.8M', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop' },
                  { title: 'Data Science', uni: 'Harvard', enrolled: '1.5M', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
                  { title: 'Web Development', uni: 'MIT', enrolled: '1.2M', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop' },
                  { title: 'Business Analytics', uni: 'Berkeley', enrolled: '980K', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop' },
                ].map((course, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <img src={course.img} alt={course.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <div className="text-xs text-[#02b5e4] font-semibold mb-1">{course.uni}</div>
                      <h3 className="font-bold text-sm text-slate-900 mb-2">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{course.enrolled} enrolled</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-4 flex justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#02b5e4]' : 'bg-gray-300'}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f9fafb" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* University Partners */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <motion.div style={{ y: partnersY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.p
            className="text-center text-sm text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted by learners at world's top institutions
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {['Harvard', 'MIT', 'Berkeley', 'Stanford', 'Oxford', 'Cambridge'].map((uni) => (
              <motion.div
                key={uni}
                variants={itemVariants}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-xl font-serif text-gray-400 cursor-default"
              >
                {uni}
              </motion.div>
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

      {/* Program Types */}
      <section className="py-20 px-6">
        <motion.div style={{ y: programsY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-[#00262b] mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore learning pathways
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center mb-12 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            From free courses to online degrees, we have options for every learner. 87% advance their careers.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Free Courses', desc: 'Learn new skills with courses from top universities. 4,000+ options available.', icon: '📚', color: 'border-l-[#02b5e4]' },
              { title: 'Professional Certificates', desc: 'Demonstrate expertise with industry-recognized credentials. Boost your resume.', icon: '🎓', color: 'border-l-[#0eb28e]' },
              { title: 'Online Degrees', desc: 'Earn accredited degrees from top universities 100% online. Transform your career.', icon: '🏆', color: 'border-l-[#f5d430]' },
            ].map((program, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
                className={`bg-white border border-gray-200 ${program.color} border-l-4 p-8 cursor-pointer transition-all`}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {program.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-[#00262b] mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f9fafb"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-20 px-6 bg-gray-50">
        <motion.div style={{ y: coursesY }} className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#00262b]">Featured Courses</h2>
            <Link to="/courses" className="text-[#02b5e4] hover:underline">View all →</Link>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'CS50: Introduction to Computer Science', uni: 'Harvard', type: 'Course', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=170&fit=crop' },
              { title: 'Data Science Professional Certificate', uni: 'IBM', type: 'Certificate', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=170&fit=crop' },
              { title: 'Introduction to Python', uni: 'MIT', type: 'Course', img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=170&fit=crop' },
              { title: 'Business Analytics', uni: 'Berkeley', type: 'MicroMasters', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=170&fit=crop' },
            ].map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all"
              >
                <motion.img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-36 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <span className="text-xs text-[#02b5e4] font-semibold">{course.type}</span>
                  <h3 className="font-semibold text-[#00262b] mt-1 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.uni}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats with curved transition */}
      <div className="relative bg-gray-50">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#e0f2fe"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-16 px-6 bg-sky-100">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { value: '77M+', label: 'Learners' },
            { value: '4,000+', label: 'Courses' },
            { value: '87%', label: 'Career Success' },
            { value: '20+', label: 'Online Degrees' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-cyan-700 mb-2"
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

      {/* For Business */}
      <div className="relative bg-sky-100">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#02b5e4] font-semibold text-sm">EDX FOR BUSINESS</span>
            <h2 className="text-3xl font-bold text-[#00262b] mt-2 mb-6">
              Upskill your entire workforce
            </h2>
            <p className="text-gray-600 mb-4">
              Give your team access to world-class learning from top universities
              and companies. Track progress and measure impact with enterprise tools.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              <span className="text-emerald-600 font-medium">✓ Free demo available</span> • Used by Fortune 500 companies
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-[#00262b] hover:bg-[#003a42] text-white px-8 py-3">
                Learn more →
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop"
              alt="Team learning"
              className="rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#dbeafe"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-20 px-6 bg-blue-100">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Start your learning journey today
          </motion.h2>
          <p className="text-xl text-slate-700 mb-4">
            Join 77 million learners from around the world.
          </p>
          <p className="text-sm text-slate-600 mb-10">
            <span className="text-emerald-600 font-medium">✓ Free to start</span> • No credit card required • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 px-12 py-4 text-lg font-semibold">
                {isAuthenticated ? "Explore Courses" : "Register for Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-100 text-slate-600">
        <div className="w-full">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <motion.h4 className="font-bold text-slate-900 mb-4" whileHover={{ scale: 1.02 }}>edX</motion.h4>
              <p className="text-sm">Access education from 160+ top institutions worldwide.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-teal-700 transition-colors">Courses</Link></li>
                <li><Link to="/about" className="hover:text-teal-700 transition-colors">About</Link></li>
                <li><Link to="/help" className="hover:text-teal-700 transition-colors">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-300 text-sm">
            © 2024 edX LLC. All rights reserved.
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={43} />
    </div>
  );
}
