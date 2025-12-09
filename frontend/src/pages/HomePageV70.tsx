import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV70() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">
      <DesignNavigation currentVersion={70} />

      {/* Recipe-Style Header */}
      <header className="bg-white border-b-2 border-amber-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🍳</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Course Kitchen</h1>
                <p className="text-xs text-amber-600 font-medium">Fresh Learning, Daily</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className="text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <span>📚</span><span>Courses</span>
              </Link>
              <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <span>ℹ️</span><span>About</span>
              </Link>
              <Link to="/help" className="text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors flex items-center space-x-1">
                <span>💡</span><span>Help</span>
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 px-6 py-2 rounded-full shadow-md font-semibold">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 px-6 py-2 rounded-full shadow-md font-semibold">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Recipe Card Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 py-16">
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-20 text-9xl">🥘</div>
          <div className="absolute bottom-10 right-10 text-9xl">🍕</div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                ⏱️ Ready in Minutes
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Fresh <span className="text-amber-600">Learning</span><br/>
                Served Daily
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Carefully crafted courses with the perfect blend of ingredients:
                expert instruction, hands-on practice, and real-world applications.
                Start your learning feast today!
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/courses">
                  <Button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 px-8 py-4 rounded-full shadow-lg font-bold text-lg">
                    🍽️ Browse Menu
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                    📖 See Recipe
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Recipe Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-amber-400 to-rose-400 h-64 flex items-center justify-center text-9xl">
                🎓
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Learning Recipe</h3>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">⭐ 4.9</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">🕐 Prep Time</span>
                    <span className="font-bold text-gray-800">Self-paced</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">👥 Servings</span>
                    <span className="font-bold text-gray-800">50,000+ students</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">🎯 Difficulty</span>
                    <span className="font-bold text-gray-800">All Levels</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">🏆 Success Rate</span>
                    <span className="font-bold text-emerald-600">95%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredients Section (Course Categories) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-4">🥗 Fresh Ingredients</h2>
            <p className="text-xl text-gray-600">Choose from our finest selection of learning courses</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              icon: "💻",
              difficulty: "Medium",
              time: "8 weeks",
              students: "45.2K",
              rating: "4.9",
              color: "from-blue-400 to-cyan-500"
            },
            {
              title: "Data Science",
              icon: "📊",
              difficulty: "Advanced",
              time: "12 weeks",
              students: "32.1K",
              rating: "4.8",
              color: "from-emerald-400 to-teal-500"
            },
            {
              title: "UX Design",
              icon: "🎨",
              difficulty: "Easy",
              time: "6 weeks",
              students: "52.4K",
              rating: "4.9",
              color: "from-rose-400 to-amber-500"
            },
            {
              title: "Mobile Apps",
              icon: "📱",
              difficulty: "Medium",
              time: "10 weeks",
              students: "28.6K",
              rating: "4.7",
              color: "from-cyan-400 to-blue-500"
            },
            {
              title: "Marketing",
              icon: "📢",
              difficulty: "Easy",
              time: "5 weeks",
              students: "38.9K",
              rating: "4.8",
              color: "from-amber-400 to-rose-500"
            },
            {
              title: "Cloud Tech",
              icon: "☁️",
              difficulty: "Advanced",
              time: "14 weeks",
              students: "31.2K",
              rating: "4.9",
              color: "from-teal-400 to-emerald-500"
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
              <div className={`bg-gradient-to-br ${course.color} p-8 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform">{course.icon}</div>
                <h3 className="text-2xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {course.rating}
                  </span>
                  <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-bold">
                    🎯 {course.difficulty}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">⏱️ Duration</span>
                    <span className="font-semibold text-gray-800">{course.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">👥 Students</span>
                    <span className="font-semibold text-gray-800">{course.students}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 py-3 rounded-xl font-bold">
                  Start Cooking 🍳
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cooking Timer Section (Process) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">⏲️ Simple Recipe</h2>
            <p className="text-xl text-gray-600">Follow these easy steps to master any skill</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Course", desc: "Browse our menu and pick your favorite", icon: "🔍" },
              { step: "2", title: "Gather Tools", desc: "Get your materials ready to start", icon: "🛠️" },
              { step: "3", title: "Start Learning", desc: "Follow along with expert guidance", icon: "👨‍🍳" },
              { step: "4", title: "Master Skills", desc: "Practice and perfect your craft", icon: "🏆" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Special (Testimonials) */}
      <section className="bg-gradient-to-br from-amber-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">👨‍🍳 Chef's Reviews</h2>
            <p className="text-xl text-gray-600">What our students are saying about their learning experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", course: "Web Dev", stars: 5, comment: "Absolutely delicious content! Every lesson was perfectly seasoned with practical examples." },
              { name: "James L.", course: "Data Science", stars: 5, comment: "The perfect recipe for success. I went from beginner to pro in just 3 months!" },
              { name: "Maria G.", course: "UX Design", stars: 5, comment: "Five-star learning experience! The instructors are true master chefs in their field." }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.course}</div>
                    </div>
                  </div>
                  <div className="bg-amber-100 px-3 py-1 rounded-full">
                    <span className="text-amber-600 font-bold">{'⭐'.repeat(review.stars)}</span>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Facts (Stats) */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl p-12 border-4 border-gray-800"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">📊 Nutrition Facts</h2>
              <div className="w-full h-1 bg-gray-800 mb-4"></div>
              <p className="text-sm text-gray-600">Learning Value Per Course</p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Active Students", value: "50,000+", daily: "100%" },
                { label: "Expert Instructors", value: "500+", daily: "100%" },
                { label: "Success Rate", value: "95%", daily: "95%" },
                { label: "Course Completion", value: "High", daily: "90%" },
                { label: "Career Growth", value: "Excellent", daily: "85%" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between py-3 border-b-2 border-gray-800"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-800">{item.label}</span>
                    <span className="text-2xl font-bold text-amber-700">{item.value}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.daily} DV*</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center">
              *Percent Daily Value based on a 2,000 hour learning diet
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🍳</span>
                <h3 className="text-xl font-bold">Course Kitchen</h3>
              </div>
              <p className="text-gray-400 text-sm">Cooking up fresh knowledge every day since 2025.</p>
            </div>
            {[
              { title: 'Menu', links: ['All Courses', 'Categories', 'Chefs', 'Specials'] },
              { title: 'Kitchen', links: ['About Us', 'Careers', 'Press', 'Contact'] },
              { title: 'Help', links: ['FAQ', 'Support', 'Terms', 'Privacy'] }
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
            <p>&copy; 2025 Course Kitchen. All rights reserved. Bon appétit! 🍽️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
