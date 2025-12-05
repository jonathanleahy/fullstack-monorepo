/**
 * VARIANT 4: PLAYFUL / CREATIVE
 * - Rounded shapes
 * - Fun illustrations/icons
 * - Bouncy animations
 * - Friendly copywriting
 * - Pastel colors
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent } from '@repo/playbook/molecules';
import { useAuth } from '../hooks/useAuth';

const steps = [
  { emoji: '👋', title: 'Say Hello', desc: 'Create your free account in just a few clicks' },
  { emoji: '🎯', title: 'Pick Your Path', desc: 'Choose courses that spark your curiosity' },
  { emoji: '🚀', title: 'Blast Off!', desc: 'Start learning and watch yourself grow' },
];

const testimonials = [
  { name: 'Jamie', emoji: '🎨', text: "Learning here feels like playing a game. I'm actually excited to study!", role: 'Designer' },
  { name: 'Sam', emoji: '💻', text: "Finally, courses that don't put me to sleep. Love the interactive bits!", role: 'Developer' },
  { name: 'Alex', emoji: '📊', text: 'Went from confused to confident in just 2 weeks. Mind = blown!', role: 'Analyst' },
];

export function HomePageV4() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-pink-50 to-orange-50 dark:from-violet-950 dark:via-pink-950 dark:to-orange-950">
      {/* Hero - Playful */}
      <section className="pt-16 pb-24 px-4 relative overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 text-6xl animate-bounce-slow">📚</div>
        <div className="absolute top-40 right-20 text-5xl animate-bounce-slow-delayed">✨</div>
        <div className="absolute bottom-40 left-1/4 text-4xl animate-float">🎓</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-spin-slow">⭐</div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block animate-wave text-6xl mb-6">👋</div>
            <Badge className="bg-gradient-to-r from-violet-400 to-pink-400 text-white border-0 mb-6 animate-pulse">
              psst... learning is fun here!
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-violet-600 dark:text-violet-400">Learn stuff.</span>
              <br />
              <span className="text-pink-500">Have fun.</span>
              <br />
              <span className="text-orange-500">Level up!</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              No boring lectures. No snooze-fest videos.
              <br className="hidden md:block" />
              Just awesome courses that actually make sense. 🙌
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Let's Go! 🎉
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      Jump In Free! 🎉
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-white/50">
                      Peek Inside 👀
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Fun steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Easy as 1-2-3! 🎯
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="text-center group"
              >
                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-5xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {step.emoji}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun image section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 rounded-[3rem] p-1">
            <div className="bg-white dark:bg-slate-900 rounded-[2.8rem] p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-5xl mb-4">🧠</div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4">
                    Your brain will thank you
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Interactive lessons, bite-sized content, and actual fun quizzes.
                    We made learning not suck. You're welcome. 😎
                  </p>
                  <ul className="space-y-3">
                    {['Video lessons that don\'t bore', 'Quizzes that actually help', 'Progress you can see'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="text-xl">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                    alt="Happy learners"
                    className="rounded-2xl shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl rotate-3 shadow-lg">
                    Much wow! 🎊
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Playful cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              People love us! 💕
            </h2>
            <p className="text-muted-foreground">Don't take our word for it (but do, we're great)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <Card
                key={i}
                className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 hover:rotate-1"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{t.emoji}</div>
                  <p className="mb-4">"{t.text}"</p>
                  <div className="text-sm">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-muted-foreground"> • {t.role}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Bubbly */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { value: '50K+', label: 'Happy Learners', emoji: '🎉' },
              { value: '500+', label: 'Cool Courses', emoji: '📚' },
              { value: '4.9★', label: 'Avg Rating', emoji: '⭐' },
              { value: '∞', label: 'Good Vibes', emoji: '✨' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg text-center min-w-[150px] hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-4 left-8 text-4xl animate-bounce">🎈</div>
            <div className="absolute bottom-4 right-8 text-4xl animate-bounce-slow">🎈</div>

            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to become awesome? 🚀
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Spoiler: You already are. Let's just make it official.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-white text-violet-600 hover:bg-yellow-300 hover:text-violet-700 rounded-full px-10 py-6 text-lg font-bold shadow-lg">
                {isAuthenticated ? "See Courses 👀" : "Start Your Adventure 🌟"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Made with 💜 by Course Tutor • © 2024</p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3.5s ease-in-out infinite 0.5s; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-wave { animation: wave 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
