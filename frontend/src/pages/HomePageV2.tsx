/**
 * VARIANT 2: BUSY PROFESSIONALS
 * Reference: docs/website-brief.md - V2 Persona Section
 * Target: Working professionals (Age 30-50) keeping skills current
 * Motivation: Stay relevant, get promoted, switch roles
 * Pain point: Limited time, needs efficient learning
 *
 * Design Style:
 * - Aesthetic: Professional, understated, efficient
 * - Color palette: Slate primary, minimal accent colors, clean whites
 * - Shadows: Minimal (shadow-sm or borders only - NO colorful shadows)
 * - Effects: NO solar flares (minimal aesthetic), subtle paper grain texture only
 * - Border radius: Conservative (6-8px)
 *
 * Tone of Voice:
 * - Direct, no-nonsense
 * - Results-oriented
 * - Respects intelligence
 * - "Efficient learning for busy professionals"
 *
 * Sales Approach:
 * - Emphasize time efficiency
 * - Career advancement focus
 * - ROI-oriented (skills that matter)
 * - No gimmicks
 *
 * Layout Flow:
 * Hero mosaic → Stats bar → Centered intro → Asymmetric features →
 * Numbered steps → Single testimonial → Image split → CTA
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

export function HomePageV2() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  const stats = [
    { number: '15min', label: 'Avg. Lesson' },
    { number: '200+', label: 'Courses' },
    { number: '4.8★', label: 'Rating' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header - V2: Logo CENTER (stacked), nav below centered */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <Link to="/" className="font-bold text-xl text-slate-800">Course Tutor</Link>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Courses</Link>
                <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">About</Link>
                <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Help</Link>
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
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Text overlay on faded background image */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-white/85" />

        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-slate-100 text-slate-700 mb-6 border border-slate-200">For Working Professionals</Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Advance Your Career
              <span className="block text-slate-600">On Your Schedule</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Professional courses in business, technology, and data. Short video lessons designed for busy schedules. Learn the skills that matter.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 shadow-sm">
                    Start Free Trial
                  </Button>
                </motion.div>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="px-8 py-5 border-slate-300 hover:bg-slate-50">
                  View Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f1f5f9" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* SECTION 2: Stats bar */}
      <section className="py-8 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex justify-center gap-12 md:gap-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900 relative inline-block">
                  {stat.number}
                  <span className="absolute -top-1 -right-3 w-2 h-2 bg-blue-500 rounded-full opacity-60" />
                </div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What is Course Tutor - Centered */}
      <section className="relative py-20 px-4 bg-white">
        {/* Subtle paper grain texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
        />

        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut" as const }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What is Course Tutor?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            An online learning platform with courses in business, data, technology, and leadership.
            Video lessons you can watch on any device, practical exercises, and quizzes.
            Designed for professionals who want to learn efficiently.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4: Features - 1 large + 2 small (Asymmetric) */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Designed for Busy Schedules</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Large feature card */}
            <motion.div
              className="md:row-span-2 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-8 border border-blue-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut" as const }}
            >
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Bite-Sized Lessons</h3>
              <p className="text-slate-700 leading-relaxed">
                Each lesson is 15-20 minutes. Learn during your commute, lunch break, or before bed.
                No long lectures—just focused, practical content.
              </p>
              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="text-2xl font-bold text-slate-900">15-20</div>
                <div className="text-slate-600 text-sm">minutes per lesson</div>
              </div>
            </motion.div>

            {/* Two smaller cards */}
            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: "easeOut" as const }}
            >
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-slate-900 mb-2">Learn Anywhere</h3>
              <p className="text-slate-600 text-sm">Watch on laptop, tablet, or phone. Your progress syncs across devices.</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: "easeOut" as const }}
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-slate-900 mb-2">Practical Skills</h3>
              <p className="text-slate-600 text-sm">Apply what you learn directly to your work. Real-world examples and exercises.</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease: "easeOut" as const }}
            >
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-slate-900 mb-2">Certificates</h3>
              <p className="text-slate-600 text-sm">Earn credentials for your LinkedIn profile. Show employers your new skills.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works - Horizontal numbered steps */}
      <section className="relative py-20 px-4 bg-white">
        {/* Subtle paper grain texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '01', title: 'Choose', desc: 'Pick a course that fits your goals' },
              { num: '02', title: 'Watch', desc: 'Learn with short video lessons' },
              { num: '03', title: 'Apply', desc: 'Use skills at work, earn certificates' },
            ].map((step, i) => (
              <motion.div key={i} variants={itemVariants} className="flex-1 text-center md:text-left">
                <div className="text-5xl font-bold text-slate-200 mb-2">{step.num}</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Single large testimonial */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Subtle paper grain texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-50/50" />

        <motion.div
          className="max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut" as const }}
        >
          <div className="bg-white rounded-lg p-10 shadow-sm border border-slate-200">
            <p className="text-xl text-slate-700 mb-8 italic leading-relaxed">
              "Got promoted to BI Lead after completing the data analytics course.
              The lessons were concise and I could study during my commute.
              Finally understood SQL and visualization tools well enough to lead the team."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-sm">
                M
              </div>
              <div>
                <div className="font-semibold text-slate-900">Maria Santos</div>
                <div className="text-slate-600">Marketing Manager → BI Team Lead</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: Image split - different from earlier splits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-sm border border-slate-200">
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop"
                alt="Professional learning"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-sky-50 p-10 md:p-12 flex flex-col justify-center border-l border-blue-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut" as const }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Invest in Your Career
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Join professionals from top companies who use Course Tutor to stay ahead.
                New courses added monthly in data, business, and technology.
              </p>
              <Link to="/courses">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-fit shadow-sm">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA with background */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-white/90" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut" as const }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Start Learning Today
            </h2>
            <p className="text-slate-700 mb-8 text-lg">
              Create a free account and explore our course catalog.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-5 font-medium shadow-sm">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 py-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={2} />
    </div>
  );
}
