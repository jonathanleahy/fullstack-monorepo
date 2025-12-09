/**
 * VARIANT 56: LEGAL PROFESSIONALS
 *
 * Target: Lawyers, paralegals, legal assistants
 * Tone: Precise, authoritative - "Sharpen your legal edge"
 * Design: Burgundy, navy, ivory backgrounds
 * Effects: Distinguished, traditional, conservative borders (4-6px)
 * Sales: CLE-focused, professional development
 * Layout Flow: Law library hero → CLE credit tracking → Practice areas → Bar exam prep →
 *              Partner testimonial → CLE enrollment CTA → Formal footer
 * Wildcard: Gavel or scales of justice subtle animation
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

export function HomePageV56() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const practiceAreas = [
    { title: 'Corporate Law', credits: '12 CLE Credits', icon: '🏢' },
    { title: 'Criminal Defense', credits: '10 CLE Credits', icon: '⚖️' },
    { title: 'Family Law', credits: '8 CLE Credits', icon: '👨‍👩‍👧' },
    { title: 'Intellectual Property', credits: '15 CLE Credits', icon: '💡' },
    { title: 'Real Estate Law', credits: '9 CLE Credits', icon: '🏠' },
    { title: 'Estate Planning', credits: '11 CLE Credits', icon: '📜' },
  ];

  const cleStats = [
    { number: '50,000+', label: 'Legal Professionals' },
    { number: '500+', label: 'CLE Courses' },
    { number: '48', label: 'State Bars Approved' },
    { number: '99.2%', label: 'Pass Rate' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/30">
      {/* Header - Law Firm Style with Scales of Justice */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 border-b-4 border-amber-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Top bar with credentials */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-amber-600/30">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-3xl">⚖️</div>
              <div>
                <div className="font-serif text-xl text-amber-100 font-bold">Course Tutor</div>
                <div className="text-xs text-amber-300 tracking-widest">LEGAL EDUCATION INSTITUTE</div>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-xs text-amber-200 tracking-wide">
              <span>Est. 2025</span>
              <span className="text-amber-600">|</span>
              <span>48 State Bars Approved</span>
              <span className="text-amber-600">|</span>
              <span>CLE Accredited</span>
            </div>
          </div>

          {/* Main navigation */}
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/courses" className="text-amber-100 hover:text-amber-300 transition-colors font-serif">Courses</Link>
              <Link to="/about" className="text-amber-100 hover:text-amber-300 transition-colors font-serif">About</Link>
              <Link to="/help" className="text-amber-100 hover:text-amber-300 transition-colors font-serif">Help</Link>
            </nav>
            <div className="flex items-center gap-3 ml-auto">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-300 hover:bg-amber-600/20">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-amber-100 hover:text-amber-300 text-sm font-serif">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-stone-900 shadow-md font-serif font-bold">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Case File Layout */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
        {/* Document grid lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to bottom, #78350f 1px, transparent 1px)`,
            backgroundSize: '100% 30px'
          }}
        />

        {/* Animated scales of justice */}
        <motion.div
          className="absolute top-20 right-[10%] text-8xl opacity-[0.07]"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        >
          ⚖️
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto relative z-10">
          {/* Case file header */}
          <div className="mb-8 pb-6 border-b-2 border-stone-300">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-stone-500 font-mono mb-1">FILE NO. CLE-2025-001</div>
                <div className="text-sm text-stone-600 font-serif">In the Matter of Professional Development</div>
              </div>
              <Badge className="bg-rose-900 text-amber-100 border-2 border-amber-600 font-serif">CLE Approved</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border-4 border-stone-300 p-8 shadow-xl"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight"
              >
                Sharpen Your
                <span className="block text-rose-900">
                  Legal Edge
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-base text-stone-700 mb-6 leading-relaxed font-serif">
                Accredited continuing legal education courses designed for busy attorneys,
                paralegals, and legal professionals. Stay current, maintain compliance,
                and advance your practice.
              </motion.p>

              {/* Credentials bar */}
              <motion.div variants={itemVariants} className="bg-amber-50 border-l-4 border-rose-900 p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-900">500+</div>
                    <div className="text-xs text-stone-600 font-serif">CLE Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-900">48</div>
                    <div className="text-xs text-stone-600 font-serif">States Approved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-900">99%</div>
                    <div className="text-xs text-stone-600 font-serif">Pass Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button size="lg" className="w-full bg-rose-900 hover:bg-rose-950 text-white px-8 py-5 shadow-lg font-serif">
                      Browse CLE Courses
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full px-8 py-5 border-2 border-stone-400 hover:bg-stone-50 font-serif">
                    View Bar Prep
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative border-8 border-stone-800 shadow-2xl bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&h=500&fit=crop"
                  alt="Legal professionals in law library"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent" />

                {/* Document-style annotations */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 border-2 border-rose-900 p-3">
                  <div className="text-xs font-mono text-stone-700 mb-1">EXHIBIT A: Professional Development</div>
                  <div className="text-sm font-serif text-stone-900 font-semibold">Continuing Legal Education Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: CLE Credit Tracking Bar */}
      <section className="py-8 px-4 bg-gradient-to-r from-rose-900 to-rose-950 border-y border-rose-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cleStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl font-bold text-amber-50 mb-1">{stat.number}</div>
                <div className="text-rose-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Practice Area Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Practice Areas</h2>
            <p className="text-stone-600">Accredited CLE courses tailored to your specialty</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {practiceAreas.map((area, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-amber-50 to-white rounded-md p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="font-semibold text-stone-900 mb-2">{area.title}</h3>
                <div className="text-sm text-rose-900 font-medium">{area.credits}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Bar Exam Prep Spotlight */}
      <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop"
                alt="Law books and gavel"
                className="rounded-md shadow-xl border border-stone-200"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-100 text-blue-900 border border-blue-200 mb-4">Bar Exam Prep</Badge>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                Pass the Bar with Confidence
              </h2>
              <p className="text-stone-700 mb-6 leading-relaxed">
                Comprehensive bar exam preparation courses covering MBE, MEE, and MPT.
                Expert instruction, practice questions, and proven strategies for success.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-rose-900 font-bold">✓</span>
                  <span className="text-stone-700">Full MBE question bank with detailed explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-900 font-bold">✓</span>
                  <span className="text-stone-700">Graded essay practice and feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-900 font-bold">✓</span>
                  <span className="text-stone-700">Performance tracking and analytics</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="bg-blue-900 hover:bg-blue-950 text-white">
                  Explore Bar Prep →
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-3">How It Works</h2>
            <p className="text-stone-600">Complete your CLE requirements efficiently</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Select Your Courses', desc: 'Browse by practice area or CLE requirement' },
              { step: '2', title: 'Complete at Your Pace', desc: 'Watch video lectures and complete assessments' },
              { step: '3', title: 'Receive Certificate', desc: 'Download CLE certificates upon completion' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rose-900 text-white rounded-md flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-md p-10 shadow-xl border border-stone-200"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                className="text-5xl opacity-20"
              >
                ⚖️
              </motion.div>
              <div className="flex-1">
                <p className="text-xl text-stone-700 italic mb-6 leading-relaxed">
                  "Course Tutor's CLE platform has been invaluable for maintaining my license
                  while managing a full caseload. The courses are rigorous, relevant, and
                  conveniently accessible. I've completed over 40 hours of CLE this year alone."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-900 to-rose-950 rounded-md flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                    RJ
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">Robert Jensen, Esq.</div>
                    <div className="text-rose-900 text-sm">Managing Partner, Jensen & Associates</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900 via-rose-950 to-blue-950" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your CLE Journey Today
            </h2>
            <p className="text-rose-100 mb-8 text-lg">
              Join thousands of legal professionals advancing their practice
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-rose-900 hover:bg-amber-50 px-10 py-5 font-semibold shadow-xl">
                  Enroll in CLE Courses
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-rose-900 text-lg mb-3">Course Tutor</div>
              <p className="text-stone-600 text-sm">Professional legal education</p>
            </div>
            <div>
              <div className="font-semibold text-stone-900 mb-3">Practice Areas</div>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>Corporate Law</li>
                <li>Criminal Defense</li>
                <li>Family Law</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-stone-900 mb-3">Resources</div>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><Link to="/courses" className="hover:text-stone-900">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-stone-900">About</Link></li>
                <li><Link to="/help" className="hover:text-stone-900">Help</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-stone-900 mb-3">Jurisdictions</div>
              <p className="text-sm text-stone-600">Approved in 48 state bars</p>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-200 text-center text-sm text-stone-500">
            © 2025 Course Tutor. All rights reserved.
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={56} />
    </div>
  );
}
