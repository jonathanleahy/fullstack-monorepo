import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV115() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      <DesignNavigation currentVersion={115} />

      {/* Cloud-like background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-32 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-36 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Island - Floating */}
        <div className="max-w-5xl mx-auto mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-2xl transform translate-y-8"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl p-12 transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-xl flex items-center justify-center text-4xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
              ✨
            </div>

            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Elevate Your Learning
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover knowledge floating all around you. Each island represents a unique learning adventure waiting to be explored.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button variant="default" className="px-8 py-6 text-lg shadow-xl">
                      Explore Your Islands
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button variant="default" className="px-8 py-6 text-lg shadow-xl">
                        Begin Your Journey
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="px-8 py-6 text-lg shadow-xl">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Islands Grid */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Island 1 - Technology */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-blue-500">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  💻
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Technology Island</h3>
                <p className="text-gray-600 mb-4">
                  Master programming, web development, and software engineering with hands-on projects and expert mentorship.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Python</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">JavaScript</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">React</span>
                </div>
              </div>
            </div>

            {/* Island 2 - Design */}
            <div className="relative group mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-purple-500">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  🎨
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Design Island</h3>
                <p className="text-gray-600 mb-4">
                  Create stunning visuals and user experiences. Learn UI/UX design, graphic design, and creative tools from industry experts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Figma</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">UX/UI</span>
                  <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-xs font-semibold">Adobe</span>
                </div>
              </div>
            </div>

            {/* Island 3 - Business */}
            <div className="relative group mt-12 lg:mt-24">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-green-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  📊
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Business Island</h3>
                <p className="text-gray-600 mb-4">
                  Build entrepreneurial skills, data analytics, and business strategy. Transform ideas into successful ventures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Analytics</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Strategy</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Island - Large Floating */}
        <div className="max-w-6xl mx-auto mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-red-300/20 blur-2xl transform translate-y-8"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl p-12 transform hover:-translate-y-2 transition-transform duration-500">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Join Thousands of Elevated Learners
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-500 rounded-full shadow-xl"></div>
                <div className="pt-12">
                  <div className="text-5xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Students</div>
                </div>
              </div>

              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-500 rounded-full shadow-xl"></div>
                <div className="pt-12">
                  <div className="text-5xl font-bold text-purple-600 mb-2">1,000+</div>
                  <div className="text-gray-600 font-medium">Courses</div>
                </div>
              </div>

              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full shadow-xl"></div>
                <div className="pt-12">
                  <div className="text-5xl font-bold text-green-600 mb-2">99%</div>
                  <div className="text-gray-600 font-medium">Satisfaction</div>
                </div>
              </div>

              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-500 rounded-full shadow-xl"></div>
                <div className="pt-12">
                  <div className="text-5xl font-bold text-orange-600 mb-2">200+</div>
                  <div className="text-gray-600 font-medium">Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Floating Islands - Additional Categories */}
        <div className="max-w-7xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">More Learning Islands to Explore</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Island 4 - Marketing */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-orange-500">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  📢
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Marketing Island</h3>
                <p className="text-gray-600 mb-4">
                  Master digital marketing, SEO, content strategy, and social media to grow brands and reach audiences effectively.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">SEO</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Content</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Social</span>
                </div>
              </div>
            </div>

            {/* Island 5 - Personal Development */}
            <div className="relative group mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-amber-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-yellow-500">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  🌟
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Growth Island</h3>
                <p className="text-gray-600 mb-4">
                  Develop leadership skills, productivity habits, and personal effectiveness to achieve your full potential.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Leadership</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Productivity</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Mindset</span>
                </div>
              </div>
            </div>

            {/* Island 6 - Communication */}
            <div className="relative group mt-12 lg:mt-24">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-4 transition-all duration-300 border-t-4 border-rose-500">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  💬
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Communication Island</h3>
                <p className="text-gray-600 mb-4">
                  Master public speaking, writing, and interpersonal communication to connect and influence effectively.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">Speaking</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">Writing</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Influence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials - Floating Cards */}
        <div className="max-w-6xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Learner Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-xl transform translate-y-4"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    SK
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Sophia Kim</div>
                    <div className="text-sm text-gray-600">Full-Stack Developer</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"The floating island concept made learning feel like an adventure. I explored different topics and found my passion in web development. Now I'm building apps for a Fortune 500 company!"</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-emerald-300/20 blur-xl transform translate-y-4"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    MT
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">Marcus Taylor</div>
                    <div className="text-sm text-gray-600">Business Analyst</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"Each island offered unique insights and skills. The flexibility to explore multiple areas helped me discover my true calling in data analytics and business strategy."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing - Floating Islands */}
        <div className="max-w-6xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Choose Your Exploration Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 blur-xl transform translate-y-6"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition-all duration-300 border-t-4 border-blue-500">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Explorer</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">$39</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Access to 3 islands</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Basic certificates</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Community support</li>
                </ul>
                <Button variant="outline" className="w-full">Start Exploring</Button>
              </div>
            </div>

            <div className="relative transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-2xl transform translate-y-6"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-3 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-4">Navigator</h3>
                <div className="text-5xl font-bold mb-2">$99</div>
                <div className="text-purple-100 mb-6">per month</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> All islands unlimited</li>
                  <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> Premium certificates</li>
                  <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> Expert mentorship</li>
                  <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> Priority support</li>
                </ul>
                <Button variant="secondary" className="w-full">Start Navigating</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-emerald-300/20 blur-xl transform translate-y-6"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition-all duration-300 border-t-4 border-green-500">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Enterprise</h3>
                <div className="text-5xl font-bold text-green-600 mb-2">Custom</div>
                <div className="text-gray-600 mb-6">for teams</div>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Custom islands</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Team dashboard</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Dedicated manager</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Advanced analytics</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100/50 blur-md transform translate-y-2 rounded-xl"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="font-bold text-xl text-gray-800 mb-3">How do the floating islands work?</h3>
                <p className="text-gray-700">Each island represents a learning category with curated courses, projects, and resources. You can explore multiple islands and build your skills across different domains.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-100/50 blur-md transform translate-y-2 rounded-xl"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Can I switch between plans?</h3>
                <p className="text-gray-700">Yes! You can upgrade or downgrade your plan at any time. Your progress is saved and will be available when you return to any island.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-green-100/50 blur-md transform translate-y-2 rounded-xl"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-xl text-gray-800 mb-3">Do you offer certificates?</h3>
                <p className="text-gray-700">Yes! Upon completing courses within each island, you'll earn certificates that can be shared on LinkedIn and other professional networks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Island - Floating */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-2xl transform translate-y-6"></div>

          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-white text-center transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-3xl animate-bounce">
              🚀
            </div>

            <h2 className="text-4xl font-bold mb-4 mt-4">Ready to Explore Your Potential?</h2>
            <p className="text-xl mb-8 text-indigo-100">
              Each floating island is a new opportunity. Start your journey today and discover what you're capable of.
            </p>

            {!isAuthenticated && (
              <Link to="/signup">
                <Button variant="secondary" className="px-10 py-6 text-xl shadow-2xl">
                  Launch Your Adventure
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
