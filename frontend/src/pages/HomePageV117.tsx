import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV117() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DesignNavigation currentVersion={117} />

      {/* Typography Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl"
        >
          <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-gray-900 mb-8">
            TYPE
          </h1>
          <div className="flex items-baseline gap-8 mb-12">
            <span className="text-6xl font-thin text-gray-400">is</span>
            <span className="text-8xl font-bold text-gray-800">EVERYTHING</span>
          </div>
          <p className="text-3xl md:text-4xl font-light text-gray-600 max-w-3xl mb-16 leading-relaxed">
            When words become art, every letter tells a story. Experience typography as you've never seen it before.
          </p>
          <div className="flex gap-6">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="text-2xl px-12 py-8 font-bold">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="text-2xl px-12 py-8 font-bold">
                    Start
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="lg" className="text-2xl px-12 py-8 font-light">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Large Text Feature */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[8rem] md:text-[15rem] font-black leading-none mb-16"
          >
            BOLD
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <p className="text-5xl font-light leading-tight text-gray-300">
                Make a statement with typography that commands attention
              </p>
            </div>
            <div className="text-right">
              <span className="text-9xl font-black">01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Text as Design Element */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <h2 className="text-[10rem] md:text-[18rem] font-black text-gray-100 leading-none">
              DESIGN
            </h2>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-12">
                <p className="text-4xl font-medium text-gray-900 mb-8">
                  Typography isn't just about reading—it's about feeling, experiencing, and connecting.
                </p>
                <Button variant="outline" size="lg" className="text-xl px-8 py-6">
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Text */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-3 flex justify-center">
            <div className="writing-mode-vertical text-9xl font-black text-gray-900 rotate-180">
              VERTICAL
            </div>
          </div>
          <div className="md:col-span-9 flex flex-col justify-center">
            <h3 className="text-7xl font-bold text-gray-900 mb-8">
              Break Conventions
            </h3>
            <p className="text-3xl font-light text-gray-600 mb-12 max-w-3xl">
              Typography doesn't follow rules—it creates them. Explore new dimensions of textual expression.
            </p>
            <div className="space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="text-8xl font-black text-gray-900">∞</span>
                <span className="text-2xl font-light text-gray-600">Infinite Possibilities</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-8xl font-black text-gray-900">✦</span>
                <span className="text-2xl font-light text-gray-600">Unique Expression</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mixed Weights */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-16">
              <span className="text-9xl font-thin text-gray-300">light</span>
              <span className="text-9xl font-normal text-gray-400 mx-8">regular</span>
              <span className="text-9xl font-bold text-gray-600">bold</span>
            </div>
            <div className="mb-16">
              <span className="text-[12rem] font-black text-gray-900">BLACK</span>
            </div>
            <p className="text-4xl font-light text-gray-600 max-w-4xl mx-auto mb-12">
              Every weight tells a different story. Master the art of typographic hierarchy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Numeric Focus */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          <div>
            <div className="text-[10rem] font-black leading-none mb-4">24</div>
            <p className="text-2xl font-light">Hours Support</p>
          </div>
          <div>
            <div className="text-[10rem] font-black leading-none mb-4">∞</div>
            <p className="text-2xl font-light">Possibilities</p>
          </div>
          <div>
            <div className="text-[10rem] font-black leading-none mb-4">01</div>
            <p className="text-2xl font-light">Platform</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[8rem] md:text-[12rem] font-black leading-none mb-20">
            LOVE
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: 'Sarah Chen', role: 'Creative Director', quote: 'Typography has never felt this alive and expressive.' },
              { name: 'Marcus Lee', role: 'Designer', quote: 'The attention to detail is extraordinary. Pure artistry.' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-white pl-8"
              >
                <p className="text-3xl font-light mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="text-2xl font-bold">{testimonial.name}</div>
                <div className="text-xl font-light text-gray-400">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Typography */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[10rem] md:text-[16rem] font-black leading-none text-gray-100 mb-16">
            PLANS
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Starter', price: '29', features: ['Core Features', '10 Projects', 'Email Support'] },
              { name: 'Pro', price: '79', features: ['All Features', 'Unlimited Projects', 'Priority Support', 'Advanced Tools'], highlight: true },
              { name: 'Enterprise', price: '199', features: ['White Label', 'Custom Solutions', 'Dedicated Support', 'SLA Guarantee'] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-12 rounded-3xl ${plan.highlight ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
              >
                <div className="text-6xl font-thin mb-4">{plan.name}</div>
                <div className="flex items-baseline mb-8">
                  <span className="text-8xl font-black">${plan.price}</span>
                  <span className="text-3xl font-light ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-xl font-light">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "secondary" : "default"}
                  size="lg"
                  className="w-full text-xl py-6"
                >
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Typography Style */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative mb-20">
            <h2 className="text-[8rem] md:text-[12rem] font-black text-gray-200 leading-none">
              FAQ
            </h2>
            <div className="absolute inset-0 flex items-center">
              <p className="text-3xl font-light text-gray-900">
                Questions & Answers
              </p>
            </div>
          </div>
          <div className="space-y-12">
            {[
              { q: 'What makes typography important?', a: 'Typography is the foundation of visual communication. Every letter, every word, carries weight and meaning beyond its literal content.' },
              { q: 'How do I choose the right typeface?', a: 'Consider your message, audience, and medium. The right typeface amplifies your message; the wrong one can undermine it.' },
              { q: 'Can I use custom fonts?', a: 'Absolutely. We support all major font formats and provide tools for optimal typography control.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold mb-4">{faq.q}</h3>
                <p className="text-2xl font-light text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Typography */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[10rem] md:text-[20rem] font-black leading-none text-gray-900 mb-16">
            JOIN
          </h2>
          <p className="text-5xl font-light text-gray-600 mb-16">
            Be part of something bigger
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-3xl px-16 py-10 font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer with Typography Focus */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-6xl font-black mb-4">TYPE</div>
              <p className="text-xl font-light text-gray-400">Words as art</p>
            </div>
            <div>
              <h5 className="text-2xl font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-lg font-light text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Templates</li>
              </ul>
            </div>
            <div>
              <h5 className="text-2xl font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-lg font-light text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h5 className="text-2xl font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-lg font-light text-gray-400">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-lg font-light text-gray-400">&copy; 2024 Typography Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
