/**
 * VARIANT 2: BOLD / VIBRANT
 * - Strong gradients
 * - Large typography
 * - Energetic animations
 * - Colorful accents
 * - Dynamic feel
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent } from '@repo/playbook/molecules';
import { useAuth } from '../hooks/useAuth';

const courses = [
  { title: 'Web Development', students: '12,453', color: 'from-violet-500 to-purple-600' },
  { title: 'Data Science', students: '8,921', color: 'from-blue-500 to-cyan-500' },
  { title: 'UI/UX Design', students: '6,234', color: 'from-orange-500 to-pink-500' },
  { title: 'Mobile Apps', students: '5,678', color: 'from-green-500 to-emerald-500' },
];

export function HomePageV2() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero - Bold gradient */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse-slow" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-white/20 text-white border-0 mb-6 animate-bounce-in">
              🚀 New courses every week
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-slide-up">
              Level Up
              <span className="block text-yellow-300">Your Skills</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl animate-slide-up-delayed">
              Join millions of learners and unlock your potential with world-class courses.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up-delayed-2">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 text-lg px-8 py-6 font-bold">
                    Go to Dashboard 🎯
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 text-lg px-8 py-6 font-bold">
                      Start Learning Free 🎉
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                      Explore Courses
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Popular categories */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">🔥 Trending</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">Categories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <Card
                key={i}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`h-32 bg-gradient-to-br ${course.color} relative`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground">{course.students} students</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with gradient cards */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '2M+', label: 'Active Learners', icon: '👥' },
              { value: '500+', label: 'Expert Courses', icon: '📚' },
              { value: '50+', label: 'Countries', icon: '🌍' },
              { value: '4.9', label: 'Average Rating', icon: '⭐' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-6xl mb-8">💬</div>
          <blockquote className="text-2xl md:text-3xl font-medium mb-8">
            "This platform completely changed my career. The courses are
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500"> incredibly engaging</span>
            and the community is amazing!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <div className="font-bold">Alex Thompson</div>
              <div className="text-sm text-muted-foreground">Senior Developer at Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Transform Your Life? 🚀
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join our community of lifelong learners today.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-300 text-lg px-12 py-6 font-bold">
              {isAuthenticated ? "Explore Courses" : "Join Now - It's Free!"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="font-bold">Course Tutor</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.5); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 15s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-slide-up-delayed { animation: slide-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
