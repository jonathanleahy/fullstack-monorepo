import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV110() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <DesignNavigation currentVersion={110} />

      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-mesh">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
          <div className="gradient-blob blob-4"></div>
          <div className="gradient-blob blob-5"></div>
        </div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-md border-b border-white/40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
              >
                Course Tutor
              </motion.h1>
              <nav className="flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" className="hover:bg-white/60">Dashboard</Button>
                    </Link>
                    <Link to="/profile">
                      <Button variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                        Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="hover:bg-white/60">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight"
            >
              Learn Without Limits
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed"
            >
              Experience the future of education with AI-powered personalized learning paths and real-time collaboration
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/courses">
                <Button variant="default" className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl transition-all duration-300 text-lg px-10 py-6">
                  Start Learning
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-purple-300 hover:bg-white/80 text-purple-700 text-lg px-10 py-6">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Active Students', gradient: 'from-purple-500 to-pink-500' },
              { value: '1000+', label: 'Courses', gradient: 'from-pink-500 to-orange-500' },
              { value: '200+', label: 'Expert Tutors', gradient: 'from-orange-500 to-yellow-500' },
              { value: '95%', label: 'Success Rate', gradient: 'from-yellow-500 to-green-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
          >
            Everything You Need to Succeed
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Personalized Learning',
                description: 'AI adapts to your pace and style for optimal learning outcomes',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🤝',
                title: 'Live Collaboration',
                description: 'Study groups, live sessions, and peer-to-peer learning',
                gradient: 'from-pink-500 to-orange-500'
              },
              {
                icon: '📊',
                title: 'Progress Analytics',
                description: 'Detailed insights into your learning journey and achievements',
                gradient: 'from-orange-500 to-yellow-500'
              },
              {
                icon: '🏆',
                title: 'Certifications',
                description: 'Industry-recognized credentials to boost your career',
                gradient: 'from-yellow-500 to-green-500'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Get help whenever you need it from our expert community',
                gradient: 'from-green-500 to-teal-500'
              },
              {
                icon: '🚀',
                title: 'Career Services',
                description: 'Job placement assistance and interview preparation',
                gradient: 'from-teal-500 to-blue-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className={`text-2xl font-semibold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h4>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Our Students Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Web Developer',
                quote: 'This platform transformed my career. I went from beginner to employed in 6 months!',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                name: 'Michael Chen',
                role: 'Data Scientist',
                quote: 'The best investment I made. The instructors are top-notch and the content is always current.',
                gradient: 'from-pink-500 to-orange-500'
              },
              {
                name: 'Emily Rodriguez',
                role: 'UX Designer',
                quote: 'I love the flexibility and the community support. Learning has never been this engaging!',
                gradient: 'from-orange-500 to-yellow-500'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient}`}></div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
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
            className="bg-white/70 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl text-center"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Ready to Transform Your Future?
            </h3>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on our platform. Start your journey today with a free trial.
            </p>
            <Link to="/signup">
              <Button variant="default" className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl transition-all duration-300 text-lg px-12 py-6">
                Start Free Trial
              </Button>
            </Link>
            <p className="text-gray-600 mt-4 text-sm">No credit card required • 7-day free trial</p>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
          >
            Flexible Pricing for Everyone
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '$19', period: 'month', features: ['10 courses per month', 'Community access', 'Mobile app', 'Email support'], gradient: 'from-purple-500 to-pink-500' },
              { name: 'Professional', price: '$49', period: 'month', features: ['Unlimited courses', 'Priority support', 'Live mentorship', 'Certificates', 'Career coaching'], popular: true, gradient: 'from-pink-500 to-orange-500' },
              { name: 'Enterprise', price: '$99', period: 'month', features: ['Everything in Pro', 'Team management', 'Custom learning', 'API access', 'Dedicated support'], gradient: 'from-orange-500 to-yellow-500' }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'transform scale-105 border-2 border-pink-300' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h4>
                <div className="mb-6">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
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
                  variant="default"
                  className={`w-full bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 transition-opacity`}
                >
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Got Questions? We Have Answers
          </motion.h3>
          <div className="space-y-6">
            {[
              { q: 'What makes Course Tutor different?', a: 'Our AI-powered personalized learning paths adapt to your pace and style, ensuring optimal learning outcomes with beautiful, engaging design.' },
              { q: 'Can I switch plans at any time?', a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time with no penalties or hidden fees.' },
              { q: 'Are the certificates recognized by employers?', a: 'Absolutely! Our certificates are recognized by leading companies worldwide and can be shared on LinkedIn and your resume.' },
              { q: 'What if I need help during a course?', a: 'We offer 24/7 support through chat, email, and our community forum. Premium members also get access to live mentorship sessions.' },
              { q: 'Is there a student discount?', a: 'Yes! Students with a valid .edu email address receive 50% off all plans. Contact us for more details.' }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{faq.q}</h4>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-xl text-center"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-700 mb-6">Get the latest course updates, learning tips, and exclusive offers delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 px-8 py-3 rounded-full">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-white/60 backdrop-blur-md border-t border-white/40 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Course Tutor</h3>
                <p className="text-gray-600">Experience the future of education with AI-powered learning.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Learn</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/courses" className="hover:text-purple-600">All Courses</Link></li>
                  <li><Link to="/paths" className="hover:text-purple-600">Learning Paths</Link></li>
                  <li><Link to="/certifications" className="hover:text-purple-600">Certifications</Link></li>
                  <li><Link to="/instructors" className="hover:text-purple-600">Become an Instructor</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/about" className="hover:text-purple-600">About Us</Link></li>
                  <li><Link to="/careers" className="hover:text-purple-600">Careers</Link></li>
                  <li><Link to="/blog" className="hover:text-purple-600">Blog</Link></li>
                  <li><Link to="/press" className="hover:text-purple-600">Press</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-800">Support</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><Link to="/help" className="hover:text-purple-600">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-600">Contact Us</Link></li>
                  <li><Link to="/privacy" className="hover:text-purple-600">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-purple-600">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/40 pt-8 text-center text-gray-600">
              <p>&copy; 2025 Course Tutor. All rights reserved. Made with love for learners worldwide.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 20s ease-in-out infinite;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          top: 20%;
          right: -15%;
          animation-delay: -5s;
        }

        .blob-3 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          bottom: -10%;
          left: 10%;
          animation-delay: -10s;
        }

        .blob-4 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          bottom: 30%;
          right: 5%;
          animation-delay: -15s;
        }

        .blob-5 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -7s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(50px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          75% {
            transform: translate(40px, 60px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
