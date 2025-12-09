/**
 * HomePageV12 - Military/Veterans Persona Landing Page
 *
 * Reference: docs/website-brief.md
 * Target Audience: Military service members and veterans (Age 22-55)
 * Tone: Respectful, direct, mission-focused, honor-driven
 *
 * Design Specifications:
 * - Primary Colors: Navy/dark blue (slate-800, blue-900), red accents
 * - Typography: Strong, structured, clear hierarchy
 * - Shadows: shadow-lg shadow-slate-500/15 for depth and authority
 * - Effects: Minimal solar flares (subtle slate-200/15), structured grid texture
 * - Layout: Mission-focused with clear progression
 *
 * Sales Focus:
 * - Career transition support and pathways
 * - GI Bill benefits and education funding
 * - Leadership skills translation to civilian careers
 * - Veteran community and peer support
 * - Service-oriented mission alignment
 *
 * Unique Layout Flow:
 * Strong patriotic hero → GI Bill benefits bar → Mission statement →
 * 3-column career paths → Vertical success stories → Stats with icons →
 * Community section → Navy blue CTA
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Award,
  BookOpen,
  Users,
  Target,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Flag,
  Briefcase,
  GraduationCap,
  DollarSign,
} from 'lucide-react';
import { DesignNavigation } from '../components/DesignNavigation';

const HomePageV12: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Minimal Solar Flare - Top Right */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-blue-200/30 rounded-full blur-[120px]" />
      </div>

      {/* Header - Strong Horizontal Bar */}
      <header className="relative bg-slate-900 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VetLearn</span>
            </div>

            {/* Nav with strong separators */}
            <nav className="hidden md:flex items-center">
              <a href="#courses" className="px-6 py-2 text-slate-200 hover:text-white transition-colors font-semibold border-r border-slate-700">Courses</a>
              <a href="#about" className="px-6 py-2 text-slate-200 hover:text-white transition-colors font-semibold border-r border-slate-700">About</a>
              <a href="#help" className="px-6 py-2 text-slate-200 hover:text-white transition-colors font-semibold border-r border-slate-700">Help</a>
              <button className="ml-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all">
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Angled/Diagonal with Patriotic Stripe */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Hero Background with Diagonal Split */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-50" />

        {/* Patriotic Diagonal Stripe */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-600/5 to-red-600/5 transform skew-x-[-12deg]" />
        </div>

        {/* Accent Lines */}
        <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-red-600 to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-32 bg-gradient-to-b from-red-600 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-32 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left max-w-3xl"
          >
            {/* Service Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-full shadow-lg shadow-slate-500/15">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-slate-700 font-semibold">
                  Honoring Those Who Served
                </span>
                <Flag className="w-5 h-5 text-blue-600" />
              </div>
            </motion.div>

            {/* Main Headline - LEFT aligned */}
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-tight mb-8"
            >
              Translate Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-700 to-red-600">
                Service Into Success
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed"
            >
              Mission-focused education designed for military service members and veterans.
              Use your GI Bill benefits to build the career you deserve.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Link
                to="/signup"
                className="group px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <span className="flex items-center gap-3">
                  Start Your Mission
                  <Target className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/programs"
                className="px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-lg border-2 border-slate-300 shadow-lg shadow-slate-500/15 transition-all duration-300 hover:scale-105"
              >
                Explore Programs
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>GI Bill Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Veteran Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>DoD SkillBridge</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="rgb(248, 250, 252)" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* GI Bill Benefits Bar */}
      <BenefitsBar />

      {/* Mission Statement */}
      <MissionStatement />

      {/* Career Paths - 3 Column */}
      <CareerPaths />

      {/* Vertical Success Stories */}
      <SuccessStories />

      {/* Stats with Icons */}
      <StatsSection />

      {/* Community Section */}
      <CommunitySection />

      {/* Navy Blue CTA */}
      <FinalCTA />
      <DesignNavigation currentVersion={12} />
    </div>
  );
};

