/**
 * HomePageV8 - Educators/Teachers Persona Landing Page
 *
 * Reference: docs/website-brief.md
 * Target Audience: Educators and teachers expanding their toolkit (Age 28-55)
 * Tone: Collegial, supportive, professional development focused
 * Design Philosophy: Warm rose/coral primary colors with gentle shadows (shadow-md shadow-rose-500/10)
 * Visual Effects: Soft solar flares (rose/coral tones), subtle paper texture overlay
 * Sales Focus: Teaching skills, classroom technology, curriculum design, professional development
 *
 * Layout Flow (UNIQUE):
 * 1. Welcoming centered hero with professional development messaging
 * 2. 4-column quick stats showing teaching impact metrics
 * 3. 2-column split section (image right) highlighting educator benefits
 * 4. Vertical feature list with icons for teaching tools
 * 5. Single spotlight testimonial from experienced educator
 * 6. Course category tabs style for curriculum areas
 * 7. Community highlight for teacher collaboration
 * 8. Rose gradient CTA for joining educator community
 */

import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const ease = "easeOut" as const;

export function HomePageV8() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(springScrollProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(springScrollProgress, [0, 0.5], [1, 0]);

  const [activeTab, setActiveTab] = useState('pedagogy');

  const stats = [
    { value: '50K+', label: 'Educators', icon: '👨‍🏫' },
    { value: '2M+', label: 'Students Reached', icon: '🎓' },
    { value: '95%', label: 'Improved Engagement', icon: '📈' },
    { value: '500+', label: 'Teaching Resources', icon: '📚' }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Differentiated Instruction Strategies',
      description: 'Learn evidence-based approaches to meet diverse learner needs in your classroom.'
    },
    {
      icon: '💻',
      title: 'Educational Technology Integration',
      description: 'Master tools that enhance learning without overwhelming your workflow.'
    },
    {
      icon: '📊',
      title: 'Assessment & Feedback Systems',
      description: 'Develop formative and summative assessments that truly measure understanding.'
    },
    {
      icon: '🧠',
      title: 'Social-Emotional Learning',
      description: 'Create supportive classroom environments that foster student wellbeing.'
    },
    {
      icon: '🌍',
      title: 'Culturally Responsive Teaching',
      description: 'Build inclusive practices that honor diverse backgrounds and perspectives.'
    },
    {
      icon: '🔬',
      title: 'Inquiry-Based Learning Design',
      description: 'Facilitate student-centered exploration and critical thinking skills.'
    }
  ];

  const courseCategories = {
    pedagogy: [
      { title: 'Active Learning Techniques', lessons: 24, duration: '6 weeks' },
      { title: 'Classroom Management Mastery', lessons: 18, duration: '4 weeks' },
      { title: 'Universal Design for Learning', lessons: 20, duration: '5 weeks' }
    ],
    technology: [
      { title: 'Google Classroom Excellence', lessons: 16, duration: '4 weeks' },
      { title: 'Interactive Whiteboard Strategies', lessons: 12, duration: '3 weeks' },
      { title: 'Educational Apps & Tools', lessons: 22, duration: '6 weeks' }
    ],
    curriculum: [
      { title: 'Standards-Aligned Lesson Planning', lessons: 28, duration: '7 weeks' },
      { title: 'Project-Based Learning Design', lessons: 20, duration: '5 weeks' },
      { title: 'Cross-Curricular Integration', lessons: 18, duration: '5 weeks' }
    ],
    assessment: [
      { title: 'Formative Assessment Strategies', lessons: 16, duration: '4 weeks' },
      { title: 'Rubric Design & Application', lessons: 14, duration: '3 weeks' },
      { title: 'Student Portfolio Development', lessons: 18, duration: '5 weeks' }
    ]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50/30 relative overflow-hidden">
      {/* Paper Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Solar Flares */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Header - V8: Two-line header - top: utility links, bottom: logo + main nav */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        {/* Top utility bar */}
        <div className="bg-rose-50/50 border-b border-rose-100">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-end items-center gap-6 text-sm">
              <Link to="/help" className="text-rose-700 hover:text-rose-800 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Support
              </Link>
              <Link to="/resources" className="text-rose-700 hover:text-rose-800 transition-colors">
                Resources
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="text-rose-700 hover:text-rose-800 transition-colors font-medium">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="text-rose-700 hover:text-rose-800 transition-colors font-medium">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* Main nav bar */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-rose-700 flex items-center gap-2">
              <span className="text-3xl">🎓</span>
              EduCourse
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/courses" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                About
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Join Free
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Section 1: V8 Hero - Split 50/50 with content LEFT, testimonial card RIGHT */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 py-20 px-4"
      >
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 mb-6">
                Professional Development for Educators
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Expand Your Teaching Toolkit,
                <span className="relative inline-block px-2">
                  <span className="relative z-10 text-rose-600"> Transform</span>
                  <span
                    className="absolute inset-0 bg-rose-100/60 -z-0"
                    style={{
                      transform: 'rotate(-1deg) skewX(-3deg) scaleX(1.1)',
                      borderRadius: '2px 6px 4px 8px'
                    }}
                  />
                </span>{' '}
                <span className="text-rose-600">Your Classroom</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join a supportive community of educators committed to continuous growth.
                Access research-backed strategies, practical classroom techniques, and collegial support
                that fits your teaching schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10 px-8 py-6 text-lg"
                  >
                    Start Your Professional Journey
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-rose-300 text-rose-700 hover:bg-rose-50 px-8 py-6 text-lg"
                  >
                    Browse Courses
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                🎓 Free for all educators • 📜 Earn PD credits • 🤝 Collaborative learning
              </p>
            </motion.div>

            {/* Right: Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-rose-500/10 border border-rose-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-3xl">
                  👩‍🏫
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Sarah Martinez</h4>
                  <p className="text-sm text-rose-600">6th Grade Teacher, 8 years</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic mb-6">
                "These courses transformed my teaching practice. I gained confidence with technology integration and my students are more engaged than ever. The community support is incredible!"
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-rose-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Section 2: 4-Column Quick Stats */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease }}
                className="bg-white rounded-xl p-6 shadow-md shadow-rose-500/10 border border-rose-100 text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-rose-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 2-Column Split (Image Right) */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <Badge className="bg-rose-100 text-rose-700 border-rose-200 mb-4">
                Designed by Educators, for Educators
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Professional Development That Respects Your Time
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We understand the demands on your time. Our courses are designed to fit your schedule
                with flexible pacing, micro-credentials, and immediately applicable classroom strategies.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-rose-600 text-xl">✓</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Self-paced learning</strong> that adapts to your academic calendar
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-600 text-xl">✓</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Collegial discussion forums</strong> for sharing experiences
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-600 text-xl">✓</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Ready-to-use resources</strong> you can implement tomorrow
                  </span>
                </li>
              </ul>
              <Link to="/about">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10">
                  Learn About Our Approach
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-rose-500/10 border border-rose-100">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="Educators collaborating in professional development"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-md shadow-rose-500/10 border border-rose-100 max-w-xs">
                <p className="text-sm text-gray-600 mb-2">Average time saved per week</p>
                <p className="text-3xl font-bold text-rose-600">4.5 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Vertical Feature List with Icons */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Strengthen Your Teaching Practice
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Evidence-based strategies and practical techniques to enhance every aspect of your teaching
            </p>
          </motion.div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease }}
                className="bg-rose-50/50 rounded-xl p-6 shadow-md shadow-rose-500/10 border border-rose-100 hover:shadow-lg hover:shadow-rose-500/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Single Spotlight Testimonial */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl p-12 shadow-xl shadow-rose-500/20 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-6xl mb-6 opacity-50">"</div>
              <p className="text-2xl font-medium mb-8 leading-relaxed">
                This platform has revolutionized my approach to differentiated instruction.
                The strategies I learned have increased student engagement by over 40%, and I finally
                feel confident integrating technology in meaningful ways. The collegial support from
                other educators has been invaluable.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  👩‍🏫
                </div>
                <div>
                  <p className="font-bold text-lg">Maria Santos</p>
                  <p className="text-rose-100">8th Grade Science Teacher, 12 years experience</p>
                  <p className="text-rose-200 text-sm mt-1">Boston Public Schools</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Course Category Tabs Style */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Professional Development Pathways
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your area of focus and discover courses tailored to your professional goals
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(courseCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === category
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="grid md:grid-cols-3 gap-6"
          >
            {courseCategories[activeTab as keyof typeof courseCategories].map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease }}
                className="bg-rose-50/50 rounded-xl p-6 shadow-md shadow-rose-500/10 border border-rose-100 hover:shadow-lg hover:shadow-rose-500/15 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📚 {course.lessons} lessons</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Explore Course
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/courses">
              <Button
                variant="outline"
                className="border-rose-300 text-rose-700 hover:bg-rose-50"
              >
                View All Courses →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Community Highlight */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-12 shadow-xl shadow-rose-500/10 border border-rose-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <Badge className="bg-rose-600 text-white mb-4">
                  Teacher Community
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Connect, Share, Grow Together
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Join a vibrant community of 50,000+ educators sharing lesson plans, classroom strategies,
                  and professional insights. Participate in live workshops, peer mentoring, and collaborative
                  curriculum development.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-rose-600">💬</span>
                    <span>Weekly discussion forums and Q&A sessions</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-rose-600">🎥</span>
                    <span>Monthly webinars with education thought leaders</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-rose-600">📁</span>
                    <span>Shared resource library with 10,000+ materials</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="text-rose-600">🏆</span>
                    <span>Recognition programs for outstanding contributions</span>
                  </li>
                </ul>
                <Link to="/community">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/10">
                    Join the Community
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white rounded-xl p-6 shadow-md shadow-rose-500/10">
                  <div className="text-3xl mb-2">🌟</div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">4.8/5</div>
                  <div className="text-sm text-gray-600">Community Rating</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md shadow-rose-500/10">
                  <div className="text-3xl mb-2">🔄</div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">15K</div>
                  <div className="text-sm text-gray-600">Resources Shared</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md shadow-rose-500/10">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">200+</div>
                  <div className="text-sm text-gray-600">Live Events/Year</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md shadow-rose-500/10">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">92%</div>
                  <div className="text-sm text-gray-600">Active Participants</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Rose Gradient CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-gradient-to-br from-rose-600 via-rose-700 to-orange-600 rounded-2xl p-12 shadow-2xl shadow-rose-500/30 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="inline-block mb-6"
              >
                <Badge className="bg-white/20 text-white border-white/30 text-base">
                  Join 50,000+ Educators
                </Badge>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Teaching Practice?
              </h2>
              <p className="text-xl mb-10 text-rose-50 max-w-2xl mx-auto leading-relaxed">
                Start your professional development journey today. Access hundreds of courses,
                connect with fellow educators, and earn recognized credentials—all free for teachers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-rose-700 hover:bg-rose-50 shadow-lg px-8 py-6 text-lg font-semibold"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    Schedule a Demo
                  </Button>
                </Link>
              </div>

              <p className="text-rose-100 text-sm">
                ✨ No credit card required • 🎯 Instant access to 100+ courses • 📜 PD credit eligible
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-rose-100 bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">EduCourse</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional development designed by educators, for educators. Empowering teachers worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Educators</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/courses" className="hover:text-rose-600 transition-colors">Browse Courses</Link></li>
                <li><Link to="/pathways" className="hover:text-rose-600 transition-colors">Learning Pathways</Link></li>
                <li><Link to="/credentials" className="hover:text-rose-600 transition-colors">PD Credits</Link></li>
                <li><Link to="/resources" className="hover:text-rose-600 transition-colors">Teaching Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/forums" className="hover:text-rose-600 transition-colors">Discussion Forums</Link></li>
                <li><Link to="/events" className="hover:text-rose-600 transition-colors">Live Events</Link></li>
                <li><Link to="/mentorship" className="hover:text-rose-600 transition-colors">Peer Mentoring</Link></li>
                <li><Link to="/showcase" className="hover:text-rose-600 transition-colors">Teacher Showcase</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/help" className="hover:text-rose-600 transition-colors">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-rose-600 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-rose-600 transition-colors">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-rose-600 transition-colors">About Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-rose-100 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 EduCourse. Empowering educators worldwide. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={8} />
    </div>
  );
}
