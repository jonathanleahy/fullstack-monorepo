/**
 * HomePageV6 - Parents/Busy Adults Persona Landing Page
 *
 * Reference: docs/website-brief.md
 * Target Audience: Parents and busy adults learning in short time windows (Age 30-50)
 * Tone: Understanding, supportive, practical - "Fit learning into your day"
 * Design System:
 *   - Primary Colors: amber-600, amber-700
 *   - Accents: orange-500
 *   - Backgrounds: amber-50, white
 *   - Shadows: shadow-md shadow-amber-500/10
 *   - Effects: Soft solar flares (amber/orange), calming wave texture
 *
 * Sales Focus:
 *   - Short lessons that fit into busy schedules
 *   - Flexible timing - learn when it works for you
 *   - Practical skills applicable to home and family life
 *   - No pressure, learn at your own pace
 *
 * Layout Flow (UNIQUE):
 *   1. Centered hero with family-friendly image
 *   2. Time benefit icons (horizontal)
 *   3. 2-column intro with image
 *   4. 3-col course cards
 *   5. Accordion FAQ style
 *   6. 2 testimonials side by side
 *   7. Stats with icons
 *   8. Warm gradient CTA
 */

import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV6() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ease = 'easeOut' as const;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease },
  };

  const staggerContainer = {
    whileInView: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const timeBlocks = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      time: '10 Minutes',
      label: 'During Coffee',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      time: '15 Minutes',
      label: 'On Lunch Break',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      time: '20 Minutes',
      label: 'Before Bed',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      time: 'Any Time',
      label: 'When It Works',
    },
  ];

  const courses = [
    {
      title: 'Everyday Math Made Simple',
      description: 'Help your kids with homework and master household budgeting in bite-sized lessons.',
      duration: '10-15 min lessons',
      lessons: 24,
      image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=250&fit=crop',
    },
    {
      title: 'English for Family Life',
      description: 'Improve communication skills for work and help your children develop strong language habits.',
      duration: '12 min lessons',
      lessons: 30,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    },
    {
      title: 'Science in Daily Life',
      description: 'Understand the science behind cooking, health, and home projects. Perfect for curious minds.',
      duration: '15 min lessons',
      lessons: 20,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop',
    },
  ];

  const faqs = [
    {
      question: 'How much time do I need each day?',
      answer: 'As little as 10 minutes! Our lessons are designed to fit into your coffee break, lunch hour, or those quiet moments after the kids are in bed. Learn at your own pace, whenever works for you.',
    },
    {
      question: 'Can I pause and resume lessons?',
      answer: 'Absolutely! Life happens. Pick up exactly where you left off - whether that\'s 5 minutes or 5 days later. Your progress is automatically saved.',
    },
    {
      question: 'Are these courses really practical?',
      answer: 'Yes! We focus on real-world applications - helping with homework, managing household finances, understanding health information, and more. Everything you learn can be used immediately.',
    },
    {
      question: 'What if I haven\'t studied in years?',
      answer: 'You\'re in good company! Most of our learners are returning to education after years away. We start with the basics and build confidence gradually with supportive, judgment-free instruction.',
    },
    {
      question: 'Can I learn alongside my children?',
      answer: 'Many parents do! Our courses are great for reviewing material to help with homework, or even learning together as a family activity. Several parents report this strengthens their bond with their kids.',
    },
  ];

  const testimonials = [
    {
      text: "I was worried I'd never find time to learn, but these 15-minute lessons fit perfectly into my lunch break. I'm finally confident helping my daughter with her math homework!",
      author: 'Sarah M.',
      role: 'Parent of Two, Marketing Assistant',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      text: 'As a single dad working full-time, this is exactly what I needed. Short, practical lessons I can do after the kids are asleep. No pressure, just real progress.',
      author: 'Michael T.',
      role: 'Single Parent, Retail Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
  ];

  const stats = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: '12 min',
      label: 'Average Lesson Time',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      value: '8,500+',
      label: 'Busy Adult Learners',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      value: '94%',
      label: 'Complete at Least 3 Courses',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: '100%',
      label: 'Flexible Schedule',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Navigation - V6: Sticky top bar with logo LEFT, compact nav, warm colors */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-amber-600/95 backdrop-blur-sm shadow-md shadow-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">📚</span>
              CourseFlow
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/courses" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link to="/help" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Help
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="sm" className="bg-white text-amber-700 hover:bg-amber-50">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Wave Texture Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Soft Floating Blob Shapes - Wildcard Element */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-48 -right-48 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease,
          }}
        />
        <motion.div
          className="absolute top-1/3 -left-32 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(249, 115, 22, 0.04) 50%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.35, 0.25],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section - V6: Full-width image background with centered overlay text */}
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center">
          {/* Full-width background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1920&h=1080&fit=crop"
              alt="Parent and child learning together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 via-amber-900/70 to-amber-900/85" />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <motion.div {...fadeInUp}>
              <Badge className="mb-6 bg-amber-100/90 text-amber-900 border-amber-200">
                Learn in Your Free Moments
              </Badge>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6, ease }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Fit Learning Into
              <span className="block text-amber-200 mt-2">Your Busy Day</span>
            </motion.h1>

            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6, ease }}
              className="text-xl sm:text-2xl text-amber-50 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Short, practical lessons designed for parents and busy adults. Learn valuable skills in
              10-15 minute sessions - whenever and wherever works for you.
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 shadow-lg px-8 py-6 text-lg">
                  Start Learning Today - Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Wavy Divider */}
        <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#fffbeb" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
        </svg>

        {/* Time Benefits - Horizontal Icons */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Learn When It Works for You
              </h2>
              <p className="text-lg text-gray-600">
                No rigid schedules. No pressure. Just flexible learning that fits your life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {timeBlocks.map((block, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md shadow-amber-500/10 text-amber-600 mb-4">
                    {block.icon}
                  </div>
                  <div className="text-2xl font-bold text-amber-700 mb-2">{block.time}</div>
                  <div className="text-gray-600">{block.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 2-Column Intro with Image */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Built for Real Life, Real Schedules
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We understand you're juggling work, family, and a million other responsibilities.
                  That's why our courses are designed to fit seamlessly into your day - whether
                  you have 10 minutes or an hour.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Learn practical skills that make a real difference in your daily life. Help your
                  kids with homework. Manage household finances better. Understand the science behind
                  cooking and health. All at your own pace, with no judgment.
                </p>
                <ul className="space-y-4">
                  {[
                    'Pause and resume anytime - your progress is always saved',
                    'Mobile-friendly so you can learn on the go',
                    'No deadlines or pressure - go at your own pace',
                    'Practical content you can use immediately',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      {...fadeInUp}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-amber-500/10">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop"
                    alt="Busy parent learning on tablet"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3-Column Course Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Popular Courses for Busy Adults
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Practical skills you can apply to your daily life - from helping with homework to
                managing your household better.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-amber-600 text-white border-0">
                        {course.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>Self-paced</span>
                    </div>
                    <Link to="/register">
                      <Button
                        variant="outline"
                        className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                      >
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Accordion FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Questions We Hear Often
              </h2>
              <p className="text-xl text-gray-600">
                You're not alone in wondering about these things.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white rounded-xl shadow-md shadow-amber-500/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-amber-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === idx ? 'auto' : 0,
                      opacity: openFaq === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 2 Testimonials Side by Side */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Stories from Busy Learners
              </h2>
              <p className="text-xl text-gray-600">
                Real people, real progress, real life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="bg-white rounded-2xl p-8 shadow-md shadow-amber-500/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Stats with Icons */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...staggerContainer}
            className="max-w-6xl mx-auto px-4 md:px-6"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Learning That Works Around You
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-amber-700 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Warm Gradient CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-6xl mx-auto px-4 md:px-6 relative"
          >
            <div className="relative bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 rounded-3xl p-12 sm:p-16 overflow-hidden shadow-2xl shadow-amber-500/20">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl" />

              <div className="relative text-center text-white">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Start Learning Today - It's Free
                </h2>
                <p className="text-xl sm:text-2xl mb-8 text-amber-50 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of busy adults who are learning valuable skills in just 10-15
                  minutes a day. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg px-10 py-6 text-lg font-semibold"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold"
                    >
                      Browse All Courses
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-amber-100 text-sm">
                  Start with any course. Cancel anytime. No questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-100 text-slate-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-4">CourseFlow</div>
                <p className="text-sm leading-relaxed">
                  Flexible learning designed for busy adults who want to grow without sacrificing family time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Courses</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/courses" className="hover:text-amber-600 transition-colors">Mathematics</Link></li>
                  <li><Link to="/courses" className="hover:text-amber-600 transition-colors">English</Link></li>
                  <li><Link to="/courses" className="hover:text-amber-600 transition-colors">Science</Link></li>
                  <li><Link to="/courses" className="hover:text-amber-600 transition-colors">Life Skills</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/help" className="hover:text-amber-600 transition-colors">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link></li>
                  <li><Link to="/faq" className="hover:text-amber-600 transition-colors">FAQ</Link></li>
                  <li><Link to="/community" className="hover:text-amber-600 transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-amber-600 transition-colors">About</Link></li>
                  <li><Link to="/blog" className="hover:text-amber-600 transition-colors">Blog</Link></li>
                  <li><Link to="/careers" className="hover:text-amber-600 transition-colors">Careers</Link></li>
                  <li><Link to="/privacy" className="hover:text-amber-600 transition-colors">Privacy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-300 pt-8 text-center text-sm">
              <p>&copy; 2025 CourseFlow. Made with care for busy parents and learners.</p>
            </div>
          </div>
        </footer>
        <DesignNavigation currentVersion={6} />
      </div>
    </div>
  );
}
