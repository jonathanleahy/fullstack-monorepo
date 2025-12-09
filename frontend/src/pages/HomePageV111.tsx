import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV111() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <DesignNavigation currentVersion={111} />

      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Triangle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 transform rotate-45 translate-x-48 -translate-y-48"></div>

        {/* Hexagon Container */}
        <div className="absolute bottom-20 left-10 w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-200/40">
            <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
          </svg>
        </div>

        {/* Circle */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-pink-200/20 to-orange-200/20 blur-xl"></div>

        {/* Small Triangles */}
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-green-200/30 transform rotate-12"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-300/30 transform -rotate-45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section with Geometric Container */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative">
            {/* Geometric Shape Background for Title */}
            <div className="absolute -inset-4 bg-white/60 backdrop-blur-sm transform -skew-y-2 rounded-lg shadow-xl"></div>

            <div className="relative text-center py-16 px-8">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Learn with Geometric Precision
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Master new skills through structured learning paths designed with mathematical elegance
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button variant="default" className="px-8 py-6 text-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button variant="default" className="px-8 py-6 text-lg">
                        Start Learning
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="px-8 py-6 text-lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid with Geometric Containers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Triangle Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 transform rotate-2 group-hover:rotate-0 transition-transform duration-300 rounded-lg"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 bg-blue-500 flex items-center justify-center rounded-lg transform rotate-45">
                <span className="text-2xl transform -rotate-45">📐</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Structured Courses</h3>
              <p className="text-gray-600">
                Geometrically organized learning paths that build knowledge systematically
              </p>
            </div>
          </div>

          {/* Hexagon Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 rounded-lg"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 bg-purple-500 flex items-center justify-center rounded-lg">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                  <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Multi-faceted Learning</h3>
              <p className="text-gray-600">
                Explore topics from multiple angles with interactive content and assessments
              </p>
            </div>
          </div>

          {/* Circle Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 transform rotate-1 group-hover:rotate-0 transition-transform duration-300 rounded-lg"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 mb-4 bg-pink-500 flex items-center justify-center rounded-full">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Complete Mastery</h3>
              <p className="text-gray-600">
                Full-circle learning experience from basics to advanced concepts
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section with Geometric Shapes */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rotate-45"></div>
                <div className="relative pt-8">
                  <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Active Learners</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <svg viewBox="0 0 50 50" className="w-12 h-12 fill-purple-500">
                    <polygon points="25 0 50 15 50 35 25 50 0 35 0 15" />
                  </svg>
                </div>
                <div className="relative pt-8">
                  <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                  <div className="text-gray-600">Courses</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-pink-500 rounded-full"></div>
                <div className="relative pt-8">
                  <div className="text-4xl font-bold text-pink-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-500 transform -rotate-12"></div>
                <div className="relative pt-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section with Geometric Containers */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Learners Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 transform -rotate-1 rounded-lg"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                  <div>
                    <div className="font-bold text-gray-800">John Doe</div>
                    <div className="text-sm text-gray-600">Software Engineer</div>
                  </div>
                </div>
                <p className="text-gray-700">"The structured approach helped me understand complex concepts systematically. Highly recommended!"</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 transform rotate-1 rounded-lg"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">SM</div>
                  <div>
                    <div className="font-bold text-gray-800">Sarah Miller</div>
                    <div className="text-sm text-gray-600">Data Analyst</div>
                  </div>
                </div>
                <p className="text-gray-700">"The multi-faceted learning approach made complex topics accessible and engaging."</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 transform -rotate-1 rounded-lg"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">MJ</div>
                  <div>
                    <div className="font-bold text-gray-800">Mike Johnson</div>
                    <div className="text-sm text-gray-600">Product Manager</div>
                  </div>
                </div>
                <p className="text-gray-700">"Achieved complete mastery in my field thanks to the comprehensive curriculum and expert instructors."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section with Geometric Design */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Choose Your Path</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 transform rotate-2 rounded-lg"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-500 transform rotate-45 flex items-center justify-center">
                    <span className="text-2xl transform -rotate-45">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic</h3>
                  <div className="text-4xl font-bold text-gray-600 mb-2">$29</div>
                  <div className="text-gray-600">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Access to 100+ courses</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Basic certificates</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Community access</li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </div>
            </div>

            <div className="relative transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 transform -rotate-1 rounded-lg"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-2xl border-4 border-purple-500">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-sm font-bold rounded-full">POPULAR</div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-lg">
                    <svg viewBox="0 0 24 24" className="w-full h-full p-2 fill-white">
                      <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-2">$79</div>
                  <div className="text-gray-600">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Access to all 500+ courses</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Professional certificates</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority support</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Expert mentorship</li>
                </ul>
                <Button variant="default" className="w-full">Get Started</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 transform -rotate-2 rounded-lg"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg border-2 border-blue-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">Custom</div>
                  <div className="text-gray-600">contact us</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Unlimited access</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Custom content</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Dedicated support</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Team management</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 transform rotate-1 rounded-lg"></div>
            <div className="relative bg-white p-12 rounded-lg shadow-2xl text-center">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Start Learning with Precision Today</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of learners mastering new skills through our geometrically structured approach
              </p>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button variant="default" className="px-10 py-6 text-xl">
                    Get Started Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
