/**
 * VARIANT 57: SPORTS & ATHLETICS
 *
 * Target: Coaches, trainers, sports management professionals
 * Tone: Motivational, competitive - "Elevate your game"
 * Design: Dynamic blue, energy orange, stadium white
 * Effects: Athletic, bold shadows, sharp/angular borders (4px)
 * Sales: Performance-focused, coaching certifications
 * Layout Flow: Stadium hero → Sport categories → Coaching certs → Performance stats →
 *              Coach testimonial → "Join the Team" CTA → Scoreboard footer
 * Wildcard: Trophy/medal celebration animation
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

export function HomePageV57() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const sportCategories = [
    { title: 'Basketball', icon: '🏀', courses: 24 },
    { title: 'Football', icon: '🏈', courses: 32 },
    { title: 'Soccer', icon: '⚽', courses: 28 },
    { title: 'Baseball', icon: '⚾', courses: 20 },
    { title: 'Track & Field', icon: '🏃', courses: 18 },
    { title: 'Swimming', icon: '🏊', courses: 16 },
  ];

  const perfStats = [
    { number: '15,000+', label: 'Coaches Trained' },
    { number: '92%', label: 'Performance Improvement' },
    { number: '500+', label: 'Coaching Courses' },
    { number: '4.8', label: 'Average Rating' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Scoreboard Style */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          {/* Scoreboard Top Bar */}
          <div className="flex items-center justify-between py-2 border-b-2 border-orange-500">
            <div className="flex items-center gap-6">
              <div className="bg-orange-500 px-4 py-1 font-black text-white text-xs tracking-widest">LIVE</div>
              <div className="text-orange-400 font-bold text-xs tracking-wide">COACHING EDUCATION NETWORK</div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs text-blue-200 font-bold">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">●</span>
                <span>15,000+ COACHES</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">●</span>
                <span>500+ COURSES</span>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-4 border-orange-500 w-12 h-12 flex items-center justify-center font-black text-white text-xl shadow-xl">
                CT
              </div>
              <div>
                <div className="font-black text-2xl text-white tracking-tight">COURSE TUTOR</div>
                <div className="text-xs text-orange-400 font-bold tracking-widest">SPORTS ACADEMY</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-white hover:text-orange-400 font-black text-sm uppercase tracking-wide transition-colors">Courses</Link>
              <Link to="/about" className="text-white hover:text-orange-400 font-black text-sm uppercase tracking-wide transition-colors">About</Link>
              <Link to="/help" className="text-white hover:text-orange-400 font-black text-sm uppercase tracking-wide transition-colors">Help</Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-orange-400 font-bold text-sm uppercase">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg font-black border-2 border-orange-400">
                      SIGN UP
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600" />
      </header>

      {/* SECTION 1: Hero - Stadium Arena Layout with Stats Overlay */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
        {/* Stadium field background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900" />

        {/* Field lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-2 bg-white" />
          <div className="absolute top-1/4 left-0 w-full h-1 bg-white" />
          <div className="absolute top-1/2 left-0 w-full h-2 bg-orange-500" />
          <div className="absolute top-3/4 left-0 w-full h-1 bg-white" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-white" />
        </div>

        {/* Trophy celebration animation */}
        <motion.div
          className="absolute top-20 right-[5%] text-9xl opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🏆
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Large action shot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1"
            >
              <div className="absolute -inset-6 bg-orange-500/30 blur-3xl" />
              <div className="relative border-8 border-orange-500 shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop"
                  alt="Athletic stadium and sports"
                  className="w-full h-full object-cover"
                />

                {/* Stats overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900/95 to-orange-900/95 p-4 border-t-4 border-orange-500">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-black text-orange-400">92%</div>
                      <div className="text-xs text-white font-bold uppercase">Win Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-orange-400">500+</div>
                      <div className="text-xs text-white font-bold uppercase">Courses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-orange-400">4.8★</div>
                      <div className="text-xs text-white font-bold uppercase">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-1 md:order-2"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-orange-500 text-white border-4 border-orange-400 font-black text-sm px-4 py-2 uppercase">
                  For Champions
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-none uppercase"
                style={{ textShadow: '0 6px 12px rgba(0,0,0,0.5), 0 0 30px rgba(249,115,22,0.3)' }}
              >
                ELEVATE
                <span className="block text-orange-400">YOUR GAME</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8 leading-relaxed font-bold">
                Professional coaching education for athletes who coach. Master advanced techniques,
                earn certifications, and transform your team's performance.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white px-10 py-7 font-black text-xl shadow-2xl border-4 border-orange-400 uppercase tracking-wider">
                      JOIN THE TEAM →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full px-10 py-7 border-4 border-white text-white hover:bg-white hover:text-blue-600 font-black text-xl uppercase tracking-wider">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Performance Statistics Bar */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-500 to-orange-600 border-y-4 border-orange-700">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {perfStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-black text-white mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {stat.number}
                </div>
                <div className="text-orange-100 text-sm font-bold uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Sport Category Selector */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-slate-900 mb-3">Choose Your Sport</h2>
            <p className="text-slate-600 text-lg font-medium">Specialized coaching courses for every discipline</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sportCategories.map((sport, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 hover:border-blue-600 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{sport.icon}</div>
                <h3 className="font-black text-slate-900 text-xl mb-2">{sport.title}</h3>
                <div className="text-blue-600 font-bold">{sport.courses} Courses</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Coaching Certification Tracks */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-600 text-white border-2 border-blue-500 mb-4 font-bold">Certification Programs</Badge>
              <h2 className="text-4xl font-black text-slate-900 mb-4">
                Get Certified, Get Results
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                Industry-recognized coaching certifications that prove your expertise.
                From fundamentals to advanced strategy, we've got your path to excellence.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Level 1-3 Coaching Certifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Performance analytics training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold text-2xl">✓</span>
                  <span className="text-slate-700 font-medium">Sports psychology modules</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-blue-500">
                  View Certifications →
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop"
                alt="Coach training athletes"
                className="shadow-2xl border-4 border-blue-600"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-white border-y-4 border-slate-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-slate-900 mb-3">Your Playbook to Success</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Pick Your Sport', desc: 'Choose from 25+ sport disciplines' },
              { step: '2', title: 'Master the Skills', desc: 'Video lessons from championship coaches' },
              { step: '3', title: 'Earn Your Badge', desc: 'Get certified and level up your career' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-4 border-orange-500 flex items-center justify-center text-3xl font-black mb-4 mx-auto shadow-xl">
                  {item.step}
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Coach Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 shadow-2xl border-l-8 border-orange-500"
          >
            <div className="flex items-start gap-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
                className="text-6xl"
              >
                🏅
              </motion.div>
              <div className="flex-1">
                <p className="text-2xl text-slate-700 font-medium mb-6 leading-relaxed">
                  "These coaching courses completely transformed how I train my team.
                  We went from regional competitors to state champions in one season.
                  The performance analytics alone are game-changing."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-orange-500">
                    MC
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">Maria Chen</div>
                    <div className="text-blue-600 font-bold">Head Basketball Coach • State Champions 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
              READY TO WIN?
            </h2>
            <p className="text-blue-100 mb-8 text-xl font-bold">
              Join the team and start training like a champion
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-orange-500 hover:text-white px-12 py-6 font-black text-xl shadow-2xl border-4 border-orange-500">
                  START TRAINING NOW
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Scoreboard Style */}
      <footer className="bg-slate-100 text-slate-900 py-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-black text-2xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-3">
                COURSE TUTOR
              </div>
              <p className="text-slate-600 font-medium">Train. Compete. Win.</p>
            </div>
            <div>
              <div className="font-black text-slate-900 mb-3">SPORTS</div>
              <ul className="space-y-2 text-sm text-slate-600 font-medium">
                <li>Basketball</li>
                <li>Football</li>
                <li>Soccer</li>
              </ul>
            </div>
            <div>
              <div className="font-black text-slate-900 mb-3">PROGRAMS</div>
              <ul className="space-y-2 text-sm text-slate-600 font-medium">
                <li><Link to="/courses" className="hover:text-orange-500">All Courses</Link></li>
                <li><Link to="/about" className="hover:text-orange-500">About</Link></li>
                <li><Link to="/help" className="hover:text-orange-500">Help</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-black text-slate-900 mb-3">STATS</div>
              <p className="text-sm text-slate-600 font-medium">15,000+ coaches trained</p>
              <p className="text-sm text-slate-600 font-medium">92% performance boost</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-300 text-center text-sm text-slate-500 font-medium">
            © 2025 Course Tutor • PLAY HARD. COACH HARDER.
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={57} />
    </div>
  );
}
