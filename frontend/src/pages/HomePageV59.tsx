/**
 * VARIANT 59: HOSPITALITY & TOURISM
 *
 * Target: Hotel managers, travel agents, tourism professionals
 * Tone: Welcoming, service-oriented - "Create unforgettable experiences"
 * Design: Ocean blue, sunset coral, sand beige
 * Effects: Soft shadows, vacation-feel, friendly borders (12px)
 * Sales: Guest experience focus, management certifications
 * Layout Flow: Resort hero → Hospitality sectors → Management certs → Guest satisfaction stats →
 *              Hotel GM testimonial → "Book Your Career" CTA → Concierge footer
 * Wildcard: Luggage tag or passport stamp animation
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

export function HomePageV59() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const hospitalitySectors = [
    { title: 'Hotel Management', icon: '🏨', courses: 45 },
    { title: 'Restaurant Service', icon: '🍽️', courses: 38 },
    { title: 'Travel & Tourism', icon: '✈️', courses: 32 },
    { title: 'Event Planning', icon: '🎉', courses: 28 },
    { title: 'Cruise Operations', icon: '🚢', courses: 22 },
    { title: 'Resort Management', icon: '🏖️', courses: 26 },
  ];

  const guestStats = [
    { number: '20,000+', label: 'Professionals Trained' },
    { number: '4.9/5', label: 'Guest Satisfaction' },
    { number: '450+', label: 'Hospitality Courses' },
    { number: '95%', label: 'Career Advancement' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50/30">
      {/* Header - Concierge Style */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 shadow-xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 py-1">
          {/* Welcome banner */}
          <div className="flex items-center justify-center py-2 border-b border-sky-500/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔔</span>
              <span className="text-sm text-sky-100 font-medium">Welcome to Excellence in Hospitality Education</span>
              <span className="text-2xl">🔔</span>
            </div>
          </div>

          {/* Main header */}
          <div className="py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏨</span>
              </div>
              <div>
                <div className="font-semibold text-xl text-white">Course Tutor</div>
                <div className="text-xs text-sky-200">Hospitality & Tourism Excellence</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-white hover:text-amber-300 transition-colors font-medium">Courses</Link>
              <Link to="/about" className="text-white hover:text-amber-300 transition-colors font-medium">About</Link>
              <Link to="/help" className="text-white hover:text-amber-300 transition-colors font-medium">Help</Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-2 border-white text-white hover:bg-white hover:text-sky-600 rounded-xl">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-amber-300 text-sm font-medium">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white shadow-md rounded-xl font-semibold">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Hotel Lobby Layout with Panoramic Image */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-amber-100/50" />

        {/* Subtle wave pattern */}
        <div
          className="absolute bottom-0 left-0 w-full h-32 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' stroke='%230284c7' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x'
          }}
        />

        {/* Passport stamp animation */}
        <motion.div
          className="absolute top-20 right-[15%] text-8xl opacity-15"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        >
          ✈️
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto relative z-10">
          {/* Panoramic hero image with overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&h=400&fit=crop"
                alt="Luxury resort and hospitality"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/60 to-transparent" />

              {/* Overlay content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-12">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants} className="mb-4">
                      <Badge className="bg-amber-500 text-white border-2 border-amber-300 rounded-full px-4 py-2 text-sm font-semibold">
                        Hospitality Excellence
                      </Badge>
                    </motion.div>

                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                      Create Unforgettable
                      <span className="block text-amber-300">
                        Guest Experiences
                      </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-sky-100 mb-8 leading-relaxed">
                      Elevate your career in hospitality and tourism with expert-led courses.
                      Master guest service, operations management, and create memorable experiences.
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Amenity icons and booking CTA */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* Amenity cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-sky-100 text-center"
            >
              <div className="text-4xl mb-3">🏨</div>
              <div className="font-semibold text-slate-900 mb-1">Hotel Management</div>
              <div className="text-sm text-sky-600">45 Courses</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-sky-100 text-center"
            >
              <div className="text-4xl mb-3">🍽️</div>
              <div className="font-semibold text-slate-900 mb-1">Restaurant Service</div>
              <div className="text-sm text-sky-600">38 Courses</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-sky-100 text-center"
            >
              <div className="text-4xl mb-3">✈️</div>
              <div className="font-semibold text-slate-900 mb-1">Travel & Tourism</div>
              <div className="text-sm text-sky-600">32 Courses</div>
            </motion.div>

            {/* Booking-style CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-center items-center"
            >
              <div className="text-sm mb-2">Ready to Begin?</div>
              <Link to={isAuthenticated ? "/dashboard" : "/register"} className="w-full">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg font-semibold">
                    Book Your Journey
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses" className="mt-3">
                <button className="text-sky-100 hover:text-white text-sm underline">
                  Explore All Courses
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Guest Satisfaction Statistics */}
      <section className="py-8 px-4 bg-gradient-to-r from-sky-600 to-sky-700 border-y-2 border-sky-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {guestStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sky-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Hospitality Sector Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Hospitality Sectors</h2>
            <p className="text-slate-600">Specialized training for every aspect of guest service</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {hospitalitySectors.map((sector, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-br from-sky-50 to-white rounded-xl p-6 border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{sector.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{sector.title}</h3>
                <div className="text-sm text-sky-600 font-medium">{sector.courses} Courses</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Management Certification Tracks */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop"
                alt="Hotel reception and guest service"
                className="rounded-xl shadow-2xl border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-coral-500 text-white rounded-full px-4 mb-4">Management Certifications</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Lead with Excellence
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Comprehensive management training for hospitality leaders. Learn revenue management,
                team leadership, and operational excellence from industry veterans.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Hotel Operations Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Revenue & Yield Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Guest Experience Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Luxury Service Standards</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
                  View Certifications →
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Path to Excellence</h2>
            <p className="text-slate-600">Three simple steps to advance your hospitality career</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Focus', desc: 'Select from hotel, restaurant, or tourism tracks' },
              { step: '2', title: 'Learn from Experts', desc: 'Video lessons from industry leaders' },
              { step: '3', title: 'Earn Certification', desc: 'Industry-recognized credentials' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-coral-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Hotel GM Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-10 shadow-2xl border-2 border-sky-100"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
                className="text-5xl"
              >
                🏨
              </motion.div>
              <div className="flex-1">
                <p className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "The management certification courses transformed how I lead my team.
                  Our guest satisfaction scores increased by 23% within six months.
                  The revenue management strategies alone paid for the entire program."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-600 to-coral-500 rounded-xl flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                    SP
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Peterson</div>
                    <div className="text-sky-600 text-sm">General Manager, Oceanview Resort & Spa</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-700 to-coral-600" />

        {/* Soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Book Your Career Journey Today
            </h2>
            <p className="text-sky-100 mb-8 text-lg">
              Join thousands of hospitality professionals creating exceptional experiences
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-sky-600 hover:bg-coral-50 hover:text-coral-600 px-10 py-5 font-semibold shadow-2xl rounded-xl">
                  Start Learning Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Concierge Style */}
      <footer className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-semibold text-sky-700 text-lg mb-3">Course Tutor</div>
              <p className="text-slate-600 text-sm">Excellence in Hospitality Education</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Sectors</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Hotel Management</li>
                <li>Restaurant Service</li>
                <li>Travel & Tourism</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Resources</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/courses" className="hover:text-sky-600">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-sky-600">About Us</Link></li>
                <li><Link to="/help" className="hover:text-sky-600">Support</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Contact</div>
              <p className="text-sm text-slate-600">Available 24/7 to assist you</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © 2025 Course Tutor. Creating unforgettable experiences.
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={59} />
    </div>
  );
}
