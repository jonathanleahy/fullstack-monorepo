import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV121() {
  const { isAuthenticated } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <DesignNavigation currentVersion={121} />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="container mx-auto px-6 pt-32 pb-20"
      >
        <motion.h1
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold text-gray-900 mb-6 text-center"
        >
          Discover As You Scroll
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto"
        >
          Experience content that reveals itself as you explore. Each scroll brings new insights and discoveries.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="default" className="text-lg px-8 py-6">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="default" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </motion.section>

      {/* Feature Cards - Staggered Reveal */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-6 py-20 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Features That Matter
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Smart Learning', desc: 'AI-powered content that adapts to your pace', icon: '🧠' },
            { title: 'Progress Tracking', desc: 'Visual insights into your learning journey', icon: '📊' },
            { title: 'Interactive Content', desc: 'Engaging materials that keep you motivated', icon: '🎯' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section - Number Counters */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="container mx-auto px-6 py-20 bg-gradient-to-r from-indigo-50 to-pink-50"
      >
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50K+', label: 'Active Learners' },
            { number: '1M+', label: 'Lessons Completed' },
            { number: '95%', label: 'Success Rate' },
            { number: '4.9★', label: 'User Rating' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="text-5xl font-bold text-indigo-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials - Fade In */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-6 py-20 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: 'The scroll-based reveal makes learning feel like an adventure. Each new section is a pleasant surprise!', author: 'Sarah Chen' },
            { quote: 'I love how content appears naturally as I read. It keeps me engaged without feeling overwhelming.', author: 'Marcus Johnson' }
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-md"
            >
              <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-gray-900 font-semibold">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-6 py-20 bg-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Free', price: '$0', features: ['Basic courses', 'Community access', 'Progress tracking'], color: 'from-gray-50 to-slate-50' },
            { name: 'Pro', price: '$29', features: ['All courses', 'Certificates', 'Priority support', '1-on-1 mentoring'], color: 'from-blue-50 to-indigo-50', popular: true },
            { name: 'Team', price: '$99', features: ['Everything in Pro', 'Team analytics', 'Custom content', 'Dedicated account manager'], color: 'from-purple-50 to-pink-50' }
          ].map((plan, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`bg-gradient-to-br ${plan.color} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all ${plan.popular ? 'ring-4 ring-blue-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 text-xl">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block">
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-6 py-20 bg-gradient-to-b from-slate-50 to-white"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: 'How long do I have access to courses?', a: 'You have lifetime access to all courses you enroll in, including future updates.' },
            { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
            { q: 'Is there a refund policy?', a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment.' },
            { q: 'Do I need any prerequisites?', a: 'Most courses are designed for beginners. Advanced courses will clearly state prerequisites.' }
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who are transforming their skills with our platform.
          </p>
          <Link to="/signup">
            <Button variant="default" className="text-lg px-12 py-6">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 Course Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
