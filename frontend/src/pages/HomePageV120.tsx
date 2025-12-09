import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState } from 'react';

export function HomePageV120() {
  const { isAuthenticated } = useAuth();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const bottomSheets = [
    {
      id: 'features',
      title: 'Features',
      color: 'from-blue-500 to-cyan-500',
      icon: '⚡',
      content: 'Discover powerful features that transform your workflow'
    },
    {
      id: 'pricing',
      title: 'Pricing',
      color: 'from-purple-500 to-pink-500',
      icon: '💎',
      content: 'Simple, transparent pricing for everyone'
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      color: 'from-green-500 to-emerald-500',
      icon: '⭐',
      content: 'See what our customers are saying'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <DesignNavigation currentVersion={120} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
            Pull Up & Explore
          </h1>
          <p className="text-2xl text-gray-600 mb-12">
            Mobile-inspired bottom sheets bring content to you
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-16">
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

          {/* Pull-up indicators */}
          <div className="flex gap-6 justify-center">
            {bottomSheets.map((sheet) => (
              <motion.button
                key={sheet.id}
                onClick={() => setActiveSheet(sheet.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br ${sheet.color} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer`}
              >
                <div className="text-4xl mb-2">{sheet.icon}</div>
                <div className="text-lg font-semibold">{sheet.title}</div>
                <div className="text-sm opacity-90 mt-1">Tap to explore</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stacked Cards Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Everything stacks up in your favor</p>
          </div>

          {/* Card Stack */}
          <div className="relative max-w-2xl mx-auto h-[600px]">
            {[
              { title: 'Lightning Fast', desc: 'Optimized performance for instant results', color: 'bg-blue-500', offset: 0 },
              { title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security', color: 'bg-purple-500', offset: 20 },
              { title: 'Easy to Use', desc: 'Intuitive interface that anyone can master', color: 'bg-pink-500', offset: 40 },
              { title: 'Always Available', desc: '99.9% uptime guaranteed', color: 'bg-green-500', offset: 60 },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: card.offset }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`absolute left-0 right-0 ${card.color} text-white rounded-3xl p-12 shadow-2xl`}
                style={{ top: `${card.offset}px` }}
              >
                <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                <p className="text-lg opacity-90">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: 'Active Users', color: 'text-blue-600' },
            { value: '1M+', label: 'Projects', color: 'text-purple-600' },
            { value: '99.9%', label: 'Uptime', color: 'text-pink-600' },
            { value: '24/7', label: 'Support', color: 'text-green-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-lg"
            >
              <div className={`text-5xl font-black ${stat.color} mb-3`}>
                {stat.value}
              </div>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Sheets */}
      <AnimatePresence>
        {activeSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-60px)] pb-8">
                {activeSheet === 'features' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-5xl">⚡</div>
                      <h3 className="text-4xl font-bold">Features</h3>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'Real-time Collaboration', desc: 'Work together seamlessly with your team' },
                        { title: 'Advanced Analytics', desc: 'Get insights that drive decisions' },
                        { title: 'Smart Automation', desc: 'Save time with intelligent workflows' },
                        { title: 'Cloud Storage', desc: 'Access your files anywhere, anytime' },
                        { title: 'API Integration', desc: 'Connect with your favorite tools' },
                      ].map((feature, i) => (
                        <div key={i} className="bg-gray-50 rounded-2xl p-6">
                          <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                          <p className="text-gray-600">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                    <Button size="lg" className="w-full mt-8" onClick={() => setActiveSheet(null)}>
                      Get Started
                    </Button>
                  </div>
                )}

                {activeSheet === 'pricing' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-5xl">💎</div>
                      <h3 className="text-4xl font-bold">Pricing</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Starter', price: '$9', features: ['10 users', '10GB storage'] },
                        { name: 'Pro', price: '$29', features: ['50 users', '100GB storage', 'Priority support'] },
                        { name: 'Enterprise', price: '$99', features: ['Unlimited users', 'Unlimited storage', '24/7 support'] },
                      ].map((plan, i) => (
                        <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-2xl font-bold">{plan.name}</h4>
                            <div className="text-3xl font-black">{plan.price}<span className="text-sm font-normal">/mo</span></div>
                          </div>
                          <ul className="space-y-2">
                            {plan.features.map((feature, j) => (
                              <li key={j} className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" className="w-full mt-4">
                            Choose Plan
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSheet === 'testimonials' && (
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-5xl">⭐</div>
                      <h3 className="text-4xl font-bold">Testimonials</h3>
                    </div>
                    <div className="space-y-6">
                      {[
                        { name: 'Sarah Johnson', role: 'CEO', text: 'This platform transformed our workflow completely. Highly recommended!' },
                        { name: 'Michael Chen', role: 'Developer', text: 'The best tool I\'ve used. Intuitive, fast, and powerful.' },
                        { name: 'Emily Davis', role: 'Designer', text: 'Beautiful interface and amazing features. Love it!' },
                        { name: 'David Wilson', role: 'Manager', text: 'Our team productivity increased by 50% after switching.' },
                      ].map((testimonial, i) => (
                        <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                              {testimonial.name[0]}
                            </div>
                            <div>
                              <div className="font-bold">{testimonial.name}</div>
                              <div className="text-sm text-gray-600">{testimonial.role}</div>
                            </div>
                          </div>
                          <p className="text-gray-700 italic">"{testimonial.text}"</p>
                          <div className="mt-3 text-yellow-500">★★★★★</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account in seconds', color: 'from-blue-500 to-cyan-500' },
              { step: '02', title: 'Customize', desc: 'Set up your workspace your way', color: 'from-purple-500 to-pink-500' },
              { step: '03', title: 'Collaborate', desc: 'Invite your team and start working', color: 'from-green-500 to-emerald-500' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${item.color} text-white rounded-3xl text-4xl font-black mb-6`}>
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-xl text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Integrates With Your Stack</h2>
            <p className="text-xl text-gray-600">Connect with tools you already use</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Slack', 'Google Drive', 'Dropbox', 'GitHub',
              'Trello', 'Asana', 'Zoom', 'Salesforce'
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-gray-900">{tool}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {[
              { q: 'What are bottom sheets?', a: 'Bottom sheets are mobile-inspired UI elements that slide up from the bottom of the screen to reveal additional content.' },
              { q: 'Can I dismiss a bottom sheet?', a: 'Yes, simply tap the backdrop or swipe down on the sheet handle to close it.' },
              { q: 'Are bottom sheets accessible?', a: 'Absolutely! They support keyboard navigation and screen readers for full accessibility.' },
              { q: 'Do they work on desktop?', a: 'Yes, bottom sheets provide a modern interaction pattern that works beautifully on all devices.' },
              { q: 'Can I customize the content?', a: 'Yes, bottom sheets can contain any content you need - forms, lists, images, and more.' },
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

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-2xl mb-12 opacity-90">
            Join thousands of users transforming their workflow
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-3xl font-bold mb-4">Pull Up</h4>
              <p className="text-gray-400">Interactive mobile experiences</p>
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
            <p>&copy; 2024 Pull Up Experience. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
