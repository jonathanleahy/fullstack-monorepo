import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';
import { useRef } from 'react';

export function HomePageV109() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DesignNavigation currentVersion={109} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Course Tutor
            </h1>
            <nav className="flex gap-4 items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="default">Profile</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default">Sign Up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-gray-900"
          >
            Unlock Your Potential
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12"
          >
            Discover world-class courses that transform your career
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/courses">
              <Button variant="default" className="text-lg px-10 py-6 bg-purple-600 hover:bg-purple-700 text-white">
                Explore Courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <section className="min-h-screen relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-20 text-gray-800">Featured Courses</h3>

          <div className="space-y-8">
            {[
              {
                title: 'Web Development Mastery',
                description: 'Build modern web applications with React, Node.js, and TypeScript',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
                icon: '💻',
                students: '12,500',
                rating: '4.9'
              },
              {
                title: 'Data Science Fundamentals',
                description: 'Master Python, statistics, and machine learning for data analysis',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
                icon: '📊',
                students: '9,800',
                rating: '4.8'
              },
              {
                title: 'UI/UX Design Principles',
                description: 'Create stunning user experiences with modern design tools',
                color: 'from-orange-500 to-red-500',
                bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
                icon: '🎨',
                students: '8,200',
                rating: '4.9'
              },
              {
                title: 'Mobile App Development',
                description: 'Build cross-platform apps with React Native and Flutter',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
                icon: '📱',
                students: '7,600',
                rating: '4.7'
              },
              {
                title: 'Cloud Architecture',
                description: 'Design scalable systems with AWS, Azure, and Google Cloud',
                color: 'from-indigo-500 to-blue-500',
                bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
                icon: '☁️',
                students: '6,900',
                rating: '4.8'
              }
            ].map((course, index) => {
              const start = index * 0.15;
              const end = start + 0.15;

              const scale = useTransform(
                scrollYProgress,
                [start, end, end + 0.05],
                [1, 0.95, 0.9]
              );

              const y = useTransform(
                scrollYProgress,
                [start, end],
                [0, -50]
              );

              const opacity = useTransform(
                scrollYProgress,
                [start, end, end + 0.1],
                [1, 1, 0.6]
              );

              const zIndex = 50 - index;

              return (
                <motion.div
                  key={index}
                  style={{
                    scale,
                    y,
                    opacity,
                    zIndex,
                    position: index === 0 ? 'relative' : 'sticky',
                    top: index === 0 ? 'auto' : '120px'
                  }}
                  className="relative"
                >
                  <div className={`${course.bgColor} rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${course.color} opacity-10 rounded-full -mr-32 -mt-32`}></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="text-6xl">{course.icon}</div>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span>⭐</span>
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>👥</span>
                            <span>{course.students}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{course.title}</h4>
                      <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">{course.description}</p>
                      <div className="flex gap-4">
                        <Link to={`/courses/${index + 1}`}>
                          <Button variant="default" className={`bg-gradient-to-r ${course.color} text-white hover:opacity-90`}>
                            View Course
                          </Button>
                        </Link>
                        <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Students Love Us</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Fast-Track Learning', description: 'Accelerated courses designed to get you job-ready quickly' },
              { icon: '🎓', title: 'Expert Mentorship', description: 'One-on-one guidance from industry professionals' },
              { icon: '💼', title: 'Career Support', description: 'Job placement assistance and resume building' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Start Your Learning Journey Today</h3>
          <p className="text-xl mb-8 text-purple-100">Join over 50,000 students already transforming their careers</p>
          <Link to="/signup">
            <Button variant="default" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">Choose Your Plan</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$24', period: 'month', features: ['5 courses per month', 'Community access', 'Mobile app', 'Basic support'], gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Pro', price: '$59', period: 'month', features: ['Unlimited courses', 'Live mentorship', 'Priority support', 'Certificates', 'Career services'], popular: true, gradient: 'from-purple-600 to-indigo-700' },
              { name: 'Enterprise', price: '$149', period: 'month', features: ['Everything in Pro', 'Team management', 'Custom content', 'API access', 'Dedicated manager'], gradient: 'from-indigo-700 to-purple-800' }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  plan.popular ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white transform scale-105' : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Best Value
                  </div>
                )}
                <h4 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h4>
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
                  className={`w-full ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90`}`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Students Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sophie Anderson', role: 'Full Stack Developer', quote: 'The stacking cards effect is genius! Made browsing courses so much fun and engaging.', rating: 5 },
              { name: 'David Kim', role: 'Machine Learning Engineer', quote: 'I landed my dream job after completing 3 courses. The quality is unmatched!', rating: 5 },
              { name: 'Rachel Green', role: 'UI/UX Designer', quote: 'Love the modern design and intuitive interface. Best learning platform I have used.', rating: 5 }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400"></div>
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              { q: 'How do the courses work?', a: 'Our courses are self-paced with video lessons, interactive exercises, and quizzes. You can learn at your own speed and revisit materials anytime.' },
              { q: 'Can I get a refund?', a: 'Yes! We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us for a full refund.' },
              { q: 'Do I get a certificate?', a: 'Yes, upon completion of each course, you receive a certificate that you can share on LinkedIn and your resume.' },
              { q: 'Is there a free trial?', a: 'Absolutely! We offer a 7-day free trial on all premium plans with full access to all features.' }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Unlock Your Potential?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 text-purple-100"
          >
            Join our community of learners and start achieving your goals today
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
            <p className="text-purple-100 mt-4 text-sm">No credit card required • 7-day free trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Course Tutor</h3>
              <p className="text-gray-400">Unlock your potential with world-class courses</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Browse Courses</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/for-business" className="hover:text-white">For Business</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
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
