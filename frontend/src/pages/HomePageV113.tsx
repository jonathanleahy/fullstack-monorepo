import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV113() {
  const { isAuthenticated } = useAuth();

  const journeySteps = [
    {
      title: "Discover",
      description: "Explore our vast library of courses across multiple disciplines",
      icon: "🔍",
      color: "blue"
    },
    {
      title: "Learn",
      description: "Engage with interactive content, videos, and hands-on projects",
      icon: "📖",
      color: "purple"
    },
    {
      title: "Practice",
      description: "Apply your knowledge through real-world exercises and challenges",
      icon: "💪",
      color: "green"
    },
    {
      title: "Master",
      description: "Achieve certification and showcase your expertise",
      icon: "🏆",
      color: "orange"
    },
    {
      title: "Share",
      description: "Join our community and help others on their learning journey",
      icon: "🤝",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
      green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600', light: 'bg-green-50' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
      pink: { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-pink-600', light: 'bg-pink-50' }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <DesignNavigation currentVersion={113} />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Your Learning Journey
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Follow the path to mastery with our structured, progressive learning system
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="px-8 py-6 text-lg">
                  Continue Your Journey
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="default" className="px-8 py-6 text-lg">
                    Start Your Journey
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

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Timeline Nodes */}
            <div className="space-y-16">
              {journeySteps.map((step, index) => {
                const colors = getColorClasses(step.color);
                const isLeft = index % 2 === 0;

                return (
                  <div key={index} className="relative">
                    {/* Center Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8 z-10">
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center text-2xl shadow-xl border-4 border-white`}>
                        {step.icon}
                      </div>
                      {/* Node Connection Lines */}
                      <div className={`absolute top-1/2 ${isLeft ? 'right-full' : 'left-full'} w-16 h-0.5 ${colors.bg}`}></div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex ${isLeft ? 'justify-start pr-1/2' : 'justify-end pl-1/2'}`}>
                      <div className={`w-5/12 ${isLeft ? 'mr-auto pr-20' : 'ml-auto pl-20'}`}>
                        <div className={`${colors.light} rounded-lg shadow-lg p-6 border-2 ${colors.border} transform hover:scale-105 transition-transform duration-300`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold`}>
                              {index + 1}
                            </div>
                            <h3 className={`text-2xl font-bold ${colors.text}`}>{step.title}</h3>
                          </div>
                          <p className="text-gray-700 text-lg">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End of timeline marker */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-4 h-4 bg-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Track Your Progress Every Step of the Way
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">Real-time</div>
                <div className="text-gray-600">Analytics</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">Custom</div>
                <div className="text-gray-600">Goals</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-4xl mb-2">🏅</div>
                <div className="text-3xl font-bold text-green-600 mb-1">Achievements</div>
                <div className="text-gray-600">Unlocked</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-3xl font-bold text-orange-600 mb-1">Growth</div>
                <div className="text-gray-600">Tracking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline for Mobile/Tablet */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Milestones Along Your Path
            </h2>

            <div className="relative overflow-x-auto pb-8">
              <div className="flex items-center gap-8 min-w-max px-4">
                {/* Horizontal Timeline Line */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                {['Week 1', 'Week 4', 'Week 8', 'Week 12', 'Week 16'].map((week, index) => (
                  <div key={index} className="relative flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white z-10">
                      {week}
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-sm font-semibold text-gray-700">Milestone {index + 1}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-32">Complete {(index + 1) * 20}% of course</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">Learn from industry professionals with real-world experience</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Interactive Content</h3>
              <p className="text-gray-600 text-sm">Engage with hands-on projects and practical exercises</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Mobile Learning</h3>
              <p className="text-gray-600 text-sm">Study anywhere, anytime on any device</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Certifications</h3>
              <p className="text-gray-600 text-sm">Earn recognized credentials to boost your career</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  RK
                </div>
                <div>
                  <div className="font-bold text-gray-800">Rachel Kim</div>
                  <div className="text-sm text-gray-600">UX Designer</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"Following the structured learning journey helped me transition into UX design. The step-by-step approach was perfect for my learning style."</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  DL
                </div>
                <div>
                  <div className="font-bold text-gray-800">David Lopez</div>
                  <div className="text-sm text-gray-600">Data Scientist</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"The progressive difficulty and clear milestones kept me motivated throughout my data science journey. Now I'm working at my dream company!"</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Begin Your Journey Today</h2>
            <p className="text-xl mb-8 text-blue-100">
              Take the first step towards mastering new skills with our guided learning paths
            </p>
            {!isAuthenticated && (
              <Link to="/signup">
                <Button variant="secondary" className="px-10 py-6 text-xl">
                  Start Learning Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
