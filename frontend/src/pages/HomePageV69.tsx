import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV69() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <DesignNavigation currentVersion={69} />

      {/* Travel-Style Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">CT</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">CourseTutor</h1>
                <p className="text-xs text-teal-600 font-medium">Explore. Learn. Achieve.</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors">
                Courses
              </Link>
              <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors">
                About
              </Link>
              <Link to="/help" className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors">
                Help
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 px-6 py-2 rounded-lg shadow-md font-semibold">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 px-6 py-2 rounded-lg shadow-md font-semibold">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Search Hero - Travel Booking Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20">
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Discover Your Learning Journey
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore thousands of courses and find the perfect path to your goals
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">What do you want to learn?</label>
                <input
                  type="text"
                  placeholder="e.g., Web Development, Data Science, Design..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-600" />
                  <span>Free Courses</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal-600" />
                  <span>Certificate</span>
                </label>
              </div>
              <Link to="/courses">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 px-8 py-3 rounded-lg shadow-lg font-semibold">
                  Search Courses
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
          >
            {[
              { number: "500+", label: "Destinations" },
              { number: "50K+", label: "Students" },
              { number: "4.8★", label: "Average Rating" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations (Courses) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Popular Destinations</h2>
            <p className="text-lg text-gray-600">Explore our most sought-after learning paths</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              subtitle: "Full Stack Journey",
              rating: "4.9",
              reviews: "12.5K",
              students: "45,200",
              price: "$49",
              color: "from-blue-400 to-cyan-500"
            },
            {
              title: "Data Science",
              subtitle: "Analytics Adventure",
              rating: "4.8",
              reviews: "8.2K",
              students: "32,100",
              price: "$59",
              color: "from-emerald-400 to-teal-500"
            },
            {
              title: "UX/UI Design",
              subtitle: "Creative Expedition",
              rating: "4.9",
              reviews: "15.8K",
              students: "52,400",
              price: "$39",
              color: "from-rose-400 to-amber-500"
            },
            {
              title: "Mobile Development",
              subtitle: "App Building Tour",
              rating: "4.7",
              reviews: "6.4K",
              students: "28,600",
              price: "$54",
              color: "from-cyan-400 to-blue-500"
            },
            {
              title: "Digital Marketing",
              subtitle: "Growth Strategy Trip",
              rating: "4.8",
              reviews: "9.1K",
              students: "38,900",
              price: "$44",
              color: "from-teal-400 to-emerald-500"
            },
            {
              title: "Cloud Computing",
              subtitle: "Infrastructure Journey",
              rating: "4.9",
              reviews: "7.8K",
              students: "31,200",
              price: "$64",
              color: "from-blue-500 to-cyan-600"
            }
          ].map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${course.color} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm font-bold text-gray-800">{course.price}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-800">⭐ {course.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-teal-600 font-medium mb-4">{course.subtitle}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>👥 {course.students} students</span>
                  <span>💬 {course.reviews} reviews</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">85% full</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 py-3 rounded-lg font-semibold">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Travel Benefits Style */}
      <section className="bg-gradient-to-br from-cyan-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Why Travel With Us</h2>
            <p className="text-lg text-gray-600">Your learning journey, our commitment</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Best Price Guarantee", desc: "Find it cheaper elsewhere? We'll match it plus give you 10% off." },
              { icon: "🛡️", title: "Secure Booking", desc: "Your investment is protected with our money-back guarantee." },
              { icon: "⭐", title: "Top-Rated Guides", desc: "Learn from expert instructors with verified credentials." },
              { icon: "📱", title: "24/7 Support", desc: "Our team is always here to help you on your journey." },
              { icon: "🎓", title: "Certificates", desc: "Get recognized credentials upon course completion." },
              { icon: "🔄", title: "Flexible Schedule", desc: "Learn at your own pace with lifetime access." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traveler Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600">Real experiences from real learners</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", course: "Web Development", rating: 5, comment: "Best learning experience I've had! The instructor was amazing and the content was practical." },
            { name: "Michael Chen", course: "Data Science", rating: 5, comment: "Changed my career completely. Worth every penny and every minute invested." },
            { name: "Emma Rodriguez", course: "UX Design", rating: 5, comment: "Clear, concise, and incredibly helpful. I now work as a professional designer!" }
          ].map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.course}</div>
                  </div>
                </div>
                <div className="text-yellow-400">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CourseTutor</h3>
              <p className="text-gray-400 text-sm">Your trusted partner in lifelong learning and professional development.</p>
            </div>
            {[
              { title: 'Explore', links: ['All Courses', 'Categories', 'Instructors', 'Popular'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'FAQ', 'Terms', 'Privacy'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 CourseTutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
