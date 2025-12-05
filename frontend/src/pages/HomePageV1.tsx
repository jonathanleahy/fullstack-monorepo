/**
 * VARIANT 1: MINIMAL / CLEAN
 * - Lots of whitespace
 * - Simple typography
 * - Subtle animations
 * - Monochrome with accent color
 * - Focus on content clarity
 */
import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';

const features = [
  { title: 'Structured Learning', desc: 'Clear paths from beginner to expert' },
  { title: 'Track Progress', desc: 'See how far you\'ve come' },
  { title: 'Earn Certificates', desc: 'Prove your expertise' },
];

export function HomePageV1() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - Ultra minimal */}
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Online Learning Platform
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Learn without
            <span className="block font-medium">limits.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
            Simple, focused courses designed to help you master new skills efficiently.
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full px-8">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="rounded-full px-8">
                    Get Started
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="ghost" size="lg" className="rounded-full px-8">
                    Browse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Simple divider */}
      <div className="w-16 h-px bg-border mx-auto" />

      {/* Features - Clean list */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {features.map((feature, i) => (
              <div
                key={i}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-6xl font-light text-primary/20 mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=675&fit=crop"
              alt="Learning"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Stats - Minimal */}
      <section className="py-32 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: '50K', label: 'Learners' },
              { value: '200+', label: 'Courses' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-light">{stat.value}</div>
                <div className="text-xs tracking-wider uppercase text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Simple */}
      <section className="py-32 px-4 border-t">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-light mb-4">Ready to begin?</h2>
          <p className="text-muted-foreground mb-8">
            Start your learning journey today. No credit card required.
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <Button size="lg" className="rounded-full px-12">
              {isAuthenticated ? "View Courses" : "Start Free"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-sm text-muted-foreground">
          <span>© 2024 Course Tutor</span>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-foreground">Courses</Link>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
