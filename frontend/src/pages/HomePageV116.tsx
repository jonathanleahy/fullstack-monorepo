import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV116() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <DesignNavigation currentVersion={116} />

      {/* Duotone Hero - Purple & Cyan */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-400">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 drop-shadow-2xl">
              DUOTONE
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-50 mb-12 font-light">
              Bold colors. High contrast. Pure impact.
            </p>
            <div className="flex gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-white text-purple-600 hover:bg-cyan-50 text-lg px-8 py-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button className="bg-white text-purple-600 hover:bg-cyan-50 text-lg px-8 py-6">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Block Features */}
      <section className="grid md:grid-cols-2">
        {/* Purple Block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-purple-500 p-16 md:p-24 text-white"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">POWERFUL</h2>
          <p className="text-xl mb-8 text-purple-100">
            Revolutionary features designed to transform your workflow with cutting-edge technology.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
            Learn More
          </Button>
        </motion.div>

        {/* Cyan Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-cyan-400 p-16 md:p-24 text-white"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">SIMPLE</h2>
          <p className="text-xl mb-8 text-cyan-100">
            Intuitive interface that makes complex tasks feel effortless and accessible to everyone.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-cyan-600">
            Explore
          </Button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-6xl font-black bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              10K+
            </div>
            <p className="text-xl text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-black bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              99.9%
            </div>
            <p className="text-xl text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-black bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              24/7
            </div>
            <p className="text-xl text-gray-600">Support</p>
          </div>
        </div>
      </section>

      {/* Alternating Color Blocks */}
      <section className="grid md:grid-cols-2">
        <div className="bg-cyan-400 aspect-square flex items-center justify-center">
          <div className="text-white text-center p-12">
            <h3 className="text-4xl font-black mb-4">COLLABORATE</h3>
            <p className="text-lg text-cyan-100">Work together seamlessly</p>
          </div>
        </div>
        <div className="bg-purple-500 aspect-square flex items-center justify-center">
          <div className="text-white text-center p-12">
            <h3 className="text-4xl font-black mb-4">INNOVATE</h3>
            <p className="text-lg text-purple-100">Push boundaries daily</p>
          </div>
        </div>
        <div className="bg-purple-500 aspect-square flex items-center justify-center">
          <div className="text-white text-center p-12">
            <h3 className="text-4xl font-black mb-4">SCALE</h3>
            <p className="text-lg text-purple-100">Grow without limits</p>
          </div>
        </div>
        <div className="bg-cyan-400 aspect-square flex items-center justify-center">
          <div className="text-white text-center p-12">
            <h3 className="text-4xl font-black mb-4">SUCCEED</h3>
            <p className="text-lg text-cyan-100">Achieve your goals</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            TESTIMONIALS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah K.', role: 'CEO', quote: 'Absolutely transformative for our team workflow' },
              { name: 'Mike T.', role: 'Designer', quote: 'The bold design speaks for itself - love it!' },
              { name: 'Lisa M.', role: 'Developer', quote: 'Fast, powerful, and beautifully designed' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="text-5xl font-black mb-4 bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  "
                </div>
                <p className="text-xl text-gray-700 mb-6">
                  {testimonial.quote}
                </p>
                <div className="text-lg font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gradient-to-br from-purple-500 to-cyan-400 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-black text-center mb-20 text-white">
            PRICING
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'STARTER', price: '$19', features: ['10 Users', '10GB Storage', 'Basic Support'] },
              { name: 'PRO', price: '$49', features: ['50 Users', '100GB Storage', 'Priority Support', 'Advanced Features'] },
              { name: 'ENTERPRISE', price: '$99', features: ['Unlimited Users', 'Unlimited Storage', '24/7 Support', 'Custom Features'] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 text-center"
              >
                <h3 className="text-3xl font-black mb-4">{plan.name}</h3>
                <div className="text-6xl font-black bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-8">
                  {plan.price}<span className="text-2xl">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-cyan-400 text-xl font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-br from-purple-500 to-cyan-400 text-white hover:opacity-90">
                  GET STARTED
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-br from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              { q: 'How do I get started?', a: 'Sign up for a free account and start exploring our features immediately.' },
              { q: 'Can I upgrade my plan?', a: 'Yes! You can upgrade or downgrade your plan at any time.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards and PayPal.' },
              { q: 'Is there a free trial?', a: 'Yes, all plans come with a 14-day free trial.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-black mb-3">{faq.q}</h3>
                <p className="text-xl text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-br from-purple-500 to-cyan-400 py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-7xl md:text-9xl font-black text-white mb-8">
            READY TO START?
          </h2>
          <p className="text-2xl text-white mb-12">
            Join thousands of users transforming their workflow today.
          </p>
          <Link to="/signup">
            <Button className="bg-white text-purple-600 hover:bg-cyan-50 text-xl px-16 py-8 font-bold">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-3xl font-black mb-4">DUOTONE</h4>
              <p className="text-gray-400">Bold colors. Pure impact.</p>
            </div>
            <div>
              <h5 className="text-xl font-black mb-4">PRODUCT</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-black mb-4">COMPANY</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-black mb-4">SUPPORT</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DUOTONE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
