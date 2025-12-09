import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV94() {
  const { isAuthenticated } = useAuth();
  const [flipped, setFlipped] = useState<number | null>(null);

  const tiles = [
    {
      title: 'Mathematics',
      icon: '📐',
      color: 'bg-blue-500',
      size: 'large',
      stat: '324',
      label: 'Courses',
    },
    {
      title: 'Science',
      icon: '🔬',
      color: 'bg-green-500',
      size: 'medium',
      stat: '256',
      label: 'Courses',
    },
    {
      title: 'Languages',
      icon: '🌍',
      color: 'bg-orange-500',
      size: 'medium',
      stat: '189',
      label: 'Courses',
    },
    {
      title: 'Business',
      icon: '💼',
      color: 'bg-red-500',
      size: 'small',
      stat: '412',
      label: 'Courses',
    },
    {
      title: 'Arts',
      icon: '🎨',
      color: 'bg-pink-500',
      size: 'small',
      stat: '167',
      label: 'Courses',
    },
    {
      title: 'Technology',
      icon: '💻',
      color: 'bg-cyan-500',
      size: 'wide',
      stat: '523',
      label: 'Courses',
    },
  ];

  const getTileSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-80';
      case 'wide':
        return 'col-span-2 row-span-1 h-40';
      case 'medium':
        return 'col-span-1 row-span-2 h-80';
      case 'small':
        return 'col-span-1 row-span-1 h-40';
      default:
        return 'col-span-1 row-span-1 h-40';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <DesignNavigation currentVersion={94} />

      {/* Metro Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-white font-light text-2xl tracking-wide">learnmetro</span>
            </div>

            {/* Hamburger Menu */}
            <button className="flex flex-col gap-1.5 p-2 hover:bg-slate-700 transition-colors">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>

            {/* Auth Tiles */}
            <div className="flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <motion.div
                      className="bg-slate-700 text-white px-6 py-3 hover:bg-slate-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-semibold">sign in</span>
                    </motion.div>
                  </Link>
                  <Link to="/register">
                    <motion.div
                      className="bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-semibold">get started</span>
                    </motion.div>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard">
                  <motion.div
                    className="bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-semibold">dashboard</span>
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Metro Tiles */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Tile */}
        <motion.div
          className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 mb-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-light text-white mb-4">
            discover<br />
            <span className="font-bold">learning</span>
          </h1>
          <p className="text-white/90 text-xl font-light max-w-2xl">
            Explore thousands of courses across every subject imaginable. Your journey starts here.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { value: '2,000+', label: 'courses' },
            { value: '500+', label: 'instructors' },
            { value: '50K+', label: 'students' },
            { value: '4.8★', label: 'rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-slate-800 p-6 border-l-4 border-orange-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Category Tiles Grid */}
        <div className="grid grid-cols-4 auto-rows-auto gap-4 mb-8">
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              className={`${getTileSize(tile.size)} ${tile.color} relative overflow-hidden cursor-pointer group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setFlipped(flipped === i ? null : i)}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ rotateY: flipped === i ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-between text-white"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div>
                    <div className="text-5xl mb-3">{tile.icon}</div>
                    <h3 className="text-2xl font-semibold">{tile.title}</h3>
                  </div>

                  {/* Live tile animation */}
                  <motion.div
                    className="absolute bottom-6 right-6 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-3xl font-bold">{tile.stat}</div>
                    <div className="text-sm opacity-90">{tile.label}</div>
                  </motion.div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 p-6 bg-slate-800 text-white flex flex-col justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-2xl font-semibold mb-4">{tile.title}</h3>
                  <p className="text-slate-300 mb-4">
                    Explore {tile.stat} courses in {tile.title.toLowerCase()}. From beginner to advanced.
                  </p>
                  <motion.button
                    className="bg-orange-500 px-4 py-2 w-full hover:bg-orange-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Browse Courses
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Action Tiles */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 cursor-pointer group"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-2xl font-semibold text-white mb-2">browse all</h3>
                <p className="text-blue-200">View complete catalog</p>
              </div>
              <div className="text-white text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-600 to-green-700 p-8 cursor-pointer group"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl mb-3">👨‍🏫</div>
                <h3 className="text-2xl font-semibold text-white mb-2">instructors</h3>
                <p className="text-green-200">Meet our experts</p>
              </div>
              <div className="text-white text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-red-600 to-red-700 p-8 cursor-pointer group"
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl mb-3">ℹ️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">about us</h3>
                <p className="text-red-200">Our story & mission</p>
              </div>
              <div className="text-white text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
