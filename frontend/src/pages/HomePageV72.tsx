import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV72() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { icon: '🏆', title: 'Quick Learner', description: 'Complete 3 courses in a week', unlocked: true },
    { icon: '⚡', title: 'Speed Runner', description: 'Finish a course in under 2 hours', unlocked: true },
    { icon: '🎯', title: 'Perfect Score', description: 'Get 100% on 5 quizzes', unlocked: false },
    { icon: '🔥', title: 'On Fire', description: '7-day learning streak', unlocked: true },
  ];

  const levels = [
    { level: 1, title: 'Beginner', xp: '0-100', courses: 3, color: 'from-emerald-400 to-teal-500' },
    { level: 2, title: 'Apprentice', xp: '100-500', courses: 8, color: 'from-blue-400 to-cyan-500' },
    { level: 3, title: 'Expert', xp: '500-1000', courses: 15, color: 'from-amber-400 to-rose-500' },
  ];

  const stats = [
    { label: 'Active Players', value: '125K+', icon: '👥' },
    { label: 'Courses Completed', value: '2.5M+', icon: '🎓' },
    { label: 'Achievements Unlocked', value: '8.3M+', icon: '🏅' },
    { label: 'Avg. Score', value: '92%', icon: '📊' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <DesignNavigation currentVersion={72} />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center transform rotate-45">
              <span className="text-2xl transform -rotate-45">🎮</span>
            </div>
            <span className="font-bold text-xl text-gray-900">LearnQuest</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Help</Link>
          </div>

          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Gaming Style */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-rose-500 text-white font-bold rounded-full text-sm shadow-lg">
                  🎮 NEW GAME MODE UNLOCKED
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Level Up Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Skills & Knowledge
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Gamified learning experience with achievements, levels, and rewards. Turn education into an epic adventure!
              </p>
              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 text-lg">
                  Start Playing
                </Button>
                <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                  View Leaderboard
                </Button>
              </div>

              {/* XP Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 bg-white rounded-2xl p-4 border border-blue-200 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Your Progress</span>
                  <span className="text-sm font-bold text-blue-600">Level 12 → 13</span>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-lg">680 / 1000 XP</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Gaming Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 border-4 border-blue-200 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🎯</span>
                Your Game Stats
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div>
                    <p className="text-sm text-gray-600">Current Level</p>
                    <p className="text-3xl font-bold text-emerald-600">12</p>
                  </div>
                  <div className="text-5xl">🏆</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div>
                    <p className="text-sm text-gray-600">Courses Completed</p>
                    <p className="text-3xl font-bold text-blue-600">28</p>
                  </div>
                  <div className="text-5xl">📚</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="text-3xl font-bold text-amber-600">15/50</p>
                  </div>
                  <div className="text-5xl">🏅</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-3xl font-bold text-rose-600">7 days</p>
                  </div>
                  <div className="text-5xl">🔥</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievement Badges Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Unlock Achievements</h2>
            <p className="text-xl text-gray-600">Complete challenges to earn exclusive badges</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`relative rounded-2xl p-6 border-2 text-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-amber-50 to-rose-50 border-amber-300'
                    : 'bg-gray-100 border-gray-300 opacity-60'
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="text-6xl mb-4">{achievement.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>

                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full inline-block"
                  >
                    UNLOCKED
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Progression */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
            <p className="text-xl text-gray-600">Progress through levels as you master new skills</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl text-center relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${level.color}`} />

                <div className="text-6xl font-bold text-gray-300 mb-2">{level.level}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h3>
                <p className="text-gray-600 mb-4">{level.xp} XP</p>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Courses Available</p>
                  <p className="text-3xl font-bold text-blue-600">{level.courses}</p>
                </div>

                <Button className={`w-full bg-gradient-to-r ${level.color} text-white`}>
                  View Courses
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{stat.icon}</div>
                <motion.p
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Quest?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of players leveling up their skills every day
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold">
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
