/**
 * HomePageV10.tsx - International Learners Persona
 *
 * Reference: docs/website-brief.md
 * Target Audience: International learners, non-native English speakers (Age 20-45)
 * Tone: Welcoming, inclusive, globally minded
 * Design Theme: Sky blue/azure primary colors with friendly shadows (shadow-md shadow-sky-500/10)
 * Visual Effects: Soft solar flares (sky/azure), world map or abstract pattern background
 * Sales Approach: Accessible English, subtitle availability, global community emphasis
 *
 * Layout Flow (UNIQUE):
 * 1. Welcoming hero with globe imagery
 * 2. Language/accessibility icons
 * 3. Centered introduction
 * 4. 3-column feature cards
 * 5. World map testimonial section
 * 6. FAQ accordion
 * 7. Community stats
 * 8. Bright blue CTA
 */

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV10() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const globeRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 360]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
      {/* Abstract World Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worldPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-sky-600" />
              <circle cx="150" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-600" />
              <path d="M 0 100 Q 50 80, 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-sky-500" />
              <path d="M 100 0 Q 120 50, 100 100 T 100 200" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldPattern)" />
        </svg>
      </div>

      {/* Solar Flares */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut" as const,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-80 h-80 bg-blue-200/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeOut" as const,
          delay: 1,
        }}
      />

      {/* Header - V10: Logo with globe icon, language-aware styling, nav RIGHT */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-sky-100 shadow-md shadow-sky-500/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with globe icon */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-500/10 relative">
                <span className="text-white font-bold text-xl">CT</span>
                <span className="absolute -top-1 -right-1 text-lg">🌍</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-700 to-blue-600 bg-clip-text text-transparent">
                  Course Tutor
                </span>
                <p className="text-xs text-sky-600 font-medium">Global Learning Platform</p>
              </div>
            </Link>
            {/* Navigation RIGHT aligned */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-sky-700 transition-colors font-medium">Courses</Link>
              <Link to="/about" className="text-gray-700 hover:text-sky-700 transition-colors font-medium">About</Link>
              <Link to="/help" className="text-gray-700 hover:text-sky-700 transition-colors font-medium">Help</Link>
              <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-lg border border-sky-200">
                <span className="text-sm">🌐</span>
                <select className="text-sm bg-transparent border-none text-sky-700 font-medium cursor-pointer">
                  <option>English</option>
                  <option>Español</option>
                  <option>中文</option>
                  <option>العربية</option>
                </select>
              </div>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10">Dashboard</Button>
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline" className="border-sky-600 text-sky-700 hover:bg-sky-50">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Section 1: V10 Hero - Diagonal split design with gradient, text on one side */}
      <section className="relative z-10 pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Diagonal split background */}
        <div className="absolute inset-0 flex">
          <div className="w-full md:w-7/12 bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600"
               style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }} />
          <div className="hidden md:block w-5/12 bg-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content on gradient */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="text-white"
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Welcome to Our Global Community
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                Learn Without
                <span className="block text-sky-100">
                  Language Barriers
                </span>
              </h1>
              <p className="text-xl text-sky-50 mb-8 leading-relaxed">
                Join thousands of international learners from 150+ countries. Course Tutor makes education accessible in your language, at your pace, with a supportive global community.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 shadow-lg text-lg px-10 py-6">
                    Start Learning Free
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6">
                  Watch Demo (with Subtitles)
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-sky-100">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>30+ Languages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Subtitle Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 Community</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Globe visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" as const }}
              className="relative"
            >
              <motion.div
                style={{ rotateY: globeRotate }}
                className="relative w-full h-96 bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl shadow-2xl shadow-sky-500/10 flex items-center justify-center overflow-hidden"
              >
                {/* Decorative Globe Icon Accent - Wildcard Element */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-sky-200/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <svg className="w-80 h-80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" fill="url(#globeGradient)" />
                  <defs>
                    <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <path d="M 100 10 Q 140 50, 100 100 T 100 190" stroke="#0284c7" strokeWidth="2" fill="none" />
                  <path d="M 10 100 Q 50 60, 100 100 T 190 100" stroke="#0284c7" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="100" r="90" stroke="#0369a1" strokeWidth="3" fill="none" />
                  <circle cx="100" cy="100" r="70" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5" />
                  <circle cx="100" cy="100" r="50" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.3" />

                  {/* Connection points representing global network */}
                  <circle cx="50" cy="50" r="4" fill="#0ea5e9" />
                  <circle cx="150" cy="60" r="4" fill="#3b82f6" />
                  <circle cx="140" cy="140" r="4" fill="#0ea5e9" />
                  <circle cx="60" cy="150" r="4" fill="#3b82f6" />
                  <circle cx="100" cy="30" r="4" fill="#0284c7" />
                  <circle cx="170" cy="100" r="4" fill="#0284c7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-blue-500/10" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" as const }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg shadow-sky-500/10 p-4 border border-sky-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                    <span className="text-sky-700 text-xs">🌍</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">150+ Countries</p>
                    <p className="text-xs text-gray-600">United by Learning</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="rgba(255, 255, 255, 0.6)" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Section 2: Language/Accessibility Icons */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Made Accessible for Everyone</h2>
            <p className="text-lg text-gray-600">Break through language barriers with our inclusive features</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: '🌐', label: 'Multi-language Interface', color: 'sky' },
              { icon: '💬', label: 'Live Subtitles', color: 'blue' },
              { icon: '🔊', label: 'Audio Descriptions', color: 'sky' },
              { icon: '📝', label: 'Text-to-Speech', color: 'blue' },
              { icon: '🎯', label: 'Simple English Mode', color: 'sky' },
              { icon: '⏱️', label: 'Adjustable Speed', color: 'blue' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                whileHover={{ scale: 1.05 }}
                className={`bg-white rounded-xl p-6 shadow-md shadow-${feature.color}-500/10 border border-${feature.color}-100 text-center hover:shadow-lg transition-all`}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <p className="text-sm font-medium text-gray-800">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Centered Introduction */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <Badge className="mb-6 bg-sky-100 text-sky-700 border-sky-200">Your Global Learning Journey</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Education Should Have{' '}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                No Borders
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              At Course Tutor, we believe that where you're from or what language you speak should never limit your potential. Our platform is designed from the ground up to welcome learners from every corner of the world, with tools and support that make complex topics clear and accessible.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: '30+', label: 'Languages Supported', icon: '🗣️' },
                { number: '150+', label: 'Countries Represented', icon: '🌏' },
                { number: '95%', label: 'Student Satisfaction', icon: '⭐' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
                  className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 shadow-md shadow-sky-500/10 border border-sky-100"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-sky-700 mb-2">{stat.number}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: 3-Column Feature Cards */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for International Success</h2>
            <p className="text-xl text-gray-600">Everything you need to thrive, regardless of your background</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Your Language, Your Way',
                description: 'Access courses with subtitles in 30+ languages. Switch interface languages instantly. Learn technical concepts in familiar terms.',
                icon: '🌐',
                features: ['Real-time translation', 'Cultural context notes', 'Local currency pricing'],
              },
              {
                title: 'Global Study Groups',
                description: 'Connect with peers from around the world. Practice English together. Share diverse perspectives and learning strategies.',
                icon: '👥',
                features: ['Timezone-friendly sessions', 'Multilingual forums', 'Buddy matching system'],
              },
              {
                title: 'Adapted Content',
                description: 'Lessons designed for clarity. Examples from global contexts. Support materials in simplified English.',
                icon: '📚',
                features: ['Visual learning aids', 'Glossary support', 'Slower-paced options'],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-sky-500/10 border border-sky-100 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md shadow-sky-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: World Map Testimonial Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories from Around the World</h2>
            <p className="text-xl text-gray-600">Real learners, real transformations, real global impact</p>
          </motion.div>

          <div className="relative">
            {/* World Map Visualization */}
            <div className="mb-12 bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-8 shadow-lg shadow-sky-500/10 border border-sky-100">
              <svg className="w-full h-64" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified world map silhouette */}
                <path d="M 100 150 Q 150 140, 200 155 L 250 145 L 280 160 L 320 150 Q 360 155, 400 150 L 450 160 L 500 155 Q 550 148, 600 155 L 650 150 L 700 165"
                      stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.3" />
                <path d="M 150 200 Q 200 190, 250 205 L 300 195 L 350 210 Q 400 205, 450 200 L 500 215 L 550 205 L 600 220"
                      stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.3" />

                {/* Location markers */}
                {[
                  { x: 180, y: 160, label: 'Brazil' },
                  { x: 350, y: 180, label: 'Nigeria' },
                  { x: 480, y: 145, label: 'India' },
                  { x: 620, y: 170, label: 'Japan' },
                  { x: 260, y: 190, label: 'Spain' },
                ].map((location, index) => (
                  <g key={index}>
                    <motion.circle
                      cx={location.x}
                      cy={location.y}
                      r="6"
                      fill="#0ea5e9"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" as const }}
                    />
                    <motion.circle
                      cx={location.x}
                      cy={location.y}
                      r="15"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                      fill="none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeOut" as const }}
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Maria Silva',
                  country: 'Brazil',
                  flag: '🇧🇷',
                  quote: 'The Portuguese subtitles made complex programming concepts finally click for me. Now I work as a developer in São Paulo!',
                  course: 'Full Stack Development',
                },
                {
                  name: 'Ahmed Hassan',
                  country: 'Egypt',
                  flag: '🇪🇬',
                  quote: 'Study groups with Arabic speakers helped me improve my English while learning data science. The community is amazing.',
                  course: 'Data Science',
                },
                {
                  name: 'Priya Sharma',
                  country: 'India',
                  flag: '🇮🇳',
                  quote: 'Being able to switch between Hindi and English helped me understand advanced topics. The global network opened doors.',
                  course: 'Machine Learning',
                },
                {
                  name: 'Carlos Mendez',
                  country: 'Mexico',
                  flag: '🇲🇽',
                  quote: 'The simplified English mode was perfect for getting started. Now I mentor other Spanish-speaking students!',
                  course: 'Web Design',
                },
                {
                  name: 'Yuki Tanaka',
                  country: 'Japan',
                  flag: '🇯🇵',
                  quote: 'Japanese subtitles and adjustable video speed let me learn at my own pace. I completed 5 courses in 6 months.',
                  course: 'UI/UX Design',
                },
                {
                  name: 'Olga Petrova',
                  country: 'Russia',
                  flag: '🇷🇺',
                  quote: 'The timezone-friendly live sessions meant I never missed important lectures. Course Tutor respects global students.',
                  course: 'Cloud Computing',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                  className="bg-white rounded-xl p-6 shadow-md shadow-sky-500/10 border border-sky-100 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{testimonial.flag}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.country}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                  <Badge className="bg-sky-100 text-sky-700 text-xs">{testimonial.course}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ Accordion */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about learning with us</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'What languages are supported?',
                answer: 'We currently support 30+ languages for subtitles and interface translation, including Spanish, Portuguese, French, German, Arabic, Hindi, Mandarin, Japanese, Korean, Russian, and many more. All video content includes subtitle options, and you can switch your interface language at any time.',
              },
              {
                question: 'Do I need to speak fluent English?',
                answer: 'Not at all! While course content is primarily in English, we provide comprehensive subtitle support, simplified English mode, and glossaries to help you understand. Many students improve their English while learning technical skills. Our community also includes native speakers happy to help.',
              },
              {
                question: 'How does pricing work for international students?',
                answer: 'We display prices in your local currency and accept payments from 150+ countries. We also offer purchasing power parity discounts for students in developing regions, making our courses accessible regardless of your location. Contact support for scholarship opportunities.',
              },
              {
                question: 'Are there timezone-friendly live sessions?',
                answer: 'Yes! We schedule live sessions across multiple timezones, and all sessions are recorded with subtitles. Our study groups operate 24/7, and our community forums are always active, so you can get help whenever you need it.',
              },
              {
                question: 'Can I connect with other learners from my country?',
                answer: 'Absolutely! Our platform includes regional study groups and language-specific forums. You can filter for students from your country or who speak your language. Many students form lasting friendships and professional networks through these connections.',
              },
              {
                question: 'What if I need extra help understanding concepts?',
                answer: 'We offer multiple support channels: simplified English explanations, visual learning aids, extended office hours, one-on-one mentoring options, and a supportive community ready to help. You can also request clarification in your native language through our community translators.',
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" as const }}
                className="group bg-white rounded-xl shadow-md shadow-sky-500/10 border border-sky-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <summary className="cursor-pointer p-6 font-semibold text-gray-900 text-lg flex items-center justify-between hover:bg-sky-50 transition-colors">
                  {faq.question}
                  <svg className="w-5 h-5 text-sky-600 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Community Stats */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-3xl p-12 shadow-2xl shadow-sky-500/10 text-white"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Join Our Thriving Global Community</h2>
              <p className="text-xl text-sky-100">You're never alone on your learning journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '500K+', label: 'Active Learners', icon: '👨‍🎓', subtext: 'From every continent' },
                { number: '150+', label: 'Countries', icon: '🌍', subtext: 'United by education' },
                { number: '1.2M+', label: 'Study Sessions', icon: '📚', subtext: 'Completed this month' },
                { number: '30+', label: 'Languages', icon: '🗣️', subtext: 'Fully supported' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
                  className="text-center"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-sky-100 text-sm">{stat.subtext}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-sky-100 mb-6">
                "When we learn together, we lift each other up. Distance and language become bridges, not barriers."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-white text-sky-700 text-sm px-4 py-2">24/7 Community Support</Badge>
                <Badge className="bg-white text-sky-700 text-sm px-4 py-2">Peer Mentorship Program</Badge>
                <Badge className="bg-white text-sky-700 text-sm px-4 py-2">Cultural Exchange Events</Badge>
                <Badge className="bg-white text-sky-700 text-sm px-4 py-2">Regional Study Groups</Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Bright Blue CTA */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="bg-white rounded-3xl p-12 shadow-2xl shadow-sky-500/10 border border-sky-100 text-center"
          >
            <div className="inline-block mb-6">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-lg px-6 py-2">Start Your Journey Today</Badge>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Your Future Knows{' '}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                No Borders
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join half a million international learners who chose to invest in themselves. Get started with our free trial and experience learning without barriers. Your language, your pace, your success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-500/10 text-xl px-10 py-7">
                  Start Free Trial
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-sky-600 text-sky-700 hover:bg-sky-50 text-xl px-10 py-7">
                Talk to Our Team
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-sky-100">
              {[
                { icon: '✓', text: 'No credit card required' },
                { icon: '✓', text: 'Cancel anytime' },
                { icon: '✓', text: 'Full language support from day 1' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-gray-700">
                  <span className="text-sky-600 font-bold text-xl">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CT</span>
                </div>
                <span className="text-xl font-bold text-white">Course Tutor</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Breaking down barriers to education, one learner at a time. Join our global community today.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-sky-400 transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link></li>
                <li><Link to="/languages" className="hover:text-sky-400 transition-colors">Languages</Link></li>
                <li><Link to="/accessibility" className="hover:text-sky-400 transition-colors">Accessibility</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><Link to="/forums" className="hover:text-sky-400 transition-colors">Discussion Forums</Link></li>
                <li><Link to="/study-groups" className="hover:text-sky-400 transition-colors">Study Groups</Link></li>
                <li><Link to="/mentorship" className="hover:text-sky-400 transition-colors">Mentorship</Link></li>
                <li><Link to="/events" className="hover:text-sky-400 transition-colors">Global Events</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-sky-400 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/scholarships" className="hover:text-sky-400 transition-colors">Scholarships</Link></li>
                <li><Link to="/translation" className="hover:text-sky-400 transition-colors">Translation Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Course Tutor. Empowering learners worldwide.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={10} />
    </div>
  );
}
