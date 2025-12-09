import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState, useEffect } from 'react';

export function HomePageV124() {
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Master New Skills',
      subtitle: 'Learn from industry experts with hands-on projects',
      bg: 'from-violet-100 to-purple-100',
      icon: '🚀',
      cta: 'Explore Courses'
    },
    {
      title: 'Track Your Progress',
      subtitle: 'Visual analytics and insights into your learning journey',
      bg: 'from-blue-100 to-cyan-100',
      icon: '📊',
      cta: 'See Dashboard'
    },
    {
      title: 'Earn Certificates',
      subtitle: 'Get recognized credentials to boost your career',
      bg: 'from-emerald-100 to-teal-100',
      icon: '🏆',
      cta: 'View Certificates'
    },
    {
      title: 'Join Our Community',
      subtitle: 'Connect with 100K+ learners from around the world',
      bg: 'from-rose-100 to-pink-100',
      icon: '🌍',
      cta: 'Join Now'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <DesignNavigation currentVersion={124} />

      {/* Carousel Hero Section */}
      <section className="relative overflow-hidden h-[600px] bg-gradient-to-b from-slate-50 to-white">
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`h-full bg-gradient-to-br ${slide.bg} flex items-center justify-center`}>
                <div className="container mx-auto px-6 text-center">
                  <div className="text-8xl mb-6">{slide.icon}</div>
                  <h1 className="text-6xl font-bold text-gray-900 mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4 justify-center">
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
                            {slide.cta}
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? 'bg-gray-800 w-12 h-3'
                  : 'bg-gray-400 hover:bg-gray-600 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Why Learners Love Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Optimized learning paths that get you to your goals faster</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalized</h3>
            <p className="text-gray-600">AI-powered recommendations tailored to your learning style</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">💪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Proven Results</h3>
            <p className="text-gray-600">95% of our learners achieve their career goals</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Impact in Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2">100K+</div>
              <div className="text-gray-600 text-lg">Active Learners</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2">3,000+</div>
              <div className="text-gray-600 text-lg">Courses</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600 text-lg">Expert Instructors</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-gray-600 text-lg">Certificates Issued</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Popular Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Programming', icon: '💻', count: '800+' },
            { name: 'Design', icon: '🎨', count: '450+' },
            { name: 'Business', icon: '📈', count: '600+' },
            { name: 'Marketing', icon: '📢', count: '350+' },
            { name: 'Data Science', icon: '📊', count: '400+' },
            { name: 'Photography', icon: '📷', count: '250+' },
            { name: 'Music', icon: '🎵', count: '200+' },
            { name: 'Language', icon: '🌐', count: '300+' }
          ].map((category, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-gray-100">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-gray-600">{category.count} courses</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Invest in Your Future
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Flexible plans that grow with your learning needs
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Free', price: '$0', features: ['10 free courses', 'Basic community access', 'Course previews', 'Limited support'], icon: '🎓' },
            { name: 'Pro', price: '$29', features: ['Unlimited courses', 'All certificates', 'Priority support', 'Offline downloads', 'Career guidance'], icon: '⭐', popular: true },
            { name: 'Teams', price: '$99', features: ['All Pro features', 'Team dashboard', 'Admin controls', 'Bulk licensing', 'Dedicated success manager'], icon: '👥' }
          ].map((plan, idx) => (
            <div key={idx} className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all ${plan.popular ? 'ring-4 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">RECOMMENDED</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                <div className="text-gray-600">per month</div>
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
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gradient-to-r from-violet-50 to-purple-50 py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-2xl text-gray-700 italic mb-6">
            "The carousel design immediately caught my attention. Each slide showcased a different aspect of the platform beautifully. I was hooked from the first scroll!"
          </p>
          <p className="text-xl font-semibold text-gray-900">— David Thompson, UX Designer</p>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Join Thousands of Happy Learners
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: 'The visual design keeps me engaged. Learning has never been this fun!', author: 'Lisa Anderson', role: 'Marketing Specialist' },
            { quote: 'I completed 5 courses in 2 months. The carousel made browsing so easy.', author: 'Tom Richards', role: 'Developer' },
            { quote: 'Best investment in my career. The rotating slides helped me explore all features.', author: 'Nina Patel', role: 'Data Analyst' }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-md">
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
          Ready to Begin?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our thriving community and start learning today. Your future self will thank you.
        </p>
        <Link to="/signup">
          <Button variant="default" className="text-lg px-12 py-6">
            Start Learning Free
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
