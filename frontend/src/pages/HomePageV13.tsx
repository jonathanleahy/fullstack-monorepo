/**
 * HomePageV13 - Remote Workers & Digital Nomads Persona
 *
 * Reference: docs/website-brief.md
 * Target Audience: Remote workers and digital nomads (Age 25-45)
 * Tone: Modern, flexible, productivity-focused
 * Design System:
 *   - Primary Colors: Green (green-600), Lime (lime-500)
 *   - Shadows: shadow-md shadow-green-500/10 for fresh, modern depth
 *   - Effects: Solar flares (green/lime), workspace photography texture
 *
 * Sales Focus:
 *   - Work-from-anywhere skills development
 *   - Productivity and time management
 *   - Asynchronous learning flexibility
 *   - Location-independent career growth
 *
 * Layout Flow (UNIQUE):
 *   1. Split hero with laptop/workspace image
 *   2. Flexibility icons grid
 *   3. Full-width value proposition banner
 *   4. 2x2 skill grid showcase
 *   5. Horizontal testimonials slider
 *   6. Location-free statistics
 *   7. Tools/integrations section
 *   8. Green gradient CTA footer
 */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Wifi,
  Globe,
  Clock,
  Zap,
  Coffee,
  Headphones,
  Award,
  TrendingUp,
  MapPin,
  Laptop,
  CheckCircle,
  Star,
  Play,
  ArrowRight,
  Calendar,
  Target,
  Video,
} from 'lucide-react';
import { DesignNavigation } from '../components/DesignNavigation';

