import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV108() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <DesignNavigation currentVersion={108} />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white drop-shadow-lg"
            >
              Course Tutor
            </motion.h1>
            <nav className="flex gap-4 items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-white hover:bg-white/20 border-white/30">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100">
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/20 border-white/30">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Purple */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-[45%] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-8 md:p-16 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>

          <div className="relative z-10 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Transform Your Future
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed"
            >
              Master new skills with expert-led courses designed for the modern learner
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/courses">
                <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 w-full sm:w-auto">
                  Start Learning
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/30"
            >
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-purple-200 text-sm">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-purple-200 text-sm">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-purple-200 text-sm">Success</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Light */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-[55%] bg-gradient-to-br from-gray-50 to-purple-50 p-8 md:p-16 flex flex-col justify-center"
        >
          <div className="max-w-2xl mx-auto w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-12 text-gray-800"
            >
              Why Choose Course Tutor?
            </motion.h3>

            <div className="space-y-6">
              {[
                {
                  icon: '🎯',
                  title: 'Personalized Learning',
                  description: 'AI-powered recommendations tailored to your goals and learning style'
                },
                {
                  icon: '👥',
                  title: 'Expert Instructors',
                  description: 'Learn from industry professionals with real-world experience'
                },
                {
                  icon: '📱',
                  title: 'Learn Anywhere',
                  description: 'Access your courses on any device, at your own pace'
                },
                {
                  icon: '🏆',
                  title: 'Certificates',
                  description: 'Earn recognized certifications to advance your career'
                },
                {
                  icon: '💬',
                  title: 'Community Support',
                  description: 'Connect with fellow learners and get help when you need it'
                },
                {
                  icon: '⚡',
                  title: 'Regular Updates',
                  description: 'Course content updated regularly to stay current with industry trends'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h4 className="text-2xl font-bold mb-3">Ready to Get Started?</h4>
              <p className="mb-6 text-purple-100">Join thousands of learners achieving their goals</p>
              <Link to="/signup">
                <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
                  Create Free Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$29', period: 'month', features: ['Access to all courses', 'Community forum', 'Mobile & desktop access', 'Email support'], color: 'from-blue-500 to-cyan-500' },
              { name: 'Premium', price: '$79', period: 'month', features: ['Everything in Basic', 'Priority support', 'Live mentorship', 'Certification exams', 'Career coaching'], popular: true, color: 'from-purple-600 to-indigo-600' },
              { name: 'Enterprise', price: '$199', period: 'month', features: ['Everything in Premium', 'Team management', 'Custom learning paths', 'API access', 'Dedicated account manager'], color: 'from-indigo-600 to-purple-800' }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white scale-105' : 'bg-gray-50'
                }`}
              >
                {plan.popular && (
                  <div className="bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-800'}`}>{plan.price}</span>
                  <span className={plan.popular ? 'text-purple-100' : 'text-gray-600'}>/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                      <span className={plan.popular ? 'text-white' : 'text-green-500'}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="default"
                  className={`w-full ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}`}
                >
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50,000+', label: 'Active Students', icon: '👥' },
              { value: '1,000+', label: 'Courses', icon: '📚' },
              { value: '200+', label: 'Instructors', icon: '👨‍🏫' },
              { value: '95%', label: 'Success Rate', icon: '🎯' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Success Stories
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jennifer Wilson', role: 'Frontend Developer', quote: 'The split-screen design is brilliant! Made learning so much more engaging.', image: 'from-purple-400 to-pink-400' },
              { name: 'Robert Chen', role: 'DevOps Engineer', quote: 'Transformed my career in 8 months. The instructors are world-class.', image: 'from-blue-400 to-cyan-400' },
              { name: 'Lisa Martinez', role: 'Product Designer', quote: 'Best learning investment I have made. The community support is amazing!', image: 'from-orange-400 to-red-400' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.image}`}></div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Transform Your Future Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-purple-100"
          >
            Start your learning journey with a 7-day free trial. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/signup">
              <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-12 py-6">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Course Tutor</h3>
              <p className="text-gray-400">Master new skills with expert-led courses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/enterprise" className="hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Course Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
