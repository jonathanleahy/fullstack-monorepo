import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV68() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      <DesignNavigation currentVersion={68} />

      {/* Luxury Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 border border-amber-700/30 flex items-center justify-center">
                <span className="text-amber-700 font-serif text-2xl italic">CT</span>
              </div>
              <div className="border-l border-stone-300 pl-3">
                <h1 className="text-2xl font-serif tracking-wide text-stone-800">Course Tutor</h1>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Since 2025</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-12">
              <Link to="/courses" className="text-sm uppercase tracking-[0.15em] text-stone-600 hover:text-amber-700 transition-colors font-light">
                Courses
              </Link>
              <Link to="/about" className="text-sm uppercase tracking-[0.15em] text-stone-600 hover:text-amber-700 transition-colors font-light">
                About
              </Link>
              <Link to="/help" className="text-sm uppercase tracking-[0.15em] text-stone-600 hover:text-amber-700 transition-colors font-light">
                Help
              </Link>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-stone-800 text-stone-50 hover:bg-stone-900 px-8 py-2.5 text-sm uppercase tracking-[0.15em] font-light">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button className="border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-stone-50 px-8 py-2.5 text-sm uppercase tracking-[0.15em] font-light transition-all">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Elegant & Spacious */}
      <motion.section
        style={{ opacity, scale }}
        className="relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="mb-8">
                <span className="text-amber-700 text-xs uppercase tracking-[0.3em] font-light">Excellence in Education</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif leading-tight text-stone-800 mb-8">
                Elevate Your
                <br />
                <span className="italic">Knowledge</span>
              </h1>
              <div className="w-24 h-px bg-amber-700/30 mx-auto mb-8"></div>
              <p className="text-xl leading-relaxed text-stone-600 font-light max-w-2xl mx-auto">
                Experience the pinnacle of digital learning. Our meticulously curated courses
                offer an unparalleled journey toward mastery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/courses">
                <Button className="bg-stone-800 text-stone-50 hover:bg-stone-900 px-12 py-4 text-sm uppercase tracking-[0.2em] font-light">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button className="border border-stone-300 text-stone-800 hover:border-stone-800 px-12 py-4 text-sm uppercase tracking-[0.2em] font-light transition-all">
                  Discover More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 border border-amber-700/10 rounded-full -z-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 border border-stone-200 rounded-full -z-10"></div>
      </motion.section>

      {/* Featured Collection */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-700 text-xs uppercase tracking-[0.3em] font-light">Curated Selection</span>
              <h2 className="text-5xl font-serif text-stone-800 mt-4 mb-6">Featured Courses</h2>
              <div className="w-24 h-px bg-amber-700/30 mx-auto"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Web Development", subtitle: "Modern Architecture", students: "12,500" },
              { title: "Data Analytics", subtitle: "Strategic Insights", students: "8,200" },
              { title: "Design Systems", subtitle: "Visual Excellence", students: "15,800" }
            ].map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-stone-100 aspect-[4/5] mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border border-amber-700/20"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-stone-800 mb-2">{course.title}</h3>
                  <p className="text-sm text-stone-500 uppercase tracking-[0.2em] font-light mb-4">{course.subtitle}</p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-stone-400">
                    <span className="uppercase tracking-[0.15em]">{course.students} Enrolled</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-stone-800 py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <div className="w-16 h-px bg-amber-700/50 mx-auto"></div>
            </div>
            <blockquote className="text-4xl md:text-5xl font-serif italic text-stone-100 leading-relaxed">
              "The beautiful thing about learning is that no one can take it away from you."
            </blockquote>
            <div className="mt-12">
              <div className="w-16 h-px bg-amber-700/50 mx-auto mb-6"></div>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-400 font-light">B.B. King</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - Minimalist */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-700 text-xs uppercase tracking-[0.3em] font-light">Our Philosophy</span>
              <h2 className="text-4xl font-serif text-stone-800 mt-6 mb-8">Distinction in Every Detail</h2>
              <div className="w-16 h-px bg-amber-700/30 mb-8"></div>
              <p className="text-lg leading-relaxed text-stone-600 font-light mb-6">
                We believe that exceptional education is a craft, refined through dedication
                and attention to detail.
              </p>
              <p className="text-lg leading-relaxed text-stone-600 font-light">
                Each course is carefully designed to provide not just knowledge, but wisdom
                that endures.
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                { title: "Expert Curation", desc: "Every instructor is selected for their mastery and ability to inspire." },
                { title: "Timeless Content", desc: "Focus on fundamental principles that remain relevant across generations." },
                { title: "Personal Growth", desc: "Education designed to transform both skill and perspective." }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-serif text-stone-800 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed font-light">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Sophisticated */}
      <section className="bg-stone-50 py-24 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-16">
            {[
              { number: "50,000", label: "Distinguished Students", suffix: "+" },
              { number: "500", label: "Premium Courses", suffix: "+" },
              { number: "95", label: "Completion Rate", suffix: "%" },
              { number: "24", label: "Support Available", suffix: "/7" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-serif text-5xl text-stone-800 mb-3">
                  {stat.number}<span className="text-amber-700">{stat.suffix}</span>
                </div>
                <div className="w-12 h-px bg-amber-700/30 mx-auto mb-4"></div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-700 text-xs uppercase tracking-[0.3em] font-light">Begin Your Journey</span>
            <h2 className="text-5xl font-serif text-stone-800 mt-6 mb-8">Join Our Community</h2>
            <div className="w-24 h-px bg-amber-700/30 mx-auto mb-12"></div>
            <p className="text-xl leading-relaxed text-stone-600 font-light mb-12 max-w-2xl mx-auto">
              Experience education reimagined for the discerning learner.
              Begin your transformation today.
            </p>
            <Link to="/courses">
              <Button className="bg-stone-800 text-stone-50 hover:bg-stone-900 px-16 py-5 text-sm uppercase tracking-[0.2em] font-light">
                View Courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Refined */}
      <footer className="bg-stone-800 border-t border-stone-700 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 border border-amber-700/30 flex items-center justify-center">
                  <span className="text-amber-700 font-serif text-lg italic">CT</span>
                </div>
                <h3 className="font-serif text-stone-100 text-xl">Course Tutor</h3>
              </div>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Excellence in education since 2025.
              </p>
            </div>
            {[
              { title: 'Learning', links: ['Courses', 'Categories', 'Instructors'] },
              { title: 'Company', links: ['About', 'Careers', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'FAQ', 'Terms'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-stone-300 font-light mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to="#" className="text-sm text-stone-400 hover:text-stone-200 transition-colors font-light">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-light">
              © 2025 Course Tutor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
