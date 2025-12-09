/**
 * HomePageV7 - Entrepreneurs/Startup Founders Persona Landing Page
 *
 * Reference: docs/website-brief.md
 * Target Audience: Entrepreneurs and startup founders (Age 25-45)
 * Tone: Bold, ambitious, growth-focused - "Build your vision"
 *
 * Design System:
 * - Primary Colors: Deep teal (teal-600, teal-700) and cyan (cyan-500)
 * - Backgrounds: Light theme only - teal-50, emerald-50, white, slate-50
 * - Effects: Dynamic shadows (shadow-lg shadow-teal-500/15)
 * - Solar Flares: Energetic teal/cyan gradients (bg-teal-200/20, bg-cyan-200/15)
 * - Texture: Abstract gradient from Unsplash at opacity-[0.06]
 *
 * Sales Focus:
 * - Business skills and entrepreneurship
 * - Scaling and growth strategies
 * - Leadership development
 * - Practical ROI and business outcomes
 *
 * Layout Flow (Unique):
 * 1. Bold split hero (text left, stats right)
 * 2. Logo trust bar
 * 3. Full-width value proposition
 * 4. 2x2 benefit grid
 * 5. Horizontal testimonial carousel
 * 6. Image with overlay text
 * 7. Numbered roadmap
 * 8. Light gradient CTA
 */

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

const ease = "easeOut" as const;

