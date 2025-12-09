import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV112() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      <DesignNavigation currentVersion={112} />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section - Top Layer */}
        <div className="max-w-6xl mx-auto mb-16 relative">
          {/* Bottom shadow layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg transform translate-y-3 translate-x-3 opacity-30"></div>

          {/* Middle layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg transform translate-y-2 translate-x-2 shadow-lg"></div>

          {/* Top layer with torn edge effect */}
          <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Torn edge SVG at top */}
            <svg className="w-full h-4 text-white" viewBox="0 0 1200 20" preserveAspectRatio="none">
              <path d="M0,0 L1200,0 L1200,20 L0,20 Z" fill="currentColor" />
              <path d="M0,0 Q30,8 60,3 T120,5 T180,2 T240,7 T300,4 T360,6 T420,3 T480,8 T540,4 T600,6 T660,3 T720,7 T780,4 T840,6 T900,2 T960,7 T1020,5 T1080,3 T1140,8 T1200,4 L1200,0 Z" fill="#FFF7ED" />
            </svg>

            <div className="p-12 text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold shadow-md transform -rotate-1">
                New Learning Platform
              </div>

              <h1 className="text-6xl font-bold mb-6 text-gray-800">
                Learning Layers
                <span className="block text-4xl mt-2 text-orange-600">Stack Your Knowledge</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Build your expertise layer by layer with our structured approach to online education
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button variant="default" className="px-8 py-6 text-lg shadow-lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button variant="default" className="px-8 py-6 text-lg shadow-lg">
                        Start Learning
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="px-8 py-6 text-lg shadow-lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Torn edge SVG at bottom */}
            <svg className="w-full h-4 text-white" viewBox="0 0 1200 20" preserveAspectRatio="none">
              <path d="M0,0 Q30,12 60,7 T120,9 T180,6 T240,11 T300,8 T360,10 T420,7 T480,12 T540,8 T600,10 T660,7 T720,11 T780,8 T840,10 T900,6 T960,11 T1020,9 T1080,7 T1140,12 T1200,8 L1200,20 L0,20 Z" fill="#FFF7ED" />
            </svg>
          </div>
        </div>

        {/* Stacked Features */}
        <div className="max-w-5xl mx-auto mb-16 space-y-8">
          {/* Feature 1 - Multi-layer */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-lg transform translate-y-4 translate-x-4 opacity-20"></div>
            <div className="absolute inset-0 bg-blue-100 rounded-lg transform translate-y-2 translate-x-2 shadow-md"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-8 border-l-8 border-blue-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-3xl shadow-lg transform -rotate-3">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Comprehensive Curriculum</h3>
                  <p className="text-gray-600 text-lg">
                    Each course is carefully crafted with multiple layers of content, from foundational concepts to advanced applications. Stack your knowledge systematically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 - Multi-layer */}
          <div className="relative ml-auto max-w-4xl">
            <div className="absolute inset-0 bg-purple-200 rounded-lg transform -translate-y-4 -translate-x-4 opacity-20"></div>
            <div className="absolute inset-0 bg-purple-100 rounded-lg transform -translate-y-2 -translate-x-2 shadow-md"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-8 border-r-8 border-purple-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-3xl shadow-lg transform rotate-2">
                  🎯
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Interactive Learning</h3>
                  <p className="text-gray-600 text-lg">
                    Engage with hands-on exercises, quizzes, and projects that reinforce each layer of learning. Build confidence as you progress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Multi-layer */}
          <div className="relative max-w-4xl">
            <div className="absolute inset-0 bg-green-200 rounded-lg transform translate-y-4 translate-x-4 opacity-20"></div>
            <div className="absolute inset-0 bg-green-100 rounded-lg transform translate-y-2 translate-x-2 shadow-md"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-8 border-l-8 border-green-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-3xl shadow-lg transform -rotate-2">
                  ✨
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Expert Instructors</h3>
                  <p className="text-gray-600 text-lg">
                    Learn from industry professionals who bring real-world experience to every lesson. Get insights that go beyond textbooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards - Stacked Style */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Choose Your Learning Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-lg transform translate-y-2 translate-x-2 opacity-30"></div>
              <div className="absolute inset-0 bg-blue-100 rounded-lg transform translate-y-1 translate-x-1 shadow-md"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-8 border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Starter</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">$19<span className="text-lg text-gray-600">/mo</span></div>
                <ul className="space-y-3 mb-6 text-gray-700">
                  <li>✓ 50+ courses</li>
                  <li>✓ Basic support</li>
                  <li>✓ Community access</li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative transform scale-105">
              <div className="absolute inset-0 bg-orange-200 rounded-lg transform translate-y-3 translate-x-3 opacity-30"></div>
              <div className="absolute inset-0 bg-orange-100 rounded-lg transform translate-y-2 translate-x-2 shadow-lg"></div>
              <div className="relative bg-white rounded-lg shadow-2xl p-8 border-l-4 border-orange-500">
                <div className="absolute -top-3 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform rotate-3">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Pro</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">$49<span className="text-lg text-gray-600">/mo</span></div>
                <ul className="space-y-3 mb-6 text-gray-700">
                  <li>✓ All courses</li>
                  <li>✓ Priority support</li>
                  <li>✓ Certificates</li>
                  <li>✓ Expert mentorship</li>
                </ul>
                <Button variant="default" className="w-full shadow-lg">Get Started</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 rounded-lg transform -translate-y-2 -translate-x-2 opacity-30"></div>
              <div className="absolute inset-0 bg-purple-100 rounded-lg transform -translate-y-1 -translate-x-1 shadow-md"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-8 border-r-4 border-purple-500">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-600 mb-4">Custom</div>
                <ul className="space-y-3 mb-6 text-gray-700">
                  <li>✓ Custom content</li>
                  <li>✓ Team management</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Analytics dashboard</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials - Paper Stack */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Learners Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-200 rounded-lg transform rotate-1 translate-y-2 opacity-40"></div>
              <div className="absolute inset-0 bg-yellow-100 rounded-lg transform -rotate-1 translate-y-1 shadow-md"></div>
              <div className="relative bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md transform -rotate-3">
                    AC
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Alex Chen</div>
                    <div className="text-sm text-gray-600">Web Developer</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"The layered approach to learning made complex topics easy to understand. I landed my dream job after completing the bootcamp!"</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-pink-200 rounded-lg transform -rotate-1 translate-y-2 opacity-40"></div>
              <div className="absolute inset-0 bg-pink-100 rounded-lg transform rotate-1 translate-y-1 shadow-md"></div>
              <div className="relative bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md transform rotate-2">
                    LM
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Lisa Martinez</div>
                    <div className="text-sm text-gray-600">Product Designer</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"Building knowledge layer by layer helped me transition from marketing to UX design. The structured curriculum was exactly what I needed."</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Accordion Style */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-lg transform translate-y-1 translate-x-1 opacity-50"></div>
              <div className="relative bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">How does the learning platform work?</h3>
                <p className="text-gray-600">Our platform uses a layered approach, building your knowledge systematically from fundamentals to advanced concepts.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-100 rounded-lg transform -translate-y-1 -translate-x-1 opacity-50"></div>
              <div className="relative bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Can I learn at my own pace?</h3>
                <p className="text-gray-600">Yes! All courses are self-paced, allowing you to learn whenever and wherever works best for you.</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-lg transform translate-y-1 translate-x-1 opacity-50"></div>
              <div className="relative bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">Do I get certificates?</h3>
                <p className="text-gray-600">Yes! Upon completion of each course, you'll receive a certificate that you can share on your professional profiles.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Stacked Paper */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-lg transform -rotate-1 translate-y-3 opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg transform rotate-1 translate-y-2 shadow-lg"></div>

          <div className="relative bg-white rounded-lg shadow-2xl p-12 text-center">
            {/* Paper clip decoration */}
            <div className="absolute -top-6 left-1/4 w-12 h-20 bg-gray-400 rounded-full transform rotate-45 opacity-60"></div>
            <div className="absolute -top-6 left-1/4 w-12 h-20 bg-gray-300 rounded-full transform rotate-45"></div>

            <h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of learners building their skills layer by layer
            </p>

            {!isAuthenticated && (
              <Link to="/signup">
                <Button variant="default" className="px-10 py-6 text-xl shadow-xl">
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
