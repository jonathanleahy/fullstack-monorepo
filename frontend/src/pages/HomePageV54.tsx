/**
 * VARIANT 54: WRITERS & CONTENT CREATORS
 *
 * Target: Aspiring authors, bloggers, copywriters
 * Tone: Inspiring, craft-focused, story-driven - "Find your voice"
 * Design: Typewriter black, paper cream, manuscript blue accents
 * Effects: Typewriter text animation effect
 * Sales: Highlight writing genres, published instructors, word count stats
 * Layout Flow: Manuscript hero → Genre categories → Author instructors → Writing stats →
 *              Published author testimonial → "Start Writing" CTA → Bookshelf footer
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

// Typewriter effect component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

export function HomePageV54() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const writingGenres = [
    { title: 'Fiction Writing', type: 'Novel & Short Stories', icon: '📖' },
    { title: 'Content Marketing', type: 'Blogs & Copywriting', icon: '✍️' },
    { title: 'Screenwriting', type: 'Film & Television', icon: '🎬' },
    { title: 'Poetry & Creative', type: 'Literary Arts', icon: '🖋️' },
  ];

  const authorInstructors = [
    { name: 'Sarah Klein', credential: 'NYT Bestselling Author', specialty: 'Fiction' },
    { name: 'Marcus Thompson', credential: 'Award-Winning Journalist', specialty: 'Non-Fiction' },
    { name: 'Elena Rodriguez', credential: 'Published Poet', specialty: 'Poetry' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-amber-50">
      {/* Header - Typewriter/Manuscript Aesthetic with Pen Icon */}
      <header className="sticky top-0 z-50 bg-amber-50 border-b-4 border-slate-800 shadow-lg">
        {/* Manuscript Header Bar */}
        <div className="bg-slate-900 text-amber-100 py-2 border-b-2 border-slate-700">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">📝</span>
              <span>Draft-001.doc</span>
            </div>
            <div className="hidden md:block">
              "Every story begins with a single word"
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🖋️</span>
              <span>10M+ words written</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-amber-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="font-serif font-bold text-2xl text-slate-900 flex items-center gap-3">
              <span className="text-3xl">📖</span>
              Course Tutor
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-600 hover:text-slate-900 transition-colors font-serif font-semibold">Courses</Link>
              <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors font-serif font-semibold">About</Link>
              <Link to="/help" className="text-slate-600 hover:text-slate-900 transition-colors font-serif font-semibold">Help</Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-slate-900 text-slate-900 font-serif">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm font-serif font-semibold">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white shadow-md font-serif">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Book Cover Layout with Title Treatment, Author Quote & Chapter Preview */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-amber-50 via-stone-50 to-blue-50">
        {/* Paper texture background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Book Cover Design */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Book Cover Visual */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Book Cover Frame */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-12 shadow-2xl border-4 border-slate-700">
                  {/* Title Treatment */}
                  <div className="mb-8 border-b-2 border-amber-500 pb-6">
                    <div className="text-amber-500 font-serif text-sm mb-2 tracking-widest uppercase">
                      Course Tutor Presents
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white leading-tight mb-4">
                      <TypewriterText text="Find Your Voice" />
                    </h1>
                    <div className="text-blue-300 font-serif italic text-lg">
                      The Writer's Journey
                    </div>
                  </div>

                  {/* Author Quote */}
                  <div className="bg-slate-800/50 rounded p-6 border-l-4 border-blue-400 mb-6">
                    <p className="text-slate-200 font-serif italic text-sm leading-relaxed">
                      "Master the craft of writing with courses taught by published authors, award-winning journalists, and industry professionals."
                    </p>
                  </div>

                  {/* Chapter Preview */}
                  <div className="bg-amber-50 rounded p-6">
                    <div className="font-mono text-xs text-slate-600 mb-2">TABLE OF CONTENTS</div>
                    <ul className="space-y-2 text-sm font-serif text-slate-800">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Chapter 1: Finding Your Story</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Chapter 2: Character Development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Chapter 3: Plot & Structure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Chapter 4: Publishing Path</span>
                      </li>
                    </ul>
                  </div>

                  {/* Acclaim Badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="bg-yellow-400 text-slate-900 border-0 font-serif">
                      300+ Published
                    </Badge>
                    <Badge className="bg-blue-400 text-slate-900 border-0 font-serif">
                      10M+ Words
                    </Badge>
                  </div>
                </div>

                {/* Stacked pages effect */}
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-slate-700 rounded-lg -z-10" />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-slate-600 rounded-lg -z-20" />
              </motion.div>
            </div>

            {/* Right: Content & CTA */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white rounded-lg p-10 shadow-xl border-2 border-slate-200"
              >
                <Badge className="bg-blue-50 text-blue-800 shadow-sm border border-blue-200 font-serif mb-6">
                  For Writers & Content Creators
                </Badge>

                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                  Your Story Deserves to Be Told
                </h2>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed font-serif">
                  From your first draft to final manuscript, learn from those who have walked the path to publication.
                  Our courses cover fiction, non-fiction, copywriting, and creative writing across all genres.
                </p>

                {/* Manuscript Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-br from-amber-50 to-blue-50 rounded-lg border border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 font-serif">10M+</div>
                    <div className="text-xs text-slate-600 font-serif">Words Written</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 font-serif">2.5K</div>
                    <div className="text-xs text-slate-600 font-serif">Manuscripts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700 font-serif">300+</div>
                    <div className="text-xs text-slate-600 font-serif">Published</div>
                  </div>
                </div>

                {/* Author Instructors Preview */}
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-serif font-semibold text-slate-900 mb-4">Learn from Published Authors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-serif">S</div>
                      <div>
                        <div className="font-serif text-sm font-semibold text-slate-900">Sarah Klein</div>
                        <div className="text-xs text-blue-700 font-serif">NYT Bestselling Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-serif">M</div>
                      <div>
                        <div className="font-serif text-sm font-semibold text-slate-900">Marcus Thompson</div>
                        <div className="text-xs text-blue-700 font-serif">Award-Winning Journalist</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-6 shadow-lg font-serif text-lg">
                      Start Writing
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="px-10 py-6 border-slate-900 text-slate-900 hover:bg-slate-50 font-serif text-lg">
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Writing Genre Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Choose Your Genre</h2>
            <p className="text-slate-600 font-serif">Specialized courses for every type of writer</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {writingGenres.map((genre, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-lg p-6 shadow-md border-2 border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{genre.icon}</div>
                <h3 className="font-serif font-semibold text-slate-900 text-lg mb-1">{genre.title}</h3>
                <div className="text-sm text-blue-700 font-serif">{genre.type}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Published Author Instructors */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Learn from Published Authors</h2>
            <p className="text-slate-600 font-serif">Industry professionals who have walked the path</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {authorInstructors.map((author, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-600 rounded-full flex items-center justify-center text-white font-serif font-semibold text-2xl mb-4 mx-auto">
                  {author.name.charAt(0)}
                </div>
                <h3 className="font-serif font-semibold text-slate-900 text-center mb-1">{author.name}</h3>
                <div className="text-sm text-blue-700 text-center mb-2 font-serif">{author.credential}</div>
                <div className="text-xs text-slate-500 text-center font-serif">{author.specialty}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Writing Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '10M+', label: 'Words Written by Students' },
              { number: '2,500+', label: 'Manuscripts Completed' },
              { number: '300+', label: 'Students Published' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-serif font-bold mb-2 text-blue-300">{stat.number}</div>
                <div className="text-slate-300 font-serif">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Your Writing Journey</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Path', desc: 'Select your genre and skill level', icon: '📚' },
              { step: '2', title: 'Learn & Practice', desc: 'Daily writing exercises and feedback', icon: '✍️' },
              { step: '3', title: 'Complete Your Work', desc: 'Finish your manuscript with confidence', icon: '📝' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-serif font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm font-serif">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Published Author Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-8 shadow-xl border-2 border-blue-200"
          >
            <p className="text-slate-700 italic mb-6 text-xl leading-relaxed font-serif">
              "Course Tutor helped me transform from an aspiring writer to a published author. The fiction writing course gave me the structure and confidence I needed. My debut novel was picked up by a major publisher six months after completing the program."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white font-serif font-semibold text-xl shadow-md">
                D
              </div>
              <div>
                <div className="font-serif font-semibold text-slate-900">David Park</div>
                <div className="text-blue-800 text-sm font-serif">Published Novelist, Debut Author</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: "Start Writing" CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Your Story Starts Today
            </h2>
            <p className="text-blue-200 mb-8 text-lg font-serif">
              Join a community of writers finding their voice
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-blue-300 text-slate-900 hover:bg-blue-200 px-10 py-5 font-serif font-semibold shadow-xl">
                  Begin Your Journey
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Bookshelf Style */}
      <footer className="bg-amber-50 text-stone-700 py-8 border-t-4 border-amber-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-serif font-semibold text-amber-700 mb-3">Course Tutor</h4>
              <p className="text-sm font-serif">Where writers find their voice</p>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-3">Genres</h4>
              <div className="flex flex-col gap-2 text-sm font-serif">
                <Link to="/fiction" className="hover:text-amber-700 transition-colors">Fiction</Link>
                <Link to="/nonfiction" className="hover:text-amber-700 transition-colors">Non-Fiction</Link>
                <Link to="/poetry" className="hover:text-amber-700 transition-colors">Poetry</Link>
              </div>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-stone-900 mb-3">Resources</h4>
              <div className="flex flex-col gap-2 text-sm font-serif">
                <Link to="/about" className="hover:text-amber-700 transition-colors">About</Link>
                <Link to="/help" className="hover:text-amber-700 transition-colors">Help</Link>
                <Link to="/blog" className="hover:text-amber-700 transition-colors">Writing Blog</Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm font-serif pt-6 border-t border-stone-300">
            © 2024 Course Tutor. All rights reserved.
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={54} />
    </div>
  );
}
