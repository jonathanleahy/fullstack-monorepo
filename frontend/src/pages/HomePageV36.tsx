/**
 * VARIANT 36: COURSERA STYLE
 * Inspired by Coursera's academic learning platform
 * - University partnerships emphasis
 * - Structured course paths
 * - Professional certifications
 * - Clean, academic feel
 * - Full-width blue/sky theme (no indigo)
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV36() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -60]);
  const heroImageScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const goalsY = useTransform(smoothProgress, [0.1, 0.3], [80, 0]);
  const statsScale = useTransform(smoothProgress, [0.4, 0.6], [0.9, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
      {/* Header - Circular/Radial Nav */}
      <motion.header
        className="sticky top-0 z-50 bg-white border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-6 py-6 flex justify-center items-center relative">
          {/* Center Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 z-10">
            <motion.span whileHover={{ scale: 1.05 }}>Course Tutor</motion.span>
          </Link>

          {/* Circular Nav Items - positioned around center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-20">
              {/* Top positions */}
              <motion.div
                className="absolute left-1/4 top-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link to="/courses" className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                  Courses
                </Link>
              </motion.div>

              <motion.div
                className="absolute right-1/4 top-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                  About
                </Link>
              </motion.div>

              {/* Bottom positions */}
              <motion.div
                className="absolute left-1/4 bottom-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                  Help
                </Link>
              </motion.div>

              <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                  {isAuthenticated ? "Dashboard" : "Sign In"}
                </Link>
              </motion.div>

              {!isAuthenticated && (
                <motion.div
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm">
                        Sign Up
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero - Radial Layout */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-sky-700 text-white py-32 px-6 overflow-hidden">
        {/* Central Focus Point */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Content emanating from center */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            style={{ y: heroY }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Learn without limits
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Start, switch, or advance your career with more than 5,000 courses,
              Professional Certificates, and degrees from world-class universities and companies.
            </motion.p>
          </motion.div>

          {/* Radial action buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 font-semibold">
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 font-semibold">
                      Join for Free
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4">
                      Explore Courses
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>

          {/* Radial image grid */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            style={{ scale: heroImageScale }}
          >
            {[
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=250&h=200&fit=crop',
              'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=250&h=200&fit=crop'
            ].map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Learning ${i + 1}`}
                className="rounded-lg shadow-xl w-full h-40 object-cover"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f9fafb" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* University Partners */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="w-full">
          <motion.p
            className="text-center text-sm text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >We collaborate with 300+ leading universities and companies</motion.p>
          <div className="flex flex-wrap justify-center gap-12">
            {['Stanford', 'Yale', 'Google', 'IBM', 'Meta', 'Michigan'].map((partner, i) => (
              <motion.div
                key={partner}
                className="text-xl font-bold text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.1, color: '#2563eb' }}
              >{partner}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Achieve your goals with Course Tutor</motion.h2>
          <motion.p
            className="text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >Whether you're looking to start a new career or advance in your current one, we have the courses for you.</motion.p>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            style={{ y: goalsY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Earn a Degree', desc: 'Breakthrough pricing on 100% online degrees', icon: '🎓', color: 'bg-blue-50 border-blue-200', rotate: '-1deg' },
              { title: 'Advance Your Career', desc: 'Gain professional skills from top employers', icon: '📈', color: 'bg-green-50 border-green-200', rotate: '1deg' },
              { title: 'Learn a New Skill', desc: 'Study any topic from basics to advanced', icon: '💡', color: 'bg-amber-50 border-amber-200', rotate: '-0.5deg' },
              { title: 'Take a Free Course', desc: 'Access thousands of courses for free', icon: '🆓', color: 'bg-orange-50 border-orange-200', rotate: '1.5deg' },
            ].map((goal, i) => (
              <motion.div
                key={i}
                className={`${goal.color} border rounded-lg p-6 cursor-pointer`}
                style={{ transform: `rotate(${goal.rotate})` }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotate: 0,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >{goal.icon}</motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Most Popular Courses</h2>
            <Link to="/courses" className="text-blue-600 hover:underline text-sm">View all →</Link>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Machine Learning', provider: 'Stanford', rating: 4.9, enrolled: '4.8M', img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop' },
              { title: 'Python for Everybody', provider: 'Michigan', rating: 4.8, enrolled: '2.1M', img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop' },
              { title: 'Google Data Analytics', provider: 'Google', rating: 4.8, enrolled: '1.5M', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' },
              { title: 'AWS Cloud Practitioner', provider: 'Amazon', rating: 4.7, enrolled: '890K', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop' },
            ].map((course, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{course.provider}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <motion.span
                      className="text-yellow-500"
                      whileHover={{ scale: 1.2 }}
                    >★ {course.rating}</motion.span>
                    <span className="text-gray-400">({course.enrolled} enrolled)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          style={{ scale: statsScale }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '113M+', label: 'Learners' },
              { value: '5,000+', label: 'Courses' },
              { value: '300+', label: 'Partners' },
              { value: '4.7', label: 'Avg Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
                  whileHover={{ scale: 1.1, color: '#1d4ed8' }}
                >{stat.value}</motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start learning today</h2>
          <p className="text-xl text-blue-100 mb-10">
            Get unlimited access to courses from top universities and companies.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold">
                {isAuthenticated ? "Explore Courses" : "Join for Free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="w-full">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-white mb-4">Course Tutor</h4>
              <p className="text-sm">The world's leading online learning platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Popular Courses</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white">Data Science</a></li>
                <li><a href="#" className="hover:text-white">Python</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">More</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/help" className="hover:text-white">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm">
            © 2024 Course Tutor Inc. All rights reserved.
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={36} />
    </div>
  );
}
