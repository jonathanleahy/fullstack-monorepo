/**
 * VARIANT 61: MANUFACTURING & INDUSTRIAL
 *
 * Target Audience: Factory workers, quality managers, industrial engineers
 * Design Style: Safety orange, industrial gray, steel blue - Practical, safety-focused, technical
 * Tone: Direct, safety-conscious, "Build your skills safely"
 * Aesthetic: Industrial (4px borders), minimal shadows, functional
 * Wildcard Element: Safety badge/hard hat icon animation
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

export function HomePageV61() {
  const { isAuthenticated } = useAuth();

  const safetyBadges = [
    { name: 'OSHA 10', icon: '🛡️' },
    { name: 'Six Sigma', icon: '📊' },
    { name: 'Lean Manufacturing', icon: '⚙️' },
    { name: 'Quality Control', icon: '✓' },
  ];

  const sectors = [
    { title: 'Quality Management', icon: '🔍', courses: 24 },
    { title: 'Safety & Compliance', icon: '🦺', courses: 32 },
    { title: 'Process Optimization', icon: '⚙️', courses: 18 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Industrial style with gear icon and safety stripes */}
      <header className="sticky top-0 z-50 bg-slate-800 border-b-4 border-orange-600 relative overflow-hidden">
        {/* Safety stripe pattern */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 opacity-60" />
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-white flex items-center gap-2">
            <span className="text-3xl">⚙️</span>
            <span className="text-orange-400">COURSE</span> TUTOR
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-300 hover:text-orange-400 transition-colors font-bold uppercase text-sm tracking-wide">Courses</Link>
            <Link to="/about" className="text-slate-300 hover:text-orange-400 transition-colors font-bold uppercase text-sm tracking-wide">About</Link>
            <Link to="/help" className="text-slate-300 hover:text-orange-400 transition-colors font-bold uppercase text-sm tracking-wide">Help</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 font-bold">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-orange-400 text-sm font-bold uppercase">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold uppercase">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Factory floor hero with process diagram layout */}
      <section className="relative py-16 lg:py-20 px-4 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700">
        {/* Wildcard: Animated safety badge */}
        <motion.div
          className="absolute top-8 right-[10%] text-5xl"
          animate={{
            rotate: [0, -10, 0],
            y: [0, -8, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🦺
        </motion.div>

        {/* Safety stripes decoration */}
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-orange-500 to-yellow-500 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,.2) 20px, rgba(0,0,0,.2) 40px)' }} />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-orange-600 text-white border-2 border-yellow-400 font-bold uppercase tracking-wide">
                  SAFETY FIRST
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Build Your Skills
                <span className="block text-orange-400 border-l-8 border-orange-600 pl-4 mt-2">
                  Safely
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-200 mb-6 leading-relaxed">
                Industry-certified training for manufacturing professionals. OSHA compliance,
                quality management, and process optimization courses designed by industry experts.
              </motion.p>

              {/* Shift-style CTAs */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-5 w-full md:w-auto border-4 border-orange-500 font-bold uppercase">
                    CLOCK IN → Get Certified
                  </Button>
                </Link>
                <Link to="/courses" className="block md:inline-block ml-0 md:ml-4">
                  <Button size="lg" variant="outline" className="px-8 py-5 w-full md:w-auto border-2 border-slate-400 text-slate-200 hover:bg-slate-600 font-bold uppercase">
                    View Training Programs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Process diagram style image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="border-4 border-orange-600 overflow-hidden relative bg-slate-800 p-2">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=450&fit=crop"
                  alt="Industrial manufacturing floor"
                  className="w-full h-full object-cover"
                />
                {/* Safety label overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white font-bold text-center py-2 uppercase tracking-widest text-sm">
                  OSHA Certified Training
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Safety certification bar */}
      <section className="py-8 px-4 bg-white border-y-2 border-orange-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {safetyBadges.map((badge, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 bg-slate-50 px-6 py-3 border-2 border-slate-200"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-slate-800 font-bold">{badge.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Industry sector categories */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Training by Sector</h2>
            <p className="text-slate-600">Specialized courses for your industry</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white border-2 border-slate-300 p-6"
              >
                <div className="text-4xl mb-4">{sector.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{sector.title}</h3>
                <p className="text-slate-600">{sector.courses} courses available</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Safety record statistics */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '50K+', label: 'Workers Certified' },
              { num: '99.2%', label: 'Safety Compliance' },
              { num: '500+', label: 'Companies Trained' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.num}</div>
                <div className="text-orange-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Certification Process</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: '1', title: 'Register & Enroll', desc: 'Choose your certification track' },
              { step: '2', title: 'Complete Training', desc: 'Video lessons and practical exercises' },
              { step: '3', title: 'Pass Assessment', desc: 'Demonstrate your knowledge' },
              { step: '4', title: 'Receive Certificate', desc: 'Industry-recognized credentials' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 bg-slate-50 p-6 border-l-4 border-orange-600"
              >
                <div className="w-12 h-12 bg-orange-600 text-white font-bold text-xl flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-slate-300 p-8 md:p-12"
          >
            <p className="text-slate-700 text-xl mb-6 leading-relaxed">
              "The safety certification course helped our entire team stay compliant
              with OSHA standards. Training was clear, practical, and directly applicable
              to our daily operations."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-600 text-white font-bold text-xl flex items-center justify-center">
                JM
              </div>
              <div>
                <div className="font-bold text-slate-900">James Martinez</div>
                <div className="text-slate-600">Plant Manager, AutoTech Manufacturing</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Start Your Certification Today
            </h2>
            <p className="text-slate-700 mb-8 text-lg">
              Join thousands of manufacturing professionals building safer, more efficient operations.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 px-10 py-5 font-bold">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Industrial style */}
      <footer className="bg-slate-800 text-slate-300 py-8 border-t-4 border-orange-600">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-bold text-white">Course Tutor Industrial</span>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-orange-400 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link to="/help" className="hover:text-orange-400 transition-colors">Help</Link>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={61} />
    </div>
  );
}
