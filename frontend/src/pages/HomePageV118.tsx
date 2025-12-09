import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV118() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <DesignNavigation currentVersion={118} />

      {/* Hero Section with Overlapping Card */}
      <section className="relative pt-32 pb-64 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Layered Experience
            </h1>
            <p className="text-2xl text-gray-600 mb-12">
              Discover depth through overlapping design elements that create visual hierarchy
            </p>
            <div className="flex gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="text-lg px-8 py-6">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Overlapping Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative -mb-32 mt-16 max-w-6xl mx-auto px-6 z-10"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Optimized performance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure</h3>
                <p className="text-gray-600">Enterprise-grade security</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Powerful</h3>
                <p className="text-gray-600">Advanced features</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Overlapping Features Section */}
      <section className="relative pt-48 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6">Built for Scale</h2>
              <p className="text-xl text-gray-600 mb-8">
                Handle millions of requests with ease. Our infrastructure is designed to grow with your business.
              </p>
              <Button variant="outline" size="lg">Learn More</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-xl">
                <h3 className="text-3xl font-bold mb-4">99.99% Uptime</h3>
                <p className="text-blue-100 mb-6">Reliable service you can count on</p>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Performance</span>
                    <span>98%</span>
                  </div>
                  <div className="bg-white/30 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-[98%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stacked Cards with Overlap */}
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-12 shadow-xl relative z-30 -mb-16"
            >
              <div className="max-w-2xl">
                <h3 className="text-4xl font-bold mb-4">Collaborative Workspace</h3>
                <p className="text-xl text-gray-600">
                  Work together seamlessly with real-time collaboration tools
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 shadow-xl relative z-20 ml-12 -mb-16"
            >
              <div className="max-w-2xl ml-auto">
                <h3 className="text-4xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-xl text-gray-600">
                  Get insights that drive better decision making
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-xl relative z-10 ml-24"
            >
              <div className="max-w-2xl">
                <h3 className="text-4xl font-bold mb-4">Automated Workflows</h3>
                <p className="text-xl text-gray-600">
                  Save time with intelligent automation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overlapping Stats */}
      <section className="relative py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">Join the growing community</p>
          </div>

          <div className="relative max-w-4xl mx-auto h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 bg-white rounded-3xl shadow-xl p-12 w-80 z-30"
            >
              <div className="text-6xl font-black text-blue-600 mb-4">50K+</div>
              <p className="text-xl font-semibold">Active Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute top-20 right-20 bg-white rounded-3xl shadow-xl p-12 w-80 z-20"
            >
              <div className="text-6xl font-black text-purple-600 mb-4">1M+</div>
              <p className="text-xl font-semibold">Projects Created</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-xl p-12 w-80 z-10"
            >
              <div className="text-6xl font-black text-green-600 mb-4">24/7</div>
              <p className="text-xl font-semibold">Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials with Overlap */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real people</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: 'Jennifer Smith', role: 'Product Manager', quote: 'The layered design approach changed how we think about user interfaces. Absolutely brilliant!', color: 'from-blue-500 to-purple-600' },
              { name: 'Alex Thompson', role: 'Designer', quote: 'Every element feels intentional. The overlapping cards create such a dynamic experience.', color: 'from-pink-500 to-orange-600' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${testimonial.color} text-white rounded-3xl p-12 shadow-xl`}
              >
                <div className="text-6xl mb-4 opacity-50">"</div>
                <p className="text-2xl mb-8 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xl">{testimonial.name}</div>
                    <div className="text-white/80">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Overlapping Cards */}
      <section className="relative py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible pricing that scales with you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$19', features: ['10 Users', '10GB Storage', 'Email Support', 'Basic Features'], color: 'from-blue-100 to-cyan-100' },
              { name: 'Professional', price: '$49', features: ['50 Users', '100GB Storage', 'Priority Support', 'Advanced Features', 'API Access'], color: 'from-purple-100 to-pink-100', highlight: true },
              { name: 'Enterprise', price: '$99', features: ['Unlimited Users', 'Unlimited Storage', '24/7 Support', 'All Features', 'Custom Integration'], color: 'from-green-100 to-emerald-100' },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${plan.color} rounded-3xl p-8 shadow-xl ${plan.highlight ? 'scale-105 shadow-2xl' : ''}`}
              >
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="text-6xl font-black mb-6">
                  {plan.price}<span className="text-2xl font-normal">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-green-600 text-xl font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? "default" : "outline"} className="w-full">
                  Choose {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {[
              { q: 'How does the layered design work?', a: 'Our overlapping elements create depth and visual hierarchy, making information easier to digest and more engaging.' },
              { q: 'Can I customize the overlap effects?', a: 'Yes! All spacing, shadows, and overlap distances are fully customizable to match your brand.' },
              { q: 'Is it mobile-responsive?', a: 'Absolutely. The layered design adapts beautifully to all screen sizes while maintaining visual impact.' },
              { q: 'What browsers are supported?', a: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{faq.q}</h3>
                <p className="text-xl text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Overlapping Elements */}
      <section className="relative py-32 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-12 text-indigo-100">
            Join thousands of users transforming their workflow
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-12 py-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-3xl font-bold mb-4">Layered</h4>
              <p className="text-gray-400">Design with depth</p>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Layered Experience. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
