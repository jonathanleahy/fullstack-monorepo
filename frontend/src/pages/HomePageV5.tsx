/**
 * VARIANT 5: MODERN / MINIMAL
 * Reference: docs/website-brief.md - V5 Persona Section
 * Target: Design-conscious users (Age 25-40)
 * Tone: Understated, confident, "less is more"
 * Design: Slate/white, almost NO shadows (shadow-sm max, rely on borders)
 * Effects: NO solar flares (minimal), minimal or very subtle texture (paper grain at opacity-[0.02])
 * Sales: Lead with quality/curation, visual elegance as selling point
 * Layout Flow: Minimal hero with image → Simple text intro → Asymmetric grid →
 *              Full-width dark quote → Reversed 2-col → Inline steps → Stats row → Minimal CTA
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
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV5() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - V5: Just logo LEFT and minimal dots RIGHT (ultra minimal) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg text-slate-900 tracking-tight">Course Tutor</Link>
          <div className="flex items-center gap-6">
            {/* Hidden nav, accessible via dots menu on mobile/always */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/courses" className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-900 transition-colors" title="Courses" />
              <Link to="/about" className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-900 transition-colors" title="About" />
              <Link to="/help" className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-900 transition-colors" title="Help" />
            </nav>
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-slate-500 hover:text-slate-900 text-sm">Dashboard</Link>
            ) : (
              <Link to="/login" className="text-slate-500 hover:text-slate-900 text-sm">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Single centered headline, minimal copy, lots of whitespace */}
      <section className="relative py-32 lg:py-40 px-6">
        {/* Very subtle paper texture - minimal */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.02]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
        />
        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-slate-100 text-slate-600 mb-12 border border-slate-200">Online Learning</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 mb-8 leading-tight tracking-tight"
            >
              Learn skills that
              <br />
              matter to you.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-500 mb-12 leading-relaxed max-w-xl mx-auto">
              Practical courses in web development, design, and data.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-5">
                  Start Learning
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* SECTION 2: Simple text intro */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">What is Course Tutor?</h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            An online learning platform with video lessons, hands-on projects, and quizzes.
            Web development, data science, design—learn skills that help you grow.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: Asymmetric feature grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight max-w-md">How it works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Large card - offset to create asymmetry */}
            <motion.div
              className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-10 md:ml-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Video Lessons</h3>
              <p className="text-slate-500 leading-relaxed">
                Clear, well-paced tutorials from expert instructors. Watch on any device,
                pause anytime, learn at your own speed.
              </p>
            </motion.div>

            {/* Stacked small cards - offset opposite direction */}
            <div className="space-y-8 md:-ml-8">
              <motion.div
                className="bg-slate-50 border border-slate-100 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" as const }}
              >
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="font-semibold text-slate-900 mb-2">Projects</h3>
                <p className="text-slate-500 text-sm">Build real applications</p>
              </motion.div>

              <motion.div
                className="bg-slate-50 border border-slate-100 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" as const }}
              >
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-slate-900 mb-2">Progress</h3>
                <p className="text-slate-500 text-sm">Track your learning</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Full-width quote */}
      <section className="py-28 px-6 bg-slate-100">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic text-slate-900">
            "Transitioned from finance to product design. The structured curriculum
            made it possible to learn while working full-time."
          </blockquote>
          <div className="text-slate-600">
            <span className="font-medium text-slate-900">Rachel Chen</span>
            <span className="mx-2">·</span>
            <span>Now a Product Designer</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: 2-column image + text (reversed) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
                Learn anywhere
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Access courses on desktop, tablet, or phone. Your progress syncs
                automatically so you can pick up where you left off.
              </p>
              <ul className="space-y-3 text-slate-600">
                {['Any device', 'Offline viewing', 'Synced progress'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop"
                alt="People learning"
                className="rounded-lg border border-slate-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Compact inline steps */}
      <section className="py-16 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '01', text: 'Sign up free' },
              { step: '02', text: 'Choose a course' },
              { step: '03', text: 'Start learning' },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                <span className="text-2xl font-light text-slate-300">{s.step}</span>
                <span className="text-slate-700">{s.text}</span>
                {i < 2 && <span className="hidden md:block text-slate-300 ml-8">→</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Stats row */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '200+', label: 'Courses' },
              { num: '50K', label: 'Learners' },
              { num: '4.8', label: 'Rating' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-4xl md:text-5xl font-light text-slate-900 mb-1">{stat.num}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: Minimal CTA */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight text-slate-900">
            Start learning today
          </h2>
          <p className="text-slate-600 mb-8">
            Create a free account and explore our courses.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-5">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-slate-400 text-sm">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/courses" className="hover:text-slate-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={5} />
    </div>
  );
}
