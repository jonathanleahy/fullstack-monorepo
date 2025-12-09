import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV97() {
  const { isAuthenticated } = useAuth();

  const features = [
    'Live Video Sessions',
    'Screen Sharing',
    'Digital Whiteboard',
    'Session Recording',
    'Progress Tracking',
    'Flexible Scheduling',
    'Expert Tutors',
    'Community Forums',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DesignNavigation currentVersion={97} />

      {/* Asymmetric Header */}
      <header className="relative h-24 bg-white border-b border-gray-200">
        <div className="absolute top-6 left-8">
          <Link to="/" className="text-5xl font-black text-gray-900 tracking-tight">
            CT
          </Link>
        </div>
        <nav className="absolute top-8 right-8 flex gap-3">
          <Link to="/courses" className="text-xs text-gray-600 hover:text-gray-900">Courses</Link>
          <Link to="/tutors" className="text-xs text-gray-600 hover:text-gray-900">Tutors</Link>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="sm" variant="outline" className="text-xs px-3 py-1">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="text-xs px-3 py-1">Sign In</Button>
            </Link>
          )}
        </nav>
      </header>

      {/* Asymmetric Grid Layout */}
      <div className="relative p-8">
        {/* MASSIVE Hero Section - Takes 61.8% (Golden Ratio) */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative h-[70vh] bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-center px-20">
              <motion.h1
                className="text-8xl font-black text-white mb-6 leading-none"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Transform
                <br />
                Your Learning
              </motion.h1>
              <motion.p
                className="text-2xl text-white/90 mb-8 max-w-2xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Connect with expert tutors. Master any subject. Achieve your goals with personalized, one-on-one instruction.
              </motion.p>
              <motion.div
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
                  <Button size="lg" variant="outline" className="px-16 py-6 text-xl font-bold bg-white text-blue-600 hover:bg-gray-50">
                    Get Started Now
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-20 top-20 w-64 h-64 bg-white/5 rounded-full" />
          </div>
        </motion.div>

        {/* Tiny Feature Cards - Various Sizes */}
        <div className="grid grid-cols-12 gap-4">
          {/* Medium Card */}
          <motion.div
            className="col-span-3 bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-green-500 rounded-xl mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Live Sessions</h3>
            <p className="text-sm text-gray-600">Real-time video tutoring</p>
          </motion.div>

          {/* Tiny Card */}
          <motion.div
            className="col-span-2 bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg mb-2" />
            <h3 className="text-xs font-bold text-gray-900">24/7</h3>
          </motion.div>

          {/* Large Card */}
          <motion.div
            className="col-span-4 bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-red-500 rounded-2xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Tutors</h3>
            <p className="text-base text-gray-600 mb-4">Certified educators with proven track records</p>
            <Link to="/tutors" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Browse Tutors →
            </Link>
          </motion.div>

          {/* Tiny Card */}
          <motion.div
            className="col-span-2 bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-yellow-500 rounded-lg mb-2" />
            <h3 className="text-xs font-bold text-gray-900">Fast</h3>
          </motion.div>

          {/* Small Card */}
          <motion.div
            className="col-span-1 bg-gray-900 rounded-2xl p-3 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div className="w-full aspect-square bg-white/10 rounded-lg" />
          </motion.div>

          {/* Tall Thin Card */}
          <motion.div
            className="col-span-2 row-span-2 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <h3 className="text-3xl font-black mb-2">500+</h3>
            <p className="text-sm">Active Tutors</p>
          </motion.div>

          {/* Feature List - Wide */}
          <motion.div
            className="col-span-7 bg-white rounded-2xl p-8 border border-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Everything You Need</h3>
            <div className="grid grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.05, duration: 0.3 }}
                >
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-xs text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tiny Square */}
          <motion.div
            className="col-span-1 bg-teal-500 rounded-2xl hover:shadow-lg transition-shadow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          />

          {/* Medium Stats */}
          <motion.div
            className="col-span-2 bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <h3 className="text-4xl font-black text-gray-900">98%</h3>
            <p className="text-xs text-gray-600 mt-1">Success Rate</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
