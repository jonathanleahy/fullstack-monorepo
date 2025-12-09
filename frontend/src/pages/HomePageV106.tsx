import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV106() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <DesignNavigation currentVersion={106} />

      {/* Glassmorphism Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Course Tutor
              </motion.h1>
              <nav className="flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" className="backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/30">
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile">
                      <Button variant="default" className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg">
                        Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="backdrop-blur-md bg-white/40 hover:bg-white/60 border border-white/30">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="default" className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Learn Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience personalized learning with AI-powered course recommendations and real-time progress tracking.
              </p>
              <div className="flex gap-4">
                <Link to="/courses">
                  <Button variant="default" className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-xl text-lg px-8 py-6">
                    Explore Courses
                  </Button>
                </Link>
                <Button variant="outline" className="backdrop-blur-md bg-white/50 hover:bg-white/70 border-2 border-purple-300 text-purple-700 text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 border border-white/30 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-white/60 to-white/30 p-6 rounded-2xl border border-white/40 shadow-lg">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">Interactive Learning</h3>
                  <p className="text-gray-600">Engage with hands-on projects and real-world scenarios</p>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-white/60 to-white/30 p-6 rounded-2xl border border-white/40 shadow-lg">
                  <h3 className="text-xl font-semibold text-pink-700 mb-2">Expert Instructors</h3>
                  <p className="text-gray-600">Learn from industry professionals with years of experience</p>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-white/60 to-white/30 p-6 rounded-2xl border border-white/40 shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">Flexible Schedule</h3>
                  <p className="text-gray-600">Study at your own pace, anytime and anywhere</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'AI-Powered', description: 'Smart recommendations based on your learning style', icon: '🤖' },
              { title: 'Community', description: 'Connect with learners worldwide', icon: '🌍' },
              { title: 'Certificates', description: 'Earn recognized certifications', icon: '🎓' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white/60 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            What Our Students Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', role: 'Web Developer', quote: 'Course Tutor helped me land my dream job in just 6 months!', rating: 5 },
              { name: 'John D.', role: 'Data Scientist', quote: 'The best learning platform I have ever used. Highly recommended!', rating: 5 },
              { name: 'Emma L.', role: 'UX Designer', quote: 'The personalized approach made all the difference in my learning journey.', rating: 5 }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/40 shadow-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-12 border border-white/30 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '50K+', label: 'Active Students' },
                { value: '1000+', label: 'Courses Available' },
                { value: '200+', label: 'Expert Instructors' },
                { value: '95%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Choose Your Plan
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$29', period: 'month', features: ['Access to all courses', 'Community support', 'Mobile app access', 'Basic analytics'] },
              { name: 'Pro', price: '$79', period: 'month', features: ['Everything in Basic', 'Priority support', 'Advanced analytics', 'Certification prep', 'Live sessions'], popular: true },
              { name: 'Enterprise', price: '$199', period: 'month', features: ['Everything in Pro', 'Dedicated account manager', 'Custom learning paths', 'API access', 'Team management'] }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`backdrop-blur-xl rounded-2xl p-8 border shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 scale-105' : 'bg-white/50 border-white/40'
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-2 border-purple-300 text-purple-700'}`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {[
              { q: 'How do I get started?', a: 'Simply sign up for a free account and browse our course catalog. You can start learning immediately!' },
              { q: 'Can I cancel anytime?', a: 'Yes! All our plans are flexible and you can cancel or change your subscription at any time.' },
              { q: 'Do you offer certificates?', a: 'Yes, upon completion of courses, you receive industry-recognized certificates.' },
              { q: 'Is there a free trial?', a: 'Yes! We offer a 7-day free trial on all premium plans with no credit card required.' }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 border border-white/40 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl p-12 border border-white/40 shadow-2xl text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of students transforming their careers through personalized learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="default" className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-xl text-lg px-12 py-6">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="backdrop-blur-md bg-white/50 hover:bg-white/70 border-2 border-purple-300 text-purple-700 text-lg px-12 py-6">
                  Browse Courses
                </Button>
              </Link>
            </div>
            <p className="text-gray-600 mt-6">No credit card required • 7-day free trial</p>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="backdrop-blur-md bg-white/30 border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Course Tutor</h3>
                <p className="text-gray-600">Empowering learners worldwide with cutting-edge education technology.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Product</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/courses" className="hover:text-purple-600">Courses</Link></li>
                  <li><Link to="/pricing" className="hover:text-purple-600">Pricing</Link></li>
                  <li><Link to="/features" className="hover:text-purple-600">Features</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
                  <li><Link to="/careers" className="hover:text-purple-600">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Legal</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/privacy" className="hover:text-purple-600">Privacy</Link></li>
                  <li><Link to="/terms" className="hover:text-purple-600">Terms</Link></li>
                  <li><Link to="/cookies" className="hover:text-purple-600">Cookies</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-gray-600">
              <p>&copy; 2025 Course Tutor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
