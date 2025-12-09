import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV82() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      <DesignNavigation currentVersion={82} />

      {/* Blueprint Grid Background */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>

      {/* Header - Technical/Precise */}
      <header className="fixed top-0 w-full bg-white border-b-2 border-gray-900 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-gray-900 rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="w-10 h-10 bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CT</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-900 tracking-tight">COURSETUTOR</div>
                <div className="text-xs text-gray-500 tracking-widest">LEARNING SYSTEMS</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              <Link to="/courses" className="text-sm font-medium text-gray-700 hover:text-blue-600 tracking-wide uppercase">
                Courses
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 tracking-wide uppercase">
                About
              </Link>
              <Link to="/help" className="text-sm font-medium text-gray-700 hover:text-blue-600 tracking-wide uppercase">
                Help
              </Link>
            </div>

            {/* Auth */}
            <div className="flex items-center justify-end">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-2 text-sm font-medium tracking-wide uppercase">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-2 text-sm font-medium tracking-wide uppercase">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Architectural Blueprint Style */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 border-2 border-gray-900 px-4 py-2">
                  <div className="w-2 h-2 bg-blue-500" />
                  <span className="text-xs font-medium tracking-widest uppercase">
                    PRECISION EDUCATION
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-6xl font-bold text-gray-900 leading-none tracking-tight">
                  ENGINEERED
                  <span className="block text-blue-600">LEARNING</span>
                  <span className="block">SYSTEMS</span>
                </h1>

                <div className="flex items-start space-x-3 pt-4">
                  <div className="w-1 h-16 bg-blue-500 mt-1" />
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Structured curricula designed with architectural precision.
                    Every module, every lesson, every concept built to specification.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex space-x-4"
              >
                <Button className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase border-2 border-gray-900 hover:border-blue-600 transition-all">
                  View Blueprints
                </Button>
                <Button className="bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all">
                  Specifications
                </Button>
              </motion.div>

              {/* Technical Specs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-gray-200"
              >
                {[
                  { label: 'MODULES', value: '500+' },
                  { label: 'PRECISION', value: '99.9%' },
                  { label: 'STUDENTS', value: '10K+' }
                ].map((spec, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-xs text-gray-500 tracking-widest">{spec.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Blueprint Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px]"
            >
              {/* Main Frame */}
              <div className="absolute inset-0 border-2 border-gray-900 bg-white">
                {/* Technical Drawing Elements */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-xs font-medium">DRAWING NO: CT-001</div>
                    <div className="text-xs text-gray-500">SCALE: 1:1</div>
                  </div>
                  <div className="w-16 h-16 border-2 border-gray-900 flex items-center justify-center">
                    <div className="text-xs font-bold">A1</div>
                  </div>
                </div>

                {/* Geometric Patterns */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full">
                    {/* Outer Square */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-blue-500"
                    />

                    {/* Inner Square */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 border-2 border-cyan-500"
                    />

                    {/* Center Square */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-16 border-2 border-gray-900 bg-blue-500/10"
                    />

                    {/* Diagonal Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="100%" y1="0" x2="0" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>

                    {/* Corner Markers */}
                    {[
                      { top: 0, left: 0 },
                      { top: 0, right: 0 },
                      { bottom: 0, left: 0 },
                      { bottom: 0, right: 0 }
                    ].map((pos, index) => (
                      <div
                        key={index}
                        className="absolute w-4 h-4 border-2 border-gray-900"
                        style={pos}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Technical Info */}
                <div className="absolute bottom-4 left-4 right-4 border-t-2 border-gray-900 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="font-medium">DESIGNED BY</div>
                      <div className="text-gray-500">COURSETUTOR SYSTEMS</div>
                    </div>
                    <div>
                      <div className="font-medium">PROJECT</div>
                      <div className="text-gray-500">LEARNING PLATFORM</div>
                    </div>
                    <div>
                      <div className="font-medium">DATE</div>
                      <div className="text-gray-500">2024</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Dimension Markers */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-1/2 transform -translate-y-1/2"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-gray-900" />
                  <div className="text-xs font-medium whitespace-nowrap">500px</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid - Modular System */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 border-2 border-gray-900 px-4 py-2 mb-4">
              <span className="text-xs font-medium tracking-widest uppercase">SYSTEM COMPONENTS</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              MODULAR ARCHITECTURE
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border-2 border-gray-900">
            {[
              {
                number: '01',
                title: 'FOUNDATION MODULES',
                description: 'Core structural components engineered for stability',
                color: 'bg-blue-50'
              },
              {
                number: '02',
                title: 'ADVANCED SYSTEMS',
                description: 'Complex architectures for specialized applications',
                color: 'bg-cyan-50'
              },
              {
                number: '03',
                title: 'INTEGRATION FRAMEWORK',
                description: 'Seamless connectivity across all learning modules',
                color: 'bg-gray-50'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.color} p-8 border-r-2 border-gray-900 last:border-r-0 hover:bg-blue-100 transition-colors group`}
              >
                <div className="text-5xl font-bold text-gray-200 mb-4 group-hover:text-blue-200">
                  {feature.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center space-x-2">
                  <div className="w-full h-1 bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Technical Precision */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: '10,000+', unit: 'USERS', change: '+125%' },
              { metric: '500+', unit: 'COURSES', change: '+89%' },
              { metric: '99.9%', unit: 'UPTIME', change: '+0.2%' },
              { metric: '24/7', unit: 'SUPPORT', change: 'ACTIVE' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-white p-6 hover:bg-white hover:text-gray-900 transition-all group"
              >
                <div className="text-xs tracking-widest text-gray-400 group-hover:text-gray-600 mb-2">
                  {stat.unit}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.metric}</div>
                <div className="text-sm text-blue-400 group-hover:text-blue-600">{stat.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-4 border-gray-900 p-12 text-center relative"
          >
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500" />

            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              READY TO BUILD YOUR FUTURE?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our precision-engineered learning ecosystem
            </p>
            <Button className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 border-t-4 border-blue-500">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm tracking-widest">© 2024 COURSETUTOR LEARNING SYSTEMS</p>
        </div>
      </footer>
    </div>
  );
}
