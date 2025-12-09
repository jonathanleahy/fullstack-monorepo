/**
 * VARIANT 65: CYBERSECURITY
 *
 * Target Audience: Security analysts, IT professionals, ethical hackers
 * Design Style: Matrix green, deep navy, terminal black text on LIGHT background
 * Tone: Technical, authoritative, "Defend the digital frontier"
 * Aesthetic: Sharp/technical (4-6px borders), tech-forward shadows, modern
 * Wildcard Element: Terminal/code typing animation
 * IMPORTANT: LIGHT background only - no dark theme!
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState, useEffect } from 'react';

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

// Terminal typing animation component
function TerminalTyping() {
  const [text, setText] = useState('');
  const fullText = '> Initializing security training...';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-green-700 text-sm bg-slate-100 p-3 rounded border border-green-500/30 inline-block">
      {text}
      <span className="animate-pulse">▋</span>
    </div>
  );
}

export function HomePageV65() {
  const { isAuthenticated } = useAuth();

  const certifications = [
    { name: 'CompTIA Security+', icon: '🛡️', color: 'border-green-500' },
    { name: 'CISSP', icon: '🔐', color: 'border-blue-500' },
    { name: 'CEH', icon: '💻', color: 'border-green-600' },
  ];

  const skills = [
    { title: 'Penetration Testing', icon: '🎯' },
    { title: 'Network Security', icon: '🌐' },
    { title: 'Incident Response', icon: '🚨' },
    { title: 'Threat Intelligence', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Security operations style with shield icon and threat level */}
      <header className="sticky top-0 z-50 bg-slate-100 border-b-4 border-green-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Threat level indicator bar */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-green-200">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded border border-green-300">
                <span className="text-green-600 font-bold">THREAT LEVEL:</span>
                <span className="text-slate-900 font-bold">LOW</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-green-600">●</span> SYSTEMS SECURE
              </div>
            </div>
            <div className="text-xs font-mono text-slate-600">
              SESSION: ACTIVE
            </div>
          </div>

          {/* Main nav */}
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl text-slate-900 flex items-center gap-2">
              <span className="text-3xl">🛡️</span>
              <span className="font-mono">
                <span className="text-green-600">COURSE</span>
                <span className="text-slate-900">_TUTOR</span>
              </span>
              <span className="text-xs font-mono bg-green-600 text-white px-2 py-1">SEC</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
              <Link to="/courses" className="text-slate-600 hover:text-green-600 transition-colors font-medium flex items-center gap-1">
                <span className="text-green-600">&gt;</span> courses
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-green-600 transition-colors font-medium flex items-center gap-1">
                <span className="text-green-600">&gt;</span> about
              </Link>
              <Link to="/help" className="text-slate-600 hover:text-green-600 transition-colors font-medium flex items-center gap-1">
                <span className="text-green-600">&gt;</span> help
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-mono">
                    dashboard()
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-green-600 text-sm font-medium font-mono">
                    &gt; sign_in
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 font-mono shadow-md">
                      SIGN_UP()
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Command center hero with terminal layout */}
      <section className="relative py-16 lg:py-24 px-4 bg-slate-50 overflow-hidden">
        {/* Digital grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Wildcard: Terminal typing animation */}
        <div className="absolute top-8 right-8">
          <TerminalTyping />
        </div>

        {/* Floating code symbols */}
        <motion.div
          className="absolute top-20 left-[10%] text-green-600 font-mono text-2xl opacity-20"
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
        >
          {'{ }'}
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[15%] text-blue-600 font-mono text-xl opacity-20"
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
        >
          {'</>'}
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-green-100 text-green-700 border-2 border-green-300 font-mono shadow-sm">
                  SECURITY_TRAINING.init()
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                <span className="font-mono text-green-600">&gt;</span> Defend the
                <span className="block text-green-600 font-mono pl-6">
                  Digital Frontier
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-700 mb-6 leading-relaxed font-mono text-sm">
                Master cybersecurity from foundational principles to advanced threat hunting.
                Industry-certified training for security analysts, penetration testers, and IT professionals.
              </motion.p>

              {/* Security dashboard preview */}
              <motion.div variants={itemVariants} className="mb-6 bg-slate-100 border-2 border-green-300 p-4 font-mono text-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-green-200">
                  <span className="text-green-600 font-bold">SECURITY DASHBOARD</span>
                  <span className="text-slate-600">REAL-TIME</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Threats Detected:</span>
                    <span className="text-green-600 font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Systems Protected:</span>
                    <span className="text-green-600 font-bold">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Uptime:</span>
                    <span className="text-green-600 font-bold">99.99%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 shadow-lg font-mono border-2 border-green-500">
                    INITIALIZE_TRAINING()
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8 py-5 border-2 border-slate-300 font-mono hover:bg-slate-100">
                    VIEW_COURSES()
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Terminal/command center style image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-slate-100 border-4 border-green-600 p-2 shadow-2xl">
                {/* Terminal header bar */}
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-green-400 font-mono text-xs">security_operations.log</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=450&fit=crop"
                  alt="Cybersecurity operations center"
                  className="w-full h-full object-cover"
                />
                {/* Status overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border-2 border-green-500 p-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">&gt; STATUS:</span>
                    <span className="text-white">ALL SYSTEMS OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Certification track selector */}
      <section className="py-16 px-4 bg-white border-y border-green-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3 font-mono">
              &gt; Certification Tracks
            </h2>
            <p className="text-slate-600">Industry-recognized security credentials</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`bg-slate-50 rounded border-2 ${cert.color} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 font-mono">{cert.name}</h3>
                <p className="text-slate-600 text-sm">Prepare for certification exam</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Threat landscape statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-6 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '4.5M', label: 'Cyber Attacks Daily', color: 'text-red-400' },
              { num: '$4.45M', label: 'Avg Breach Cost', color: 'text-orange-400' },
              { num: '3.5M', label: 'Security Jobs Unfilled', color: 'text-yellow-400' },
              { num: '300%', label: 'Growth in Threats', color: 'text-green-400' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className={`text-4xl md:text-5xl font-bold mb-2 font-mono ${stat.color}`}>
                  {stat.num}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Hands-on lab highlights */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3 font-mono">
              &gt; Hands-On Labs
            </h2>
            <p className="text-slate-600">Practice in real-world scenarios</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded border-l-4 border-green-600 p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{skill.icon}</div>
                  <h3 className="font-bold text-slate-900 font-mono">{skill.title}</h3>
                </div>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3 font-mono">
              &gt; Learning Path
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Fundamentals', desc: 'Security principles and concepts', color: 'bg-green-600' },
              { step: '02', title: 'Tools & Techniques', desc: 'Master industry-standard tools', color: 'bg-blue-600' },
              { step: '03', title: 'Hands-On Practice', desc: 'Real-world attack scenarios', color: 'bg-green-700' },
              { step: '04', title: 'Certification Prep', desc: 'Pass industry exams', color: 'bg-green-100' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 bg-slate-50 p-6 rounded border border-slate-200"
              >
                <div className={`w-14 h-14 ${item.color} ${item.step === '04' ? 'text-slate-900' : 'text-white'} font-bold text-xl flex items-center justify-center flex-shrink-0 font-mono`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 font-mono">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded border-2 border-green-500 p-8 md:p-12 shadow-lg"
          >
            <p className="text-slate-700 text-xl mb-6 leading-relaxed font-mono text-sm md:text-base">
              "The hands-on labs were game-changing. I went from help desk to SOC analyst
              in 6 months. The CEH prep course helped me pass on the first try."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-600 text-white font-bold text-xl flex items-center justify-center font-mono">
                JL
              </div>
              <div>
                <div className="font-bold text-slate-900">Jessica Lee</div>
                <div className="text-slate-600 text-sm">Security Analyst, CyberDefense Corp</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
              &gt; Secure Your Career
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Join the next generation of cybersecurity professionals.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-10 py-5 shadow-xl font-bold font-mono">
                START_NOW()
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Encrypted style */}
      <footer className="bg-white text-slate-700 py-8 border-t-2 border-green-500">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-bold text-green-600 font-mono flex items-center gap-2">
            <span>◉</span>
            Course Tutor [SEC]
          </span>
          <div className="flex gap-6 text-sm font-mono">
            <Link to="/courses" className="hover:text-green-600 transition-colors">courses/</Link>
            <Link to="/about" className="hover:text-green-600 transition-colors">about/</Link>
            <Link to="/help" className="hover:text-green-600 transition-colors">help/</Link>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={65} />
    </div>
  );
}
