/**
 * HomePageV9 - Seniors/Retirees Persona Landing Page
 *
 * Reference: docs/website-brief.md
 * Target Audience: Seniors and retirees learning new skills (Age 55+)
 * Tone: Warm, patient, encouraging - "It's never too late to learn"
 *
 * Design Elements:
 * - Color Scheme: Warm brown/taupe (amber-800, amber-900) with soft accents
 * - Shadows: Very soft (shadow-sm only) for gentle, accessible design
 * - Effects: NO solar flares - clean and simple visual approach
 * - Texture: Very subtle linen texture (opacity-02) for warmth
 * - Typography: Larger fonts throughout for readability and accessibility
 *
 * Sales Focus:
 * - Supportive learning community
 * - Learn at your own comfortable pace
 * - Practical skills for hobbies and personal growth
 * - Never too late to start something new
 *
 * Layout Flow (UNIQUE):
 * 1. Large readable centered hero section
 * 2. Simple 3 benefits with large icons
 * 3. Full-width introductory paragraph
 * 4. 2-column layout with large supportive image
 * 5. Step-by-step guide (vertical progression)
 * 6. 2 large testimonial cards from fellow learners
 * 7. Simple encouraging statistics
 * 8. Clean warm call-to-action
 */

import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV9() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroY = useTransform(springScrollProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(springScrollProgress, [0, 0.5], [1, 0]);

  const ease = 'easeOut' as const;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20">
      {/* Subtle linen texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&auto=format&fit=crop&q=80)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Header - V9: Extra large text, high contrast, logo CENTER, nav below */}
      <header className="relative z-20 border-b-2 border-amber-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Logo centered at top */}
          <div className="text-center mb-4">
            <Link to="/" className="inline-block">
              <h1 className="text-4xl font-bold text-amber-900">Course Tutor</h1>
              <p className="text-sm text-amber-700 mt-1">Learning at Your Pace</p>
            </Link>
          </div>
          {/* Navigation centered below */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            <Link to="/courses" className="text-xl text-amber-800 hover:text-amber-900 transition-colors font-semibold">
              Courses
            </Link>
            <Link to="/about" className="text-xl text-amber-800 hover:text-amber-900 transition-colors font-semibold">
              About
            </Link>
            <Link to="/help" className="text-xl text-amber-800 hover:text-amber-900 transition-colors font-semibold">
              Help
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-xl px-8 py-3">
                  My Learning
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-xl px-8 py-3">
                  Get Started
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Section 1: V9 Hero - Simple centered layout with large readable text, clear CTA */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 py-20 md:py-28"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-5xl mx-auto text-center"
          >
            <Badge className="mb-8 bg-amber-100 text-amber-900 text-lg px-8 py-3 border-2 border-amber-200">
              It's Never Too Late to Learn
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-amber-900 mb-10 leading-[1.1]">
              Start Your Learning Journey at Your Own Pace
            </h1>
            <p className="text-2xl md:text-3xl text-amber-800 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              Join a supportive community of lifelong learners. Discover new hobbies, develop practical skills,
              and stay mentally active with courses designed for your comfort and success.
            </p>
            <div className="flex flex-col gap-5 items-center">
              <Link to="/signup">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-white text-2xl px-14 py-8 shadow-sm">
                  Start Learning Today
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="border-3 border-amber-800 text-amber-900 hover:bg-amber-50 text-2xl px-14 py-8">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Section 2: Simple 3 Benefits with Large Icons */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Supportive Community</h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                Learn alongside others who share your interests and life experience. Help each other grow.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Learn at Your Pace</h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                No pressure, no deadlines. Take the time you need to truly understand and enjoy each lesson.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Practical Skills</h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                Develop useful abilities for hobbies, personal projects, or simply staying mentally sharp.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Full-Width Intro Paragraph */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-amber-50/50 to-amber-100/30">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-8">
              You Have a Lifetime of Experience—Now Add New Skills
            </h2>
            <p className="text-xl md:text-2xl text-amber-800 leading-relaxed">
              Whether you're exploring a passion you've always wanted to pursue, learning something practical for daily life,
              or simply keeping your mind active and engaged, Course Tutor provides a welcoming space where you can grow
              at your own comfortable pace. Our courses are designed with clarity, patience, and respect for your learning style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 4: 2-Column with Large Image */}
      <section className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <img
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop&q=80"
                alt="Senior learner using laptop with a smile"
                className="rounded-lg shadow-sm w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                A Learning Platform Built for You
              </h2>
              <p className="text-xl text-amber-800 mb-6 leading-relaxed">
                We understand that technology can sometimes feel overwhelming. That's why our platform is designed
                with simplicity and clarity in mind—large, readable text, clear navigation, and patient instruction.
              </p>
              <p className="text-xl text-amber-800 mb-8 leading-relaxed">
                Our instructors take the time to explain concepts thoroughly, and our community is always ready
                to offer encouragement and help. You're never alone in your learning journey.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-2 border-amber-800 text-amber-900 hover:bg-amber-50 text-lg">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Step-by-Step Guide (Vertical) */}
      <section className="relative z-10 py-24 bg-amber-50/30">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Getting Started Is Simple
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              Follow these easy steps to begin your learning journey. Take your time with each one.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-12"
          >
            {[
              {
                step: '1',
                title: 'Create Your Free Account',
                description: 'Sign up with just your name and email. No complicated forms or confusing steps.',
              },
              {
                step: '2',
                title: 'Choose a Course That Interests You',
                description: 'Browse our collection of courses designed for beginners and lifelong learners. Pick what excites you.',
              },
              {
                step: '3',
                title: 'Start Learning at Your Own Pace',
                description: 'Watch lessons when it suits you. Pause, rewatch, and take notes as often as you need.',
              },
              {
                step: '4',
                title: 'Join the Community',
                description: 'Connect with fellow learners, ask questions, and share your progress. Everyone is here to support you.',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="flex gap-8 items-start bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">{item.title}</h3>
                  <p className="text-lg text-amber-800 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 6: 2 Large Testimonial Cards */}
      <section className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Stories from Fellow Learners
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              Hear from others who decided it was never too late to learn something new.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-amber-50/50 p-10 rounded-lg shadow-sm relative"
            >
              {/* Large Friendly Quote Marks - Wildcard Element */}
              <div className="absolute -top-4 -left-2 text-8xl text-amber-300/40 font-serif leading-none select-none">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=200&auto=format&fit=crop&q=80"
                    alt="Margaret H."
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-amber-900">Margaret H.</h4>
                    <p className="text-lg text-amber-700">Age 68, Learning Photography</p>
                  </div>
                </div>
                <p className="text-xl text-amber-800 leading-relaxed italic">
                  I always wanted to take better photos of my grandchildren. This course taught me everything
                  step-by-step, and the community has been so encouraging. Now I create photo albums the whole
                  family loves!
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-amber-50/50 p-10 rounded-lg shadow-sm relative"
            >
              {/* Large Friendly Quote Marks - Wildcard Element */}
              <div className="absolute -top-4 -left-2 text-8xl text-amber-300/40 font-serif leading-none select-none">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80"
                    alt="Robert T."
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-amber-900">Robert T.</h4>
                    <p className="text-lg text-amber-700">Age 72, Learning Gardening</p>
                  </div>
                </div>
                <p className="text-xl text-amber-800 leading-relaxed italic">
                  Retirement gave me time to finally pursue gardening seriously. The instructors are patient,
                  the lessons are clear, and I can go back and review anything I need. My vegetable garden has
                  never looked better!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Simple Stats */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-amber-100/40 to-amber-50/40">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-amber-900 mb-3">15,000+</div>
              <p className="text-xl text-amber-800">Learners Over 55</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-amber-900 mb-3">98%</div>
              <p className="text-xl text-amber-800">Satisfaction Rate</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-5xl md:text-6xl font-bold text-amber-900 mb-3">200+</div>
              <p className="text-xl text-amber-800">Beginner-Friendly Courses</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Clean Warm CTA */}
      <section className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-50 to-amber-100/50 p-16 rounded-lg shadow-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Begin Your Learning Journey Today
            </h2>
            <p className="text-xl md:text-2xl text-amber-800 mb-10 leading-relaxed">
              Join thousands of learners who discovered that age is just a number. Start exploring new skills,
              hobbies, and interests in a supportive, patient environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-white text-xl px-12 py-6 shadow-sm">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="border-2 border-amber-800 text-amber-900 hover:bg-amber-50 text-xl px-12 py-6">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-amber-50 text-amber-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Course Tutor</h3>
              <p className="text-base text-amber-800 leading-relaxed">
                Empowering lifelong learners to discover new skills at any age.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-base">
                <li><Link to="/courses" className="text-amber-800 hover:text-amber-950 transition-colors">Browse Courses</Link></li>
                <li><Link to="/how-it-works" className="text-amber-800 hover:text-amber-950 transition-colors">How It Works</Link></li>
                <li><Link to="/success-stories" className="text-amber-800 hover:text-amber-950 transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-base">
                <li><Link to="/forum" className="text-amber-800 hover:text-amber-950 transition-colors">Discussion Forum</Link></li>
                <li><Link to="/events" className="text-amber-800 hover:text-amber-950 transition-colors">Events</Link></li>
                <li><Link to="/support" className="text-amber-800 hover:text-amber-950 transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-base">
                <li><Link to="/about" className="text-amber-800 hover:text-amber-950 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-amber-800 hover:text-amber-950 transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-amber-800 hover:text-amber-950 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-200 pt-8 text-center text-base text-amber-800">
            <p>&copy; 2025 Course Tutor. Built with care for lifelong learners.</p>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={9} />
    </div>
  );
}
