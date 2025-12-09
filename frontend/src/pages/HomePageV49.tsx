/**
 * VARIANT 49: MUSICIANS & AUDIO PROFESSIONALS
 *
 * Target: Musicians, producers, audio engineers
 * Tone: Passionate, creative, industry-insider - "Master your craft"
 * Design: Warm orange/coral, charcoal text, cream backgrounds
 * Border radius: Mixed (some sharp, some rounded)
 * Effects: Animated audio waveform visualization
 * Layout Flow: Dynamic hero with waveform → Genre grid → Instructor spotlight →
 *              Equipment/software tracks → Artist testimonial → Studio CTA → Creative footer
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

// Waveform animation
const waveVariants = {
  animate: (i: number) => ({
    scaleY: [0.3, 1, 0.3],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.1
    }
  })
};

export function HomePageV49() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const genres = [
    { title: 'Electronic Production', icon: '🎹', courses: 38 },
    { title: 'Mixing & Mastering', icon: '🎚️', courses: 29 },
    { title: 'Guitar & Bass', icon: '🎸', courses: 42 },
    { title: 'Vocal Recording', icon: '🎤', courses: 26 },
    { title: 'Music Theory', icon: '🎼', courses: 34 },
    { title: 'Sound Design', icon: '🔊', courses: 31 },
  ];

  const software = [
    { name: 'Ableton Live', icon: '▶', level: 'All Levels' },
    { name: 'Pro Tools', icon: '▶', level: 'Professional' },
    { name: 'Logic Pro', icon: '▶', level: 'Beginner to Advanced' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50/40">
      {/* Header - Audio Waveform Decoration, Equalizer-Style Hover Effects */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b-4 border-orange-500 shadow-2xl shadow-orange-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with waveform accent */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-end gap-0.5 h-8">
                {[3, 5, 4, 6, 3, 5].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-orange-500 rounded-t"
                    style={{ height: `${h * 4}px` }}
                    animate={{
                      height: [`${h * 4}px`, `${h * 6}px`, `${h * 4}px`],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-orange-400 to-coral-400 bg-clip-text text-transparent">
                Course Tutor
              </span>
              <span className="text-orange-400 text-xs">MUSIC</span>
            </Link>

            {/* Navigation with equalizer-style hover */}
            <nav className="hidden md:flex items-center gap-2">
              <Link to="/courses" className="group px-5 py-2 text-orange-100 hover:text-white transition-colors font-medium relative">
                <span className="relative z-10">Courses</span>
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-orange-500 to-transparent group-hover:h-full transition-all duration-300 rounded-t"></div>
              </Link>
              <Link to="/about" className="group px-5 py-2 text-orange-100 hover:text-white transition-colors font-medium relative">
                <span className="relative z-10">About</span>
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-orange-500 to-transparent group-hover:h-full transition-all duration-300 rounded-t"></div>
              </Link>
              <Link to="/help" className="group px-5 py-2 text-orange-100 hover:text-white transition-colors font-medium relative">
                <span className="relative z-10">Help</span>
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-orange-500 to-transparent group-hover:h-full transition-all duration-300 rounded-t"></div>
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-orange-400 text-orange-400 hover:bg-orange-500/10">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-orange-300 hover:text-orange-100 text-sm font-medium">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white shadow-lg shadow-orange-500/30">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Waveform decoration at bottom of header */}
        <div className="h-1 flex gap-px bg-slate-900">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-orange-500/30"
              animate={{
                scaleY: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.02,
              }}
            />
          ))}
        </div>
      </header>

      {/* SECTION 1: Album Cover Layout with Large Square Visual, Track-List Style Features */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900/20 overflow-hidden">
        {/* Animated waveform background */}
        <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-10">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={waveVariants}
              animate="animate"
              className="w-1 bg-orange-500 rounded"
              style={{ height: '100%' }}
            />
          ))}
        </div>

        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Album Cover Style - Large Square Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Album cover with vinyl aesthetic */}
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-700 relative group">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop"
                  alt="Music producer working in studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Vinyl reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Play button overlay */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer">
                  <span className="text-white text-3xl ml-1">▶</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Track-List Style Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-orange-500 text-white text-sm px-4 py-2">
                  🎵 FOR MUSIC CREATORS
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Master Your
                <span className="block bg-gradient-to-r from-orange-400 to-coral-400 bg-clip-text text-transparent mt-2">
                  Musical Craft
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-orange-100 mb-8 leading-relaxed">
                Learn from industry professionals. Elevate your sound from bedroom to studio quality.
              </motion.p>

              {/* Track-list style features */}
              <motion.div variants={itemVariants} className="space-y-3 mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
                <div className="flex items-center gap-3 text-orange-100 hover:text-white transition-colors cursor-pointer group">
                  <span className="text-orange-500 font-mono text-sm">01.</span>
                  <div className="flex-1">
                    <div className="font-semibold">Electronic Production</div>
                    <div className="text-xs text-orange-300/60">38 courses • Industry-standard DAWs</div>
                  </div>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
                <div className="flex items-center gap-3 text-orange-100 hover:text-white transition-colors cursor-pointer group">
                  <span className="text-orange-500 font-mono text-sm">02.</span>
                  <div className="flex-1">
                    <div className="font-semibold">Mixing & Mastering</div>
                    <div className="text-xs text-orange-300/60">29 courses • Professional techniques</div>
                  </div>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
                <div className="flex items-center gap-3 text-orange-100 hover:text-white transition-colors cursor-pointer group">
                  <span className="text-orange-500 font-mono text-sm">03.</span>
                  <div className="flex-1">
                    <div className="font-semibold">Sound Design</div>
                    <div className="text-xs text-orange-300/60">31 courses • Creative synthesis</div>
                  </div>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="bg-gradient-to-r from-orange-500 to-coral-500 hover:from-orange-600 hover:to-coral-600 text-white px-8 py-6 text-lg shadow-xl shadow-orange-500/30">
                      🎧 Start Creating
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="border-2 border-orange-400 text-orange-300 hover:bg-orange-500/10 px-8 py-6 text-lg">
                    Explore All Tracks
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Genre/Skill Category Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Find Your Sound</h2>
            <p className="text-slate-600 text-lg">Courses across every genre and skill</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {genres.map((genre, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 shadow-md hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{genre.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-xl">{genre.title}</h3>
                <p className="text-orange-600 font-medium">{genre.courses} courses</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Featured Instructor Spotlight */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
        {/* Subtle waveform */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-5">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={waveVariants}
              animate="animate"
              className="w-2 bg-orange-500 rounded"
              style={{ height: `${Math.random() * 200 + 50}px` }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Learn from the Pros</h2>
            <p className="text-slate-600 text-lg">Industry veterans share their secrets</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border-2 border-orange-200 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-coral-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                MJ
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Marcus Johnson</h3>
                <p className="text-orange-600 mb-4 font-medium">Grammy-Winning Producer | 20+ Platinum Records</p>
                <p className="text-slate-700 leading-relaxed">
                  "I've worked with everyone from indie artists to major label acts. In my courses,
                  I share the exact techniques I use in professional sessions—no fluff, just
                  real-world skills that get results."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Equipment/Software Course Tracks */}
      <section className="py-20 px-4 bg-amber-50/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Master Your DAW</h2>
            <p className="text-slate-600 text-lg">In-depth courses for every major platform</p>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {software.map((soft, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="bg-white rounded-lg p-6 border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded flex items-center justify-center font-bold text-xl">
                    {soft.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-1">{soft.name}</h3>
                    <p className="text-slate-600">{soft.level}</p>
                  </div>
                </div>
                <div className="text-orange-600 font-medium">View Course →</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Artist Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-coral-50/50 rounded-2xl p-10 border-2 border-orange-200 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-coral-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  AK
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                  "The mixing and mastering course completely transformed my productions.
                  I went from bedroom beats to getting signed by a label. The instructor's
                  feedback on my tracks was invaluable. Best investment in my music career."
                </p>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Alex Kim</div>
                  <div className="text-orange-600">Electronic Producer, Defected Records Artist</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Studio-Style CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-coral-500 relative overflow-hidden">
        {/* Animated waveform */}
        <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={waveVariants}
              animate="animate"
              className="w-1 bg-white rounded"
              style={{ height: `${Math.random() * 150 + 50}px` }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">🎵</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Level Up Your Sound?
            </h2>
            <p className="text-orange-100 mb-8 text-xl">
              Join thousands of musicians and producers creating professional-quality music
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-6 text-xl font-bold shadow-xl">
                  Start Your Journey
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Creative with Sound Wave Divider */}
      <div className="relative h-20 bg-white overflow-hidden">
        <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path
            fill="#f97316"
            d="M0,50 Q360,10 720,50 T1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      <footer className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-bold text-2xl bg-gradient-to-r from-orange-500 to-coral-500 bg-clip-text text-transparent mb-4">
                Course Tutor
              </div>
              <p className="text-sm text-slate-600">
                Professional music education for the modern creator
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Learn</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <Link to="/courses" className="block hover:text-orange-600 transition-colors">All Courses</Link>
                <Link to="/instructors" className="block hover:text-orange-600 transition-colors">Instructors</Link>
                <Link to="/pricing" className="block hover:text-orange-600 transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Connect</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <Link to="/about" className="block hover:text-orange-600 transition-colors">About</Link>
                <Link to="/help" className="block hover:text-orange-600 transition-colors">Help</Link>
                <Link to="/community" className="block hover:text-orange-600 transition-colors">Community</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={49} />
    </div>
  );
}
