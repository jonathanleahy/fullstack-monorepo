/**
 * MAIN HOMEPAGE (V0): GENERAL AUDIENCE
 *
 * See full persona brief in: docs/website-brief.md → "V0 - HomePage.tsx (General Audience)"
 *
 * Target: Anyone interested in learning new skills (Age 25-45)
 * Tone: Welcoming, clear, informative - "You can do this" energy
 * Design: Blue primary, teal accents, soft shadows (shadow-lg shadow-slate-900/5)
 * Effects: Solar flares (blue/teal), subtle gradient textures
 * Sales: Low pressure, value-first, emphasize free signup
 * Layout Flow: Hero (centered) → Split intro → 4-col categories → Horizontal steps →
 *              Single testimonial spotlight → Stats row → Asymmetric split → CTA
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

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  const courseCategories = [
    { name: 'Web Development', courses: 45, icon: '💻', color: 'from-blue-500 to-blue-600' },
    { name: 'Data Science', courses: 32, icon: '📊', color: 'from-teal-500 to-teal-600' },
    { name: 'Design', courses: 28, icon: '🎨', color: 'from-pink-500 to-pink-600' },
    { name: 'Business', courses: 24, icon: '📈', color: 'from-emerald-500 to-emerald-600' },
  ];

  const stats = [
    { number: '50K+', label: 'Learners' },
    { number: '200+', label: 'Courses' },
    { number: '4.8', label: 'Avg Rating' },
    { number: '95%', label: 'Completion' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600">Course Tutor</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Help</a>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm transition-colors">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Centered with solar flares and texture */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        {/* Texture background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)' }}
        />
        {/* Faded hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 via-white/80 to-white" />

        {/* Solar flares */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-[80px]" />

        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="bg-blue-100 text-blue-700 shadow-sm">Online Learning Platform</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            >
              Learn New Skills with
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Course Tutor
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Develop skills in web development, data science, design, and more through
              video lessons, hands-on projects, and quizzes.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 shadow-xl shadow-blue-500/25">
                    Start Learning Free
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="px-8 py-5 border-slate-200 hover:bg-slate-50 shadow-lg shadow-slate-900/5">
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <div className="relative h-16 bg-gradient-to-b from-blue-50 to-white">
        <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full h-16" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
        </svg>
      </div>

      {/* SECTION 2: What is Course Tutor - 2-column split with image */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl blur-xl" />
              <div className="relative rounded-xl overflow-hidden shadow-xl shadow-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop"
                  alt="Person learning online"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block mb-4">
                <h2 className="text-3xl font-bold text-slate-900">What is Course Tutor?</h2>
                {/* Hand-drawn underline SVG */}
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none">
                  <path d="M5,8 Q75,3 150,7 T295,8" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed mt-6">
                An online learning platform where you can take courses in web development,
                data science, design, and more. Each course includes video lessons, hands-on
                projects, and quizzes.
              </p>
              <ul className="space-y-3">
                {['Learn at your own pace', 'No deadlines or pressure', 'Track your progress'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Course Categories - 4-column grid with gradient cards */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What You Can Learn</h2>
            <p className="text-slate-600">Explore our course categories</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courseCategories.map((category, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-900/5 group-hover:bg-white/90 group-hover:shadow-xl group-hover:shadow-slate-900/10 transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                  <span className="text-sm text-blue-600 font-medium">{category.courses} courses</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View all courses →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: How It Works - Horizontal steps with connecting line */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-600">Simple steps to start learning</p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200" />

            <motion.div
              className="grid md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { step: '1', title: 'Sign Up', desc: 'Create your free account in seconds' },
                { step: '2', title: 'Choose a Course', desc: 'Browse our catalog and pick a topic' },
                { step: '3', title: 'Watch & Learn', desc: 'Study with video lessons at your pace' },
                { step: '4', title: 'Build Projects', desc: 'Apply skills with hands-on exercises' },
              ].map((step, i) => (
                <motion.div key={i} variants={itemVariants} className="text-center relative">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/25 relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Single Testimonial Spotlight - Large centered quote */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50/50" />

        {/* Solar flare for testimonial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px]" />

        <motion.div
          className="max-w-3xl mx-auto relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl text-blue-200 mb-6">"</div>
          <p className="text-2xl text-slate-700 mb-8 italic leading-relaxed">
            The web development course helped me land my first dev job. Clear lessons,
            practical projects, and a supportive community. Couldn't recommend it more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg shadow-blue-500/20">
              S
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Sarah Mitchell</div>
              <div className="text-blue-600">Now a Frontend Developer at TechCorp</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: Stats Row - Large numbers in horizontal layout */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Learn Anywhere - Asymmetric split (text 1/3, images 2/3) */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Subtle texture background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-slate-50/95" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Learn Anywhere</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Access courses on any device. Your progress syncs automatically across
                laptop, tablet, and phone.
              </p>
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">Explore Courses</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 grid grid-cols-2 gap-4"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg shadow-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop"
                  alt="Learning on laptop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-teal-600/10 pointer-events-none" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg shadow-slate-900/10 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-teal-600/10 via-transparent to-blue-600/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="relative h-16 bg-slate-50">
        <svg viewBox="0 0 1440 100" className="absolute top-0 w-full h-16" preserveAspectRatio="none">
          <path fill="#0ea5e9" d="M0,30 C480,80 960,10 1440,40 L1440,0 L0,0 Z"/>
        </svg>
      </div>

      {/* SECTION 8: CTA - Full width with background image and solar flare */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-teal-600/95" />

        {/* Solar flare on CTA */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              Ready to Start Learning?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of learners building new skills every day.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 font-medium shadow-xl shadow-black/20">
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
          <span className="font-semibold text-blue-600">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <a href="#" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Help</a>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={0} />
    </div>
  );
}
