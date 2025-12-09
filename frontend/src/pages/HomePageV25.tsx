/**
 * VARIANT 25: ELEGANT SERIF (Light Theme)
 * - Serif typography with parallax
 * - Classic elegance
 * - Curved transitions
 * - Framer Motion animations
 * - Enhanced sales copy
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

export function HomePageV25() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Elegant parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const dividerScale = useTransform(smoothProgress, [0.1, 0.3], [0.5, 1]);
  const imageY = useTransform(smoothProgress, [0.3, 0.6], [60, 0]);
  const quoteY = useTransform(smoothProgress, [0.5, 0.8], [40, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      {/* Header - Refined serif typography, elegant wordmark */}
      <motion.header
        className="py-10 px-4 border-b border-stone-200"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Elegant wordmark logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col leading-none">
              <span className="font-serif text-3xl italic text-stone-800 tracking-tight">Course</span>
              <span className="font-serif text-3xl italic text-stone-400 tracking-tight -mt-1">Tutor</span>
            </div>
          </motion.div>

          {/* Luxuriously spaced navigation */}
          <nav className="flex gap-16 text-sm text-stone-600 items-center">
            <Link to="/courses" className="hover:text-stone-900 transition-all tracking-wide hover:tracking-wider">Courses</Link>
            <Link to="/about" className="hover:text-stone-900 transition-all tracking-wide hover:tracking-wider">About</Link>
            <Link to="/help" className="hover:text-stone-900 transition-all tracking-wide hover:tracking-wider">Help</Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-stone-900 transition-all tracking-wide hover:tracking-wider font-medium">
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero - Editorial magazine style with large drop cap */}
      <section className="py-24 px-4">
        <motion.div
          style={{ y: heroY }}
          className="max-w-5xl mx-auto px-4 md:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs tracking-[0.4em] text-stone-400 uppercase mb-12 text-center"
          >
            The Art of Learning • 100,000+ Scholars
          </motion.p>

          {/* Editorial style layout with drop cap */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Large decorative drop cap */}
            <motion.div
              variants={itemVariants}
              className="col-span-12 md:col-span-3 flex justify-center md:justify-end"
            >
              <motion.div
                className="font-serif text-[120px] md:text-[180px] leading-none text-stone-300 italic"
                whileHover={{ scale: 1.05, color: "#78716c" }}
              >
                C
              </motion.div>
            </motion.div>

            {/* Main text content */}
            <div className="col-span-12 md:col-span-9">
              <motion.h1
                variants={itemVariants}
                className="font-serif text-4xl md:text-6xl text-stone-800 mb-8 leading-tight"
              >
                <motion.span
                  className="block italic"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ultivate your mind
                </motion.span>
                <motion.span
                  className="block text-stone-600 mt-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  through refined learning
                </motion.span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-stone-600 mb-6 leading-relaxed max-w-2xl">
                Discover a refined approach to education. Where knowledge meets elegance,
                and learning becomes an experience to cherish. Expert-led courses designed
                with the same care as fine literature.
              </motion.p>

              <motion.div variants={itemVariants} className="border-l-2 border-stone-300 pl-6 mb-8">
                <p className="font-serif italic text-lg text-stone-700 mb-2">
                  "87% of our graduates advance their careers within 6 months."
                </p>
                <p className="text-sm text-stone-500">
                  ★★★★★ 4.9/5 from 50,000+ reviews • <span className="text-emerald-600 font-medium">Complimentary to begin</span>
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6 font-serif">
                        Continue →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-12 py-6 font-serif">
                          Begin Free →
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 rounded-none px-12 py-6 font-serif">
                          Explore
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Animated Divider */}
      <motion.div
        className="flex items-center justify-center gap-4 py-8"
        style={{ scale: dividerScale }}
      >
        <motion.div
          className="w-32 h-px bg-stone-300"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
        />
        <motion.span
          className="text-stone-300 text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ❧
        </motion.span>
        <motion.div
          className="w-32 h-px bg-stone-300"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { title: 'Curated', desc: 'Each of our 500+ courses carefully selected for excellence by industry experts' },
              { title: 'Thoughtful', desc: 'Designed with the learner\'s journey in mind. 87% achieve their career goals' },
              { title: 'Enduring', desc: 'Knowledge that stands the test of time. Lifetime access to all materials' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <motion.h3
                  className="font-serif text-2xl italic text-stone-800 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image section with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#f5f5f4"
            d="M0,30L120,35C240,40,480,50,720,50C960,50,1200,40,1320,35L1440,30L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-stone-100">
        <motion.div
          style={{ y: imageY }}
          className="max-w-6xl mx-auto px-4 md:px-6"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop"
                alt="Library"
                className="w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.3em] text-stone-400 uppercase mb-4">Our Philosophy</p>
              <h2 className="font-serif text-3xl italic text-stone-800 mb-6 leading-snug">
                "The more that you read, the more things you will know."
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                We believe in the transformative power of knowledge. Our courses are designed
                not just to inform, but to inspire a lifelong love of learning.
              </p>
              <p className="text-sm text-stone-500 mb-8">
                <span className="text-emerald-600 font-medium">✓ Complimentary to begin</span> • No obligations
              </p>
              <cite className="text-stone-400 font-serif italic">— Dr. Seuss</cite>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <div className="relative bg-stone-100">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#fafaf9"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* Stats */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '100,000', label: 'Scholars' },
              { value: '500+', label: 'Volumes' },
              { value: '87%', label: 'Success' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="font-serif text-4xl italic text-stone-800"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" as const }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm tracking-widest text-stone-400 mt-2 uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial with curved transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#e7e5e4"
            d="M0,40L80,35C160,30,320,20,480,20C640,20,800,30,960,40C1120,50,1280,50,1360,50L1440,50L1440,60L0,60Z"
          />
        </svg>
      </div>
      <section className="py-24 px-4 bg-stone-200">
        <motion.div
          style={{ y: quoteY }}
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-4xl mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            📚
          </motion.div>
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-8 text-stone-800">
            "An elegant platform that treats learning as the art it truly is. I advanced from analyst to director in 8 months."
          </blockquote>
          <div>
            <div className="font-serif italic text-stone-900">Elizabeth Warren</div>
            <div className="text-sm text-stone-600">Director of Education, Stanford</div>
          </div>
        </motion.div>
      </section>
      <div className="relative bg-stone-200">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#fafaf9"
            d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,45C840,40,960,30,1080,25C1200,20,1320,20,1380,20L1440,20L1440,60L0,60Z"
          />
        </svg>
      </div>

      {/* CTA */}
      <section className="py-32 px-4">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] text-stone-400 uppercase mb-4">Join Us</p>
          <motion.h2
            className="font-serif text-3xl md:text-4xl italic text-stone-800 mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Begin Your Story
          </motion.h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            Every great journey begins with a single step. Join 100,000+ learners who've transformed their careers.
          </p>
          <p className="text-sm text-stone-500 mb-10">
            <span className="text-emerald-600 font-medium">✓ Complimentary to begin</span> • No credit card • Cancel anytime
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-stone-800 hover:bg-stone-700 text-white rounded-none px-16 py-6 font-serif">
                {isAuthenticated ? "View Library" : "Enroll Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center text-sm text-stone-500">
          <motion.span className="font-serif italic" whileHover={{ scale: 1.02 }}>
            Course Tutor
          </motion.span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-stone-700 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-stone-700 transition-colors">About</Link>
            <Link to="/help" className="hover:text-stone-700 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={25} />
    </div>
  );
}
