/**
 * VARIANT 53: REAL ESTATE PROFESSIONALS
 *
 * Target: Realtors, property managers, real estate investors
 * Tone: Professional, market-savvy, deal-focused - "Close more deals, grow your portfolio"
 * Design: Sophisticated teal, warm gray, gold accents
 * Effects: Property card flip animation
 * Sales: Highlight licensing, certifications, commission growth, market specialties
 * Layout Flow: Property hero → Licensing tracks → Market specialties → Commission stats →
 *              Top producer testimonial → License prep CTA → MLS-style footer
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
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

export function HomePageV53() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const licenseTrack = [
    { title: 'Real Estate License Prep', type: 'State Licensing', duration: '12 weeks', icon: '🏠' },
    { title: 'Broker License Exam', type: 'Advanced', duration: '10 weeks', icon: '🏢' },
    { title: 'Property Management', type: 'Certification', duration: '6 weeks', icon: '🔑' },
  ];

  const marketSpecialties = [
    { front: 'Luxury Homes', back: 'High-end residential marketing', icon: '💎' },
    { front: 'Commercial', back: 'Investment properties & retail', icon: '🏪' },
    { front: 'First-Time Buyers', back: 'Client education & financing', icon: '🎯' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Property Listing Style with Location Pin & Prominent Search */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar - Property Search Prominent */}
        <div className="bg-teal-700 text-white py-3">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl">📍</span>
              <span className="font-semibold">Find Your Real Estate Course</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <span className="text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search courses, certifications..."
                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-64 text-sm"
              />
            </div>
            <div className="text-xs">
              <span className="font-semibold">95%</span> Pass Rate
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-200">
          <Link to="/" className="font-bold text-2xl text-teal-700 flex items-center gap-2">
            <span className="text-3xl">🏡</span>
            Course Tutor
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-slate-600 hover:text-teal-700 transition-colors font-semibold">Courses</Link>
            <Link to="/about" className="text-slate-600 hover:text-teal-700 transition-colors font-semibold">About</Link>
            <Link to="/help" className="text-slate-600 hover:text-teal-700 transition-colors font-semibold">Help</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="border-teal-700 text-teal-700">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-teal-700 text-sm font-semibold">Sign In</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Property Showcase Layout with Large Hero Image & Key Stats Overlay */}
      <section className="relative py-0 bg-slate-900">
        {/* Large Hero Property Image */}
        <div className="relative h-[600px] overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop"
            alt="Modern luxury home representing success"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-yellow-500 text-slate-900 shadow-lg border-0 px-4 py-2 text-sm font-bold mb-6">
                    🏆 Featured Professional Development
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-6"
                >
                  Close More Deals,
                  <span className="block text-teal-400 mt-2">Grow Your Portfolio</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-slate-200 mb-8 leading-relaxed"
                >
                  Professional courses for real estate agents, brokers, and property managers.
                  Get licensed, master market trends, and accelerate your real estate career.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-6 shadow-lg text-lg">
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="px-10 py-6 border-white text-white hover:bg-white/10 text-lg">
                      View Courses
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Key Stats Overlay - Property Card Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 right-8 bg-white rounded-lg p-6 shadow-2xl max-w-sm hidden lg:block"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">
                🏆
              </div>
              <div>
                <div className="text-sm text-slate-600">Your Success Story</div>
                <div className="text-lg font-bold text-slate-900">Starts Here</div>
              </div>
            </div>

            {/* Property-Style Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-teal-50 rounded">
                <div className="text-2xl font-bold text-teal-700">25K+</div>
                <div className="text-xs text-slate-600">Licensed Pros</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-700">43%</div>
                <div className="text-xs text-slate-600">Commission↑</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-200">
              <span className="text-slate-600">Pass Rate:</span>
              <span className="font-bold text-teal-700">95%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-600">Avg. ROI:</span>
              <span className="font-bold text-teal-700">340%</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-slate-600">(2,500+ reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MLS-Style Quick Stats Bar */}
        <div className="bg-white border-t-4 border-teal-600">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-teal-700">95%</div>
                <div className="text-sm text-slate-600">License Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-700">25K+</div>
                <div className="text-sm text-slate-600">Agents Certified</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-700">43%</div>
                <div className="text-sm text-slate-600">Avg Commission Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-700">340%</div>
                <div className="text-sm text-slate-600">Return on Investment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Licensing Tracks */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Licensing & Certification</h2>
            <p className="text-slate-600">Get licensed or advance your real estate credentials</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {licenseTrack.map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-6 shadow-md border border-teal-200 hover:shadow-xl hover:border-teal-400 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-300 w-fit">{course.type}</span>
                  <span className="text-slate-500">{course.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Market Specialties - Wildcard: Flip Cards */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Market Specialties</h2>
            <p className="text-slate-600">Click to explore specialized training programs</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {marketSpecialties.map((specialty, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="h-48 perspective-1000 cursor-pointer"
                onClick={() => setFlippedCard(flippedCard === i ? null : i)}
              >
                <motion.div
                  className="relative w-full h-full transition-all duration-500 preserve-3d"
                  animate={{ rotateY: flippedCard === i ? 180 : 0 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-6 shadow-xl flex flex-col items-center justify-center text-white">
                    <div className="text-5xl mb-3">{specialty.icon}</div>
                    <h3 className="font-semibold text-xl">{specialty.front}</h3>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-lg p-6 shadow-xl flex items-center justify-center border-2 border-teal-200"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-slate-700 text-center">{specialty.back}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Commission Growth Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '25,000+', label: 'Licensed Professionals' },
              { number: '43%', label: 'Avg Commission Increase' },
              { number: '95%', label: 'License Pass Rate' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-bold mb-2 text-yellow-400">{stat.number}</div>
                <div className="text-teal-100">{stat.label}</div>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Path to Success</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Track', desc: 'Licensing, certification, or specialization' },
              { step: '2', title: 'Complete Training', desc: 'Expert instruction and practice exams' },
              { step: '3', title: 'Grow Your Business', desc: 'Apply skills to close more deals' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4 mx-auto shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Top Producer Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 shadow-xl border border-teal-200"
          >
            <p className="text-slate-700 italic mb-6 text-xl leading-relaxed">
              "Course Tutor's licensing prep was comprehensive and efficient. I passed my broker exam on the first try and my business has grown 60% year-over-year. The luxury homes specialty training helped me break into the high-end market."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-700 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                J
              </div>
              <div>
                <div className="font-semibold text-slate-900">Jessica Martinez</div>
                <div className="text-teal-700 text-sm">Top Producer, Luxury Home Specialist</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: License Prep CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-700 to-teal-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Real Estate Career?
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Join thousands of successful real estate professionals
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-yellow-400 text-teal-900 hover:bg-yellow-300 px-10 py-5 font-semibold shadow-xl">
                  Get Started Today
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - MLS Style */}
      <footer className="bg-slate-100 text-slate-700 py-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-teal-700 mb-3">Course Tutor</h4>
              <p className="text-sm text-slate-600">Professional real estate education</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/courses" className="hover:text-teal-700 transition-colors">Browse Courses</Link>
                <Link to="/licensing" className="hover:text-teal-700 transition-colors">Licensing</Link>
                <Link to="/certifications" className="hover:text-teal-700 transition-colors">Certifications</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Support</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/about" className="hover:text-teal-700 transition-colors">About</Link>
                <Link to="/help" className="hover:text-teal-700 transition-colors">Help Center</Link>
                <Link to="/contact" className="hover:text-teal-700 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500 pt-6 border-t border-slate-200">
            © 2024 Course Tutor. All rights reserved.
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={53} />
    </div>
  );
}
