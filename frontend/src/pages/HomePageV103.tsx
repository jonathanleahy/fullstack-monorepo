import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV103() {
  const { isAuthenticated } = useAuth();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second for authentic OS feel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-teal-600 p-2">
      <DesignNavigation currentVersion={103} />

      {/* Desktop Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)`
      }} />

      {/* Taskbar */}
      <div className="fixed bottom-2 left-2 right-2 h-12 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 shadow-lg z-50">
        <div className="flex items-center justify-between h-full px-2">
          {/* Start Button */}
          <button className="h-9 px-6 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 active:border-t-2 active:border-l-2 active:border-gray-800 active:border-r-2 active:border-b-2 active:border-white font-bold text-sm flex items-center gap-2 hover:bg-gray-100">
            <span className="text-lg">🖥️</span>
            Start
          </button>

          {/* Running Programs */}
          <div className="flex gap-2">
            <div className="h-9 px-4 bg-gray-300 border-t-2 border-l-2 border-gray-800 border-r-2 border-b-2 border-white text-sm flex items-center font-bold">
              📚 CourseHub
            </div>
          </div>

          {/* System Tray */}
          <div className="h-9 px-3 border-t-2 border-l-2 border-gray-800 border-r-2 border-b-2 border-white flex items-center gap-3 bg-gray-300">
            <span className="text-xs">🔊</span>
            <span className="text-xs font-mono">{time}</span>
          </div>
        </div>
      </div>

      {/* Main Window */}
      <div className="max-w-6xl mx-auto mt-8 mb-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 shadow-2xl"
        >
          {/* Window Title Bar */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">📚</span>
              <span className="text-white font-bold text-sm">CourseHub - Welcome</span>
            </div>
            <div className="flex gap-1">
              <button className="w-6 h-6 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-xs hover:bg-gray-100 active:border-t-2 active:border-l-2 active:border-gray-800 active:border-r-2 active:border-b-2 active:border-white">
                _
              </button>
              <button className="w-6 h-6 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-xs hover:bg-gray-100 active:border-t-2 active:border-l-2 active:border-gray-800 active:border-r-2 active:border-b-2 active:border-white">
                □
              </button>
              <button className="w-6 h-6 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-xs font-bold hover:bg-gray-100 active:border-t-2 active:border-l-2 active:border-gray-800 active:border-r-2 active:border-b-2 active:border-white">
                ✕
              </button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="bg-gray-200 border-b-2 border-gray-800 px-2 py-1 flex gap-4">
            <button className="text-sm hover:bg-blue-600 hover:text-white px-2 py-1">File</button>
            <button className="text-sm hover:bg-blue-600 hover:text-white px-2 py-1">Edit</button>
            <button className="text-sm hover:bg-blue-600 hover:text-white px-2 py-1">View</button>
            <button className="text-sm hover:bg-blue-600 hover:text-white px-2 py-1">Help</button>
          </div>

          {/* Window Content */}
          <div className="p-8 bg-white min-h-[600px]">
            {/* Hero Content in Window */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'serif' }}>
                Welcome to CourseHub
              </h1>
              <div className="h-1 w-32 bg-blue-600 mx-auto mb-6" />
              <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Your gateway to expert-led online courses. Master new skills with our
                classic, no-nonsense learning platform.
              </p>
            </div>

            {/* Classic Beveled Buttons */}
            <div className="flex gap-4 justify-center mb-16">
              <Link to="/courses">
                <button className="px-8 py-4 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 font-bold text-lg hover:bg-gray-100 active:border-t-2 active:border-l-2 active:border-gray-800 active:border-r-2 active:border-b-2 active:border-white">
                  📚 Browse Courses
                </button>
              </Link>
              {!isAuthenticated && (
                <Link to="/login">
                  <button className="px-8 py-4 bg-blue-600 text-white border-t-2 border-l-2 border-blue-400 border-r-2 border-b-2 border-blue-900 font-bold text-lg hover:bg-blue-500 active:border-t-2 active:border-l-2 active:border-blue-900 active:border-r-2 active:border-b-2 active:border-blue-400">
                  🔐 Sign In
                </button>
                </Link>
              )}
            </div>

            {/* Nested Windows - Features */}
            <div className="grid grid-cols-3 gap-4">
              {/* Feature Window 1 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800"
              >
                <div className="bg-gradient-to-r from-gray-600 to-gray-500 px-2 py-1">
                  <span className="text-white font-bold text-xs">Expert Teachers</span>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-4xl mb-3">👨‍🏫</div>
                  <p className="text-sm text-gray-700">
                    Learn from industry professionals with years of experience.
                  </p>
                </div>
              </motion.div>

              {/* Feature Window 2 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800"
              >
                <div className="bg-gradient-to-r from-gray-600 to-gray-500 px-2 py-1">
                  <span className="text-white font-bold text-xs">Certificates</span>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-4xl mb-3">🎓</div>
                  <p className="text-sm text-gray-700">
                    Earn recognized certificates upon course completion.
                  </p>
                </div>
              </motion.div>

              {/* Feature Window 3 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800"
              >
                <div className="bg-gradient-to-r from-gray-600 to-gray-500 px-2 py-1">
                  <span className="text-white font-bold text-xs">Lifetime Access</span>
                </div>
                <div className="p-4 bg-white">
                  <div className="text-4xl mb-3">♾️</div>
                  <p className="text-sm text-gray-700">
                    Access your courses anytime, anywhere, forever.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-400">
              <div className="flex gap-4 items-start">
                <span className="text-3xl">ℹ️</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">System Requirements</h3>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Modern web browser (any vintage)</li>
                    <li>Internet connection recommended</li>
                    <li>Curiosity and willingness to learn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Window Status Bar */}
          <div className="bg-gray-200 border-t-2 border-gray-400 px-2 py-1 flex justify-between items-center">
            <span className="text-xs text-gray-700">Ready</span>
            <div className="flex gap-4">
              <span className="text-xs text-gray-700">👥 1,247 users online</span>
              <span className="text-xs text-gray-700">📚 156 courses available</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Icons */}
      <div className="fixed top-4 left-4 space-y-4">
        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center cursor-pointer group">
          <div className="w-16 h-16 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-3xl mb-1">
            🖥️
          </div>
          <span className="text-white text-xs font-bold text-center px-2 py-1 bg-blue-600 group-hover:bg-blue-500">
            My Computer
          </span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center cursor-pointer group">
          <div className="w-16 h-16 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-3xl mb-1">
            📁
          </div>
          <span className="text-white text-xs font-bold text-center px-2 py-1 bg-blue-600 group-hover:bg-blue-500">
            My Courses
          </span>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center cursor-pointer group">
          <div className="w-16 h-16 bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 flex items-center justify-center text-3xl mb-1">
            🗑️
          </div>
          <span className="text-white text-xs font-bold text-center px-2 py-1 bg-blue-600 group-hover:bg-blue-500">
            Recycle Bin
          </span>
        </motion.div>
      </div>
    </div>
  );
}