// GI Bill Benefits Bar Component
const BenefitsBar: React.FC = () => {
  const benefits = [
    { icon: GraduationCap, label: 'GI Bill Accepted', color: 'text-blue-600' },
    { icon: DollarSign, label: 'No Out-of-Pocket Cost', color: 'text-green-600' },
    { icon: BookOpen, label: 'VA Approved Programs', color: 'text-yellow-600' },
    { icon: Award, label: 'SkillBridge Partner', color: 'text-red-600' },
  ];

  return (
    <section className="relative py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Patriotic Ribbon Wildcard Element */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex justify-center mb-8"
        >
          <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-white/90 rounded-lg" style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }} />
            <div className="relative flex items-center gap-3">
              <Flag className="w-6 h-6 text-red-600" />
              <span className="font-bold text-slate-900 text-lg">Proudly Serving Those Who Served</span>
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" as const }}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-lg shadow-slate-500/15"
            >
              <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              <span className="text-slate-900 font-semibold">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mission Statement Component
const MissionStatement: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Your Next Mission Starts Here
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We understand the unique challenges of transitioning from military to civilian life.
            Our programs are built by veterans, for veterans, translating your leadership,
            discipline, and technical skills into high-demand careers.
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <div className="px-6 py-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">100%</p>
              <p className="text-sm text-slate-600">GI Bill Coverage</p>
            </div>
            <div className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-2xl font-bold text-slate-900">24/7</p>
              <p className="text-sm text-slate-600">Support Available</p>
            </div>
            <div className="px-6 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-2xl font-bold text-red-600">10K+</p>
              <p className="text-sm text-slate-600">Veterans Trained</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Career Paths Component
const CareerPaths: React.FC = () => {
  const paths = [
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Leverage your security clearance and defense experience',
      skills: ['Network Security', 'Risk Assessment', 'Compliance'],
      salary: '$95K - $140K',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'Apply your leadership and operational planning expertise',
      skills: ['Agile/Scrum', 'Team Leadership', 'Strategic Planning'],
      salary: '$85K - $130K',
      color: 'from-slate-600 to-slate-800',
    },
    {
      icon: TrendingUp,
      title: 'Data Analytics',
      description: 'Use your analytical mindset and attention to detail',
      skills: ['Data Visualization', 'SQL', 'Business Intelligence'],
      salary: '$80K - $125K',
      color: 'from-red-600 to-red-800',
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            High-Value Career Paths
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from proven career tracks designed for military skill translation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" as const }}
              className="group relative p-8 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-500/15 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${path.color} rounded-t-xl`} />

              <path.icon className="w-16 h-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{path.title}</h3>
              <p className="text-slate-600 mb-6">{path.description}</p>

              <div className="space-y-3 mb-6">
                {path.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-600">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Average Salary</p>
                <p className="text-2xl font-bold text-blue-600">{path.salary}</p>
              </div>

              <Link
                to="/programs"
                className="mt-6 block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center rounded-lg transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Success Stories Component
const SuccessStories: React.FC = () => {
  const stories = [
    {
      name: 'SSgt James Martinez',
      branch: 'USMC, 8 years',
      role: 'Cybersecurity Analyst',
      company: 'Lockheed Martin',
      image: '/api/placeholder/400/400',
      quote: 'The transition was seamless. They understood military experience and helped me translate it into a six-figure career.',
      skills: ['Security+', 'CISSP', 'Network Defense'],
    },
    {
      name: 'Capt Sarah Johnson',
      branch: 'USA, 6 years',
      role: 'Senior Project Manager',
      company: 'Amazon Web Services',
      image: '/api/placeholder/400/400',
      quote: 'My leadership skills from the Army became my greatest asset. Now I lead teams of 50+ engineers.',
      skills: ['PMP', 'Agile', 'Strategic Planning'],
    },
    {
      name: 'PO1 Michael Chen',
      branch: 'USN, 10 years',
      role: 'Data Analytics Lead',
      company: 'Capital One',
      image: '/api/placeholder/400/400',
      quote: 'From submarine navigation to data analytics - the analytical skills transferred perfectly.',
      skills: ['SQL', 'Python', 'Tableau'],
    },
  ];

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Mission Accomplished
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real veterans, real success stories
          </p>
        </motion.div>

        <div className="space-y-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" as const }}
              className="group relative p-8 bg-slate-50 border border-slate-200 rounded-xl shadow-lg shadow-slate-500/15 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg shadow-blue-500/30">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-slate-50">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{story.name}</h3>
                  <p className="text-slate-600 mb-1">{story.branch}</p>
                  <p className="text-blue-600 font-semibold mb-4">
                    {story.role} at {story.company}
                  </p>
                  <blockquote className="text-lg text-slate-600 italic mb-6">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {story.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection: React.FC = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Veterans Trained', color: 'text-blue-600' },
    { icon: Award, value: '95%', label: 'Job Placement Rate', color: 'text-green-600' },
    { icon: DollarSign, value: '$92K', label: 'Average Starting Salary', color: 'text-yellow-600' },
    { icon: TrendingUp, value: '40%', label: 'Salary Increase', color: 'text-red-600' },
  ];

  return (
    <section className="relative py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" as const }}
              className="text-center p-8 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-500/15 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Community Section Component
const CommunitySection: React.FC = () => {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <Users className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Join the Veteran Community
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with fellow veterans, share experiences, and build your professional network.
            You served together, now succeed together.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-lg shadow-slate-500/15">
              <Flag className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Peer Mentorship</h3>
              <p className="text-slate-600">Get guidance from veterans who've made the transition</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-lg shadow-slate-500/15">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Networking Events</h3>
              <p className="text-slate-600">Monthly meetups with hiring managers and recruiters</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-lg shadow-slate-500/15">
              <Shield className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career Support</h3>
              <p className="text-slate-600">Resume reviews, interview prep, job placement assistance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA Component
const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-full">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-slate-900 font-semibold">Start Your Transition Today</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
            Your Service Earned This Opportunity
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Use your GI Bill benefits to launch a high-paying career. No out-of-pocket costs.
            Full support every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              to="/signup"
              className="group px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <span className="flex items-center gap-3">
                Begin Your Mission
                <Target className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="px-12 py-6 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xl rounded-lg border-2 border-slate-300 shadow-lg shadow-slate-500/15 transition-all duration-300 hover:scale-105"
            >
              Talk to a Veteran Advisor
            </Link>
          </div>

          <div className="pt-12 flex justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>100% GI Bill Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Veteran Support Staff</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { HomePageV12 };
export default HomePageV12;
