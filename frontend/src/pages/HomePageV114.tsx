import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV114() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DesignNavigation currentVersion={114} />

      <div className="container mx-auto px-4 py-8">
        {/* Magazine Header */}
        <header className="mb-12 border-b-4 border-black pb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">THE LEARNING TIMES</h1>
              <p className="text-sm text-gray-600">Your Gateway to Knowledge | December 2025 Edition</p>
            </div>
            <div className="flex gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="default" className="px-6 py-3">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="default" className="px-6 py-3">
                      Subscribe
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="px-6 py-3">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Article - Full Width */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1 bg-yellow-400 text-gray-900 text-xs font-bold mb-4 rounded">
                FEATURED STORY
              </div>
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Master New Skills in Record Time
              </h2>
              <p className="text-xl mb-6 text-blue-100 leading-relaxed">
                Discover how thousands of learners are accelerating their careers with our revolutionary approach to online education. Expert-led courses meet cutting-edge technology.
              </p>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button variant="secondary" className="px-8 py-4 text-lg">
                    Read Full Story →
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Side Article */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="text-xs font-bold text-orange-600 mb-2">QUICK READ</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">5-Minute Learning Bursts</h3>
            <p className="text-gray-600 mb-4">
              "I never thought I could learn coding while commuting. These micro-lessons changed everything."
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <div className="font-bold text-sm">Sarah Chen</div>
                <div className="text-xs text-gray-500">Software Developer</div>
              </div>
            </div>
            <Link to="/signup">
              <Button variant="link" className="px-0 text-orange-600">
                Learn More →
              </Button>
            </Link>
          </div>
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* Pull Quote */}
          <div className="lg:col-span-5 bg-yellow-50 p-8 rounded-lg border-l-8 border-yellow-400 flex items-center">
            <div>
              <div className="text-6xl text-yellow-400 mb-4 font-serif">"</div>
              <p className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                The future of education isn't about consuming information—it's about transforming it into wisdom.
              </p>
              <p className="text-sm text-gray-600">— Dr. James Patterson, Education Innovator</p>
            </div>
          </div>

          {/* Stats Block */}
          <div className="lg:col-span-3 bg-gradient-to-br from-green-500 to-teal-500 text-white p-8 rounded-lg shadow-lg">
            <div className="text-xs font-bold mb-2 text-green-100">BY THE NUMBERS</div>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold">15K+</div>
                <div className="text-sm text-green-100">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm text-green-100">Expert Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold">95%</div>
                <div className="text-sm text-green-100">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Small Article */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded mb-4 flex items-center justify-center text-6xl">
              🎓
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Certificate Programs</h3>
            <p className="text-gray-600 text-sm">
              Earn industry-recognized credentials that boost your resume and career prospects.
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Article 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-6xl">
              💻
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-blue-600 mb-2">TECHNOLOGY</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Code Your Future</h3>
              <p className="text-sm text-gray-600">Learn programming from scratch with hands-on projects.</p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-6xl">
              🎨
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-purple-600 mb-2">DESIGN</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Creative Mastery</h3>
              <p className="text-sm text-gray-600">Master design principles that captivate audiences.</p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-6xl">
              📊
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-green-600 mb-2">BUSINESS</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Data Analytics</h3>
              <p className="text-sm text-gray-600">Turn data into actionable business insights.</p>
            </div>
          </div>

          {/* Article 4 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-6xl">
              🎯
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-orange-600 mb-2">MARKETING</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Digital Strategy</h3>
              <p className="text-sm text-gray-600">Build brands that resonate in the digital age.</p>
            </div>
          </div>
        </div>

        {/* Opinion Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <div className="text-xs font-bold text-gray-500 mb-2">EXPERT OPINION</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Why Traditional Education is Being Disrupted
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The landscape of learning has fundamentally changed. Today's professionals demand flexibility, relevance, and immediate applicability. Our platform delivers all three.
              </p>
              <p>
                With bite-sized lessons, real-world projects, and community support, we're not just teaching skills—we're building careers.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <div className="text-xs font-bold text-yellow-400 mb-2">TRENDING NOW</div>
              <ul className="space-y-3 text-sm">
                <li className="border-b border-gray-700 pb-2">→ AI & Machine Learning Fundamentals</li>
                <li className="border-b border-gray-700 pb-2">→ Full-Stack Web Development</li>
                <li className="border-b border-gray-700 pb-2">→ Product Management Essentials</li>
                <li>→ UX/UI Design Bootcamp</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="text-sm font-bold text-blue-900 mb-2">SUBSCRIBE TODAY</div>
              <p className="text-xs text-gray-600 mb-3">Get unlimited access to all courses</p>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button variant="default" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Student Success Stories</h2>
            <p className="text-gray-600">Real results from real learners</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    TW
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Tom Wilson</div>
                    <div className="text-xs text-gray-500">Software Engineer at Google</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">"Landed my dream job after completing the Full-Stack program. The hands-on projects were invaluable."</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    EP
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Emma Parker</div>
                    <div className="text-xs text-gray-500">Lead Designer at Airbnb</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">"The UX/UI bootcamp transformed my career. I tripled my salary within a year!"</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    JR
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">James Rodriguez</div>
                    <div className="text-xs text-gray-500">Data Analyst at Amazon</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">"The data analytics course gave me the skills I needed to break into tech from a non-technical background."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Subscription Plans</h2>
            <p className="text-gray-600">Choose the plan that fits your learning goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-500">
              <div className="text-xs font-bold text-blue-600 mb-2">BASIC</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$29<span className="text-lg text-gray-600">/mo</span></div>
              <p className="text-sm text-gray-600 mb-6">Perfect for beginners</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li>✓ 100+ courses</li>
                <li>✓ Basic support</li>
                <li>✓ Course certificates</li>
              </ul>
              <Button variant="outline" className="w-full">Choose Basic</Button>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-8 transform scale-105">
              <div className="text-xs font-bold text-yellow-300 mb-2">MOST POPULAR</div>
              <div className="text-4xl font-bold mb-1">$79<span className="text-lg">/mo</span></div>
              <p className="text-sm text-purple-100 mb-6">For serious learners</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ All 500+ courses</li>
                <li>✓ Priority support</li>
                <li>✓ Pro certificates</li>
                <li>✓ 1-on-1 mentoring</li>
              </ul>
              <Button variant="secondary" className="w-full">Choose Pro</Button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-500">
              <div className="text-xs font-bold text-green-600 mb-2">ENTERPRISE</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">Custom</div>
              <p className="text-sm text-gray-600 mb-6">For teams and organizations</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li>✓ Custom content</li>
                <li>✓ Team management</li>
                <li>✓ Analytics dashboard</li>
                <li>✓ Dedicated support</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time with no penalties or hidden fees.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with our courses.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Are certificates recognized?</h3>
              <p className="text-gray-600">Yes, our certificates are recognized by major employers and can be shared on LinkedIn and other platforms.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Learning Journey Today</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of students already advancing their careers</p>
          {!isAuthenticated && (
            <Link to="/signup">
              <Button variant="secondary" className="px-10 py-6 text-xl">
                Get Started Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
