/**
 * VARIANT 51: FINANCE & ACCOUNTING
 *
 * Target: Finance professionals, accountants, CPAs
 * Tone: Precise, authoritative, ROI-focused - "Advance your financial expertise"
 * Design: Deep blue primary, gold accents, clean white
 * Effects: Animated chart/graph element
 * Sales: Highlight certifications (CPA, CFA prep), career advancement, ROI
 * Layout Flow: Professional hero → Certification badges → Course tracks → Statistics →
 *              Finance testimonial → Value proposition CTA → Professional footer
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

export function HomePageV51() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const courseTracks = [
    { title: 'CPA Exam Preparation', category: 'Certification', duration: '6 months', icon: '📊' },
    { title: 'Financial Analysis & Modeling', category: 'Analysis', duration: '8 weeks', icon: '📈' },
    { title: 'Tax Compliance & Strategy', category: 'Compliance', duration: '12 weeks', icon: '📋' },
  ];

  const certifications = [
    { name: 'CPA', icon: '🎓' },
    { name: 'CFA', icon: '💼' },
    { name: 'CFP', icon: '📜' },
    { name: 'CMA', icon: '🏆' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Stock Ticker Style */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Stock Ticker Bar */}
        <div className="bg-blue-900 text-white py-2 overflow-hidden">
          <motion.div
            className="flex gap-8 text-xs font-mono"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span>📈 CPA Success: +92%</span>
            <span>💼 Avg Salary Increase: $25K</span>
            <span>🎓 15K+ Professionals Certified</span>
            <span>⭐ ROI: 340%</span>
            <span>📊 Career Advancement: 92%</span>
            <span>📈 CPA Success: +92%</span>
            <span>💼 Avg Salary Increase: $25K</span>
            <span>🎓 15K+ Professionals Certified</span>
          </motion.div>
        </div>

        {/* Professional Navigation */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-200">
          <Link to="/" className="font-bold text-xl text-blue-900 flex items-center gap-2">
            <span className="text-2xl">💼</span>
            Course Tutor
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-600 hover:text-blue-900 transition-colors font-semibold">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-blue-900 transition-colors font-semibold">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-blue-900 transition-colors font-semibold">Help</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="border-blue-900 text-blue-900">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-blue-900 text-sm font-semibold">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-950 text-white shadow-md">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Dashboard Preview Hero with Charts/ROI Focus */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          {/* ROI-Focused Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Badge className="bg-yellow-400 text-blue-900 shadow-sm border border-yellow-500 px-4 py-2 text-sm font-bold">
                340% Average ROI on Course Investment
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4"
            >
              Advance Your
              <span className="block text-blue-900 mt-2">Financial Expertise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto mb-8"
            >
              Professional development courses for CPAs, accountants, and finance professionals.
              Earn certifications, stay compliant, and accelerate your career growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="bg-blue-900 hover:bg-blue-950 text-white px-10 py-6 shadow-lg text-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="px-10 py-6 border-blue-900 text-blue-900 hover:bg-blue-50 text-lg">
                  Explore Programs
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Preview with Charts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-2xl border border-slate-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Chart 1 - Career Growth */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-4">Career Progression</h3>
                <div className="flex items-end gap-2 h-32">
                  {[60, 75, 85, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-blue-900 to-blue-600 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-blue-700 mt-3 font-semibold">+92% Advancement Rate</p>
              </div>

              {/* Chart 2 - Salary Impact */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-sm font-semibold text-yellow-900 mb-4">Salary Increase</h3>
                <div className="flex items-end gap-2 h-32">
                  {[45, 70, 90, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-yellow-700 mt-3 font-semibold">$25K Average Increase</p>
              </div>

              {/* Chart 3 - Certification Success */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <h3 className="text-sm font-semibold text-green-900 mb-4">Pass Rates</h3>
                <div className="flex items-center justify-center h-32">
                  <motion.div
                    className="relative w-28 h-28"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="52" stroke="#d1fae5" strokeWidth="8" fill="none" />
                      <motion.circle
                        cx="56"
                        cy="56"
                        r="52"
                        stroke="#059669"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={327}
                        initial={{ strokeDashoffset: 327 }}
                        animate={{ strokeDashoffset: 32.7 }}
                        transition={{ delay: 0.9, duration: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-900">90%</span>
                    </div>
                  </motion.div>
                </div>
                <p className="text-xs text-green-700 mt-3 font-semibold text-center">First-Time Pass</p>
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">15K+</div>
                <div className="text-xs text-slate-600 mt-1">Professionals Certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">340%</div>
                <div className="text-xs text-slate-600 mt-1">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.8/5</div>
                <div className="text-xs text-slate-600 mt-1">Student Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Certification Badges */}
      <section className="py-12 px-4 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-blue-900">Prepare for Industry Certifications</h3>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md border border-blue-200">
                  {cert.icon}
                </div>
                <span className="text-blue-900 font-semibold text-sm">{cert.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Course Tracks */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Professional Development Tracks</h2>
            <p className="text-slate-600">Specialized courses designed for finance professionals</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courseTracks.map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                <div className="flex gap-3 text-sm text-slate-500">
                  <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">{course.category}</span>
                  <span>{course.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Career Statistics */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '15,000+', label: 'Professionals Certified' },
              { number: '92%', label: 'Career Advancement Rate' },
              { number: '$25K', label: 'Average Salary Increase' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-bold mb-2 text-yellow-400">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Path to Excellence</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Track', desc: 'Select certification or skill development path' },
              { step: '2', title: 'Complete Coursework', desc: 'Learn from industry experts and case studies' },
              { step: '3', title: 'Earn Credentials', desc: 'Receive certificates and CPE credits' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4 mx-auto shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
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
            className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 shadow-lg border border-blue-100"
          >
            <p className="text-slate-700 italic mb-6 text-xl leading-relaxed">
              "The CPA exam prep course was instrumental in my success. The structured curriculum and expert instruction gave me the confidence to pass on my first attempt. My career has accelerated significantly since earning my certification."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                S
              </div>
              <div>
                <div className="font-semibold text-slate-900">Sarah Chen, CPA</div>
                <div className="text-blue-900 text-sm">Senior Financial Analyst, Fortune 500</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Invest in Your Professional Future
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of finance professionals advancing their careers
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-10 py-5 font-semibold shadow-xl">
                  Get Started Today
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
            <span className="font-semibold text-blue-900">Course Tutor</span>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
              <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
              <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
              <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            </div>
            <div className="text-sm text-slate-500">© 2024 Course Tutor. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={51} />
    </div>
  );
}
