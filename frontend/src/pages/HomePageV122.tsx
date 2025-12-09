import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState } from 'react';

export function HomePageV122() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'pricing', label: 'Pricing', icon: '💎' },
    { id: 'support', label: 'Support', icon: '🤝' }
  ];

  const tabContent = {
    features: {
      title: 'Powerful Features',
      subtitle: 'Everything you need to succeed',
      items: [
        { icon: '🎯', title: 'Personalized Learning', desc: 'AI adapts to your learning style and pace' },
        { icon: '📊', title: 'Progress Analytics', desc: 'Track your growth with detailed insights' },
        { icon: '🏆', title: 'Achievements', desc: 'Earn badges and certificates as you learn' },
        { icon: '💬', title: 'Community', desc: 'Connect with fellow learners worldwide' }
      ]
    },
    courses: {
      title: 'Explore Our Courses',
      subtitle: 'From beginner to advanced',
      items: [
        { icon: '💻', title: 'Web Development', desc: 'Build modern websites and applications' },
        { icon: '📱', title: 'Mobile Apps', desc: 'Create iOS and Android applications' },
        { icon: '🤖', title: 'AI & Machine Learning', desc: 'Master artificial intelligence' },
        { icon: '🎨', title: 'Design', desc: 'Learn UX/UI and graphic design' }
      ]
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that fits you',
      items: [
        { icon: '🆓', title: 'Free', desc: 'Access to basic courses and community' },
        { icon: '⭐', title: 'Pro - $29/mo', desc: 'All courses, certificates, priority support' },
        { icon: '🚀', title: 'Team - $99/mo', desc: 'For teams, analytics, custom content' },
        { icon: '🏢', title: 'Enterprise', desc: 'Custom solutions for organizations' }
      ]
    },
    support: {
      title: 'We\'re Here to Help',
      subtitle: '24/7 support for your success',
      items: [
        { icon: '📧', title: 'Email Support', desc: 'Get answers within 24 hours' },
        { icon: '💬', title: 'Live Chat', desc: 'Instant help when you need it' },
        { icon: '📖', title: 'Knowledge Base', desc: 'Extensive documentation and guides' },
        { icon: '🎥', title: 'Video Tutorials', desc: 'Step-by-step visual guides' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <DesignNavigation currentVersion={122} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 text-center">
          Learn at Your Own Pace
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Explore our comprehensive platform with intuitive tabs. Switch between features, courses, pricing, and support.
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
                  Start Free Trial
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

      {/* Tabbed Content Section */}
      <section className="container mx-auto px-6 py-12 bg-white rounded-3xl shadow-lg mb-12">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[500px]">
          {Object.entries(tabContent).map(([key, content]) => (
            <div
              key={key}
              className={`${activeTab === key ? 'block' : 'hidden'}`}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  {content.title}
                </h2>
                <p className="text-xl text-gray-600">{content.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {content.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{item.desc}</p>
                  </div>
                ))}
              </div>

              {key === 'pricing' && (
                <div className="text-center mt-8">
                  <Link to="/signup">
                    <Button variant="default" className="text-lg px-8 py-4">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Trusted by Thousands
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-teal-600 mb-2">100K+</div>
            <div className="text-gray-600 text-lg">Students Enrolled</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-teal-600 mb-2">500+</div>
            <div className="text-gray-600 text-lg">Expert Instructors</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-teal-600 mb-2">1,200+</div>
            <div className="text-gray-600 text-lg">Courses Available</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-teal-600 mb-2">98%</div>
            <div className="text-gray-600 text-lg">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20 bg-white mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "Switching between tabs to compare features helped me make an informed decision. I upgraded to Pro and haven't looked back!", author: 'James Wilson', role: 'Software Developer' },
            { quote: "The tabbed interface makes exploring different aspects of the platform so intuitive. I found exactly what I needed.", author: 'Anna Kumar', role: 'Product Manager' },
            { quote: "I love how organized everything is. The tab system lets me explore at my own pace without feeling overwhelmed.", author: 'Michael Chen', role: 'Designer' }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Highlight */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="text-4xl">🎯</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Goal-Oriented Learning</h3>
              <p className="text-gray-600">Set your goals and track progress with personalized milestones</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-4xl">💼</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Career Support</h3>
              <p className="text-gray-600">Resume reviews, interview prep, and job placement assistance</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-4xl">🔄</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Updates</h3>
              <p className="text-gray-600">Courses are regularly updated with latest industry trends</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-4xl">🌟</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-definition videos and professionally designed content</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Future?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community of learners and start your journey today. No credit card required.
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
