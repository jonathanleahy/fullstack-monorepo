/**
 * HomePageV15 - Finance/Accounting Professionals Persona
 *
 * Reference: docs/website-brief.md
 * Target Audience: Finance and accounting professionals (Age 28-55)
 * Tone: Precise, authoritative, results-driven
 * Color Scheme: Deep green/emerald primary (emerald-800, green-700)
 * Design: Conservative shadows (shadow-sm), NO solar flares
 * Effects: Subtle grid/chart texture at opacity-[0.03]
 * Sales Focus: CPE credits, compliance updates, career advancement
 *
 * Layout Flow:
 * Professional hero with charts → Certification badges → 2-column intro →
 * 4-col certification tracks → Single authoritative testimonial →
 * ROI calculator style section → FAQ → Dark green CTA
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  Shield,
  BookOpen,
  CheckCircle,
  ChevronRight,
  BarChart3,
  Calculator,
  FileCheck,
  GraduationCap,
  Clock,
  Target,
  Plus,
  Minus,
} from 'lucide-react';
import { DesignNavigation } from '../components/DesignNavigation';

const HomePageV15: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const certificationTracks = [
    {
      icon: Award,
      title: 'CPA/CMA Track',
      credits: '40 CPE Credits/Year',
      topics: ['GAAP Updates', 'Tax Law Changes', 'Audit Standards'],
      color: 'emerald',
    },
    {
      icon: Shield,
      title: 'Compliance Track',
      credits: '32 CPE Credits/Year',
      topics: ['SOX Requirements', 'IFRS Standards', 'Regulatory Changes'],
      color: 'green',
    },
    {
      icon: BarChart3,
      title: 'Analytics Track',
      credits: '28 CPE Credits/Year',
      topics: ['Financial Modeling', 'Data Analytics', 'Power BI'],
      color: 'teal',
    },
    {
      icon: TrendingUp,
      title: 'Leadership Track',
      credits: '24 CPE Credits/Year',
      topics: ['CFO Skills', 'Team Management', 'Strategic Planning'],
      color: 'cyan',
    },
  ];

  const roiMetrics = [
    {
      value: '40+',
      label: 'Annual CPE Credits',
      description: 'Meet certification requirements',
    },
    {
      value: '$2,400',
      label: 'Average Salary Increase',
      description: 'After certification completion',
    },
    {
      value: '87%',
      label: 'Pass Rate',
      description: 'First-time exam success',
    },
    {
      value: '6 Months',
      label: 'Average Completion',
      description: 'Flexible self-paced learning',
    },
  ];

  const faqs = [
    {
      question: 'Are your courses approved for CPE credits?',
      answer: 'Yes, all our courses are approved by NASBA and meet the requirements for CPE credits across all major accounting certifications including CPA, CMA, and CIA.',
    },
    {
      question: 'How quickly can I complete a certification track?',
      answer: 'Our self-paced format allows you to complete tracks in 3-12 months depending on your schedule. Most professionals complete 1-2 courses per month while working full-time.',
    },
    {
      question: 'What if I fail an exam?',
      answer: 'You receive unlimited exam retakes at no additional cost. Plus, our adaptive learning system identifies weak areas and provides targeted review materials.',
    },
    {
      question: 'Do you offer group licensing for firms?',
      answer: 'Yes, we offer enterprise solutions for accounting firms with volume discounts, dedicated support, and customized learning paths for your team.',
    },
    {
      question: 'How current is the content?',
      answer: 'All content is updated quarterly to reflect the latest GAAP, IFRS, tax law changes, and regulatory requirements. You always learn the most current standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Subtle Grid Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #059669 1px, transparent 1px),
            linear-gradient(to bottom, #059669 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Header - Conservative Banking Style */}
      <header className="relative bg-white border-b-2 border-emerald-100 shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-700 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">FinanceLearn</span>
            </div>

            {/* Nav with dropdown indicators */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1 text-slate-700 hover:text-emerald-700 transition-colors font-medium cursor-pointer">
                <span>Courses</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
              <div className="flex items-center gap-1 text-slate-700 hover:text-emerald-700 transition-colors font-medium cursor-pointer">
                <span>About</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
              <a href="#help" className="text-slate-700 hover:text-emerald-700 transition-colors font-medium">Help</a>
              <button className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold transition-all shadow-sm">
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Numbers-Forward Design, Text RIGHT */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Large Stat Prominently Displayed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-12 rounded-2xl shadow-2xl shadow-emerald-500/20 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold text-emerald-100">NASBA Approved Provider</span>
                </div>

                {/* Large prominent number */}
                <div className="mb-6">
                  <div className="text-8xl font-bold mb-2">87%</div>
                  <div className="text-2xl text-emerald-100">First-Time Pass Rate</div>
                </div>

                <div className="border-t border-emerald-600 pt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">40+</div>
                      <div className="text-xs text-emerald-200">CPE Credits</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-xs text-emerald-200">Courses</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">$2.4k</div>
                      <div className="text-xs text-emerald-200">Avg. Raise</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary chart visual */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
                className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900 text-sm">Career Growth</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Staff', value: 40 },
                    { label: 'Senior', value: 60 },
                    { label: 'Manager', value: 80 },
                    { label: 'CFO', value: 100 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-16">{item.label}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.4, ease: "easeOut" as const }}
                          className="h-full bg-emerald-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="text-right"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Advance Your
                <span className="block text-emerald-700">Accounting Career</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Earn CPE credits, stay current with compliance requirements, and accelerate your
                professional growth with industry-recognized certifications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-end mb-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-all shadow-sm hover:shadow-md group"
                >
                  Start Learning
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-all border-2 border-emerald-700"
                >
                  Browse CPE Courses
                </Link>
              </div>

              <div className="flex justify-end gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>NASBA Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Self-Paced</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="white" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Certification Badges with Bold Number Wildcard */}
      <section className="py-12 px-4 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Bold Number Highlight Wildcard Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="flex justify-center mb-12"
          >
            <div className="relative inline-flex items-center gap-6 px-10 py-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
              <div className="text-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 relative">
                  40+
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-30" />
                </div>
                <div className="text-sm font-semibold text-emerald-800 mt-2">Annual CPE Credits Available</div>
              </div>
              <div className="w-px h-16 bg-emerald-300" />
              <div className="text-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 relative">
                  87%
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-30" />
                </div>
                <div className="text-sm font-semibold text-emerald-800 mt-2">First-Time Pass Rate</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-8"
          >
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Approved For Major Certifications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {['CPA', 'CMA', 'CIA', 'CFE'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" as const }}
                className="flex items-center gap-3"
              >
                <Award className="w-8 h-8 text-emerald-600" />
                <span className="text-2xl font-bold text-slate-900">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2-Column Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Stay Compliant, Stay Competitive
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In today's rapidly evolving regulatory environment, maintaining your professional
                edge requires continuous learning. Our comprehensive platform delivers the CPE
                credits you need while keeping you current with the latest standards and practices.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're pursuing CPA, CMA, or advancing to a leadership role, our
                structured learning paths are designed by industry experts to deliver measurable
                career results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
              className="space-y-4"
            >
              {[
                {
                  icon: CheckCircle,
                  title: 'NASBA Approved',
                  description: 'All courses meet state board requirements for CPE credits',
                },
                {
                  icon: Clock,
                  title: 'Self-Paced Learning',
                  description: 'Study on your schedule while maintaining full-time work',
                },
                {
                  icon: FileCheck,
                  title: 'Current Content',
                  description: 'Quarterly updates ensure compliance with latest standards',
                },
                {
                  icon: Target,
                  title: 'Career Advancement',
                  description: 'Structured paths from staff accountant to CFO level',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" as const }}
                  className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4-Column Certification Tracks */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose Your Certification Track
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Structured learning paths designed to meet your specific professional requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationTracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-${track.color}-100 flex items-center justify-center mb-4`}>
                  <track.icon className={`w-6 h-6 text-${track.color}-600`} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{track.title}</h3>
                <p className="text-emerald-700 font-semibold mb-4">{track.credits}</p>

                <ul className="space-y-2 mb-6">
                  {track.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:gap-3 transition-all"
                >
                  View Courses
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Single Authoritative Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl p-12 text-white shadow-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xl leading-relaxed mb-6">
                  "This platform helped me earn my CPA while working full-time at a Big 4 firm.
                  The CPE credits were seamlessly integrated, and the content was more current than
                  my undergraduate coursework. I passed all four sections on the first try and
                  received a promotion within six months."
                </p>
                <div>
                  <div className="font-bold text-lg">Sarah Chen, CPA</div>
                  <div className="text-emerald-100">Senior Auditor, Deloitte</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Style Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Investment, Measured
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quantifiable results that advance your career and meet certification requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roiMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center"
              >
                <div className="text-4xl font-bold text-emerald-700 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">{metric.label}</div>
                <div className="text-sm text-slate-600">{metric.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" as const }}
            className="mt-12 bg-white rounded-xl p-8 border border-slate-200 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Calculator className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Calculate Your ROI
                </h3>
                <p className="text-slate-600 mb-6">
                  Our typical student recoups their investment within 4-6 months through salary
                  increases, promotions, and billable hour rate improvements.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:gap-3 transition-all"
                >
                  View Pricing Options
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Annual Platform Cost</span>
                  <span className="font-bold text-slate-900">$1,200</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Average Salary Increase</span>
                  <span className="font-bold text-emerald-700">+$2,400</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-emerald-100 rounded-lg border-2 border-emerald-300">
                  <span className="text-slate-900 font-semibold">Net Benefit Year 1</span>
                  <span className="font-bold text-emerald-700 text-xl">+$1,200</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about CPE credits and certification
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
                className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                </button>

                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    className="px-6 pb-6"
                  >
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Green CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-800 to-emerald-900">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Earning CPE Credits Today
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Join thousands of accounting professionals who trust our platform for their
              continuing education and career advancement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-sm group"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all border-2 border-white/20"
              >
                <BookOpen className="w-5 h-5" />
                Request Demo
              </Link>
            </div>

            <p className="text-emerald-200 text-sm">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
      <DesignNavigation currentVersion={15} />
    </div>
  );
};

export { HomePageV15 };
export default HomePageV15;
