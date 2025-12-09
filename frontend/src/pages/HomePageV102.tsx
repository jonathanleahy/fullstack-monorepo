import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV102() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={102} />

      {/* Minimalist Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-16 py-8">
          <div className="flex items-center justify-between">
            {/* Simple Logo */}
            <Link to="/" className="group">
              <h1 className="text-lg tracking-widest text-gray-900 font-light">
                學習
                <span className="inline-block w-2 h-2 bg-red-500 ml-2 group-hover:w-8 transition-all duration-500" />
              </h1>
            </Link>

            {/* Hidden Menu - Reveals on Hover */}
            <nav className="relative group">
              <button className="text-gray-400 text-sm tracking-wider hover:text-gray-900 transition-colors duration-500">
                menu
              </button>
              <div className="absolute right-0 top-full pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 py-4 px-6 space-y-3">
                  <Link to="/courses" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">courses</Link>
                  <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">about</Link>
                  {!isAuthenticated && (
                    <Link to="/login" className="block text-sm text-gray-900 border-t border-gray-100 pt-3 mt-3">enter</Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Zen Hero - Extreme Whitespace */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-16">
          {/* Massive Vertical Spacing */}
          <div className="h-32" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ opacity }}
            className="text-center"
          >
            {/* Single Powerful Word */}
            <h2 className="text-[12rem] font-extralight text-gray-900 leading-none tracking-tight mb-16">
              learn
            </h2>

            {/* Haiku-brief Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-gray-500 text-sm tracking-wide font-light max-w-sm mx-auto leading-loose"
            >
              knowledge flows like water
              <br />
              find your path to mastery
              <br />
              begin here, now, today
            </motion.p>
          </motion.div>

          <div className="h-24" />

          {/* Nearly Invisible CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="text-center"
          >
            <Link
              to="/courses"
              className="inline-block text-gray-400 text-xs tracking-widest hover:text-gray-900 transition-colors duration-700 relative group"
            >
              explore courses
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-700" />
            </Link>
          </motion.div>

          <div className="h-32" />
        </div>

        {/* Single Accent Element */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-16 w-1 h-48 bg-gradient-to-b from-transparent via-red-500 to-transparent"
        />
      </section>

      {/* Minimalist Visual Break */}
      <section className="relative py-32">
        <div className="max-w-6xl mx-auto px-16">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </section>

      {/* Sparse Content Section */}
      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-16">
          <div className="grid grid-cols-3 gap-24">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto border border-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">一</span>
                </div>
              </div>
              <h3 className="text-xs tracking-widest text-gray-400 mb-4">FOCUS</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                One concept
                <br />
                at a time
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto border border-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">二</span>
                </div>
              </div>
              <h3 className="text-xs tracking-widest text-gray-400 mb-4">CLARITY</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Simple
                <br />
                teachings
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto border border-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">三</span>
                </div>
              </div>
              <h3 className="text-xs tracking-widest text-gray-400 mb-4">MASTERY</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Deep
                <br />
                understanding
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimalist Quote Section */}
      <section className="py-32 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-16 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="text-2xl font-light text-gray-600 leading-relaxed"
          >
            "The journey of a thousand miles begins with a single step"
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-xs text-gray-400 mt-8 tracking-widest"
          >
            老子
          </motion.p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-16">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400 tracking-wider">© 2024</p>
            <div className="flex gap-12">
              <Link to="/terms" className="text-xs text-gray-400 hover:text-gray-900 transition-colors duration-500">terms</Link>
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-gray-900 transition-colors duration-500">privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