export function HomePageV7() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - V7: Transparent header that becomes solid on scroll, logo LEFT */}
      <motion.header
        style={{
          backgroundColor: useTransform(smoothProgress, [0, 0.1], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']),
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-teal-100/50 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CF</span>
              </div>
              <span className="text-2xl font-bold text-teal-700">CourseFlow</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/courses" className="text-slate-700 hover:text-teal-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-slate-700 hover:text-teal-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-slate-700 hover:text-teal-600 transition-colors font-medium">
                Help
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/15">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-slate-700 hover:text-teal-600 transition-colors font-medium">
                    Sign In
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/15">
                      Start Free
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Section 1: V7 Hero - Bold asymmetric, headline spans full width, CTA buttons aligned left */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-white">
        {/* Solar Flares */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/15 rounded-full blur-3xl" />

        {/* Abstract Gradient Texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Asymmetric Layout: Full-width headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-12"
          >
            <Badge className="mb-6 bg-teal-100 text-teal-700 border-teal-200">
              For Entrepreneurs & Founders
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] max-w-6xl">
              Build Your Vision Into{' '}
              <span className="text-teal-600">A Thriving Business</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content and CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Master the skills that matter. Scale faster. Lead with confidence.
                Join 50,000+ founders who are transforming their startups into category leaders.
              </p>
              <div className="flex flex-col gap-4 items-start">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/15 px-10 py-6 text-lg"
                  >
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal-600 text-teal-600 hover:bg-teal-50 px-10 py-6 text-lg"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats Right - Wildcard: Animated Counter Feel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                  className="text-5xl font-bold text-teal-600 mb-2 tabular-nums"
                >
                  $2.3M
                </motion.div>
                <div className="text-slate-600">Average funding raised by our founders</div>
              </motion.div>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                  className="text-5xl font-bold text-teal-600 mb-2 tabular-nums"
                >
                  3.2x
                </motion.div>
                <div className="text-slate-600">Faster revenue growth rate</div>
              </motion.div>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
                  className="text-5xl font-bold text-teal-600 mb-2 tabular-nums"
                >
                  50K+
                </motion.div>
                <div className="text-slate-600">Entrepreneurs trained</div>
              </motion.div>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                  className="text-5xl font-bold text-teal-600 mb-2 tabular-nums"
                >
                  94%
                </motion.div>
                <div className="text-slate-600">Still in business after 2 years</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Section 2: Logo Trust Bar */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-wide">
            Trusted by founders from
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
            <img src="https://logo.clearbit.com/ycombinator.com" alt="Y Combinator" className="h-8 grayscale" />
            <img src="https://logo.clearbit.com/techstars.com" alt="Techstars" className="h-8 grayscale" />
            <img src="https://logo.clearbit.com/500.co" alt="500 Global" className="h-8 grayscale" />
            <img src="https://logo.clearbit.com/sequoiacap.com" alt="Sequoia" className="h-8 grayscale" />
            <img src="https://logo.clearbit.com/a16z.com" alt="a16z" className="h-8 grayscale" />
          </div>
        </div>
      </section>

      {/* Section 3: Full-Width Value Proposition */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-emerald-600 relative overflow-hidden">
        {/* Solar Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Stop Learning Theory. Start Building Skills That Scale Your Business.
            </h2>
            <p className="text-xl text-teal-50 mb-8 max-w-3xl mx-auto">
              Every course is designed by successful founders and operators.
              Get the exact playbooks they used to raise capital, build teams, and achieve product-market fit.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Fundraising Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Growth Strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Leadership Skills</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: 2x2 Benefit Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From zero to exit. We cover every stage of the entrepreneurial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Fast-Track Your Fundraising
              </h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Learn from VCs and founders who've raised $500M+. Master pitch decks,
                term sheets, and investor relations. Get funded faster.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Pitch deck templates that work</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Financial modeling essentials</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Build Scalable Growth Engines
              </h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Stop guessing. Learn the exact frameworks top startups use to achieve
                repeatable, predictable growth across every channel.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Product-led growth strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Customer acquisition playbooks</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Lead High-Performing Teams
              </h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Transform from solo founder to CEO. Master hiring, culture,
                delegation, and the leadership skills that scale.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Hiring and onboarding systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Building company culture</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Navigate Legal & Operations
              </h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Don't let compliance slow you down. Master the operational
                essentials so you can focus on building.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Cap tables and equity basics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Contract and IP protection</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Horizontal Testimonial Carousel Style */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Founders Who Built Real Businesses
            </h2>
            <p className="text-xl text-slate-600">
              See what happens when you combine ambition with the right education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="Sarah Chen"
                  className="w-16 h-16 rounded-full border-2 border-teal-200"
                />
                <div>
                  <div className="font-bold text-slate-900">Sarah Chen</div>
                  <div className="text-sm text-slate-600">CEO, TechFlow AI</div>
                  <div className="text-sm text-teal-600 font-medium">Raised $3.2M Series A</div>
                </div>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "The fundraising course gave me the exact framework I needed.
                Closed our Series A in 8 weeks. The pitch deck template alone was worth 10x the investment."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Marcus Johnson"
                  className="w-16 h-16 rounded-full border-2 border-teal-200"
                />
                <div>
                  <div className="font-bold text-slate-900">Marcus Johnson</div>
                  <div className="text-sm text-slate-600">Founder, GrowthLab</div>
                  <div className="text-sm text-teal-600 font-medium">$2M ARR in 18 months</div>
                </div>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "From $0 to $2M ARR. The growth marketing course taught me frameworks
                I still use every day. Best ROI of any business investment I've made."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-teal-500/15 border border-teal-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Elena Rodriguez"
                  className="w-16 h-16 rounded-full border-2 border-teal-200"
                />
                <div>
                  <div className="font-bold text-slate-900">Elena Rodriguez</div>
                  <div className="text-sm text-slate-600">Co-founder, DataPipe</div>
                  <div className="text-sm text-teal-600 font-medium">30-person team</div>
                </div>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "The leadership courses transformed how I hire and manage.
                Went from 3 to 30 people without losing our culture. Absolutely essential."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Image with Overlay Text */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&auto=format&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-teal-50/90 to-emerald-50/80" />

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="max-w-2xl"
            >
              <div className="inline-block px-4 py-2 bg-teal-100 border border-teal-300 rounded-full text-teal-700 text-sm font-medium mb-6">
                Real Results, Real Impact
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Your Competition Is Already Learning. Are You?
              </h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Every day you wait is a day your competitors get ahead. Join the
                community of ambitious founders who refuse to settle for average.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
                  <div className="text-slate-600">Expert-led courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
                  <div className="text-slate-600">Active founders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
                  <div className="text-slate-600">Community support</div>
                </div>
              </div>
              <Link to="/signup">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/15">
                  Join the Community
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Numbered Roadmap */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Path to Success
            </h2>
            <p className="text-xl text-slate-600">
              A proven roadmap from idea to scale. Here's how it works.
            </p>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Start with Foundations
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Begin with our Business Fundamentals track. Learn validation,
                  business models, and MVP development. Get your idea off the ground the right way.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Build Your Growth Engine
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Master customer acquisition, retention, and scaling strategies.
                  Learn the metrics that matter and how to optimize every funnel.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Secure Funding
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Get investor-ready with our fundraising masterclass. Build your deck,
                  perfect your pitch, and navigate term sheets with confidence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Scale Your Team
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Transform from founder to CEO. Learn hiring, delegation, culture-building,
                  and the leadership skills that enable 10x growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Sustain & Exit
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Navigate the end game. Whether you're planning an acquisition, IPO,
                  or building a lasting business, we've got you covered.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8: Light Gradient CTA */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
        {/* Solar Flares */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto">
              Join 50,000+ founders who are turning their vision into reality.
              Start learning today, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/15 w-full sm:w-auto"
                >
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 w-full sm:w-auto"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>14-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-teal-700 mb-4">CourseFlow</div>
              <p className="text-sm">
                Empowering entrepreneurs to build, scale, and succeed.
              </p>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-teal-600 transition-colors">Courses</Link></li>
                <li><Link to="/paths" className="hover:text-teal-600 transition-colors">Learning Paths</Link></li>
                <li><Link to="/business" className="hover:text-teal-600 transition-colors">For Business</Link></li>
                <li><Link to="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="hover:text-teal-600 transition-colors">Blog</Link></li>
                <li><Link to="/community" className="hover:text-teal-600 transition-colors">Community</Link></li>
                <li><Link to="/help" className="hover:text-teal-600 transition-colors">Help Center</Link></li>
                <li><Link to="/api" className="hover:text-teal-600 transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-teal-600 transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-teal-600 transition-colors">Careers</Link></li>
                <li><Link to="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-teal-600 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2025 CourseFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://twitter.com" className="hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://github.com" className="hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={7} />
    </div>
  );
}
