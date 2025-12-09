/**
 * VARIANT 33: DRIBBLE/BEHANCE PORTFOLIO STYLE
 * Inspired by design portfolio sites
 * - Large imagery
 * - Grid gallery layout
 * - Creative typography
 * - Showcase focused
 * - Full-width visuals
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV33() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const gridY = useTransform(smoothProgress, [0.1, 0.4], [100, 0]);
  const categoriesRotate = useTransform(smoothProgress, [0.3, 0.5], [-5, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Playfair Display', serif" }}>
      <style>{`
        .text-outline {
          -webkit-text-stroke: 2px #ea4c89;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Split Header - Logo/Nav LEFT, Promotional Banner RIGHT */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-8 py-4 grid grid-cols-2 gap-4">
          {/* LEFT HALF: Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-pink-500">
              <motion.span
                className="inline-block"
                whileHover={{ y: -5, rotate: -5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >Course</motion.span>
              <span className="text-gray-900">Tutor</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/courses" className="text-gray-600 hover:text-pink-500 transition-colors">Courses</Link>
              <Link to="/about" className="text-gray-600 hover:text-pink-500 transition-colors">About</Link>
              <Link to="/help" className="text-gray-600 hover:text-pink-500 transition-colors">Help</Link>
            </nav>
          </div>

          {/* RIGHT HALF: Promotional Banner + Auth */}
          <div className="flex items-center justify-end gap-4">
            <motion.div
              className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full text-sm text-pink-700 font-medium"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Limited Offer: 50% OFF Premium Courses
            </motion.div>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full">
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero - Two-column with video LEFT, text RIGHT */}
      <section className="pt-32 pb-20 px-8">
        <motion.div
          className="w-full grid lg:grid-cols-2 gap-12 items-center"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* LEFT COLUMN: Video Placeholder */}
          <motion.div
            className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Learning community"
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>

          {/* RIGHT COLUMN: Text Content */}
          <div className="text-left">
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gray-900">Discover</span>
              <br />
              <motion.span
                className="relative inline-block"
              >
                <motion.span
                  className="text-outline text-pink-500"
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >Creative</motion.span>
              </motion.span>
              <motion.span
                className="text-pink-500"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              > Learning</motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join the world's largest creative learning community.
              Get inspired, learn new skills, and build your portfolio.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-6 rounded-full text-lg">
                      View Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-6 rounded-full text-lg">
                        Sign up — it's free!
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/courses">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-pink-500 text-gray-700 hover:text-pink-500 px-10 py-6 rounded-full text-lg">
                        Browse Courses
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f9fafb" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Course Grid */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >Popular Courses</motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ y: gridY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=450&fit=crop',
                title: 'UI/UX Design Fundamentals',
                author: 'Sarah Miller',
                authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                likes: 2340,
              },
              {
                img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=450&fit=crop',
                title: 'Brand Identity Design',
                author: 'Mike Chen',
                authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                likes: 1890,
              },
              {
                img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=450&fit=crop',
                title: 'Mobile App Design',
                author: 'Emma Wilson',
                authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                likes: 3120,
              },
              {
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop',
                title: 'Data Visualization',
                author: 'David Park',
                authorImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
                likes: 1560,
              },
              {
                img: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=600&h=450&fit=crop',
                title: 'Illustration Masterclass',
                author: 'Lisa Wang',
                authorImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
                likes: 2780,
              },
              {
                img: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=600&h=450&fit=crop',
                title: 'Motion Design',
                author: 'Alex Turner',
                authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                likes: 1980,
              },
            ].map((course, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                  rotate: 1
                }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{course.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.img
                        src={course.authorImg}
                        alt={course.author}
                        className="w-8 h-8 rounded-full"
                        whileHover={{ scale: 1.2 }}
                      />
                      <span className="text-sm text-gray-600">{course.author}</span>
                    </div>
                    <motion.button
                      className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ fill: "#ec4899" }}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </motion.svg>
                      <span className="text-sm">{(course.likes / 1000).toFixed(1)}k</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >Browse by Category</motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ rotate: categoriesRotate }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'UI Design', count: 128, color: 'bg-pink-100 hover:bg-pink-200 text-pink-600' },
              { name: 'Web Dev', count: 256, color: 'bg-blue-100 hover:bg-blue-200 text-blue-600' },
              { name: 'Illustration', count: 89, color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' },
              { name: 'Animation', count: 64, color: 'bg-orange-100 hover:bg-orange-200 text-orange-600' },
              { name: 'Branding', count: 112, color: 'bg-green-100 hover:bg-green-200 text-green-600' },
              { name: 'Typography', count: 45, color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' },
              { name: 'Photography', count: 78, color: 'bg-red-100 hover:bg-red-200 text-red-600' },
              { name: 'Product', count: 93, color: 'bg-blue-100 hover:bg-blue-200 text-blue-600' },
            ].map((cat, i) => (
              <Link key={i} to="/courses">
                <motion.div
                  className={`${cat.color} rounded-2xl p-6 text-center transition-colors`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.08,
                    y: -10,
                    rotate: [0, -3, 3, 0],
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <div className="text-lg font-semibold mb-1">{cat.name}</div>
                  <div className="text-sm opacity-75">{cat.count} courses</div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-8 bg-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { value: '50K+', label: 'Creative Learners' },
              { value: '500+', label: 'Premium Courses' },
              { value: '100+', label: 'Expert Instructors' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" as const, stiffness: 200 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-black mb-2"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >{stat.value}</motion.div>
                <div className="text-pink-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-8">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" as const, stiffness: 200 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-8 h-8 text-pink-500 fill-current"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, y: 20, rotate: -180 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" as const }}
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            ))}
          </motion.div>
          <motion.blockquote
            className="text-2xl md:text-3xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            "Course Tutor helped me land my dream job at a top design agency.
            The quality of instruction is unmatched."
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
              alt="User"
              className="w-16 h-16 rounded-full"
              whileHover={{ scale: 1.1, rotate: 10 }}
            />
            <div className="text-left">
              <div className="font-bold text-gray-900">Jessica Liu</div>
              <div className="text-gray-600">Senior Designer at Airbnb</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-gray-100">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6 text-gray-900"
            whileHover={{ scale: 1.02 }}
          >Ready to start creating?</motion.h2>
          <p className="text-xl text-gray-600 mb-10">
            Join the community of creative learners today.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-6 rounded-full text-lg">
                {isAuthenticated ? "Explore Courses" : "Sign up free"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-gray-600">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-pink-500 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-pink-500 transition-colors">About</Link>
            <Link to="/help" className="hover:text-pink-500 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={33} />
    </div>
  );
}
