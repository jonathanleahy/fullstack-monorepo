/**
 * VARIANT 62: HR & PEOPLE OPERATIONS
 *
 * Target Audience: HR professionals, recruiters, people managers
 * Design Style: People-focused blue, warm coral, friendly green - Human-centered, professional, approachable
 * Tone: Empathetic, professional, "Build better workplaces"
 * Aesthetic: Friendly (10-12px borders), soft shadows, welcoming
 * Wildcard Element: Connected people/org chart animation
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
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

export function HomePageV62() {
  const { isAuthenticated } = useAuth();

  const specialties = [
    { title: 'Talent Acquisition', icon: '🎯', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { title: 'Employee Relations', icon: '🤝', color: 'bg-coral-100 text-coral-700 border-coral-200' },
    { title: 'Performance Management', icon: '📈', color: 'bg-green-100 text-green-700 border-green-200' },
    { title: 'Compensation & Benefits', icon: '💰', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  ];

  const certifications = [
    { name: 'SHRM-CP', desc: 'Society for Human Resource Management' },
    { name: 'HRCI', desc: 'HR Certification Institute' },
    { name: 'DEI Specialist', desc: 'Diversity, Equity & Inclusion' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header - People-focused with team icon and org chart style */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-blue-100 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl text-blue-600 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <div className="w-2 h-2 bg-coral-500 rounded-full" />
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
              Course Tutor
              <span className="text-xs text-slate-500 font-normal">HR</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                <span className="text-blue-400 text-sm">┌─</span>
                <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors">Courses</Link>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400 text-sm">├─</span>
                <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors">About</Link>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400 text-sm">└─</span>
                <Link to="/help" className="text-slate-600 hover:text-blue-600 transition-colors">Help</Link>
              </div>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="rounded-xl">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-md rounded-xl">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Team photo mosaic hero with career path visualization */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-coral-50/30">
        {/* Wildcard: Connected people org chart animation */}
        <motion.div className="absolute top-20 right-[15%] flex flex-col items-center gap-2">
          <motion.div
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          >
            👤
          </motion.div>
          <div className="flex gap-4">
            <motion.div
              className="w-10 h-10 bg-coral-500 rounded-full flex items-center justify-center text-white shadow-md"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.3 }}
            >
              👥
            </motion.div>
            <motion.div
              className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white shadow-md"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.6 }}
            >
              👥
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left: Content spans 3 columns */}
            <motion.div
              className="md:col-span-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-blue-100 text-blue-700 shadow-sm rounded-xl border-2 border-blue-200">
                  People & Culture
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                Build Better
                <span className="block bg-gradient-to-r from-blue-600 to-coral-500 bg-clip-text text-transparent">
                  Workplaces
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6 leading-relaxed">
                Comprehensive training for HR professionals. From talent acquisition to
                employee engagement, develop the skills to create thriving workplaces.
              </motion.p>

              {/* Career path visualization */}
              <motion.div variants={itemVariants} className="mb-6 bg-white rounded-xl p-4 border-2 border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    <span className="text-slate-600">Entry</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-600 to-coral-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-coral-500 rounded-full" />
                    <span className="text-slate-600">Senior</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-coral-500 to-blue-700" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-700 rounded-full" />
                    <span className="text-slate-600">Leadership</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 shadow-lg rounded-xl">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8 py-5 border-blue-200 rounded-xl">
                    Explore Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Team mosaic spans 2 columns */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-md border-2 border-blue-100">
                    <img
                      src={`https://images.unsplash.com/photo-${1573497019940 + i}?w=200&h=200&fit=crop&crop=faces`}
                      alt="Team member"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HR specialty categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">HR Specialties</h2>
            <p className="text-slate-600">Choose your focus area</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specialties.map((specialty, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`${specialty.color} rounded-xl p-6 border shadow-sm`}
              >
                <div className="text-4xl mb-4">{specialty.icon}</div>
                <h3 className="font-bold text-lg mb-2">{specialty.title}</h3>
                <p className="text-sm opacity-80">Specialized courses and certifications</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Certification tracks */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-coral-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Professional Certifications</h2>
            <p className="text-slate-600">Earn industry-recognized credentials</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-md border border-blue-100"
              >
                <h3 className="font-bold text-xl text-blue-600 mb-2">{cert.name}</h3>
                <p className="text-slate-600 text-sm">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Employee engagement statistics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '15K+', label: 'HR Professionals Trained' },
              { num: '92%', label: 'Report Better Engagement' },
              { num: '500+', label: 'Organizations Served' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.num}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How it works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Learning Journey</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: '1', title: 'Assess Your Goals', desc: 'Identify your development areas', color: 'bg-blue-600' },
              { step: '2', title: 'Choose Your Path', desc: 'Select courses aligned with your goals', color: 'bg-coral-500' },
              { step: '3', title: 'Learn & Practice', desc: 'Real-world scenarios and case studies', color: 'bg-green-600' },
              { step: '4', title: 'Apply & Grow', desc: 'Implement strategies in your workplace', color: 'bg-amber-600' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
              >
                <div className={`w-12 h-12 ${item.color} text-white font-bold text-xl flex items-center justify-center rounded-xl flex-shrink-0`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-coral-50 rounded-2xl p-8 md:p-12 shadow-md"
          >
            <p className="text-slate-700 text-xl mb-6 leading-relaxed italic">
              "These courses transformed how I approach employee engagement. The practical
              frameworks helped us increase retention by 40% and create a culture where
              people truly want to come to work."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-coral-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                SK
              </div>
              <div>
                <div className="font-bold text-slate-900">Sarah Kim</div>
                <div className="text-slate-600">Chief Human Resources Officer, TechVenture</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-coral-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Grow Your Team Today
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of HR professionals creating positive workplace cultures.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-xl shadow-xl">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - People-centric */}
      <footer className="bg-slate-50 text-slate-700 py-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-bold text-blue-600">Course Tutor HR</span>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-blue-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={62} />
    </div>
  );
}
