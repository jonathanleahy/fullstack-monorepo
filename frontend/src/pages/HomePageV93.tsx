import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV93() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <DesignNavigation currentVersion={93} />

      {/* Scrapbook Header */}
      <header className="relative py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo with tape effect */}
            <div className="relative">
              <div
                className="bg-white px-6 py-3 shadow-lg transform -rotate-1"
                style={{
                  borderRadius: '2px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.1)',
                }}
              >
                <span
                  className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  LearnCollage
                </span>
              </div>
              {/* Washi tape */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 opacity-60 transform rotate-1"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                }}
              ></div>
            </div>

            {/* Navigation like fridge magnets */}
            <nav className="flex gap-4">
              {['Courses', 'Teachers', 'About'].map((item, i) => (
                <motion.div
                  key={item}
                  className="relative"
                  whileHover={{ rotate: i % 2 === 0 ? -3 : 3, y: -2 }}
                  style={{ rotate: i % 2 === 0 ? 1 : -1 }}
                >
                  <Link to={`/${item.toLowerCase()}`}>
                    <div className="bg-white px-5 py-2 shadow-md rounded-sm border-2 border-slate-200"
                      style={{ fontFamily: 'Comic Sans MS, cursive' }}
                    >
                      <span className="text-slate-700 font-semibold">{item}</span>
                    </div>
                  </Link>
                  {/* Magnet effect */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow"></div>
                </motion.div>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="flex gap-3">
              {!isAuthenticated ? (
                <>
                  <motion.div whileHover={{ rotate: -2, scale: 1.05 }} style={{ rotate: 1 }}>
                    <Link to="/login">
                      <div className="bg-blue-100 border-2 border-blue-300 px-5 py-2 shadow-md"
                        style={{ fontFamily: 'Comic Sans MS, cursive' }}
                      >
                        Sign In
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ rotate: 2, scale: 1.05 }} style={{ rotate: -1 }}>
                    <Link to="/register">
                      <div className="bg-gradient-to-br from-orange-400 to-pink-400 text-white px-5 py-2 shadow-lg border-2 border-orange-500"
                        style={{ fontFamily: 'Comic Sans MS, cursive', fontWeight: 'bold' }}
                      >
                        Start Free!
                      </div>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <Link to="/dashboard">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-400 text-white px-5 py-2 shadow-lg"
                    style={{ fontFamily: 'Comic Sans MS, cursive', fontWeight: 'bold' }}
                  >
                    My Dashboard
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Collage Style */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="relative min-h-[600px] mb-16">
          {/* Main headline - taped photo style */}
          <motion.div
            className="absolute top-0 left-20 z-20 bg-white p-8 shadow-2xl transform -rotate-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ borderRadius: '3px' }}
          >
            <h1
              className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Learn<br />Anything!
            </h1>
            <div className="absolute -top-3 left-10 w-24 h-8 bg-amber-200 opacity-70 transform rotate-2"></div>
            <div className="absolute -top-3 right-10 w-24 h-8 bg-amber-200 opacity-70 transform -rotate-2"></div>
          </motion.div>

          {/* Sticky note 1 */}
          <motion.div
            className="absolute top-32 right-32 z-10 bg-yellow-200 p-6 shadow-lg transform rotate-3 w-56"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              borderRadius: '0 0 0 30px/45px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-slate-700">
              <div className="text-2xl font-bold mb-2">500+</div>
              <div className="text-sm">Expert instructors from around the world 🌍</div>
            </div>
          </motion.div>

          {/* Polaroid photo 1 */}
          <motion.div
            className="absolute top-64 left-48 bg-white p-4 shadow-xl transform -rotate-6 z-15"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: -6 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-48 h-36 bg-gradient-to-br from-blue-200 to-cyan-200 mb-3 flex items-center justify-center">
              <span className="text-4xl">📚</span>
            </div>
            <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-center text-sm text-slate-600">
              1000+ Courses
            </p>
          </motion.div>

          {/* Sticky note 2 */}
          <motion.div
            className="absolute top-96 right-48 bg-pink-200 p-6 shadow-lg transform -rotate-6 w-52 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              borderRadius: '0 0 0 30px/45px',
            }}
          >
            <div style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-slate-700">
              <div className="font-bold mb-2">Learn at your pace ⏰</div>
              <div className="text-sm">Lifetime access to all materials!</div>
            </div>
          </motion.div>

          {/* Polaroid photo 2 */}
          <motion.div
            className="absolute top-80 right-96 bg-white p-4 shadow-xl transform rotate-12 z-10"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 12 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-40 h-32 bg-gradient-to-br from-green-200 to-emerald-200 mb-3 flex items-center justify-center">
              <span className="text-4xl">🎓</span>
            </div>
            <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-center text-sm text-slate-600">
              Get Certified
            </p>
          </motion.div>

          {/* Sticky note 3 - CTA */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-orange-200 p-8 shadow-xl transform rotate-1 w-72 z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              borderRadius: '0 0 0 30px/45px',
            }}
          >
            <div className="text-center">
              <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-xl font-bold text-slate-800 mb-4">
                Start learning today!
              </p>
              <Link to="/courses">
                <motion.button
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 shadow-lg border-2 border-orange-600 transform -rotate-1"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Comic Sans MS, cursive', fontWeight: 'bold', borderRadius: '4px' }}
                >
                  Browse Courses →
                </motion.button>
              </Link>
            </div>
            {/* Pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
          </motion.div>

          {/* Decorative tape pieces */}
          <div className="absolute top-52 left-96 w-32 h-10 bg-gradient-to-r from-green-300 via-green-200 to-green-300 opacity-50 transform -rotate-45 z-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
            }}
          ></div>
        </div>

        {/* Features Section - Overlapping Cards */}
        <div className="relative h-96 mt-32">
          {[
            { title: 'Interactive Learning', desc: 'Hands-on projects and quizzes', bg: 'bg-blue-100', rotate: -3, top: '0', left: '10%', emoji: '🎯' },
            { title: 'Community Support', desc: 'Join thousands of learners', bg: 'bg-green-100', rotate: 2, top: '20px', left: '35%', emoji: '👥' },
            { title: 'Expert Guidance', desc: 'Learn from industry pros', bg: 'bg-pink-100', rotate: -2, top: '40px', left: '60%', emoji: '⭐' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`absolute ${feature.bg} p-8 shadow-xl w-80`}
              style={{
                top: feature.top,
                left: feature.left,
                rotate: feature.rotate,
                borderRadius: '4px',
                border: '3px solid white',
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 30,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3
                className="text-2xl font-bold text-slate-800 mb-2"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-slate-600"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {feature.desc}
              </p>
              {/* Tape on top */}
              <div className={`absolute -top-2 left-1/4 w-20 h-6 bg-yellow-300 opacity-60 transform ${i % 2 === 0 ? 'rotate-3' : '-rotate-2'}`}></div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
