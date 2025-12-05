/**
 * VARIANT 5: DARK / MODERN
 * - Dark theme throughout
 * - Neon accents
 * - Sleek animations
 * - Tech-forward aesthetic
 * - Grid/terminal vibes
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent } from '@repo/playbook/molecules';
import { useAuth } from '../hooks/useAuth';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed' },
  { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
  { icon: '📊', title: 'Analytics', desc: 'Deep learning insights' },
  { icon: '🌐', title: 'Global CDN', desc: 'Fast everywhere' },
];

export function HomePageV5() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero - Dark tech */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-slow-delayed" />

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 mb-6 font-mono">
              v2.0 NOW LIVE
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                The Future
              </span>
              <br />
              of Learning
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl font-light">
              Advanced learning platform engineered for the next generation of developers, designers, and creators.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border-0 text-lg px-8 py-6 group">
                    Launch Dashboard
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border-0 text-lg px-8 py-6 group">
                      Get Started
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-white/10 text-lg px-8 py-6">
                      Explore
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Terminal-style stats */}
            <div className="mt-16 font-mono text-sm text-gray-500">
              <div className="flex flex-wrap gap-8">
                <div><span className="text-cyan-400">users:</span> 100,000+</div>
                <div><span className="text-cyan-400">courses:</span> 500+</div>
                <div><span className="text-cyan-400">uptime:</span> 99.99%</div>
                <div><span className="text-cyan-400">rating:</span> 4.9/5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Dark cards */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4 font-mono">
              FEATURES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">performance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="bg-gray-900/50 border-gray-800 hover:border-indigo-500/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
              >
                <CardContent className="p-6">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code-style section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 mb-4 font-mono">
                WHY US
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">building</span>
              </h2>
              <p className="text-gray-400 mb-8">
                No passive video watching. Every course includes hands-on projects, real-world challenges, and instant feedback.
              </p>
              <ul className="space-y-4">
                {['Interactive coding environments', 'Real-time feedback system', 'Industry-standard projects'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm border border-gray-800">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-gray-400">
<span className="text-pink-400">const</span> <span className="text-cyan-400">learner</span> = {`{`}
  <span className="text-purple-400">name</span>: <span className="text-emerald-400">"You"</span>,
  <span className="text-purple-400">skills</span>: [<span className="text-emerald-400">"curious"</span>],
  <span className="text-purple-400">goal</span>: <span className="text-emerald-400">"master"</span>
{`}`};

<span className="text-pink-400">async function</span> <span className="text-yellow-400">learn</span>() {`{`}
  <span className="text-pink-400">await</span> <span className="text-cyan-400">course</span>.<span className="text-yellow-400">start</span>();
  <span className="text-cyan-400">learner</span>.<span className="text-purple-400">skills</span>.<span className="text-yellow-400">push</span>(...<span className="text-cyan-400">newSkills</span>);
  <span className="text-pink-400">return</span> <span className="text-emerald-400">"success"</span>;
{`}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Minimal dark */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-6xl mb-8 opacity-50">"</div>
          <blockquote className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
            This platform feels like it was built by developers,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"> for developers</span>.
            The best learning experience I've had online.
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=60&h=60&fit=crop&crop=face"
              alt=""
              className="w-12 h-12 rounded-full ring-2 ring-indigo-500"
            />
            <div className="text-left">
              <div className="font-medium">David Park</div>
              <div className="text-sm text-gray-500">Staff Engineer @ Stripe</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-transparent to-cyan-600/20" />
        <div className="container mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">level up</span>?
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Join thousands of learners who are already building the future.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border-0 text-lg px-12 py-6 group">
              {isAuthenticated ? "Browse Courses" : "Get Started Free"}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-500">
          <span className="font-mono">COURSE_TUTOR</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="/graphql" className="hover:text-white">API</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 10s ease-in-out infinite 2s; }
        .animate-scan { animation: scan 8s linear infinite; }
      `}</style>
    </div>
  );
}
