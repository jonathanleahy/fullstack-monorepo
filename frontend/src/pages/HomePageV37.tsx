/**
 * VARIANT 37: UDEMY MARKETPLACE STYLE
 * Inspired by Udemy's course marketplace
 * - Course cards with prices
 * - Search-focused header
 * - Category navigation
 * - Sale/discount emphasis (sky theme instead of purple)
 * - Full-width marketplace feel
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV37() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -30]);
  const coursesY = useTransform(smoothProgress, [0.1, 0.3], [60, 0]);
  const categoriesRotate = useTransform(smoothProgress, [0.3, 0.5], [-3, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header - Tab Style */}
      <motion.header
        className="sticky top-0 z-50 bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <motion.span whileHover={{ color: '#0ea5e9' }}>Course Tutor</motion.span>
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-gray-700 hover:text-sky-600 text-sm">
              {isAuthenticated ? "My learning" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>

        {/* Tab-style navigation */}
        <div className="border-b border-gray-200 px-4">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {[
              { name: 'Courses', to: '/courses', active: true },
              { name: 'About', to: '/about', active: false },
              { name: 'Help', to: '/help', active: false }
            ].map((tab, i) => (
              <motion.div
                key={tab.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={tab.to}
                  className={`
                    inline-block px-6 py-3 text-sm font-medium rounded-t-lg
                    transition-colors relative
                    ${tab.active
                      ? 'text-sky-600 bg-gray-50'
                      : 'text-gray-600 hover:text-sky-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {tab.name}
                  {tab.active && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero - Tabbed Content Layout */}
      <section className="py-12 px-6 bg-gray-50">
        <motion.div className="w-full max-w-6xl mx-auto" style={{ y: heroY }}>
          {/* Tab panels container */}
          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-sky-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tab header indicator */}
            <div className="bg-sky-600 text-white px-6 py-2 flex items-center gap-3">
              <motion.div
                className="w-3 h-3 rounded-full bg-white"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold">Featured: Learning that gets you</span>
            </div>

            {/* Main "active tab" content */}
            <div className="grid lg:grid-cols-2">
              <div className="p-12 bg-gradient-to-br from-white to-gray-50">
                <motion.div
                  className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW YEAR SALE
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Learning that gets you
                </motion.h1>
                <motion.p
                  className="text-gray-600 mb-6 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Skills for your present (and your future). Courses now as low as $9.99.
                </motion.p>
                {isAuthenticated ? (
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 text-lg">
                        Browse Courses
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 text-lg">
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                )}
              </div>
              <div className="hidden lg:block overflow-hidden relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
                  alt="Learning"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Tab overlay effect */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg">
                  <div className="text-xs text-gray-600">Popular Today</div>
                  <div className="font-bold text-sky-700">5,000+ Courses</div>
                </div>
              </div>
            </div>

            {/* Additional tab indicators */}
            <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                Current Offer
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                About
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                Categories
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Featured Courses</motion.h2>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >Expand your career opportunities with these courses</motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ y: coursesY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'The Complete Web Development Bootcamp', instructor: 'Dr. Angela Yu', rating: 4.7, reviews: '267,891', price: 12.99, originalPrice: 84.99, img: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=300&h=170&fit=crop', bestseller: true },
              { title: 'Machine Learning A-Z: AI & Python', instructor: 'Kirill Eremenko', rating: 4.5, reviews: '178,456', price: 11.99, originalPrice: 99.99, img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=170&fit=crop', bestseller: true },
              { title: 'Complete Python Developer', instructor: 'Jose Portilla', rating: 4.6, reviews: '145,678', price: 13.99, originalPrice: 79.99, img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=170&fit=crop', bestseller: false },
              { title: 'React - The Complete Guide', instructor: 'Maximilian Schwarzmüller', rating: 4.7, reviews: '189,234', price: 9.99, originalPrice: 89.99, img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=170&fit=crop', bestseller: true },
            ].map((course, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden mb-3">
                  <motion.img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-36 object-cover border border-gray-200"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {course.bestseller && (
                    <motion.span
                      className="absolute top-2 left-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Bestseller
                    </motion.span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-sky-600 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{course.instructor}</p>
                <div className="flex items-center gap-1 mb-1">
                  <motion.span
                    className="text-sm font-bold text-yellow-700"
                    whileHover={{ scale: 1.2 }}
                  >{course.rating}</motion.span>
                  <div className="flex text-yellow-500 text-xs">
                    {'★'.repeat(Math.floor(course.rating))}
                  </div>
                  <span className="text-xs text-gray-500">({course.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="font-bold text-gray-900 px-2 py-1 bg-yellow-200 rounded"
                    whileHover={{ scale: 1.1, color: '#0ea5e9' }}
                  >${course.price}</motion.span>
                  <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Top Categories</motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ rotate: categoriesRotate }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Development', icon: '💻' },
              { name: 'Business', icon: '📊' },
              { name: 'Finance', icon: '💰' },
              { name: 'IT & Software', icon: '🖥️' },
              { name: 'Design', icon: '🎨' },
              { name: 'Marketing', icon: '📈' },
              { name: 'Photography', icon: '📷' },
              { name: 'Music', icon: '🎵' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-lg text-center border border-gray-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >{cat.icon}</motion.div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '57M+', label: 'Students' },
            { value: '204K+', label: 'Courses' },
            { value: '75K+', label: 'Instructors' },
            { value: '830M+', label: 'Enrollments' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                whileHover={{ scale: 1.1, color: '#0ea5e9' }}
              >{stat.value}</motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-100">
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Become an instructor</h2>
          <p className="text-gray-600 mb-8">
            Instructors from around the world teach millions of students.
            We provide the tools and skills to teach what you love.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(14, 165, 233, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
              Start teaching today
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 text-gray-600 border-t border-gray-200">
        <div className="w-full flex flex-wrap justify-between items-center gap-6">
          <div className="text-2xl font-bold text-gray-900">Course Tutor</div>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-sky-600">Courses</Link>
            <Link to="/about" className="hover:text-sky-600">About</Link>
            <Link to="/help" className="hover:text-sky-600">Help</Link>
          </div>
          <div className="text-sm">© 2024 Course Tutor, Inc.</div>
        </div>
      </footer>
      <DesignNavigation currentVersion={37} />
    </div>
  );
}
