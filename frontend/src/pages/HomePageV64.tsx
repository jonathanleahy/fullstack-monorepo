/**
 * VARIANT 64: AVIATION & AEROSPACE
 *
 * Target Audience: Pilots, aviation mechanics, aerospace engineers
 * Design Style: Sky blue, cloud white, aerospace silver - Precision, technical, aspirational
 * Tone: Technical, safety-focused, "Reach new heights"
 * Aesthetic: Streamlined (6-8px borders), clean shadows, aerodynamic
 * Wildcard Element: Airplane/contrail animation
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

export function HomePageV64() {
  const { isAuthenticated } = useAuth();

  const careerTracks = [
    { title: 'Commercial Pilot', icon: '✈️', level: 'ATP/CPL' },
    { title: 'Aircraft Maintenance', icon: '🔧', level: 'A&P License' },
    { title: 'Air Traffic Control', icon: '📡', level: 'FAA Certified' },
  ];

  const certifications = [
    { name: 'Private Pilot', code: 'PPL' },
    { name: 'Instrument Rating', code: 'IR' },
    { name: 'Commercial Pilot', code: 'CPL' },
    { name: 'A&P Mechanic', code: 'A&P' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header - Cockpit instrument style with aviation badges */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b-2 border-sky-400 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Top instrument bar */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-sky-700/30">
            <div className="flex items-center gap-4 text-xs font-mono text-sky-300">
              <div className="flex items-center gap-1">
                <span className="text-green-400">●</span> TRAINING
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sky-400">ALT</span> <span className="text-white">↑</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sky-400">HDG</span> <span className="text-white">090°</span>
              </div>
            </div>
            <div className="text-xs font-mono text-sky-300">
              FAA-CERT
            </div>
          </div>

          {/* Main nav */}
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl text-white flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              <span className="text-sky-400">COURSE TUTOR</span>
              <span className="text-xs font-mono bg-sky-600 px-2 py-1 rounded">AVN</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
              <Link to="/courses" className="text-sky-300 hover:text-sky-400 transition-colors font-medium">COURSES</Link>
              <Link to="/about" className="text-sky-300 hover:text-sky-400 transition-colors font-medium">ABOUT</Link>
              <Link to="/help" className="text-sky-300 hover:text-sky-400 transition-colors font-medium">HELP</Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 font-mono">DASH</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sky-400 hover:text-sky-300 text-sm font-medium font-mono">SIGN IN</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-sky-600 hover:bg-sky-700 shadow-md font-mono">SIGN UP</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Flight deck hero with instrument panel layout */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-sky-900">
        {/* Instrument grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(56, 189, 248, 0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Wildcard: Airplane with contrail animation */}
        <motion.div
          className="absolute top-20 left-[10%] flex items-center"
          animate={{
            x: [0, 1200],
            y: [0, -100]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" as const }}
        >
          <span className="text-3xl">✈️</span>
          <motion.div
            className="h-0.5 w-32 bg-gradient-to-r from-sky-400/60 to-transparent ml-2"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-sky-600 text-white border-2 border-sky-400 shadow-lg font-mono">
                  FAA APPROVED
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Reach New
                <span className="block text-sky-400 font-mono border-l-4 border-sky-600 pl-4 mt-2">
                  Heights
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-sky-100 mb-6 leading-relaxed">
                Professional aviation training for pilots, mechanics, and aerospace professionals.
                FAA-certified courses to advance your career in the skies.
              </motion.p>

              {/* Destination-style goals panel */}
              <motion.div variants={itemVariants} className="mb-6 bg-slate-800/80 border-2 border-sky-600 rounded-lg p-4 font-mono">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-sky-400 text-xs mb-1">ORIGIN</div>
                    <div className="text-white font-bold">Student</div>
                  </div>
                  <div>
                    <div className="text-sky-400 text-xs mb-1">ROUTE</div>
                    <div className="text-white font-bold">→ → →</div>
                  </div>
                  <div>
                    <div className="text-sky-400 text-xs mb-1">DEST</div>
                    <div className="text-white font-bold">Certified</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-5 shadow-lg border-2 border-sky-400 font-mono font-bold">
                    CLEAR FOR TAKEOFF
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8 py-5 border-2 border-sky-400 text-sky-300 hover:bg-sky-900 font-mono">
                    VIEW COURSES
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Instrument panel style image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="border-4 border-sky-600 rounded-lg overflow-hidden shadow-2xl bg-slate-800 p-3">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=450&fit=crop"
                  alt="Airplane cockpit view"
                  className="w-full h-full object-cover rounded"
                />
                {/* Instrument indicators overlay */}
                <div className="absolute top-6 left-6 right-6 flex justify-between">
                  <div className="bg-slate-900/90 border-2 border-sky-400 rounded px-3 py-2 font-mono text-sm">
                    <div className="text-sky-400 text-xs">ALT</div>
                    <div className="text-white font-bold">10,000</div>
                  </div>
                  <div className="bg-slate-900/90 border-2 border-green-400 rounded px-3 py-2 font-mono text-sm">
                    <div className="text-green-400 text-xs">SPD</div>
                    <div className="text-white font-bold">250 KTS</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Aviation career tracks */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Career Tracks</h2>
            <p className="text-slate-600">Choose your flight path</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {careerTracks.map((track, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-sky-50 to-white rounded-lg p-6 border border-sky-200 shadow-md"
              >
                <div className="text-5xl mb-4">{track.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{track.title}</h3>
                <p className="text-sky-600 font-medium">{track.level}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: FAA certification courses */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">FAA Certifications</h2>
            <p className="text-slate-600">Industry-recognized credentials</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-lg p-6 border-2 border-sky-200 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-sky-600 mb-2">{cert.code}</div>
                <h3 className="font-medium text-slate-900 text-sm">{cert.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '10,000+', label: 'Flight Hours Logged', icon: '⏱️' },
              { num: '2,500+', label: 'Certified Pilots', icon: '👨‍✈️' },
              { num: '98%', label: 'Pass Rate', icon: '✓' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.num}</div>
                <div className="text-sky-100">{stat.label}</div>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Flight Training Process</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Ground School', desc: 'Theory and regulations', icon: '📚' },
              { step: '2', title: 'Simulator Training', desc: 'Practice procedures', icon: '🎮' },
              { step: '3', title: 'Flight Hours', desc: 'Build experience', icon: '✈️' },
              { step: '4', title: 'Certification', desc: 'Pass checkride', icon: '🏆' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-sky-600 text-white font-bold text-2xl flex items-center justify-center rounded-lg mx-auto mb-4 shadow-md">
                  {item.step}
                </div>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 md:p-12 shadow-lg border border-sky-100"
          >
            <p className="text-slate-700 text-xl mb-6 leading-relaxed italic">
              "From zero flight experience to commercial pilot license in 18 months.
              The structured curriculum and expert instructors made my aviation dream a reality."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-sky-600 text-white font-bold text-xl flex items-center justify-center rounded-lg shadow-md">
                DT
              </div>
              <div>
                <div className="font-bold text-slate-900">David Thompson</div>
                <div className="text-slate-600">Commercial Pilot, Regional Airways</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-sky-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Ready for Takeoff?
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Start your aviation career today with FAA-certified training.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700 px-10 py-5 rounded-lg shadow-xl font-bold">
                Enroll Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Aviation themed */}
      <footer className="bg-sky-50 text-slate-700 py-8 border-t border-sky-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-bold text-sky-600 flex items-center gap-2">
            <span className="text-xl">✈️</span>
            Course Tutor Aviation
          </span>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-sky-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-sky-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-sky-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={64} />
    </div>
  );
}
