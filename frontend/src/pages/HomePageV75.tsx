import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV75() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={75} />

      {/* Header - Minimal */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-light text-gray-900 tracking-tight">
            learn
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            <Link to="/courses" className="text-gray-600 hover:text-gray-900 transition-colors font-light">courses</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-light">about</Link>
            <Link to="/help" className="text-gray-600 hover:text-gray-900 transition-colors font-light">help</Link>
          </div>

          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gray-900 hover:bg-gray-800 text-white font-light px-6">
                  dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border border-gray-900 text-gray-900 hover:bg-gray-50 font-light px-6">
                  sign in
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Extreme Whitespace */}
      <section className="min-h-screen flex items-center justify-center bg-white px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-32"
          >
            <h1 className="text-7xl md:text-8xl font-extralight text-gray-900 mb-12 leading-tight tracking-tight">
              clarity
              <br />
              <span className="text-gray-400">in learning</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl font-light text-gray-600 mb-20 leading-relaxed max-w-2xl mx-auto"
          >
            remove distractions
            <br />
            embrace simplicity
            <br />
            discover knowledge
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-light tracking-wide">
              begin
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Single Line Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Philosophy Section */}
      <section className="py-40 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="space-y-32"
          >
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">philosophy</p>
              <h2 className="text-5xl font-extralight text-gray-900 mb-12 leading-relaxed">
                less is more
              </h2>
              <p className="text-xl font-light text-gray-600 leading-loose">
                in a world of noise, we offer silence
                <br />
                in a sea of complexity, we provide simplicity
                <br />
                in moments of chaos, we create calm
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Features - Minimal Cards */}
      <section className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="text-center mb-32"
          >
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">approach</p>
            <h2 className="text-5xl font-extralight text-gray-900">
              essential elements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-1 h-20 bg-gray-900 mx-auto mb-12" />
              <h3 className="text-2xl font-light text-gray-900 mb-6">focus</h3>
              <p className="text-gray-600 font-light leading-loose">
                one concept
                <br />
                one moment
                <br />
                complete understanding
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-1 h-20 bg-gray-900 mx-auto mb-12" />
              <h3 className="text-2xl font-light text-gray-900 mb-6">space</h3>
              <p className="text-gray-600 font-light leading-loose">
                room to breathe
                <br />
                time to think
                <br />
                clarity to learn
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-1 h-20 bg-gray-900 mx-auto mb-12" />
              <h3 className="text-2xl font-light text-gray-900 mb-6">essence</h3>
              <p className="text-gray-600 font-light leading-loose">
                no distractions
                <br />
                no clutter
                <br />
                pure knowledge
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Stats - Minimal Numbers */}
      <section className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <p className="text-7xl font-extralight text-gray-900 mb-6">100+</p>
              <p className="text-sm uppercase tracking-widest text-gray-400">courses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-center"
            >
              <p className="text-7xl font-extralight text-gray-900 mb-6">50k</p>
              <p className="text-sm uppercase tracking-widest text-gray-400">learners</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-7xl font-extralight text-gray-900 mb-6">98%</p>
              <p className="text-sm uppercase tracking-widest text-gray-400">satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Quote Section */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <blockquote className="text-4xl md:text-5xl font-extralight text-gray-900 leading-relaxed mb-12">
              "simplicity is the
              <br />
              ultimate sophistication"
            </blockquote>
            <p className="text-gray-400 font-light tracking-widest text-sm uppercase">
              leonardo da vinci
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Courses Preview - Minimal List */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="mb-24 text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-8">selected courses</p>
            <h2 className="text-5xl font-extralight text-gray-900">
              what you'll find
            </h2>
          </motion.div>

          <div className="space-y-12">
            {['foundations of design', 'modern development', 'strategic thinking', 'creative writing'].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center justify-between py-8 border-b border-gray-100 hover:border-gray-900 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-8">
                  <span className="text-sm text-gray-400 font-light w-8">0{index + 1}</span>
                  <h3 className="text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                    {course}
                  </h3>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* CTA Section - Minimal */}
      <section className="min-h-screen flex items-center justify-center bg-white px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-3xl"
        >
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-12">
            ready to begin
          </p>
          <h2 className="text-6xl md:text-7xl font-extralight text-gray-900 mb-16 leading-tight">
            start your
            <br />
            journey
          </h2>
          <p className="text-xl font-light text-gray-600 mb-16 leading-loose">
            experience learning
            <br />
            without distraction
          </p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-16 py-5 text-lg font-light tracking-wide">
            explore
          </Button>
        </motion.div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 font-light text-sm">
              © 2024 learn
            </p>
            <div className="flex items-center space-x-12">
              <Link to="/privacy" className="text-gray-400 hover:text-gray-900 transition-colors font-light text-sm">
                privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gray-900 transition-colors font-light text-sm">
                terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
