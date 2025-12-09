/**
 * VARIANT 60: VETERINARY & ANIMAL CARE
 *
 * Target: Vet techs, pet groomers, animal care professionals
 * Tone: Compassionate, professional - "Care for those who can't speak"
 * Design: Soft teal, warm brown, gentle cream
 * Effects: Soft shadows, gentle feel, friendly rounded borders (12px)
 * Sales: Animal welfare focused, certification tracks
 * Layout Flow: Animal care hero → Specialty categories → Certifications → Animals helped stats →
 *              Vet tech testimonial → "Start Caring" CTA → Paw-print footer
 * Wildcard: Subtle paw print trail animation
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

export function HomePageV60() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const specialtyCategories = [
    { title: 'Small Animal Care', icon: '🐕', courses: 48 },
    { title: 'Large Animal Medicine', icon: '🐴', courses: 32 },
    { title: 'Exotic Animals', icon: '🦜', courses: 24 },
    { title: 'Emergency Care', icon: '🏥', courses: 36 },
    { title: 'Pet Grooming', icon: '✂️', courses: 28 },
    { title: 'Animal Behavior', icon: '🐾', courses: 30 },
  ];

  const impactStats = [
    { number: '18,000+', label: 'Professionals Trained' },
    { number: '500K+', label: 'Animals Helped' },
    { number: '400+', label: 'Care Courses' },
    { number: '4.9/5', label: 'Student Rating' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-teal-50 via-amber-50/30 to-white">
      {/* Header - Pet-Friendly Paw Print Style */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 shadow-xl border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 py-1">
          {/* Care motto banner */}
          <div className="flex items-center justify-center py-2 border-b border-teal-400/30">
            <div className="flex items-center gap-3">
              <span className="text-xl">🐾</span>
              <span className="text-sm text-teal-50 font-medium">Caring for Those Who Can't Speak Since 2025</span>
              <span className="text-xl">❤️</span>
            </div>
          </div>

          {/* Main header */}
          <div className="py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐾</span>
              </div>
              <div>
                <div className="font-semibold text-xl text-white">Course Tutor</div>
                <div className="text-xs text-teal-100">Animal Care & Veterinary Education</div>
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
                  <Button variant="outline" size="sm" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 rounded-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-amber-300 text-sm font-medium">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white shadow-md rounded-full font-semibold">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Paw print accent border */}
        <div className="h-1 bg-gradient-to-r from-teal-700 via-amber-500 to-teal-700" />
      </header>

      {/* SECTION 1: Hero - Pet Portrait Style with Care Tips */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-amber-50/50 to-white" />

        {/* Subtle paw print pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23115e59' fill-opacity='1'%3E%3Ccircle cx='30' cy='20' r='3'/%3E%3Ccircle cx='20' cy='25' r='2.5'/%3E%3Ccircle cx='25' cy='30' r='2.5'/%3E%3Ccircle cx='35' cy='30' r='2.5'/%3E%3Ccircle cx='40' cy='25' r='2.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Animated paw print trail */}
        <motion.div
          className="absolute top-20 right-[20%] text-5xl opacity-20"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🐾
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-4xl opacity-15"
          animate={{
            x: [0, 15, 0],
            y: [0, 8, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 8, delay: 0.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🐾
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Pet portrait with happy animals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1"
            >
              <div className="absolute -inset-6 bg-gradient-to-r from-teal-300/30 to-amber-300/30 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?w=700&h=600&fit=crop"
                  alt="Happy pets receiving veterinary care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent" />

                {/* Animal care icons overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-2 border-teal-200 shadow-xl">
                    <div className="flex items-center justify-around">
                      <div className="text-center">
                        <div className="text-3xl mb-1">🐕</div>
                        <div className="text-xs text-slate-600 font-semibold">Dogs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🐈</div>
                        <div className="text-xs text-slate-600 font-semibold">Cats</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🐴</div>
                        <div className="text-xs text-slate-600 font-semibold">Large</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🦜</div>
                        <div className="text-xs text-slate-600 font-semibold">Exotic</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative paw prints */}
              <motion.div
                className="absolute -top-4 -right-4 bg-teal-500 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🐾
              </motion.div>
            </motion.div>

            {/* Content with care tips preview */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-1 md:order-2"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-teal-100 text-teal-800 border-2 border-teal-300 rounded-full px-4 py-2">
                  🐾 Compassionate Care
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                Care for Those
                <span className="block text-teal-700">
                  Who Can't Speak
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-700 mb-8 leading-relaxed">
                Professional veterinary and animal care education for compassionate caregivers.
                Master advanced techniques, earn certifications, and make a real difference.
              </motion.p>

              {/* Care tips preview */}
              <motion.div variants={itemVariants} className="bg-amber-50 border-l-4 border-teal-600 rounded-xl p-5 mb-8">
                <div className="text-sm font-semibold text-teal-800 mb-3 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <span>What You'll Learn:</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Emergency & Critical Care Techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Animal Behavior & Gentle Handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>Surgical Assistance & Patient Care</span>
                  </li>
                </ul>
              </motion.div>

              {/* Appointment CTAs */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-full shadow-lg shadow-teal-500/30 font-semibold">
                      <span className="mr-2">🐾</span>
                      Start Caring Today
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full px-8 py-6 rounded-full border-2 border-teal-300 hover:bg-teal-50 shadow-md font-semibold">
                    Browse All Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Impact Statistics */}
      <section className="py-8 px-4 bg-gradient-to-r from-teal-600 to-teal-700 border-y-2 border-teal-800 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {impactStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-teal-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Specialty Category Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Animal Care Specialties</h2>
            <p className="text-slate-600">Comprehensive training for every type of animal care</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specialtyCategories.map((specialty, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-br from-teal-50 to-amber-50/50 rounded-xl p-6 border-2 border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{specialty.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{specialty.title}</h3>
                <div className="text-sm text-teal-700 font-medium">{specialty.courses} Courses</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Certification Tracks */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=400&fit=crop"
                alt="Veterinary care and training"
                className="rounded-xl shadow-2xl border-4 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-amber-500 text-white rounded-full px-4 mb-4">Professional Certifications</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Advance Your Veterinary Career
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Industry-recognized certifications for veterinary technicians, assistants, and
                animal care professionals. Build the skills and credentials that matter.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Veterinary Technician Certification (VTC)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Emergency & Critical Care Training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Animal Behavior & Handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 font-bold text-xl">✓</span>
                  <span className="text-slate-700">Surgical Assistance Specialist</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                  Explore Certifications →
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Journey to Excellence</h2>
            <p className="text-slate-600">Three steps to becoming a certified animal care professional</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Path', desc: 'Select your specialty area of animal care' },
              { step: '2', title: 'Learn & Practice', desc: 'Video lessons and hands-on case studies' },
              { step: '3', title: 'Get Certified', desc: 'Earn recognized industry certifications' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Vet Tech Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-50 to-amber-50/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-10 shadow-2xl border-2 border-teal-100"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
                className="text-5xl"
              >
                ❤️
              </motion.div>
              <div className="flex-1">
                <p className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "These courses gave me the confidence and skills to handle emergency situations
                  I never thought I could manage. I've helped save countless animals, and every day
                  I'm grateful for the training. The certification opened doors I didn't know existed."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                    EM
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Emily Martinez, CVT</div>
                    <div className="text-teal-600 text-sm">Certified Veterinary Technician</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-700 to-amber-700" />

        {/* Soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Making a Difference Today
            </h2>
            <p className="text-teal-100 mb-8 text-lg">
              Join thousands of animal care professionals changing lives
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-amber-50 px-10 py-5 font-semibold shadow-2xl rounded-xl">
                  Begin Your Journey
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Paw Print Accented */}
      <footer className="bg-gradient-to-b from-slate-50 to-white border-t-2 border-teal-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-semibold text-teal-700 text-lg mb-3 flex items-center gap-2">
                Course Tutor <span className="text-xl">🐾</span>
              </div>
              <p className="text-slate-600 text-sm">Compassionate Animal Care Education</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Specialties</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Small Animal</li>
                <li>Large Animal</li>
                <li>Exotic Animals</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Resources</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/courses" className="hover:text-teal-600">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-teal-600">About Us</Link></li>
                <li><Link to="/help" className="hover:text-teal-600">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-3">Impact</div>
              <p className="text-sm text-slate-600">500,000+ animals helped</p>
              <p className="text-sm text-slate-600">18,000+ professionals trained</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
            © 2025 Course Tutor <span className="text-teal-500">🐾</span> Caring for those who can't speak
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={60} />
    </div>
  );
}