const HomePageV13: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    document.title = 'Learn Anywhere | Course Platform for Remote Workers';
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: "easeOut" as const
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  const flexibilityFeatures = [
    { icon: Wifi, label: 'Learn Anywhere', desc: 'Internet = Classroom' },
    { icon: Clock, label: 'Your Schedule', desc: 'Study at your pace' },
    { icon: Globe, label: 'Global Community', desc: '150+ countries' },
    { icon: Zap, label: 'Quick Wins', desc: 'Micro-learning modules' },
  ];

  const skillCategories = [
    {
      title: 'Productivity Mastery',
      icon: Target,
      color: 'green',
      skills: ['Time Management', 'Remote Tools', 'Workflow Automation', 'Focus Techniques'],
      image: '📊',
    },
    {
      title: 'Tech Skills',
      icon: Laptop,
      color: 'lime',
      skills: ['Web Development', 'Data Analysis', 'Cloud Services', 'AI Tools'],
      image: '💻',
    },
    {
      title: 'Business Growth',
      icon: TrendingUp,
      color: 'green',
      skills: ['Freelancing', 'Digital Marketing', 'Sales', 'Entrepreneurship'],
      image: '📈',
    },
    {
      title: 'Creative Work',
      icon: Video,
      color: 'lime',
      skills: ['Content Creation', 'Design', 'Video Editing', 'Copywriting'],
      image: '🎨',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Marketer',
      location: 'Bali, Indonesia',
      avatar: '👩‍💻',
      quote: 'Completed 3 courses while traveling across Asia. The flexibility is unmatched!',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Freelance Developer',
      location: 'Barcelona, Spain',
      avatar: '👨‍💼',
      quote: 'Finally found a learning platform that fits my nomadic lifestyle. Worth every penny.',
      rating: 5,
    },
    {
      name: 'Elena Popov',
      role: 'Remote Designer',
      location: 'Lisbon, Portugal',
      avatar: '👩‍🎨',
      quote: 'The async learning model lets me study during off-peak hours. Perfect for timezone hopping.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '89%', label: 'Learn While Traveling', icon: MapPin },
    { value: '24/7', label: 'Access Anywhere', icon: Globe },
    { value: '4.8★', label: 'Nomad Rating', icon: Star },
    { value: '15min', label: 'Avg. Session Time', icon: Clock },
  ];

  const tools = [
    'Notion', 'Slack', 'Zoom', 'Trello', 'Asana', 'Figma', 'GitHub', 'Calendly'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-lime-50/20 overflow-hidden">
      {/* Solar Flares - Green/Lime Theme */}
      <motion.div
        className="fixed top-0 right-0 w-[600px] h-[600px] bg-green-200/20 rounded-full blur-3xl pointer-events-none"
        style={{ y: parallaxY }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-lime-200/15 rounded-full blur-3xl pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
      />

      {/* Header - Floating Pill-Shaped */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full shadow-lg shadow-green-500/10 z-50 px-8 py-3">
        <div className="flex items-center justify-center space-x-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-lime-500 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
              NomadLearn
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Help</Link>
            <button className="px-5 py-2 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Grid-based Bento Layout */}
      <motion.section
        ref={heroRef}
        className="pt-32 pb-20 px-6"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Headline - Large Card */}
            <motion.div variants={fadeInUp} className="lg:col-span-8 bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl p-12 shadow-xl shadow-green-500/20">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full mb-6">
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Built for Remote Workers</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Learn <span className="bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">Anywhere</span>,
                <br />Grow Everywhere
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Master in-demand skills on your schedule. Whether you're in a cafe in Chiang Mai or
                coworking in Medellin, your classroom travels with you.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-lg hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center space-x-2 group">
                  <span className="font-semibold">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-green-700 rounded-lg hover:shadow-md hover:shadow-green-500/10 transition-all flex items-center space-x-2 border border-green-200">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">Watch Demo</span>
                </button>
              </div>
            </motion.div>

            {/* Supporting Card 1 - Stats */}
            <motion.div variants={fadeInUp} className="lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl shadow-green-500/10 flex flex-col justify-center">
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex -space-x-3">
                  {['👨‍💻', '👩‍💼', '👨‍🎨', '👩‍🔬'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center border-2 border-white text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">12,000+ remote workers learning</p>
              </div>
            </motion.div>

            {/* Supporting Card 2 - Feature Preview */}
            <motion.div variants={scaleIn} className="lg:col-span-6 bg-gradient-to-br from-green-600 to-lime-600 rounded-3xl p-8 shadow-xl shadow-green-500/20 text-white">
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Learn Anywhere</h3>
              <p className="text-green-50">Access your courses from 150+ countries with offline mode support</p>
            </motion.div>

            {/* Supporting Card 3 - Quick Win */}
            <motion.div variants={scaleIn} className="lg:col-span-6 bg-white rounded-3xl p-8 shadow-xl shadow-green-500/10">
              <Zap className="w-12 h-12 text-lime-600 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Quick Wins</h3>
              <p className="text-gray-600">Bite-sized lessons that fit your nomadic lifestyle</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="rgba(255, 255, 255, 0.5)" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Flexibility Icons Grid */}
      <section className="py-16 px-6 bg-white/50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-4 gap-8">
            {flexibilityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.label}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Floating Laptop/WiFi Wildcard Elements */}
          <motion.div
            className="relative mt-16 flex justify-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-20 h-20 bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20"
            >
              <Laptop className="w-10 h-10 text-green-600" />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-lime-100 to-green-100 rounded-2xl flex items-center justify-center shadow-lg shadow-lime-500/20"
            >
              <Wifi className="w-10 h-10 text-lime-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-Width Value Proposition Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 via-green-500 to-lime-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Career Doesn't Stop When You Travel
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join thousands of remote workers who are leveling up their skills without compromising
            their lifestyle. Learn at your own pace, on your own schedule, from anywhere in the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold flex items-center space-x-2">
              <Coffee className="w-5 h-5" />
              <span>Learn from cafes</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold flex items-center space-x-2">
              <Headphones className="w-5 h-5" />
              <span>Study on flights</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold flex items-center space-x-2">
              <Laptop className="w-5 h-5" />
              <span>Grow anywhere</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2x2 Skill Grid Showcase */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Skills That Work <span className="bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">Everywhere</span>
            </h2>
            <p className="text-xl text-gray-600">Choose your path, learn at your pace</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className={`bg-white rounded-2xl shadow-md shadow-${category.color}-500/10 p-8 hover:shadow-xl hover:shadow-${category.color}-500/20 transition-all group cursor-pointer border border-${category.color}-100`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-${category.color}-100 to-${category.color === 'green' ? 'lime' : 'green'}-100 rounded-xl mb-4`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  </div>
                  <span className="text-6xl">{category.image}</span>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center space-x-3 group/item">
                      <CheckCircle className={`w-5 h-5 text-${category.color}-500 flex-shrink-0`} />
                      <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>

                <button className={`mt-6 w-full py-3 bg-gradient-to-r from-${category.color}-600 to-${category.color === 'green' ? 'lime' : 'green'}-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-${category.color}-500/30 transition-all flex items-center justify-center space-x-2`}>
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Horizontal Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-lime-50">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories from the Road
            </h2>
            <p className="text-xl text-gray-600">Real nomads, real results</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white rounded-2xl shadow-md shadow-green-500/10 p-8 hover:shadow-xl hover:shadow-green-500/20 transition-all"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="flex items-center space-x-1 text-xs text-green-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Location-Free Statistics */}
      <motion.section
        ref={statsRef}
        className="py-20 px-6 bg-white"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Without Borders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-lime-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tools/Integrations Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-green-50/30">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Integrates with Your Remote Stack
            </h2>
            <p className="text-xl text-gray-600">Connect with the tools you already use</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="px-8 py-4 bg-white rounded-xl shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 transition-all cursor-pointer border border-green-100"
              >
                <span className="font-semibold text-gray-700">{tool}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-lg hover:shadow-xl hover:shadow-green-500/30 transition-all font-semibold">
              View All Integrations
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Green Gradient CTA Footer */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-green-500 to-lime-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCA4MCAwIEwgODAgODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Award className="w-5 h-5 text-white" />
            <span className="text-white font-medium">7-Day Free Trial</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6">
            Start Learning Today,<br />From Anywhere Tomorrow
          </h2>

          <p className="text-xl text-green-50 mb-10 leading-relaxed">
            No credit card required. Cancel anytime. Join the remote work revolution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-5 bg-white text-green-700 rounded-lg hover:shadow-2xl transition-all font-bold text-lg flex items-center space-x-2 group">
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-green-700/30 backdrop-blur-sm text-white rounded-lg hover:bg-green-700/40 transition-all font-bold text-lg border-2 border-white/30 flex items-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span>Book a Demo</span>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/90">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No long-term commitment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Offline access included</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Certificate upon completion</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-lime-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NomadLearn</span>
            </div>
            <p className="text-sm">Learning platform built for the remote work lifestyle.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="hover:text-green-400 transition-colors">Courses</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About</Link></li>
              <li><Link to="/help" className="hover:text-green-400 transition-colors">Help</Link></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Remote Life</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Nomad Stories</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Tips & Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 NomadLearn. Empowering remote workers worldwide.</p>
        </div>
      </footer>
      <DesignNavigation currentVersion={13} />
    </div>
  );
};

export { HomePageV13 };
export default HomePageV13;
