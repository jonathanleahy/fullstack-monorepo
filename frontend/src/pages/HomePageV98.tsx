import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV98() {
  const { isAuthenticated } = useAuth();

  const features = [
    { title: 'Live Video', description: 'HD quality streaming' },
    { title: 'Whiteboard', description: 'Collaborative drawing' },
    { title: 'Screen Share', description: 'Share your screen' },
    { title: 'Recording', description: 'Review sessions later' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <DesignNavigation currentVersion={98} />

      {/* Outlined Header */}
      <header className="border-b-2 border-gray-900">
        <div className="px-8 h-20 flex items-center justify-between">
          <Link to="/" className="relative group">
            <motion.div
              className="text-3xl font-bold text-transparent bg-clip-text"
              style={{
                WebkitTextStroke: '2px #111',
                paintOrder: 'stroke fill'
              }}
              whileHover={{ scale: 1.05 }}
            >
              CourseTutor
            </motion.div>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gray-900"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <nav className="flex items-center gap-8">
            <Link to="/courses" className="group relative">
              <span className="text-gray-900 font-medium">Courses</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gray-900"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link to="/tutors" className="group relative">
              <span className="text-gray-900 font-medium">Tutors</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gray-900"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  className="px-6 py-2 border-2 border-gray-900 rounded-full font-medium"
                  whileHover={{ backgroundColor: '#111', color: '#fff' }}
                  transition={{ duration: 0.2 }}
                >
                  Dashboard
                </motion.div>
              </Link>
            ) : (
              <Link to="/login">
                <motion.div
                  className="px-6 py-2 border-2 border-gray-900 rounded-full font-medium"
                  whileHover={{ backgroundColor: '#111', color: '#fff' }}
                  transition={{ duration: 0.2 }}
                >
                  Sign In
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Line Art Style */}
      <div className="relative px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-8xl font-black mb-6 text-transparent"
              style={{
                WebkitTextStroke: '3px #111',
                paintOrder: 'stroke fill'
              }}
            >
              Learn Better
            </h1>
            <motion.div
              className="mx-auto w-32 h-1 bg-gray-900 mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <p className="text-2xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
              Connect with expert tutors for personalized, one-on-one learning experiences that deliver real results.
            </p>

            <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
              <motion.div
                className="inline-block px-12 py-4 border-3 border-gray-900 rounded-full text-lg font-bold"
                whileHover={{
                  backgroundColor: '#111',
                  color: '#fff',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Start Learning Today
              </motion.div>
            </Link>
          </motion.div>

          {/* Line Art Illustration */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              {/* Monitor/Screen */}
              <motion.rect
                x="150"
                y="80"
                width="500"
                height="300"
                fill="none"
                stroke="#111"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />

              {/* Inner screen content */}
              <motion.circle
                cx="280"
                cy="180"
                r="60"
                fill="none"
                stroke="#111"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />

              <motion.rect
                x="380"
                y="140"
                width="200"
                height="15"
                fill="none"
                stroke="#111"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />

              <motion.rect
                x="380"
                y="180"
                width="150"
                height="15"
                fill="none"
                stroke="#111"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              />

              <motion.rect
                x="380"
                y="220"
                width="180"
                height="15"
                fill="none"
                stroke="#111"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              />

              {/* Stand */}
              <motion.line
                x1="400"
                y1="380"
                x2="350"
                y2="420"
                stroke="#111"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              />

              <motion.line
                x1="400"
                y1="380"
                x2="450"
                y2="420"
                stroke="#111"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Outlined Feature Cards */}
          <div className="grid grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="border-2 border-gray-900 rounded-2xl p-8 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  backgroundColor: '#111',
                  scale: 1.05
                }}
              >
                {/* Icon Circle */}
                <motion.div
                  className="w-16 h-16 border-2 border-gray-900 rounded-full mb-4 group-hover:border-white transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats - Outlined */}
          <div className="mt-20 flex justify-center gap-16">
            {[
              { number: '10K+', label: 'Students' },
              { number: '500+', label: 'Tutors' },
              { number: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              >
                <div
                  className="text-6xl font-black mb-2 text-transparent"
                  style={{
                    WebkitTextStroke: '2px #111',
                    paintOrder: 'stroke fill'
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
