/**
 * VARIANT 52: TEACHERS & EDUCATORS
 *
 * Target: K-12 teachers, instructional designers, education professionals
 * Tone: Supportive, collegial, student-outcome focused - "Inspire the next generation"
 * Design: Apple red, chalkboard green, warm yellow
 * Effects: Chalkboard/notebook paper texture accent
 * Sales: Highlight professional development, grade levels, teacher community
 * Layout Flow: Classroom hero → Grade/subject grid → PD tracks → Community stats →
 *              Educator testimonial → Back-to-school CTA → Educational footer
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useSpring } from 'framer-motion';
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

export function HomePageV52() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const gradeCategories = [
    { title: 'Elementary Education', grades: 'K-5', icon: '✏️' },
    { title: 'Middle School Methods', grades: '6-8', icon: '📚' },
    { title: 'High School Strategies', grades: '9-12', icon: '🎓' },
    { title: 'Special Education', grades: 'All', icon: '🌟' },
  ];

  const pdTracks = [
    { title: 'Classroom Management', duration: '4 weeks', icon: '👥' },
    { title: 'Educational Technology', duration: '6 weeks', icon: '💻' },
    { title: 'Differentiated Instruction', duration: '5 weeks', icon: '🎯' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">
      {/* Header - Chalkboard/Classroom Aesthetic */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-green-800 to-green-700 shadow-lg">
        {/* Chalkboard Top Bar with Apple Icon */}
        <div className="border-b-4 border-yellow-400">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-bold text-2xl text-white flex items-center gap-3">
              <span className="text-4xl">🍎</span>
              <span className="font-handwriting" style={{ fontFamily: 'cursive' }}>Course Tutor</span>
            </Link>
            <div className="text-yellow-300 text-sm font-handwriting hidden md:block" style={{ fontFamily: 'cursive' }}>
              "Teaching is the profession that creates all others"
            </div>
            <div className="text-white text-3xl">🔔</div>
          </div>
        </div>

        {/* Professional Nav Below */}
        <div className="bg-white/95 backdrop-blur-md border-b border-red-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-700 hover:text-red-600 transition-colors font-semibold">Courses</Link>
              <Link to="/about" className="text-slate-700 hover:text-red-600 transition-colors font-semibold">About</Link>
              <Link to="/help" className="text-slate-700 hover:text-red-600 transition-colors font-semibold">Help</Link>
            </nav>
            <div className="flex items-center gap-3 ml-auto">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-red-600 text-sm font-semibold">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-md">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Classroom Layout Hero with Whiteboard Content & Testimonials Sidebar */}
      <section className="relative py-16 lg:py-20 px-4 bg-gradient-to-br from-amber-50 to-yellow-50">
        {/* Notebook paper texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 31px,
              #dc2626 31px,
              #dc2626 32px
            )`
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Whiteboard Content Area */}
            <div className="lg:col-span-8">
              {/* Chalkboard Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-800 rounded-t-lg p-6 border-4 border-yellow-400 border-b-0"
              >
                <div className="text-yellow-300 font-handwriting text-3xl mb-2" style={{ fontFamily: 'cursive' }}>
                  Today's Lesson:
                </div>
                <div className="h-1 bg-yellow-400 w-32 mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Inspire the Next Generation
                </h1>
                <p className="text-yellow-100 text-lg font-handwriting" style={{ fontFamily: 'cursive' }}>
                  Professional development for passionate educators
                </p>
              </motion.div>

              {/* Whiteboard Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-b-lg p-8 shadow-xl border-4 border-yellow-400 border-t-0"
              >
                <Badge className="bg-red-50 text-red-700 shadow-sm border border-red-200 mb-6">
                  For K-12 Educators
                </Badge>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Professional development courses designed by teachers, for teachers.
                  Enhance your classroom strategies, learn new technologies, and connect with a community of educators.
                </p>

                {/* Learning Objectives - Bulletin Board Style */}
                <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span>📌</span> Learning Objectives:
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Master classroom management techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Integrate educational technology effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Implement differentiated instruction strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Connect with 50,000+ fellow educators</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 shadow-lg rounded-xl">
                      Start Learning
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="px-8 py-5 border-red-200 hover:bg-red-50 rounded-xl">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Student Testimonials Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24"
              >
                <div className="bg-yellow-100 rounded-lg p-6 border-4 border-yellow-400 shadow-xl">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    What Teachers Say
                  </h3>

                  {/* Testimonial Cards - Post-it Style */}
                  <div className="space-y-4">
                    <motion.div
                      className="bg-pink-100 p-4 rounded shadow-md border-l-4 border-pink-400 transform rotate-1"
                      whileHover={{ rotate: 0, scale: 1.02 }}
                    >
                      <p className="text-sm text-slate-700 italic mb-2">
                        "Transformed my teaching practice. My students are more engaged than ever!"
                      </p>
                      <div className="text-xs text-pink-800 font-semibold">- Maria R., 4th Grade</div>
                    </motion.div>

                    <motion.div
                      className="bg-blue-100 p-4 rounded shadow-md border-l-4 border-blue-400 transform -rotate-1"
                      whileHover={{ rotate: 0, scale: 1.02 }}
                    >
                      <p className="text-sm text-slate-700 italic mb-2">
                        "The classroom management strategies helped me create an inclusive environment."
                      </p>
                      <div className="text-xs text-blue-800 font-semibold">- James T., Middle School</div>
                    </motion.div>

                    <motion.div
                      className="bg-green-100 p-4 rounded shadow-md border-l-4 border-green-400 transform rotate-2"
                      whileHover={{ rotate: 0, scale: 1.02 }}
                    >
                      <p className="text-sm text-slate-700 italic mb-2">
                        "Best professional development I've done in 10 years. Highly practical!"
                      </p>
                      <div className="text-xs text-green-800 font-semibold">- Sarah K., High School</div>
                    </motion.div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 pt-6 border-t-2 border-yellow-400">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-red-600">50K+</div>
                        <div className="text-xs text-slate-600">Teachers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <div className="text-xs text-slate-600">Recommend</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School Bell CTA */}
                <motion.div
                  className="mt-6 bg-gradient-to-br from-green-700 to-green-800 rounded-lg p-6 text-center text-white shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl mb-2">🔔</div>
                  <div className="text-sm font-semibold">Class is in session!</div>
                  <div className="text-xs text-green-200 mt-1">Join today and grow as an educator</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Grade Level Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Courses by Grade Level</h2>
            <p className="text-slate-600">Find professional development tailored to your classroom</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {gradeCategories.map((category, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 shadow-md border-2 border-yellow-200 hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">{category.title}</h3>
                <div className="text-sm text-green-700 font-medium">Grades {category.grades}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Professional Development Tracks */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Professional Development</h2>
            <p className="text-slate-600">Build skills that make a difference in your classroom</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pdTracks.map((track, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-green-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{track.title}</h3>
                <div className="text-sm text-slate-500">{track.duration}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Teacher Community Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '50,000+', label: 'Teachers in Our Community' },
              { number: '1M+', label: 'Students Impacted' },
              { number: '98%', label: 'Would Recommend' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-bold mb-2 text-yellow-300">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Getting Started is Easy</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Path', desc: 'Select courses for your grade level and interests', icon: '🎯' },
              { step: '2', title: 'Learn & Engage', desc: 'Interactive lessons from experienced educators', icon: '📖' },
              { step: '3', title: 'Apply in Class', desc: 'Implement new strategies with your students', icon: '✨' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Educator Testimonial */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-200"
          >
            <p className="text-slate-700 italic mb-6 text-xl leading-relaxed">
              "Course Tutor has transformed my teaching practice. The classroom management strategies I learned helped me create a more inclusive and engaging environment. My students are more motivated and our test scores improved by 25%!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                M
              </div>
              <div>
                <div className="font-semibold text-slate-900">Maria Rodriguez</div>
                <div className="text-green-700 text-sm">4th Grade Teacher, Lincoln Elementary</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Back-to-School Style CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-700 to-green-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🍎</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow as an Educator?
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              Join our community of passionate teachers making a difference
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-yellow-400 text-green-900 hover:bg-yellow-300 px-10 py-5 font-semibold shadow-xl rounded-xl">
                  Start Your Journey
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 py-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-semibold text-red-600">Course Tutor</span>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
              <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
              <Link to="/resources" className="hover:text-slate-900 transition-colors">Teaching Resources</Link>
              <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
            </div>
            <div className="text-sm text-slate-500">© 2024 Course Tutor. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={52} />
    </div>
  );
}
