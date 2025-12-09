/**
 * HomePageV11 - Healthcare Professionals Persona
 *
 * Reference: docs/website-brief.md
 * Target Audience: Healthcare professionals (nurses, doctors, medical staff) - Age 25-55
 * Tone: Professional, trustworthy, evidence-based
 * Design: Medical blue/teal primary, clean shadows (shadow-md shadow-blue-500/10)
 * Visual Effects: Soft solar flares (blue/teal), clean clinical texture
 * Sales Focus: CE credits, up-to-date medical knowledge, flexible scheduling
 *
 * Layout Flow:
 * Clean hero with medical imagery → Trust badges (certifications) →
 * 3-col specialty cards → 2-column with stats → Single testimonial spotlight →
 * CE credits section → FAQ → Blue gradient CTA
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Shield,
  Star,
  TrendingUp,
  Users,
  FileText,
  ChevronDown
} from 'lucide-react';
import { DesignNavigation } from '../components/DesignNavigation';

const HomePageV11: React.FC = () => {
  useAuth();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Trust badges data
  const trustBadges = [
    { icon: Shield, label: 'ANCC Accredited' },
    { icon: Award, label: 'AMA PRA Category 1' },
    { icon: GraduationCap, label: 'ACCME Approved' },
    { icon: CheckCircle, label: 'State Board Certified' }
  ];

  // Specialty cards data
  const specialties = [
    {
      title: 'Emergency Medicine',
      credits: '25 CE Credits',
      courses: 18,
      icon: '🚑',
      color: 'blue'
    },
    {
      title: 'Critical Care',
      credits: '30 CE Credits',
      courses: 22,
      icon: '⚕️',
      color: 'teal'
    },
    {
      title: 'Pediatric Nursing',
      credits: '20 CE Credits',
      courses: 15,
      icon: '👶',
      color: 'blue'
    }
  ];

  // Stats data
  const stats = [
    { value: '50,000+', label: 'Healthcare Professionals', icon: Users },
    { value: '500+', label: 'Accredited Courses', icon: BookOpen },
    { value: '98%', label: 'Pass Rate', icon: TrendingUp },
    { value: '24/7', label: 'Access Anytime', icon: Clock }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'Are your courses accredited for continuing education credits?',
      answer: 'Yes, all our courses are fully accredited by ANCC, AMA, and ACCME. Credits are automatically tracked and certificates are provided upon completion.'
    },
    {
      question: 'Can I complete courses on my own schedule?',
      answer: 'Absolutely. Our platform is available 24/7, allowing you to study during breaks, between shifts, or whenever it fits your schedule. All progress is automatically saved.'
    },
    {
      question: 'How current is the medical content?',
      answer: 'Our content is reviewed and updated quarterly by board-certified specialists to ensure alignment with the latest evidence-based practices and clinical guidelines.'
    },
    {
      question: 'What formats are the courses available in?',
      answer: 'Courses include video lectures, interactive case studies, downloadable resources, and self-assessment quizzes. Mobile-friendly for on-the-go learning.'
    },
    {
      question: 'How do I receive my CE certificates?',
      answer: 'Certificates are generated instantly upon course completion and can be downloaded as PDF. We also maintain a permanent transcript in your account.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Solar Flare Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-200/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-100/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Header - Clean Medical Aesthetic */}
      <header className="relative bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo LEFT with pulse icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-lg bg-blue-400 animate-pulse opacity-50" />
                <div className="relative text-white text-xl">+</div>
              </div>
              <span className="text-xl font-bold text-slate-900">MediLearn</span>
            </div>

            {/* Nav spread evenly */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#courses" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Courses</a>
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#help" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Help</a>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Card-based Layout */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="bg-white rounded-3xl shadow-2xl shadow-blue-500/20 p-12 lg:p-16 relative overflow-hidden"
          >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgb(59,130,246)_1px,_transparent_0)] bg-[length:24px_24px]" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Advance Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                    Medical Expertise
                  </span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Evidence-based continuing education for healthcare professionals.
                  Earn accredited CE credits on your schedule, stay current with the
                  latest clinical practices, and elevate your patient care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                  >
                    Browse Courses
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-slate-100 text-blue-600 rounded-lg font-semibold hover:bg-slate-200 transition-all border border-blue-100"
                  >
                    View Accreditation
                  </motion.button>
                </div>
              </div>

              {/* Right Column - Medical Imagery */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <div className="text-center p-12">
                      <div className="text-8xl mb-6">🏥</div>
                      <div className="text-2xl font-bold text-blue-900 mb-2">Clinical Excellence</div>
                      <div className="text-blue-700">Evidence-Based Learning</div>
                    </div>
                  </div>
                </div>
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" as const }}
                  className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl shadow-blue-500/20 p-6 border border-blue-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                      <div className="text-sm text-slate-600">Avg. Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="rgba(255, 255, 255, 0.5)" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Trust Badges Section with Trust Badge Wildcard */}
      <section className="relative py-12 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Trust Badge Wildcard Element - Medical Cross Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-xl shadow-lg shadow-blue-500/20 border-2 border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-white rounded-full" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-white rounded-full" />
                </div>
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-lg">Trusted Healthcare Provider</div>
                <div className="text-sm text-blue-700">Accredited by Leading Medical Boards</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-slate-800">{badge.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialty Cards Section - 3 Column */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Specialty Areas
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert-led courses designed for your clinical specialty
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl p-8 shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all border border-blue-50"
              >
                <div className="text-6xl mb-4">{specialty.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {specialty.title}
                </h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${specialty.color}-100 text-${specialty.color}-700 font-semibold mb-4`}>
                  <GraduationCap className="w-4 h-4" />
                  {specialty.credits}
                </div>
                <div className="flex items-center gap-2 text-slate-600 mb-6">
                  <BookOpen className="w-4 h-4" />
                  <span>{specialty.courses} Courses Available</span>
                </div>
                <button className={`w-full py-3 bg-gradient-to-r from-${specialty.color}-600 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all`}>
                  Explore Courses
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section - 2 Column Layout */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-600 to-teal-500">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Trusted by Healthcare Professionals Nationwide
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of clinicians advancing their careers with
                accredited, evidence-based continuing education.
              </p>
            </motion.div>

            {/* Right - Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <stat.icon className="w-8 h-8 text-white mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Spotlight */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="bg-white rounded-2xl p-12 shadow-xl shadow-blue-500/10 border border-blue-50"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" />
              ))}
            </div>
            <blockquote className="text-2xl text-slate-700 mb-8 leading-relaxed italic">
              "The flexibility to complete CE credits between shifts has been invaluable.
              The content is always current, evidence-based, and directly applicable to
              my emergency department practice. Highly recommend for busy clinicians."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                SM
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Sarah Martinez, RN</div>
                <div className="text-slate-600">Emergency Department Nurse, 8 years</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CE Credits Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Earn Accredited CE Credits
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              All courses provide certified continuing education credits recognized by major accrediting bodies
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FileText,
                title: 'Automatic Tracking',
                description: 'Your CE credits are automatically recorded and tracked in your personalized dashboard'
              },
              {
                icon: Award,
                title: 'Instant Certificates',
                description: 'Download certificates immediately upon course completion - no waiting period'
              },
              {
                icon: Calendar,
                title: 'Renewal Reminders',
                description: 'Never miss a deadline with automatic renewal alerts and personalized recommendations'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 shadow-md shadow-blue-500/10 border border-blue-50 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our CE programs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md shadow-blue-500/10 border border-blue-50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-blue-50/50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    className="px-8 pb-6"
                  >
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blue Gradient CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Earning CE Credits Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join 50,000+ healthcare professionals advancing their careers with
              flexible, accredited continuing education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-blue-800/50 backdrop-blur-sm text-white rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-blue-800/70 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
            <p className="mt-6 text-blue-100 text-sm">
              No credit card required • Instant access • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
      <DesignNavigation currentVersion={11} />
    </div>
  );
};

export { HomePageV11 };
export default HomePageV11;
