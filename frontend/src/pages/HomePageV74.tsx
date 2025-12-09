import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV74() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { value: '10x', label: 'Faster Learning', icon: '⚡' },
    { value: '95%', label: 'Completion Rate', icon: '🎯' },
    { value: '$2M', label: 'Career Growth', icon: '💰' },
    { value: '50K+', label: 'Success Stories', icon: '🚀' },
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Founder', expertise: 'EdTech Visionary' },
    { name: 'Marcus Wright', role: 'CTO', expertise: 'AI/ML Expert' },
    { name: 'Lisa Park', role: 'Head of Learning', expertise: 'Pedagogy Specialist' },
    { name: 'James Rodriguez', role: 'VP Product', expertise: 'UX Innovation' },
  ];

  const roadmap = [
    { quarter: 'Q1 2024', milestone: 'Beta Launch', status: 'completed', description: '500+ early adopters' },
    { quarter: 'Q2 2024', milestone: 'AI Tutor Release', status: 'completed', description: 'Personalized learning paths' },
    { quarter: 'Q3 2024', milestone: 'Mobile App', status: 'in-progress', description: 'Learn on the go' },
    { quarter: 'Q4 2024', milestone: 'Enterprise Plan', status: 'planned', description: 'Team collaboration tools' },
  ];

  const investors = [
    { name: 'TechVentures', type: 'Lead Investor', amount: '$5M Series A' },
    { name: 'EduFund Capital', type: 'Strategic Partner', amount: '$2M Seed' },
    { name: 'Innovation Labs', type: 'Angel Investor', amount: '$500K Pre-seed' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={74} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-bold text-xl text-gray-900">LearnStack</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Help</Link>
          </div>

          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Pitch Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full text-sm shadow-lg uppercase tracking-wide">
                🚀 Series A Funded - $5M Raised
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Revolutionizing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Online Education
              </span>
            </h1>

            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              We're solving the $300B problem in education: personalized learning at scale with AI-powered courses that adapt to every student.
            </p>

            <div className="flex justify-center space-x-4 mb-16">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-4 text-lg font-bold">
                Request Demo
              </Button>
              <Button variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-4 text-lg font-bold">
                Download Deck
              </Button>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg"
                >
                  <div className="text-4xl mb-3">{metric.icon}</div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-gray-600 font-medium">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-rose-100 text-rose-700 font-bold rounded-full text-sm mb-6">
                THE PROBLEM
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Traditional Learning is Broken</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">One-Size-Fits-All</h3>
                    <p className="text-gray-600">70% of students struggle because courses don't adapt to their learning style</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Low Engagement</h3>
                    <p className="text-gray-600">Average completion rate of online courses is only 15%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Outdated Content</h3>
                    <p className="text-gray-600">Tech skills become obsolete in 18 months, courses can't keep up</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm mb-6">
                OUR SOLUTION
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">AI-Powered Adaptive Learning</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Personalized Paths</h3>
                    <p className="text-gray-600">AI analyzes learning patterns and creates custom curricula for each student</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Gamified Experience</h3>
                    <p className="text-gray-600">95% completion rate through engaging, game-like progression</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Real-Time Updates</h3>
                    <p className="text-gray-600">Content automatically refreshes based on industry trends and feedback</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Roadmap</h2>
            <p className="text-xl text-gray-600">Our journey to transforming education</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-600 hidden md:block" />

            <div className="space-y-12">
              {roadmap.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-3 ${
                      item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.quarter}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.milestone}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>

                  <div className="relative flex items-center justify-center w-12 h-12 mx-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-emerald-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}>
                      {item.status === 'completed' ? (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : item.status === 'in-progress' ? (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">Industry veterans building the future of education</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Backed by Industry Leaders</h2>
            <p className="text-xl text-gray-600">Strategic partners who believe in our vision</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {investors.map((investor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border-2 border-emerald-200 shadow-lg text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{investor.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{investor.type}</p>
                <p className="text-3xl font-bold text-gray-900">{investor.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Education Revolution
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Be part of the platform transforming how millions learn and grow
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-bold">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
