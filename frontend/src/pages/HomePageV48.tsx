/**
 * VARIANT 48: GOVERNMENT & PUBLIC SECTOR
 *
 * Target: Government employees, civil servants seeking compliance training
 * Tone: Formal but approachable, compliance-focused - "Professional development for public servants"
 * Design: Navy blue, gold accents, light gray backgrounds
 * Border radius: Conservative (4-6px)
 * Effects: Subtle patriotic accent (stars or subtle flag motif)
 * Layout Flow: Structured hero → Compliance badges → Department categories →
 *              Statistics → Government testimonial → Enrollment CTA → Official footer
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
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

export function HomePageV48() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const complianceBadges = [
    { name: 'OPM Approved', icon: '✓' },
    { name: 'CPE Credits', icon: '✓' },
    { name: 'Ethics Training', icon: '✓' },
    { name: 'Security Clearance', icon: '✓' },
  ];

  const departments = [
    { title: 'Leadership & Management', courses: 42, icon: '🏛️' },
    { title: 'Ethics & Compliance', courses: 38, icon: '⚖️' },
    { title: 'Cybersecurity', courses: 31, icon: '🔐' },
    { title: 'Financial Management', courses: 29, icon: '💼' },
    { title: 'Human Resources', courses: 26, icon: '👥' },
    { title: 'Project Management', courses: 34, icon: '📊' },
  ];

  const statistics = [
    { value: '150+', label: 'Federal Agencies Served' },
    { value: '75,000+', label: 'Public Servants Trained' },
    { value: '500+', label: 'Compliance Courses' },
    { value: '99.2%', label: 'Completion Rate' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header - Official/Formal with Seal, Utility Nav Top, Main Nav Below */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Utility Navigation Top Bar */}
        <div className="bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-2 flex justify-end items-center gap-6 text-sm">
            <Link to="/accessibility" className="hover:text-yellow-400 transition-colors">Accessibility</Link>
            <Link to="/foia" className="hover:text-yellow-400 transition-colors">FOIA</Link>
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy</Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="hover:text-yellow-400 transition-colors font-medium">Dashboard</Link>
            ) : (
              <Link to="/login" className="hover:text-yellow-400 transition-colors font-medium">Sign In</Link>
            )}
          </div>
        </div>

        {/* Main Header with Official Seal */}
        <div className="border-b-4 border-yellow-400">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo with Official Seal/Badge */}
              <Link to="/" className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-lg relative">
                  <span className="text-yellow-400 font-bold text-2xl">★</span>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-900 text-[8px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                    OFFICIAL
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xl text-blue-900">Course Tutor</div>
                  <div className="text-xs text-slate-600">Public Sector Training Division</div>
                </div>
              </Link>

              {/* Main Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <Link to="/courses" className="px-6 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-900">
                  Courses
                </Link>
                <Link to="/about" className="px-6 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-900">
                  About
                </Link>
                <Link to="/help" className="px-6 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors font-semibold border-l-4 border-transparent hover:border-blue-900">
                  Help
                </Link>
              </nav>

              {/* Action Button */}
              {!isAuthenticated && (
                <Link to="/register">
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white border-2 border-yellow-400 shadow-md">
                    Enroll Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Announcement-Style Hero with Official Seal */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
        {/* Subtle star pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-900 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              ★
            </div>
          ))}
        </div>

        <motion.div style={{ y: heroY }} className="max-w-5xl mx-auto relative z-10">
          {/* Announcement Box Style */}
          <motion.div
            className="bg-white border-4 border-blue-900 shadow-xl p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Official Seal at Top Center */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-lg relative">
                <span className="text-yellow-400 text-5xl">★</span>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded">
                  APPROVED
                </div>
              </div>
            </motion.div>

            {/* Formal Typography */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <div className="inline-block bg-blue-900 text-yellow-400 px-6 py-2 font-semibold text-sm tracking-wide mb-4">
                OFFICIAL PUBLIC SECTOR TRAINING PROGRAM
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-6 leading-tight uppercase tracking-tight"
            >
              Professional Development for Public Servants
            </motion.h1>

            {/* Bordered Content Block */}
            <motion.div
              variants={itemVariants}
              className="border-t-2 border-b-2 border-gray-300 py-6 mb-8"
            >
              <p className="text-lg text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
                Comprehensive training programs designed for government employees.
                Meet compliance requirements, earn CPE credits, and advance your career
                in public service with courses approved by federal and state agencies.
              </p>
            </motion.div>

            {/* Official Statistics */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">150+</div>
                <div className="text-sm text-slate-600">Federal Agencies</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-3xl font-bold text-blue-900">75,000+</div>
                <div className="text-sm text-slate-600">Trained Employees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">99.2%</div>
                <div className="text-sm text-slate-600">Completion Rate</div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-10 py-6 text-lg border-2 border-yellow-400 shadow-lg font-semibold">
                    ENROLL NOW
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-10 py-6 text-lg font-semibold">
                  VIEW CATALOG
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Compliance Badge/Certification Bar */}
      <section className="py-6 px-4 bg-blue-900 border-y-4 border-yellow-400">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {complianceBadges.map((badge, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <span className="w-6 h-6 bg-yellow-400 text-blue-900 rounded flex items-center justify-center text-sm font-bold">
                  {badge.icon}
                </span>
                <span className="text-white font-semibold">{badge.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Department-Organized Course Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Training by Department</h2>
            <p className="text-slate-600">Specialized courses for every area of public service</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {departments.map((dept, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded border-2 border-gray-200 p-6 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-3xl mb-3">{dept.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{dept.title}</h3>
                <p className="text-blue-900 text-sm font-medium">{dept.courses} courses</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Statistics (Agencies Served, Certifications Issued) */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-100 to-blue-50">
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
                <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Government Employee Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded border-2 border-blue-900 p-10 relative"
          >
            {/* Decorative star */}
            <div className="absolute top-4 right-4 text-yellow-400 text-2xl">★</div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-900 rounded flex items-center justify-center text-yellow-400 font-bold text-xl">
                  JL
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                  "Course Tutor's compliance training helped me meet all my annual requirements
                  efficiently. The courses are thorough, professionally delivered, and fully approved
                  by OPM. I've recommended it to my entire department."
                </p>
                <div>
                  <div className="font-semibold text-slate-900">Jennifer Lopez</div>
                  <div className="text-blue-900 text-sm">Program Manager, Department of Education</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Clear Enrollment CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 relative overflow-hidden">
        {/* Subtle star pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              ★
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-900 text-3xl font-bold">★</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Begin Your Training Today
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of public servants advancing their careers through professional development
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-10 font-semibold">
                  Enroll Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Official Style with Required Links */}
      <footer className="bg-gray-100 text-slate-700 py-10 border-t-4 border-blue-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center">
                  <span className="text-yellow-400 font-bold">★</span>
                </div>
                <span className="font-bold text-blue-900">Course Tutor</span>
              </div>
              <p className="text-sm text-slate-600">
                Professional training for public sector employees
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Resources</h3>
              <div className="space-y-2 text-sm">
                <Link to="/courses" className="block hover:text-blue-900">Course Catalog</Link>
                <Link to="/compliance" className="block hover:text-blue-900">Compliance Info</Link>
                <Link to="/accreditation" className="block hover:text-blue-900">Accreditation</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Required Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/privacy" className="block hover:text-blue-900">Privacy Policy</Link>
                <Link to="/foia" className="block hover:text-blue-900">FOIA Requests</Link>
                <Link to="/accessibility" className="block hover:text-blue-900">Accessibility</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 text-center text-sm text-slate-600">
            © 2024 Course Tutor. All rights reserved. | An Equal Opportunity Provider
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={48} />
    </div>
  );
}
