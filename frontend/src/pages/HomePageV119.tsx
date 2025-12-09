import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState } from 'react';

export function HomePageV119() {
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'pricing', label: 'Pricing', icon: '💎' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DesignNavigation currentVersion={119} />

      {/* Persistent Sidebar */}
      <aside className="hidden md:flex md:w-72 bg-white border-r border-gray-200 flex-col fixed h-screen z-40">
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-3xl font-black text-gray-900">AppName</h1>
          <p className="text-sm text-gray-500 mt-2">Your workspace</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200 space-y-3">
          {isAuthenticated ? (
            <Link to="/dashboard" className="block">
              <Button className="w-full">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/signup" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-40">
        <h1 className="text-2xl font-black text-gray-900">AppName</h1>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 pt-20 md:pt-0">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center"
          >
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Welcome to the Future
            </h2>
            <p className="text-2xl text-gray-600 mb-12">
              Experience a new way of working with our app-like sidebar navigation
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-screen bg-white py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features</h2>
              <p className="text-xl text-gray-600">Everything you need to succeed</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Fast Performance', desc: 'Lightning-fast load times', icon: '⚡' },
                { title: 'Secure by Default', desc: 'Enterprise-grade security', icon: '🔒' },
                { title: 'Easy Integration', desc: 'Connect with your tools', icon: '🔌' },
                { title: 'Real-time Sync', desc: 'Always up to date', icon: '🔄' },
                { title: 'Smart Analytics', desc: 'Actionable insights', icon: '📊' },
                { title: '24/7 Support', desc: 'We\'re here to help', icon: '💬' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen bg-gray-50 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-xl text-gray-600">Building the future of productivity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-12 shadow-xl"
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                We're on a mission to transform how teams collaborate and work together.
                Our platform combines cutting-edge technology with intuitive design to create
                an experience that's both powerful and delightful.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Founded in 2024, we've grown to serve thousands of teams worldwide, helping
                them achieve more together.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-600 mb-2">50K+</div>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-600 mb-2">150+</div>
                  <p className="text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-600 mb-2">99.9%</div>
                  <p className="text-gray-600">Uptime</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="min-h-screen bg-white py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Simple Pricing</h2>
              <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$9', features: ['Up to 10 users', '10GB storage', 'Basic support'] },
                { name: 'Pro', price: '$29', features: ['Up to 50 users', '100GB storage', 'Priority support', 'Advanced features'], highlight: true },
                { name: 'Enterprise', price: '$99', features: ['Unlimited users', 'Unlimited storage', '24/7 support', 'Custom features'] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-3xl p-8 ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl scale-105'
                      : 'bg-gray-50'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-5xl font-black mb-6">
                    {plan.price}<span className="text-2xl font-normal">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlight ? "secondary" : "default"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600">We'd love to hear from you</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-12 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="text-lg font-semibold">hello@example.com</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Phone</p>
                      <p className="text-lg font-semibold">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Address</p>
                      <p className="text-lg font-semibold">123 Main St, San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button size="lg" className="w-full mb-4">Send Message</Button>
                  <Button variant="outline" size="lg" className="w-full">Schedule Call</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="min-h-screen bg-white py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">What Users Say</h2>
              <p className="text-xl text-gray-600">Loved by teams worldwide</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'Rachel Green', role: 'Marketing Director', quote: 'The sidebar navigation feels so natural. It\'s like having a desktop app right in the browser!', rating: 5 },
                { name: 'Tom Wilson', role: 'Developer', quote: 'Clean, intuitive, and fast. This is how all web apps should feel.', rating: 5 },
                { name: 'Emma Davis', role: 'Designer', quote: 'Beautiful interface and thoughtful UX. Our team loves using it daily.', rating: 5 },
                { name: 'James Brown', role: 'CEO', quote: 'Increased our productivity by 40%. Best decision we made this year.', rating: 5 },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="min-h-screen bg-gray-50 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Common Questions</h2>
              <p className="text-xl text-gray-600">Quick answers to help you get started</p>
            </motion.div>

            <div className="space-y-6">
              {[
                { q: 'How does the sidebar navigation work?', a: 'The sidebar provides persistent navigation that stays visible as you scroll, making it easy to jump between sections quickly.' },
                { q: 'Is it mobile-friendly?', a: 'Yes! On mobile devices, the navigation collapses to a top bar for optimal space usage.' },
                { q: 'Can I customize the sidebar?', a: 'Absolutely. You can customize colors, icons, and menu items to match your brand.' },
                { q: 'What integrations are available?', a: 'We integrate with popular tools like Slack, Google Workspace, Microsoft Teams, and more.' },
                { q: 'Is there a free trial?', a: 'Yes, we offer a 14-day free trial with full access to all features.' },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-3">{faq.q}</h3>
                  <p className="text-xl text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-32 px-6 flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl font-bold mb-6">Start Your Journey Today</h2>
              <p className="text-2xl mb-12 opacity-90">
                Join 50,000+ users already transforming their workflow
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-8">
                    Get Started Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-8">
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h4 className="text-3xl font-black mb-4">AppName</h4>
                <p className="text-gray-400">Your workspace, reimagined</p>
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
              <p>&copy; 2024 AppName. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
