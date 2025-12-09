/**
 * VARIANT 4: CREATIVE HOBBYISTS
 *
 * Reference: docs/website-brief.md - V4 Persona Section
 * Target: Creative hobbyists learning for fun and personal enrichment (Age 25-55)
 * Motivation: New hobby, creative outlet, personal projects
 *
 * Tone: Warm, encouraging, "learning should be fun"
 * No pressure, no deadlines, celebrates curiosity
 *
 * Design Style:
 * - Aesthetic: Playful, colorful, inviting
 * - Colors: Rose/pink/orange gradients, warm and fun
 * - Shadows: Colored & layered (shadow-xl shadow-rose-500/20)
 * - Border radius: Generous (12-20px)
 * - Typography: Friendly, rounded feel
 * - Effects: Solar flares (rose/pink), watercolor/artistic texture
 *
 * Sales Approach:
 * - Emphasize enjoyment, not outcomes
 * - Variety of topics (design, photography, video, etc.)
 * - No career pressure - "Learn at your own pace"
 * - Community and creativity angle
 *
 * Layout Flow:
 * Centered hero with floating elements → Icon strip → Large image overlay →
 * 3-col cards → Alternating testimonials → Colorful banner → 3-step how it works → CTA
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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
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

export function HomePageV4() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -25]);

  const creativeCourses = [
    { title: 'Photography Basics', duration: '4 weeks', icon: '📷' },
    { title: 'Web Design for Beginners', duration: '6 weeks', icon: '🎨' },
    { title: 'Video Editing', duration: '5 weeks', icon: '🎬' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/30">
      {/* Header - V4: Logo RIGHT, nav LEFT (reversed) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
              <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
              <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help</Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-xl shadow-rose-500/20">Start Free</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <Link to="/" className="font-bold text-xl text-rose-600">Course Tutor</Link>
        </div>
      </header>

      {/* SECTION 1: Centered hero with floating decorative elements */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        {/* Watercolor texture background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.10]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)' }}
        />

        {/* Solar flares - animated */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-pink-200/25 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1,
          }}
        />

        {/* Floating emojis */}
        <motion.div
          className="absolute top-32 right-24 text-4xl"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          🎨
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-3xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
        >
          💡
        </motion.div>
        <motion.div
          className="absolute top-48 left-32 text-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
        >
          ✨
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="bg-rose-100 text-rose-700 shadow-xl shadow-rose-500/20">Learn for Fun</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            >
              Discover Your
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Creative Side
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Explore courses in design, photography, video, and more. Learn at your own pace,
              no pressure. Just you and your creativity.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-5 rounded-full shadow-xl shadow-rose-500/20 hover:shadow-2xl hover:shadow-rose-500/30 transition-shadow">
                    Start Exploring
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="px-8 py-5 rounded-full border-rose-200 hover:bg-rose-50 shadow-lg shadow-rose-500/10">
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* SECTION 2: Icon benefits strip */}
      <section className="py-10 px-4 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-10 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '🎯', text: 'Self-paced learning' },
              { icon: '🎨', text: 'Creative projects' },
              { icon: '💬', text: 'Friendly community' },
              { icon: '🏆', text: 'Certificates' },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-center gap-2 text-slate-700">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Large image with overlaid text */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=800&fit=crop"
            alt="Creative learning"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 via-rose-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="max-w-2xl px-8 md:px-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                What is Course Tutor?
              </h2>
              <p className="text-rose-100 text-lg leading-relaxed mb-6">
                An online learning playground where you explore creativity at your own pace.
                Video lessons, hands-on projects, and a supportive community of fellow hobbyists.
              </p>
              <Link to="/courses">
                <Button className="bg-white text-rose-700 hover:bg-rose-50 rounded-full shadow-xl shadow-rose-500/20">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3-column course cards */}
      <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
        {/* Subtle watercolor texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Popular Creative Courses</h2>
            <p className="text-slate-600">Start your creative journey today</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {creativeCourses.map((course, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="bg-white rounded-2xl p-6 shadow-xl shadow-rose-500/20 border border-rose-100 hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 text-center"
                style={{ transform: i === 1 ? 'rotate(-1deg)' : i === 2 ? 'rotate(-2deg)' : 'rotate(0deg)' }}
              >
                <div className="text-5xl mb-4">{course.icon}</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{course.title}</h3>
                <span className="text-rose-600 text-sm">{course.duration}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/courses" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
              View all courses →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Alternating testimonials */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Solar flare accent */}
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Creative Success Stories</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { name: 'Lisa M.', quote: 'Started as a hobby, now I sell prints on Etsy! The photography course unlocked my creative eye.', role: 'Hobbyist → Freelance Photographer', align: 'left' },
              { name: 'Tom K.', quote: 'Built my first website for my band. Never thought I could code but the lessons made it easy.', role: 'Musician → Side Project Developer', align: 'right' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: t.align === 'left' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" as const }}
                className={`flex ${t.align === 'right' ? 'justify-end' : ''}`}
              >
                <div className={`max-w-lg bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100 shadow-xl shadow-rose-500/20 ${t.align === 'right' ? 'text-right' : ''}`}>
                  <p className="text-slate-600 italic mb-4 leading-relaxed">"{t.quote}"</p>
                  <div className={`flex items-center gap-3 ${t.align === 'right' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-rose-500/30">
                      {t.name.charAt(0)}
                    </div>
                    <div className={t.align === 'right' ? 'text-right' : ''}>
                      <div className="font-medium text-slate-900">{t.name}</div>
                      <div className="text-rose-600 text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Full-width colorful banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 relative overflow-hidden">
        {/* Watercolor texture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)' }}
        />

        <motion.div
          className="max-w-3xl mx-auto text-center text-white relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <div className="text-5xl mb-4">🎨 ✨ 📷</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Creative Journey Starts Here</h2>
          <p className="text-white/90">No experience needed. Just bring your curiosity.</p>
        </motion.div>
      </section>

      {/* SECTION 7: Simple 3-step how it works */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Solar flare */}
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '1', title: 'Pick a Course', emoji: '🔍' },
              { step: '2', title: 'Learn & Create', emoji: '🎨' },
              { step: '3', title: 'Share Your Work', emoji: '🌟' },
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-4xl mb-3">{s.emoji}</div>
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold mx-auto mb-2 shadow-lg shadow-rose-500/20">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-600 to-pink-600 relative overflow-hidden">
        {/* Watercolor texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.10] mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)' }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Creative?
            </h2>
            <p className="text-rose-100 mb-8">
              Join thousands of hobbyists learning new skills every day.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 px-10 py-5 font-medium rounded-full shadow-xl shadow-rose-900/30 hover:shadow-2xl hover:shadow-rose-900/40 transition-shadow">
                  Start Free Today
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold text-rose-600">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={4} />
    </div>
  );
}
