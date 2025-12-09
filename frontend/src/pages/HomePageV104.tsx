import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV104() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      <DesignNavigation currentVersion={104} />

      {/* Magazine Masthead */}
      <header className="border-b-4 border-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-12 py-6">
          <div className="flex items-end justify-between border-b-2 border-gray-300 pb-4">
            {/* Masthead Title */}
            <div>
              <h1 className="text-6xl font-serif font-black text-gray-900 tracking-tight leading-none">
                COURSEHUB
              </h1>
              <p className="text-xs tracking-widest text-gray-500 mt-1">EDUCATION QUARTERLY</p>
            </div>

            {/* Issue Info */}
            <div className="text-right">
              <p className="text-sm font-serif text-gray-700">Vol. 12, Issue 04</p>
              <p className="text-xs text-gray-500">December 2024</p>
            </div>
          </div>

          {/* Magazine Nav */}
          <nav className="flex gap-8 pt-4 text-xs tracking-widest uppercase">
            <Link to="/courses" className="text-gray-700 hover:text-gray-900 font-semibold">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-gray-900">Subscribe</Link>
            {!isAuthenticated && (
              <Link to="/login" className="text-gray-900 font-bold border-b-2 border-gray-900">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Magazine Cover Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Full Bleed Image with Text Overlay */}
          <div className="relative h-[600px] bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Magazine Cover Style Image Placeholder */}
              <div className="relative">
                <div className="text-9xl">📚</div>
              </div>
            </motion.div>

            {/* Cover Text Overlay */}
            <div className="relative h-full flex flex-col justify-between p-12">
              {/* Cover Line */}
              <div className="bg-gray-900 text-white px-6 py-2 inline-block self-start">
                <span className="text-xs tracking-widest font-bold">SPECIAL FEATURE</span>
              </div>

              {/* Main Cover Headline */}
              <div className="max-w-3xl">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-7xl font-serif font-black text-gray-900 leading-none mb-6"
                >
                  The Future of
                  <span className="block text-orange-600">Online Learning</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-2xl font-serif text-gray-700 leading-relaxed max-w-2xl mb-8"
                >
                  How expert-led courses are reshaping education for the digital age—and
                  what it means for learners everywhere.
                </motion.p>

                {/* Byline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px w-16 bg-gray-900" />
                  <p className="text-sm text-gray-600 font-serif italic">
                    By the CourseHub Editorial Team
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Editorial Spread */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-12">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-300" />
            <h3 className="text-xs tracking-widest text-gray-500 font-semibold">IN THIS ISSUE</h3>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              {/* Drop Cap Paragraph */}
              <p className="text-gray-800 leading-relaxed font-serif text-lg">
                <span className="float-left text-8xl font-black leading-none mr-3 mt-2 text-orange-600">
                  W
                </span>
                elcome to a new era of learning. In today's fast-paced world, education
                has transcended traditional boundaries. Our platform brings together the
                world's leading experts to share their knowledge with eager learners
                across the globe.
              </p>

              <p className="text-gray-700 leading-relaxed font-serif text-lg mt-6">
                Whether you're looking to advance your career, explore a new hobby, or
                simply satisfy your curiosity, we provide the tools and guidance you need
                to succeed.
              </p>

              {/* Pull Quote */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="my-8 border-l-4 border-orange-600 pl-6 py-4 bg-orange-50"
              >
                <p className="text-2xl font-serif italic text-gray-900 leading-tight">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-sans">— Nelson Mandela</p>
              </motion.div>

              <p className="text-gray-700 leading-relaxed font-serif text-lg">
                Our courses are meticulously crafted by industry professionals who bring
                real-world experience into every lesson. From beginner fundamentals to
                advanced techniques, we've got you covered.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-gray-700 leading-relaxed font-serif text-lg">
                The platform features interactive elements, hands-on projects, and a
                community of fellow learners who share your passion for growth and
                development.
              </p>

              <p className="text-gray-700 leading-relaxed font-serif text-lg mt-6">
                Each course includes lifetime access, so you can learn at your own pace
                and revisit materials whenever you need a refresher. Progress tracking
                helps you stay motivated and see how far you've come.
              </p>

              {/* Feature Box */}
              <div className="my-8 border-2 border-gray-900 p-6">
                <h4 className="text-sm tracking-widest font-bold text-gray-900 mb-4">WHAT'S INCLUDED</h4>
                <ul className="space-y-3 font-serif text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Expert-led video lessons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Community forum access</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed font-serif text-lg">
                Join thousands of students who have already transformed their lives
                through our courses. Your journey to mastery begins here.
              </p>

              {/* Editorial CTA */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <Link
                  to="/courses"
                  className="inline-block text-gray-900 font-serif text-lg border-b-2 border-gray-900 hover:border-orange-600 hover:text-orange-600 transition-colors"
                >
                  Browse our course catalog →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-12">
          <h3 className="text-4xl font-serif font-black text-gray-900 mb-12">Featured Stories</h3>

          <div className="grid grid-cols-3 gap-8">
            {/* Article 1 */}
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-white p-6 border-b-4 border-orange-600"
            >
              <div className="text-xs tracking-widest text-orange-600 font-bold mb-3">TECHNOLOGY</div>
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                Mastering Modern Web Development
              </h4>
              <p className="text-gray-600 font-serif leading-relaxed mb-4">
                Discover the latest frameworks and best practices that top developers
                use to build stunning applications.
              </p>
              <Link to="/courses/web-dev" className="text-sm text-gray-900 border-b border-gray-900 hover:border-orange-600 hover:text-orange-600 transition-colors">
                Read more
              </Link>
            </motion.article>

            {/* Article 2 */}
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-white p-6 border-b-4 border-blue-600"
            >
              <div className="text-xs tracking-widest text-blue-600 font-bold mb-3">BUSINESS</div>
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                Strategic Thinking for Leaders
              </h4>
              <p className="text-gray-600 font-serif leading-relaxed mb-4">
                Learn how successful executives make decisions and drive organizational
                change in complex environments.
              </p>
              <Link to="/courses/leadership" className="text-sm text-gray-900 border-b border-gray-900 hover:border-blue-600 hover:text-blue-600 transition-colors">
                Read more
              </Link>
            </motion.article>

            {/* Article 3 */}
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-white p-6 border-b-4 border-green-600"
            >
              <div className="text-xs tracking-widest text-green-600 font-bold mb-3">DESIGN</div>
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                The Art of Visual Communication
              </h4>
              <p className="text-gray-600 font-serif leading-relaxed mb-4">
                Explore principles of design that help you create compelling visuals
                that resonate with your audience.
              </p>
              <Link to="/courses/design" className="text-sm text-gray-900 border-b border-gray-900 hover:border-green-600 hover:text-green-600 transition-colors">
                Read more
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Magazine Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-4 gap-8 pb-8 border-b border-gray-700">
            <div>
              <h5 className="text-xs tracking-widest font-bold mb-4">SECTIONS</h5>
              <ul className="space-y-2 text-sm font-serif">
                <li><Link to="/features" className="hover:text-orange-400">Features</Link></li>
                <li><Link to="/interviews" className="hover:text-orange-400">Interviews</Link></li>
                <li><Link to="/reviews" className="hover:text-orange-400">Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs tracking-widest font-bold mb-4">COMPANY</h5>
              <ul className="space-y-2 text-sm font-serif">
                <li><Link to="/about" className="hover:text-orange-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-orange-400">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs tracking-widest font-bold mb-4">SUBSCRIBE</h5>
              <p className="text-sm font-serif text-gray-400 mb-3">Get the latest stories</p>
              <Link to="/subscribe" className="text-sm border-b border-white hover:border-orange-400 hover:text-orange-400">
                Subscribe now
              </Link>
            </div>
            <div>
              <h5 className="text-xs tracking-widest font-bold mb-4">FOLLOW</h5>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:text-orange-400">Twitter</a>
                <a href="#" className="hover:text-orange-400">LinkedIn</a>
                <a href="#" className="hover:text-orange-400">Instagram</a>
              </div>
            </div>
          </div>
          <div className="pt-8 flex justify-between items-center text-xs text-gray-500">
            <p>© 2024 CourseHub Education Quarterly. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-orange-400">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
