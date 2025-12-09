/**
 * VARIANT 50: ENVIRONMENTAL & SUSTAINABILITY
 *
 * Target: Eco-conscious professionals, sustainability officers
 * Tone: Purpose-driven, hopeful, action-oriented - "Learn to make a difference"
 * Design: Forest green, earth tones, natural cream
 * Border radius: Organic shapes (asymmetric curves)
 * Effects: Growing plant/leaf animation on scroll
 * Layout Flow: Nature-inspired hero → Impact statistics → Sustainability tracks →
 *              Partnership badges → Environmental testimonial → Green CTA → Eco footer
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

// Growing plant animation
const growVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut" as const
    }
  }
};

const leafFloatVariants = {
  float: {
    y: [0, -15, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export function HomePageV50() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const impactStats = [
    { value: '2.5M tons', label: 'CO₂ Reduction (metaphor)', icon: '🌍' },
    { value: '500K+', label: 'Trees Planted (metaphor)', icon: '🌳' },
    { value: '15,000+', label: 'Professionals Trained', icon: '👥' },
    { value: '85%', label: 'Implementation Rate', icon: '✓' },
  ];

  const courseTracks = [
    { title: 'Renewable Energy', courses: 28, icon: '☀️', color: 'green' },
    { title: 'Circular Economy', courses: 22, icon: '♻️', color: 'emerald' },
    { title: 'Climate Action', courses: 31, icon: '🌡️', color: 'teal' },
    { title: 'Green Building', courses: 19, icon: '🏗️', color: 'lime' },
    { title: 'Biodiversity', courses: 24, icon: '🦋', color: 'green' },
    { title: 'Waste Management', courses: 17, icon: '🗑️', color: 'emerald' },
  ];

  const partnerships = [
    { name: 'LEED Certified', icon: '✓' },
    { name: 'UN SDG Aligned', icon: '✓' },
    { name: 'B Corp Partner', icon: '✓' },
    { name: 'Carbon Neutral', icon: '✓' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-green-50/30">
      {/* Header - Nature-Inspired with Leaf/Growth Motif, Organic Shapes */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        {/* Organic leaf-inspired top border */}
        <div className="h-2 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with growth motif */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                  <span className="text-3xl relative z-10">🌱</span>
                  {/* Organic shape overlay */}
                  <div className="absolute inset-0 bg-white/20" style={{ clipPath: 'ellipse(40% 50% at 30% 30%)' }}></div>
                </div>
                {/* Growing indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <span className="font-bold text-xl text-green-700">Course Tutor</span>
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <span>🍃</span> Sustainability Education
                </div>
              </div>
            </Link>

            {/* Navigation with organic hover effects */}
            <nav className="hidden md:flex items-center gap-2">
              <Link to="/courses" className="group px-5 py-2 text-slate-700 hover:text-green-700 transition-colors font-medium relative">
                <span className="relative z-10">Courses</span>
                <div className="absolute inset-0 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform origin-center" style={{ borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}></div>
              </Link>
              <Link to="/about" className="group px-5 py-2 text-slate-700 hover:text-green-700 transition-colors font-medium relative">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform origin-center" style={{ borderRadius: '60% 40% 30% 70% / 60% 50% 50% 40%' }}></div>
              </Link>
              <Link to="/help" className="group px-5 py-2 text-slate-700 hover:text-green-700 transition-colors font-medium relative">
                <span className="relative z-10">Help</span>
                <div className="absolute inset-0 bg-green-50 rounded-full scale-0 group-hover:scale-100 transition-transform origin-center" style={{ borderRadius: '30% 70% 60% 40% / 40% 50% 50% 60%' }}></div>
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-green-500 text-green-600" style={{ borderRadius: '20px 8px 20px 8px' }}>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-700 hover:text-green-700 text-sm font-medium">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md" style={{ borderRadius: '8px 20px 8px 20px' }}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Full-Width Nature Imagery with Overlay Text, Sustainability Metrics */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=1080&fit=crop"
            alt="Lush green forest representing environmental growth"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-emerald-900/90"></div>
        </div>

        {/* Floating leaves decoration */}
        <motion.div
          className="absolute top-20 right-[15%] text-5xl opacity-30"
          variants={leafFloatVariants}
          animate="float"
        >
          🍃
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[10%] text-4xl opacity-30"
          variants={leafFloatVariants}
          animate="float"
          transition={{ delay: 0.7 }}
        >
          🌿
        </motion.div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.div
            className="text-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 text-lg px-6 py-3"
                style={{ borderRadius: '30px 10px 30px 10px' }}
              >
                🌍 Sustainability Education
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Learn to Make a
              <span className="block text-emerald-300 mt-2">
                Lasting Difference
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Gain the skills to drive environmental change. From renewable energy to
              circular economy principles—create a sustainable future while advancing your career.
            </motion.p>

            {/* Sustainability Metrics - Prominent Display */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
            >
              {[
                { icon: '🌍', value: '2.5M tons', label: 'CO₂ Reduction Impact' },
                { icon: '🌳', value: '500K+', label: 'Trees Planted' },
                { icon: '👥', value: '15,000+', label: 'Professionals Trained' },
                { icon: '✓', value: '85%', label: 'Implementation Rate' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20"
                  style={{ borderRadius: i % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px' }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-green-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-green-50 px-10 py-7 text-xl font-bold shadow-2xl"
                    style={{ borderRadius: '40px 12px 40px 12px' }}
                  >
                    🌱 Start Your Impact Journey
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-white text-white hover:bg-white/10 px-10 py-7 text-xl font-bold backdrop-blur-sm"
                  style={{ borderRadius: '12px 40px 12px 40px' }}
                >
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
              {['LEED Certified', 'UN SDG Aligned', 'B Corp Partner', 'Carbon Neutral'].map((cert, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <span className="text-emerald-300">✓</span>
                  <span className="text-white font-medium">{cert}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Growing plants at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-20 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="text-5xl origin-bottom"
              variants={growVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.1 }}
            >
              🌱
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Impact Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-700 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2">Our Collective Impact</h2>
            <p className="text-green-100">Together, we're creating meaningful change</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: i % 2 === 0 ? '40px 10px 40px 10px' : '10px 40px 10px 40px',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Sustainability Course Tracks */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Course Tracks</h2>
            <p className="text-slate-600">Comprehensive training for every sustainability discipline</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courseTracks.map((track, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-white p-6 border-2 border-green-200 hover:border-green-400 shadow-sm hover:shadow-lg hover:shadow-green-500/20 transition-all cursor-pointer"
                style={{
                  borderRadius: i % 2 === 0 ? '50px 15px 50px 15px' : '15px 50px 15px 50px'
                }}
              >
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{track.title}</h3>
                <p className="text-green-700 font-medium">{track.courses} courses</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Partnership Badges */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-emerald-50 border-y-2 border-green-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Certified & Recognized By</h3>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partnerships.map((partner, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {partner.icon}
                </div>
                <span className="text-slate-700 font-semibold">{partner.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Environmental Professional Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-white p-10 border-2 border-green-200 shadow-lg relative"
            style={{ borderRadius: '80px 20px 80px 20px' }}
          >
            {/* Leaf decoration */}
            <motion.div
              className="absolute top-4 right-4 text-4xl opacity-50"
              variants={leafFloatVariants}
              animate="float"
            >
              🌿
            </motion.div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md"
                >
                  LG
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "These courses gave me the tools and confidence to lead our company's
                  sustainability transformation. We've reduced our carbon footprint by 40%
                  and saved costs. The renewable energy track was a game-changer for our operations."
                </p>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Dr. Lisa Green</div>
                  <div className="text-green-700">Chief Sustainability Officer, EcoTech Corp</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Green CTA with Impact Messaging */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        {/* Growing plants animation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="text-6xl origin-bottom"
              variants={growVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              🌱
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              variants={leafFloatVariants}
              animate="float"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <span className="text-5xl">🌍</span>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Drive Change?
            </h2>
            <p className="text-green-100 mb-8 text-xl leading-relaxed">
              Join sustainability professionals creating a better tomorrow.
              Your learning creates real-world impact.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 px-12 py-6 text-xl font-bold shadow-xl"
                  style={{ borderRadius: '40px 10px 40px 10px' }}
                >
                  Start Making a Difference
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Eco-Themed */}
      <footer className="bg-slate-800 text-slate-300 py-12 border-t-4 border-green-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🌱</span>
                <span className="font-bold text-xl text-green-400">Course Tutor</span>
              </div>
              <p className="text-sm text-slate-400">
                Empowering sustainability professionals worldwide
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Learn</h3>
              <div className="space-y-2 text-sm">
                <Link to="/courses" className="block hover:text-green-400 transition-colors">All Courses</Link>
                <Link to="/certifications" className="block hover:text-green-400 transition-colors">Certifications</Link>
                <Link to="/partnerships" className="block hover:text-green-400 transition-colors">Partnerships</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Impact</h3>
              <div className="space-y-2 text-sm">
                <Link to="/our-impact" className="block hover:text-green-400 transition-colors">Our Impact</Link>
                <Link to="/case-studies" className="block hover:text-green-400 transition-colors">Case Studies</Link>
                <Link to="/research" className="block hover:text-green-400 transition-colors">Research</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block hover:text-green-400 transition-colors">About</Link>
                <Link to="/help" className="block hover:text-green-400 transition-colors">Help</Link>
                <Link to="/contact" className="block hover:text-green-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div>© 2024 Course Tutor. Carbon Neutral Company.</div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🌍</span>
              <span>Committed to a sustainable future</span>
            </div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={50} />
    </div>
  );
}
