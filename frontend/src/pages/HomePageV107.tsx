import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV107() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <DesignNavigation currentVersion={107} />

      {/* Header */}
      <header className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-neumorphic-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700 drop-shadow-sm">
              Course Tutor
            </h1>
            <nav className="flex gap-4 items-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="shadow-neumorphic-sm hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-none transition-all duration-200">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="default" className="shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-none transition-all duration-200">
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="shadow-neumorphic-sm hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-none transition-all duration-200">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" className="shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-none transition-all duration-200">
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
          <div>
            <h2 className="text-5xl font-bold mb-6 text-gray-800 drop-shadow-lg">
              Elevated Learning Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover a new dimension of education with our neumorphic design that brings learning to life.
            </p>
            <div className="flex gap-4">
              <Link to="/courses">
                <Button variant="default" className="shadow-neumorphic-lg hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-none text-lg px-8 py-6 transition-all duration-200">
                  Explore Courses
                </Button>
              </Link>
              <Button variant="outline" className="shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-none text-lg px-8 py-6 transition-all duration-200">
                Learn More
              </Button>
            </div>
          </div>

          <div className="shadow-neumorphic-xl rounded-3xl p-8 bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="space-y-6">
              <div className="shadow-neumorphic-inset p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full shadow-neumorphic-sm bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                    📚
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Rich Content</h3>
                </div>
                <p className="text-gray-600 pl-16">Access thousands of courses across various disciplines</p>
              </div>
              <div className="shadow-neumorphic-inset p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full shadow-neumorphic-sm bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Fast Track</h3>
                </div>
                <p className="text-gray-600 pl-16">Accelerate your learning with optimized pathways</p>
              </div>
              <div className="shadow-neumorphic-inset p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full shadow-neumorphic-sm bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Goal Oriented</h3>
                </div>
                <p className="text-gray-600 pl-16">Set and achieve your learning objectives effectively</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: 'Active Students' },
            { value: '200+', label: 'Expert Tutors' },
            { value: '1000+', label: 'Courses' },
            { value: '95%', label: 'Success Rate' }
          ].map((stat, index) => (
            <div key={index} className="shadow-neumorphic-xl rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200 text-center hover:shadow-neumorphic-pressed transition-all duration-300">
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 drop-shadow-lg">
          Premium Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Personalized Path', description: 'Tailored learning journeys based on your goals and pace', icon: '🗺️' },
            { title: 'Live Sessions', description: 'Interactive classes with real-time instructor feedback', icon: '🎥' },
            { title: 'Progress Tracking', description: 'Detailed analytics to monitor your advancement', icon: '📊' }
          ].map((feature, index) => (
            <div
              key={index}
              className="shadow-neumorphic-xl rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-neumorphic-pressed transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full shadow-neumorphic-inset bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="shadow-neumorphic-xl rounded-3xl p-12 bg-gradient-to-br from-gray-100 to-gray-200 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of students achieving their goals</p>
          <Link to="/signup">
            <Button variant="default" className="shadow-neumorphic-lg hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-none text-lg px-12 py-6 transition-all duration-200">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 drop-shadow-lg">
          Student Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Alex Thompson', role: 'Software Engineer', quote: 'The neumorphic design makes learning so enjoyable. I completed 5 courses in 3 months!', rating: 5 },
            { name: 'Maria Garcia', role: 'Product Manager', quote: 'Best learning platform I have used. The interface is intuitive and the content is excellent.', rating: 5 },
            { name: 'James Lee', role: 'Data Analyst', quote: 'Course Tutor helped me transition into tech. The support and resources are unmatched.', rating: 5 }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="shadow-neumorphic-xl rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full shadow-neumorphic-inset bg-gradient-to-br from-gray-100 to-gray-200"></div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 drop-shadow-lg">
          Flexible Pricing Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Starter', price: '$19', period: 'month', features: ['10 courses per month', 'Community access', 'Mobile app', 'Email support'] },
            { name: 'Professional', price: '$49', period: 'month', features: ['Unlimited courses', 'Priority support', 'Live sessions', 'Certificates', 'Career coaching'], popular: true },
            { name: 'Team', price: '$99', period: 'month', features: ['Everything in Pro', 'Team management', 'Custom content', 'Dedicated support', 'Analytics dashboard'] }
          ].map((plan, index) => (
            <div
              key={index}
              className={`shadow-neumorphic-xl rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200 ${plan.popular ? 'transform scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="shadow-neumorphic-sm rounded-full px-4 py-1 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-semibold inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="default"
                className="shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-none w-full transition-all duration-200"
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 drop-shadow-lg">
          Common Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.' },
            { q: 'Can I switch plans later?', a: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings.' },
            { q: 'Are the certificates recognized?', a: 'Yes, our certificates are recognized by leading companies and educational institutions worldwide.' },
            { q: 'What if I need help?', a: 'We offer 24/7 support via chat, email, and phone for all our premium users.' }
          ].map((faq, index) => (
            <div
              key={index}
              className="shadow-neumorphic-xl rounded-2xl p-6 bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="shadow-neumorphic-inset mt-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Course Tutor</h3>
              <p className="text-gray-600">Elevated learning experiences for modern professionals.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Learn</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/paths">Learning Paths</Link></li>
                <li><Link to="/certifications">Certifications</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Course Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .shadow-neumorphic-sm {
          box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
        }
        .shadow-neumorphic {
          box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #ffffff;
        }
        .shadow-neumorphic-lg {
          box-shadow: 10px 10px 20px #b8b9be, -10px -10px 20px #ffffff;
        }
        .shadow-neumorphic-xl {
          box-shadow: 15px 15px 30px #b8b9be, -15px -15px 30px #ffffff;
        }
        .shadow-neumorphic-inset {
          box-shadow: inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff;
        }
        .shadow-neumorphic-pressed {
          box-shadow: inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff;
        }
      `}</style>
    </div>
  );
}
