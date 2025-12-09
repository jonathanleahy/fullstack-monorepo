import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV99() {
  const { isAuthenticated } = useAuth();

  const features = [
    { title: 'Live Video', icon: '▶', color: 'from-cyan-400 to-blue-500' },
    { title: 'Whiteboard', icon: '✎', color: 'from-pink-400 to-rose-500' },
    { title: 'Analytics', icon: '◆', color: 'from-green-400 to-emerald-500' },
    { title: 'Schedule', icon: '◉', color: 'from-orange-400 to-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <DesignNavigation currentVersion={99} />

      {/* Neon Header */}
      <header className="bg-gray-100 border-b-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
        <div className="px-8 h-20 flex items-center justify-between">
          <Link to="/" className="group">
            <motion.div
              className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent relative"
              whileHover={{ scale: 1.05 }}
            >
              COURSE<span className="text-pink-400">TUTOR</span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 blur-xl"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/courses" className="group relative">
              <span className="text-gray-800 font-bold">Courses</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link to="/tutors" className="group relative">
              <span className="text-gray-800 font-bold">Tutors</span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-500 shadow-[0_0_10px_rgba(244,114,182,0.8)]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.div
                  className="px-6 py-2 border-2 border-cyan-400 rounded-full font-bold text-gray-800 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  style={{ boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Dashboard</span>
                </motion.div>
              </Link>
            ) : (
              <Link to="/login">
                <motion.div
                  className="px-6 py-2 border-2 border-pink-400 rounded-full font-bold text-gray-800 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  style={{ boxShadow: '0 0 20px rgba(244,114,182,0.6)' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Sign In</span>
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Neon Glow */}
      <div className="relative px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-20">
            <motion.h1
              className="text-8xl font-black mb-6 relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-400 bg-clip-text text-transparent">
                Electric Learning
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-400 rounded-2xl opacity-0 blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </motion.h1>

            <motion.p
              className="text-2xl text-gray-700 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Power up your education with live tutoring, interactive tools, and AI-driven insights
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to={isAuthenticated ? '/dashboard' : '/signup'}>
                <motion.div
                  className="inline-block px-12 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-xl font-black text-white relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ boxShadow: '0 0 40px rgba(34,211,238,0.8)' }}
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(34,211,238,0.8)',
                      '0 0 60px rgba(34,211,238,1)',
                      '0 0 40px rgba(34,211,238,0.8)',
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Activate Learning
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Neon Feature Cards */}
          <div className="grid grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-2xl p-8 border-2 overflow-hidden group cursor-pointer"
                style={{
                  borderColor: `rgba(${index === 0 ? '34,211,238' : index === 1 ? '244,114,182' : index === 2 ? '52,211,153' : '251,146,60'}, 0.6)`,
                  boxShadow: `0 0 20px rgba(${index === 0 ? '34,211,238' : index === 1 ? '244,114,182' : index === 2 ? '52,211,153' : '251,146,60'}, 0.3)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className={`text-6xl font-black bg-gradient-to-br ${feature.color} bg-clip-text text-transparent mb-4`}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0)',
                      '0 0 20px rgba(255,255,255,0.5)',
                      '0 0 10px rgba(255,255,255,0)',
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <motion.div
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{
                    boxShadow: `0 0 10px rgba(${index === 0 ? '34,211,238' : index === 1 ? '244,114,182' : index === 2 ? '52,211,153' : '251,146,60'}, 0.8)`
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Glowing Stats */}
          <div className="grid grid-cols-3 gap-8">
            {[
              { number: '10K+', label: 'Active Students', color: 'from-cyan-400 to-blue-500' },
              { number: '500+', label: 'Expert Tutors', color: 'from-pink-400 to-rose-500' },
              { number: '98%', label: 'Success Rate', color: 'from-green-400 to-emerald-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 text-center border-2 relative overflow-hidden"
                style={{
                  borderColor: `rgba(${index === 0 ? '34,211,238' : index === 1 ? '244,114,182' : '52,211,153'}, 0.6)`,
                  boxShadow: `0 0 30px rgba(${index === 0 ? '34,211,238' : index === 1 ? '244,114,182' : '52,211,153'}, 0.4)`
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                <div
                  className={`text-6xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 font-bold relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
