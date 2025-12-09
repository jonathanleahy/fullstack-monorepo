/**
 * VARIANT 46: HEALTHCARE PROFESSIONALS
 *
 * Target: Nurses, doctors, medical staff seeking continuing education
 * Tone: Professional, reassuring, evidence-based - "Advance your clinical expertise"
 * Design: Soft teal (teal-500), clean white, light blue accents
 * Effects: Pulse/heartbeat animation on hover states
 * Sales: CE credits, certifications, clinical advancement
 * Layout Flow: Split hero → Credential badges → Course categories → Statistics →
 *              Single testimonial → CTA with certification focus → Clean footer
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

// Heartbeat pulse animation
const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export function HomePageV46() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const courseCategories = [
    { title: 'Clinical Skills', courses: 45, icon: '⚕️', color: 'teal' },
    { title: 'Administration', courses: 28, icon: '📋', color: 'blue' },
    { title: 'Leadership', courses: 32, icon: '👥', color: 'cyan' },
  ];

  const credentials = [
    { name: 'ANCC Approved', icon: '✓' },
    { name: 'CE Credits', icon: '✓' },
    { name: 'Board Certified', icon: '✓' },
    { name: 'CPR Certified', icon: '✓' },
  ];

  const statistics = [
    { value: '50,000+', label: 'CE Credits Earned' },
    { value: '12,000+', label: 'Healthcare Professionals' },
    { value: '98%', label: 'Certification Pass Rate' },
    { value: '200+', label: 'Accredited Courses' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Clinical Clean with Medical Cross */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-teal-500 shadow-lg">
        {/* Emergency-style highlight bar */}
        <div className="bg-teal-500 h-1 w-full"></div>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with medical cross icon */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded flex items-center justify-center relative">
                <span className="text-white font-bold text-xl">+</span>
              </div>
              <span className="font-bold text-xl text-teal-600">Course Tutor Healthcare</span>
            </Link>

            {/* Emergency-style navigation with highlighting */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/courses" className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded font-medium border-l-2 border-transparent hover:border-teal-500">Courses</Link>
              <Link to="/about" className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded font-medium border-l-2 border-transparent hover:border-teal-500">About</Link>
              <Link to="/help" className="px-4 py-2 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded font-medium border-l-2 border-transparent hover:border-teal-500">Help</Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-teal-500 text-teal-600">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-700 hover:text-teal-600 text-sm font-medium">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600 shadow-md">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Patient-Focused Hero with Trust Indicators */}
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        {/* Credentials banner at top */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 py-3 mb-8 border-y border-teal-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-slate-700 font-medium">ANCC Approved Provider</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-slate-700 font-medium">Board Certified Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-slate-700 font-medium">Evidence-Based Content</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-slate-700 font-medium">50,000+ CE Credits Issued</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left content - 3 columns */}
            <motion.div
              className="md:col-span-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-teal-500 text-white">Trusted by Healthcare Professionals</Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight"
              >
                Advance Your Clinical Expertise with
                <span className="block text-teal-600 mt-2">
                  Evidence-Based CE Courses
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6 leading-relaxed">
                Earn continuing education credits designed by healthcare professionals,
                for healthcare professionals. Stay current with clinical best practices
                and advance your career while providing better patient care.
              </motion.p>

              {/* Trust indicators */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 text-2xl">⚕️</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">12,000+</div>
                    <div className="text-xs text-slate-600">Active Professionals</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-600 text-2xl">📋</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">98% Pass Rate</div>
                    <div className="text-xs text-slate-600">Certification Success</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={pulseVariants}
                    animate="pulse"
                  >
                    <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 shadow-lg">
                      Start Earning CE Credits
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right image - 2 columns */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl border-4 border-teal-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=450&fit=crop"
                  alt="Healthcare professional reviewing clinical data"
                  className="w-full h-full object-cover"
                />
                {/* Trust badge overlay */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-teal-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">+</div>
                    <div className="text-left">
                      <div className="text-xs font-semibold text-teal-600">ANCC Approved</div>
                      <div className="text-xs text-slate-600">200+ CE Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Credential/Certification Badges Bar */}
      <section className="py-8 px-4 bg-teal-50/50 border-y border-teal-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {credentials.map((cred, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {cred.icon}
                </span>
                <span className="text-slate-700 font-medium">{cred.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Course Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Course Categories</h2>
            <p className="text-slate-600">Specialized training for every aspect of healthcare</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courseCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-lg p-6 border border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <motion.div
                  className="text-4xl mb-4"
                  variants={pulseVariants}
                  whileHover="pulse"
                >
                  {cat.icon}
                </motion.div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{cat.title}</h3>
                <p className="text-teal-600 text-sm font-medium">{cat.courses} courses available</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Statistics */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statistics.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Single Prominent Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-teal-50/30 rounded-lg p-10 border border-teal-100 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <motion.div
                className="flex-shrink-0"
                variants={pulseVariants}
                whileHover="pulse"
              >
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                  D
                </div>
              </motion.div>
              <div>
                <p className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "The clinical skills courses helped me transition to the ICU with confidence.
                  The evidence-based approach and practical scenarios were exactly what I needed.
                  I earned 24 CE credits while advancing my career."
                </p>
                <div>
                  <div className="font-semibold text-slate-900">Dr. Sarah Mitchell, RN, BSN</div>
                  <div className="text-teal-600 text-sm">Critical Care Nurse, Johns Hopkins Hospital</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: CTA with Certification Focus */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              variants={pulseVariants}
              animate="pulse"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🏥</span>
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Advance Your Practice?
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Join thousands of healthcare professionals earning CE credits and advancing their careers
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-10 shadow-sm">
                  Get Started Today
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-700 py-10 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-semibold text-teal-600">Course Tutor Healthcare</span>
            <div className="flex gap-8 text-sm">
              <Link to="/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
              <Link to="/about" className="hover:text-teal-600 transition-colors">About</Link>
              <Link to="/help" className="hover:text-teal-600 transition-colors">Help</Link>
              <Link to="/accreditation" className="hover:text-teal-600 transition-colors">Accreditation</Link>
            </div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={46} />
    </div>
  );
}
