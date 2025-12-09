/**
 * VARIANT 27: STRIPE/LINEAR STYLE
 * Inspired by Stripe's beautiful gradients
 * - Animated gradient backgrounds with Framer Motion
 * - Floating UI elements with parallax
 * - Glass morphism cards
 * - Smooth micro-interactions
 * - Full-width design
 * - Warm color palette: amber/orange, rose/coral, blue
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV27() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const orbScale = useTransform(smoothProgress, [0, 0.5], [1, 1.5]);
  const cardsY = useTransform(smoothProgress, [0, 0.3], [0, 50]);
  const featuresScale = useTransform(smoothProgress, [0.2, 0.4], [0.9, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .gradient-bg {
          background: linear-gradient(-45deg, #fef3c7, #fed7aa, #fecaca, #fed7aa, #fef3c7);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .border-gradient {
          position: relative;
        }
        .border-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: linear-gradient(90deg, #f59e0b, #fb923c, #f43f5e, #f59e0b);
          background-size: 200% 100%;
          animation: border-flow 3s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .text-gradient {
          background: linear-gradient(135deg, #f59e0b, #fb923c, #f43f5e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Header - Clean SaaS style: logo LEFT, nav CENTER, CTA RIGHT */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo LEFT */}
            <motion.div
              className="text-lg font-bold text-slate-900"
              whileHover={{ scale: 1.05 }}
            >
              Course Tutor
            </motion.div>

            {/* Nav CENTER */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-sm">
              <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors">Courses</Link>
              <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
              <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help</Link>
            </nav>

            {/* CTA RIGHT highlighted */}
            <div className="flex items-center gap-3">
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {isAuthenticated ? "Dashboard" : "Sign in"}
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-600/30">
                      Get Started →
                    </Button>
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero - Gradient mesh background, text LEFT with product preview RIGHT */}
      <section className="min-h-screen relative flex items-center">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50/30 to-rose-50" />

        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1" fill="currentColor" className="text-blue-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>

        {/* Floating orbs with parallax */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-[100px]"
          style={{ scale: orbScale }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-[120px]"
          style={{ scale: orbScale }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" as const }}
        />

        <motion.div
          className="w-full px-8 pt-32 pb-20 relative z-10"
          style={{ y: heroY }}
        >
          <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-slate-600">Now with AI-powered learning</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Learn <motion.span
                  className="relative inline-block px-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <span className="relative z-10">smarter</span>
                  <span
                    className="absolute inset-0 bg-orange-500/20 -z-0"
                    style={{
                      transform: 'rotate(-1deg) skewX(-3deg) scaleX(1.1)',
                      borderRadius: '3px 7px 4px 6px'
                    }}
                  />
                </motion.span>,
                <motion.span
                  className="block text-gradient"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  grow faster
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience the next generation of online learning with personalized paths,
                real-time feedback, and industry-recognized certifications.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 rounded-xl">
                        Open Dashboard
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold">
                          Start free trial
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="glass hover:bg-white text-slate-900 px-8 py-6 rounded-xl border border-slate-200">
                          View courses
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </motion.div>

              <motion.div
                className="flex items-center gap-8 mt-12 pt-8 border-t border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { value: '500+', label: 'Courses' },
                  { value: '50K+', label: 'Learners' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Floating cards with parallax */}
            <motion.div
              className="relative h-[500px] hidden lg:block"
              style={{ y: cardsY }}
            >
              <motion.div
                className="absolute top-0 right-0 w-72 glass rounded-2xl p-6 border-gradient"
                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
                  <div>
                    <div className="font-semibold">Web Development</div>
                    <div className="text-xs text-slate-600">12 modules</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
                <div className="text-xs text-slate-600 mt-2">75% complete</div>
              </motion.div>

              <motion.div
                className="absolute top-32 left-0 w-64 glass rounded-2xl p-6"
                animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-sm text-slate-700">"Best learning platform I've ever used!"</p>
                <div className="text-xs text-slate-600 mt-2">— Sarah K.</div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-20 w-56 glass rounded-2xl p-6"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="text-4xl font-bold text-gradient mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  98%
                </motion.div>
                <div className="text-sm text-slate-600">Completion rate</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy SVG Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#f8fafc" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Features */}
      <section className="py-32 px-8 bg-slate-50">
        <motion.div
          className="w-full"
          style={{ scale: featuresScale }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to succeed</h2>
            <p className="text-xl text-slate-600 w-full">
              Our platform combines cutting-edge technology with proven learning methods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Personalized Paths', desc: 'AI-driven recommendations based on your goals and learning style' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Detailed analytics and insights to keep you on track' },
              { icon: '🏆', title: 'Certifications', desc: 'Industry-recognized credentials that boost your career' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl p-8"
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="text-4xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonial */}
      <section className="py-32 px-8 gradient-bg relative">
        <div className="absolute inset-0 bg-white/30" />
        <motion.div
          className="w-full text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-8 h-8 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            ))}
          </div>
          <motion.blockquote
            className="text-3xl md:text-4xl font-light mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "This platform completely transformed how I approach learning. The interactive courses and real-time feedback are game-changers."
          </motion.blockquote>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-slate-300"
            />
            <div className="text-left">
              <div className="font-semibold">Alex Thompson</div>
              <div className="text-sm text-slate-600">Senior Developer at Google</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-slate-50">
        <div className="w-full">
          <motion.div
            className="glass rounded-3xl p-12 md:p-16 text-center border-gradient relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-600/20" />
            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Start learning today
              </motion.h2>
              <motion.p
                className="text-xl text-slate-600 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Join 50,000+ professionals advancing their careers.
              </motion.p>
              <Link to={isAuthenticated ? "/courses" : "/register"}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 px-12 py-6 rounded-xl text-lg font-semibold">
                    {isAuthenticated ? "Browse Courses" : "Get Started Free"}
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-200">
        <div className="w-full flex justify-between items-center text-sm text-slate-600">
          <span className="font-bold text-slate-900">Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={27} />
    </div>
  );
}
