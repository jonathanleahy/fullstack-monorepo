import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV73() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gallery = [
    { id: 1, title: 'React Fundamentals', category: 'Frontend', aperture: 'f/2.8', iso: '400', students: '12.5K' },
    { id: 2, title: 'Node.js Mastery', category: 'Backend', aperture: 'f/1.8', iso: '800', students: '8.2K' },
    { id: 3, title: 'UI/UX Design', category: 'Design', aperture: 'f/4.0', iso: '200', students: '15.3K' },
    { id: 4, title: 'Python Basics', category: 'Programming', aperture: 'f/2.0', iso: '640', students: '18.7K' },
    { id: 5, title: 'Cloud Architecture', category: 'DevOps', aperture: 'f/5.6', iso: '100', students: '6.4K' },
    { id: 6, title: 'Data Science', category: 'Analytics', aperture: 'f/2.8', iso: '320', students: '11.2K' },
  ];

  const features = [
    { icon: '📸', title: 'Capture Knowledge', description: 'Frame-perfect learning moments' },
    { icon: '🎨', title: 'Visual Learning', description: 'Picture-based explanations' },
    { icon: '🔍', title: 'Focus Mode', description: 'Zoom in on what matters' },
    { icon: '✨', title: 'Polished Content', description: 'Studio-quality courses' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={73} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-gray-900 rounded-lg" />
              <div className="absolute inset-2 border-2 border-gray-900 rounded-sm" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full" />
            </div>
            <span className="font-bold text-xl text-gray-900">LensLearn</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">About</Link>
            <Link to="/help" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Help</Link>
          </div>

          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" className="bg-gray-900 hover:bg-gray-800 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Photography Inspired */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gray-100 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-700">LIVE LEARNING SESSIONS</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Focus On What
                <span className="block text-gray-600">
                  Truly Matters
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Capture every detail of your learning journey with crystal-clear courses designed for visual learners.
              </p>

              {/* Camera Settings Display */}
              <div className="flex items-center space-x-6 mb-8 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">APERTURE</span>
                  <span className="text-gray-900 font-bold">f/2.8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">ISO</span>
                  <span className="text-gray-900 font-bold">400</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">FOCUS</span>
                  <span className="text-emerald-600 font-bold">AUTO</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg">
                  Explore Gallery
                </Button>
                <Button variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 px-8 py-3 text-lg">
                  View Portfolio
                </Button>
              </div>
            </motion.div>

            {/* Aperture Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 flex items-center justify-center"
            >
              {/* Camera Aperture Blades */}
              <div className="relative w-80 h-80">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-40 bg-gray-900 origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    }}
                    initial={{ scaleY: 0.3 }}
                    animate={{ scaleY: [0.3, 0.8, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* Center Circle */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"
                  animate={{
                    width: ['80px', '120px', '80px'],
                    height: ['80px', '120px', '80px'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Viewfinder Frame */}
                <div className="absolute inset-0 border-4 border-gray-900 rounded-lg opacity-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Gallery</h2>
            <p className="text-xl text-gray-600">A curated collection of visual learning experiences</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(item.id)}
                className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer aspect-[4/3]"
              >
                {/* Image Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Camera Info Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 text-white text-xs font-mono">
                    <span className="px-2 py-1 bg-black/50 rounded">{item.aperture}</span>
                    <span className="px-2 py-1 bg-black/50 rounded">ISO {item.iso}</span>
                  </div>
                  <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {item.students}
                    </span>
                  </div>
                </div>

                {/* Corner Brackets (Viewfinder) */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center border-2 border-gray-900 rounded-lg p-8"
            >
              <p className="text-5xl font-bold text-gray-900 mb-2">50K+</p>
              <p className="text-gray-600 font-medium uppercase tracking-wide text-sm">Students Enrolled</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center border-2 border-gray-900 rounded-lg p-8"
            >
              <p className="text-5xl font-bold text-gray-900 mb-2">200+</p>
              <p className="text-gray-600 font-medium uppercase tracking-wide text-sm">Visual Courses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center border-2 border-gray-900 rounded-lg p-8"
            >
              <p className="text-5xl font-bold text-gray-900 mb-2">95%</p>
              <p className="text-gray-600 font-medium uppercase tracking-wide text-sm">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Develop Your Skills?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our community of visual learners and capture knowledge like never before
            </p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-bold">
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
            >
              ✕
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold">
                {gallery.find(item => item.id === selectedImage)?.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
