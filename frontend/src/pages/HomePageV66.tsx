import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV66() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={66} />

      {/* Magazine Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-xl">CT</span>
              </div>
              <div className="border-l-2 border-black pl-2">
                <h1 className="text-2xl font-black tracking-tight">COURSE TUTOR</h1>
                <p className="text-xs uppercase tracking-widest text-gray-600">Educational Magazine</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className="text-sm font-bold uppercase tracking-wide hover:text-cyan-600 transition-colors">Courses</Link>
              <Link to="/about" className="text-sm font-bold uppercase tracking-wide hover:text-cyan-600 transition-colors">About</Link>
              <Link to="/help" className="text-sm font-bold uppercase tracking-wide hover:text-cyan-600 transition-colors">Help</Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-sm font-bold uppercase">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button className="bg-cyan-500 text-white hover:bg-cyan-600 px-6 py-2 text-sm font-bold uppercase">Sign In</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Magazine Cover Style */}
      <motion.section
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-cyan-600 font-black text-sm uppercase tracking-widest">Issue No. 2025</span>
              <h1 className="text-7xl md:text-8xl font-black leading-none mt-4 mb-6">
                LEARN<br/>
                <span className="text-cyan-600">WITHOUT</span><br/>
                LIMITS
              </h1>
              <div className="w-24 h-1 bg-black mb-6"></div>
              <p className="text-xl leading-relaxed font-serif text-gray-700">
                Discover a revolutionary approach to online education. Master new skills through
                our expertly curated courses designed for the modern learner.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex items-center space-x-4"
            >
              <Link to="/courses">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-sm font-bold uppercase">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/about">
                <Button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-sm font-bold uppercase transition-colors">
                  Read More
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Featured Article Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-4 border-black bg-amber-50 p-8"
          >
            <div className="border-b-2 border-black pb-4 mb-4">
              <span className="text-xs uppercase tracking-widest font-bold">Featured Story</span>
            </div>
            <h3 className="text-3xl font-black mb-4">The Future of Digital Learning</h3>
            <p className="text-gray-700 leading-relaxed mb-6 font-serif">
              In an era of rapid technological advancement, education must evolve.
              We're pioneering new methods that combine AI assistance with human expertise.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">By Editorial Team</span>
              <span className="text-sm text-gray-600">5 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t-4 border-black">
        <div className="mb-12">
          <h2 className="text-5xl font-black mb-2">LATEST ARTICLES</h2>
          <div className="w-32 h-1 bg-cyan-600"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Web Development Mastery", category: "Technology", color: "bg-blue-500" },
            { title: "Data Science Foundations", category: "Analytics", color: "bg-emerald-500" },
            { title: "Creative Design Thinking", category: "Design", color: "bg-rose-500" },
            { title: "Business Strategy 101", category: "Business", color: "bg-amber-500" },
            { title: "Mobile App Development", category: "Technology", color: "bg-cyan-500" },
            { title: "Digital Marketing Trends", category: "Marketing", color: "bg-teal-500" }
          ].map((article, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform cursor-pointer"
            >
              <div className={`${article.color} h-48`}></div>
              <div className="p-6 bg-white">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-600">{article.category}</span>
                <h3 className="text-2xl font-black mt-2 mb-3">{article.title}</h3>
                <p className="text-gray-700 leading-relaxed font-serif text-sm">
                  Comprehensive guide covering essential concepts and practical applications.
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-bold">12 Lessons</span>
                  <span className="text-gray-600">6 hours</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="bg-cyan-500 border-y-4 border-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-8xl font-black text-black/20 mb-4">"</div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Education is not the learning of facts, but the training of the mind to think.
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mt-8 mb-4"></div>
            <p className="text-white text-lg font-bold">— Albert Einstein</p>
          </motion.div>
        </div>
      </section>

      {/* Multi-column Feature Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-black mb-6">WHY CHOOSE US</h2>
            <div className="space-y-6">
              {[
                { title: "Expert Instructors", desc: "Learn from industry professionals with years of real-world experience." },
                { title: "Flexible Learning", desc: "Study at your own pace with lifetime access to course materials." },
                { title: "Practical Projects", desc: "Build your portfolio with hands-on assignments and real-world applications." }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-cyan-600 pl-6"
                >
                  <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-serif">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-amber-50 p-8">
            <div className="border-b-2 border-black pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest font-bold">Statistics</span>
            </div>
            <div className="space-y-8">
              {[
                { number: "50,000+", label: "Active Students" },
                { number: "500+", label: "Expert Courses" },
                { number: "95%", label: "Success Rate" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl font-black text-cyan-600">{stat.number}</div>
                  <div className="text-sm uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-black mb-4">COURSE TUTOR</h3>
              <p className="text-sm text-gray-700 font-serif">
                Your partner in lifelong learning and professional development.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase mb-4">Learning</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-cyan-600">All Courses</Link></li>
                <li><Link to="/categories" className="hover:text-cyan-600">Categories</Link></li>
                <li><Link to="/instructors" className="hover:text-cyan-600">Instructors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-cyan-600">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-cyan-600">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-cyan-600">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-cyan-600">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-600">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-black pt-8 text-center">
            <p className="text-sm font-bold">&copy; 2025 Course Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
