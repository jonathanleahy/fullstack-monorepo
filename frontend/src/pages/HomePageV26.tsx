/**
 * VARIANT 26: LOCOMOTIVE STUDIO STYLE
 * Inspired by Awwwards Agency of the Year
 * - Bold oversized typography with Framer Motion
 * - Smooth scroll animations & parallax
 * - Dramatic reveals
 * - Full-width sections
 * - Magnetic hover effects
 * - Warm color palette: amber/orange, rose/coral, blue
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV26() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const statsScale = useTransform(smoothProgress, [0.1, 0.3], [0.8, 1]);
  const rotateX = useTransform(smoothProgress, [0, 0.5], [15, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 overflow-hidden" style={{ fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        /* Font styling */
        .font-display { font-family: 'Syne', sans-serif; }
        .font-heading { font-family: 'Space Grotesk', sans-serif; }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes line-expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .text-shimmer {
          background: linear-gradient(90deg, #0f172a 0%, #94a3b8 50%, #0f172a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
        .cursor-blink::after {
          content: '|';
          animation: cursor-blink 1s step-end infinite;
        }
        .hover-glitch:hover {
          text-shadow: 2px 0 #f59e0b, -2px 0 #fb923c;
          transition: text-shadow 0.1s;
        }
        .gradient-border {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #f59e0b 0%, #fb923c 100%) border-box;
          border: 2px solid transparent;
        }
        .line-expand { animation: line-expand 1.5s ease-out forwards; transform-origin: left; }
        .float-particle { animation: float-particle 6s ease-in-out infinite; }
        .gradient-orb {
          animation: gradient-rotate 20s linear infinite;
        }
        /* 3D perspective */
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-500/20 rounded-full float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        ))}
      </div>

      {/* Header - Animated/playful with motion effects */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-8 py-6 flex justify-between items-center">
          <motion.span
            className="text-xl font-black tracking-tighter text-slate-900"
            animate={{
              rotateY: [0, 5, -5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            whileHover={{
              scale: 1.1,
              rotateZ: [-2, 2, -2],
              transition: { duration: 0.3 }
            }}
          >
            COURSE TUTOR
          </motion.span>
          <nav className="flex gap-8 text-sm">
            <motion.div whileHover={{ y: -2, scale: 1.05 }}>
              <Link to="/courses" className="hover-glitch hover:text-slate-600 transition-colors">COURSES</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.05 }}>
              <Link to="/about" className="hover-glitch hover:text-slate-600 transition-colors">ABOUT</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.05 }}>
              <Link to="/help" className="hover-glitch hover:text-slate-600 transition-colors">HELP</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.05 }}>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover-glitch hover:text-slate-600 transition-colors">
                {isAuthenticated ? "DASHBOARD" : "LOGIN"}
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Horizontal scroll teaser with parallax elements */}
      <motion.section
        className="min-h-screen flex items-center px-8 relative overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50" />

        {/* Horizontal scrolling elements teaser */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 flex gap-8"
            animate={{ x: ['-100%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {['LEARN', 'CREATE', 'MASTER', 'GROW', 'ACHIEVE'].map((word, i) => (
              <span key={i} className="text-9xl font-black text-slate-200/30 whitespace-nowrap">{word}</span>
            ))}
          </motion.div>
        </div>

        {/* Animated gradient orb */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-orb"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-amber-200/30 via-rose-200/20 to-transparent rounded-full blur-[100px]" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center w-full px-8 perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 text-xs tracking-[0.5em] text-slate-600 border border-slate-300 mb-8">
              EDUCATION REIMAGINED
            </span>
          </motion.div>

          <motion.h1
            className="text-[8vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter preserve-3d"
            initial={{ opacity: 0, rotateX: 45 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ rotateX }}
          >
            <motion.span
              className="block text-shimmer"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              MASTER
            </motion.span>
            <motion.span
              className="block text-slate-900/20 relative"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              YOUR
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              CRAFT
              {/* Wildcard: Rotated decorative frame */}
              <motion.div
                className="absolute -inset-8 border-2 border-amber-500/30 pointer-events-none"
                style={{ rotate: -2 }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
              />
            </motion.span>
          </motion.h1>

          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-12 line-expand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Award-winning courses designed by industry pioneers.
            <span className="cursor-blink"> Where ambition meets excellence</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gradient-border bg-white hover:bg-slate-50 text-slate-900 px-12 py-6 text-lg">
                    ENTER DASHBOARD
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-6 text-lg font-bold">
                      START NOW
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gradient-border bg-white hover:bg-slate-50 text-slate-900 px-12 py-6 text-lg">
                      EXPLORE
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute bottom-20 left-10 text-xs text-slate-400 tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO DISCOVER
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-xs text-slate-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          © 2024
        </motion.div>
      </motion.section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Stats - Full Width with Scale Animation */}
      <motion.section
        className="py-32 bg-gradient-to-b from-slate-50 to-white"
        style={{ scale: statsScale }}
      >
        <div className="w-full px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200">
            {[
              { value: '50K+', label: 'LEARNERS' },
              { value: '500+', label: 'COURSES' },
              { value: '98%', label: 'SUCCESS' },
              { value: '4.9', label: 'RATING' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white p-12 text-center group hover:bg-slate-50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 group-hover:text-amber-600 transition-colors"
                  whileHover={{ rotateY: 10 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs tracking-[0.3em] text-slate-500 mt-4">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="py-32 px-8 bg-slate-50">
        <div className="w-full">
          <motion.h2
            className="text-6xl md:text-8xl font-black tracking-tighter mb-24"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-slate-400">WHY</span> CHOOSE US
          </motion.h2>

          <div className="space-y-0">
            {[
              { num: '01', title: 'Expert Instructors', desc: 'Learn from industry leaders and pioneers' },
              { num: '02', title: 'Hands-On Projects', desc: 'Build real portfolio pieces as you learn' },
              { num: '03', title: 'Career Support', desc: 'Job placement assistance and mentorship' },
              { num: '04', title: 'Lifetime Access', desc: 'Learn at your pace, forever' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group border-t border-slate-200 hover:border-slate-400 py-12 transition-all duration-500 hover:bg-white px-8 -mx-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 20 }}
              >
                <div className="flex items-center gap-8">
                  <motion.span
                    className="text-7xl font-black text-slate-200 group-hover:text-amber-600 transition-colors"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                  >
                    {feature.num}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2 group-hover:translate-x-4 transition-transform text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 group-hover:text-slate-700 transition-colors">{feature.desc}</p>
                  </div>
                  <motion.svg
                    className="w-12 h-12 text-slate-400 group-hover:text-slate-900 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ x: 10 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section - Full Bleed with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Learning"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: 1.2 }}
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div
            className="w-full text-center px-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <blockquote className="text-4xl md:text-6xl font-light italic mb-8 text-slate-900">
              "Transform your potential into expertise"
            </blockquote>
            <motion.div
              className="w-20 h-px bg-slate-400 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-slate-600">Join 50,000+ professionals who chose excellence</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400 rounded-full blur-[200px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
        <motion.div
          className="w-full px-8 text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900">
            READY TO
            <motion.span
              className="block bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              BEGIN?
            </motion.span>
          </h2>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-16 py-8 text-xl font-bold">
                {isAuthenticated ? "VIEW COURSES" : "GET STARTED"}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-200">
        <div className="w-full flex justify-between items-center text-sm text-slate-600">
          <span className="font-black">COURSE TUTOR</span>
          <div className="flex gap-8">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={26} />
    </div>
  );
}
