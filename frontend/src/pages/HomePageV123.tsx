import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState } from 'react';

export function HomePageV123() {
  const { isAuthenticated } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>('section1');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const accordionSections = [
    {
      id: 'section1',
      title: '🎯 What makes our platform unique?',
      content: 'Our platform combines AI-powered personalization with expert-crafted content. We adapt to your learning style, track your progress in real-time, and provide interactive experiences that make learning engaging and effective. With over 50,000 active learners, we\'ve proven our approach works.'
    },
    {
      id: 'section2',
      title: '📚 What types of courses do you offer?',
      content: 'We offer comprehensive courses in Web Development, Mobile App Development, AI & Machine Learning, Data Science, Design (UX/UI), Digital Marketing, Business Management, and much more. Each course includes video lessons, interactive exercises, real-world projects, and certification upon completion.'
    },
    {
      id: 'section3',
      title: '💰 How does pricing work?',
      content: 'We offer flexible pricing to fit every budget. Start with our free plan to access basic courses. Upgrade to Pro ($29/month) for unlimited access to all courses and certificates. Teams can benefit from our Team plan ($99/month), and enterprises can get custom solutions tailored to their needs.'
    },
    {
      id: 'section4',
      title: '🏆 Will I get a certificate?',
      content: 'Yes! Upon completing any course, you\'ll receive a verified certificate that you can share on LinkedIn, add to your resume, or showcase in your portfolio. Our certificates are recognized by top companies and demonstrate your commitment to continuous learning.'
    },
    {
      id: 'section5',
      title: '⏰ How long does it take to complete a course?',
      content: 'Course duration varies based on the topic and your pace. Most courses are designed to be completed in 4-12 weeks with 3-5 hours of study per week. However, you can learn at your own pace - all content is available on-demand, so you can go faster or take your time.'
    },
    {
      id: 'section6',
      title: '👥 Is there community support?',
      content: 'Absolutely! Join our vibrant community of learners and instructors. Ask questions in discussion forums, participate in live Q&A sessions, collaborate on group projects, and network with professionals in your field. You\'re never learning alone with us.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <DesignNavigation currentVersion={123} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 text-center">
          Everything You Need to Know
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Click to expand and explore. Our accordion design makes finding information quick and effortless.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="default" className="text-lg px-8 py-6">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="default" className="text-lg px-8 py-6">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Accordion Section */}
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {accordionSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 pr-4">
                  {section.title}
                </h3>
                <div className={`flex-shrink-0 text-3xl transition-transform duration-300 ${
                  openSection === section.id ? 'rotate-180' : ''
                }`}>
                  <span className="text-amber-600">▼</span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === section.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 bg-gradient-to-br from-amber-50 to-orange-50">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl my-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Learning</h3>
            <p className="text-gray-600">Accelerated courses designed for busy professionals</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
            <p className="text-gray-600">Learn from industry leaders and practitioners</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn Anywhere</h3>
            <p className="text-gray-600">Mobile-friendly platform for on-the-go learning</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-amber-600 mb-2">85K+</div>
            <div className="text-gray-600 text-lg">Happy Students</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-amber-600 mb-2">2,500+</div>
            <div className="text-gray-600 text-lg">Video Lessons</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-amber-600 mb-2">97%</div>
            <div className="text-gray-600 text-lg">Completion Rate</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-amber-600 mb-2">24/7</div>
            <div className="text-gray-600 text-lg">Support Available</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Starter', price: '$0', period: 'Forever', features: ['5 courses per month', 'Community forums', 'Basic support'], color: 'bg-white' },
            { name: 'Professional', price: '$29', period: 'Per month', features: ['Unlimited courses', 'All certificates', 'Priority support', 'Downloadable resources', 'Mobile app access'], color: 'bg-gradient-to-br from-amber-100 to-orange-100', highlight: true },
            { name: 'Enterprise', price: '$99', period: 'Per month', features: ['Everything in Pro', 'Team management', 'Analytics dashboard', 'Custom branding', 'API access'], color: 'bg-white' }
          ].map((plan, idx) => (
            <div key={idx} className={`${plan.color} p-8 rounded-2xl shadow-lg ${plan.highlight ? 'ring-4 ring-amber-500' : ''}`}>
              {plan.highlight && (
                <div className="text-center mb-4">
                  <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">BEST VALUE</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{plan.name}</h3>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-1">{plan.price}</div>
                <div className="text-gray-600">{plan.period}</div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block">
                <Button variant={plan.highlight ? "default" : "outline"} className="w-full">
                  Choose Plan
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl text-gray-700 italic mb-6">
            "The accordion layout made it so easy to find exactly what I needed. I love how organized and clean the information is. Best learning platform I've used!"
          </p>
          <p className="text-xl font-semibold text-gray-900">— Jennifer Martinez, Software Engineer</p>
        </div>
      </section>

      {/* Additional Testimonials Grid */}
      <section className="container mx-auto px-6 py-20 bg-white mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: 'The structured approach helped me learn React in just 3 weeks. The instructors are amazing!', author: 'David Park', role: 'Full Stack Developer' },
            { quote: 'I went from zero to landing my first design job in 6 months. This platform changed my life!', author: 'Sarah Johnson', role: 'UI/UX Designer' }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Start Your Learning Journey Today
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of successful learners. No credit card required to start.
        </p>
        <Link to="/signup">
          <Button variant="default" className="text-lg px-12 py-6">
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 Course Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
