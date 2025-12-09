/**
 * VARIANT 3: TECH LEARNERS
 * Reference: docs/website-brief.md - V3 Persona Section
 * Target: Developers and aspiring programmers (Age 22-40)
 * Tone: Technical, direct, developer-to-developer
 * Design: Emerald/cyan primary, sharp shadows (shadow-lg shadow-emerald-500/10)
 * Effects: Solar flares (emerald/cyan), subtle tech pattern texture
 * Sales: Lead with curriculum quality, show code examples
 * Layout Flow: Hero with code terminal → Border intro → 2x2 topics →
 *              Code preview split → Icon row → Quote → Image with stats → CTA
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
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

export function HomePageV3() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  const techTopics = [
    { name: 'React & TypeScript', courses: 24, level: 'All levels' },
    { name: 'Python & Data Science', courses: 32, level: 'All levels' },
    { name: 'Go & Rust', courses: 18, level: 'Intermediate+' },
    { name: 'DevOps & Cloud', courses: 22, level: 'All levels' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/20">
      {/* Header - V3: Logo LEFT with terminal aesthetic, nav RIGHT inline */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-emerald-400 font-mono flex items-center gap-2">
            <span className="text-emerald-500">$</span>
            Course Tutor
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">Courses</Link>
              <Link to="/about" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">About</Link>
              <Link to="/help" className="text-slate-300 hover:text-emerald-400 transition-colors font-mono text-sm">Help</Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-300 hover:text-emerald-400 text-sm font-mono">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/10 font-mono">Start Free</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero - Asymmetric layout (60% text LEFT, 40% code preview RIGHT) */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden bg-slate-900">
        {/* Tech Grid Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Solar Flares - Emerald/Cyan */}
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-[100px]" />
        <motion.div
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-200/15 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />

        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-5 gap-8 items-center">
            {/* 60% - Text content */}
            <motion.div
              className="col-span-5 md:col-span-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <Badge className="bg-emerald-900/50 text-emerald-300 font-mono shadow-sm ring-1 ring-emerald-500/30">
                  Learn by Building
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Learn to Code with
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Practical Projects
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-300 mb-4 leading-relaxed">
                Programming courses with hands-on projects. Watch video lessons, write code
                in your browser, and build real applications.
              </motion.p>

              <motion.p variants={itemVariants} className="text-emerald-400/70 mb-8 font-mono text-sm">
                React, Python, Go, TypeScript, and more.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 font-mono shadow-lg shadow-emerald-500/20">
                      Start Learning
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8 py-5 font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 ring-1 ring-emerald-500/10">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* 40% - Code Terminal */}
            <motion.div
              className="col-span-5 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: "easeOut" as const }}
            >
              <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-slate-300 leading-relaxed overflow-x-auto text-xs">
{`// Build real apps
import { useState } from 'react';

function Counter() {
  const [count, setCount] =
    useState(0);

  return (
    <button onClick={() =>
      setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`}
                </pre>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* SECTION 2: What is Course Tutor - Centered with border */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut" as const }}
        >
          <div className="border-l-4 border-emerald-500 pl-6 text-left shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">What is Course Tutor?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              An online platform for learning programming. Video lessons, coding exercises
              in your browser, quizzes, and projects to build your portfolio.
              Courses updated regularly with <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">latest frameworks</span> and best practices.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: Topics - 2x2 grid with different styling */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Subtle Tech Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut" as const }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Topics We Cover</h2>
            <p className="text-slate-600">Practical skills for modern development</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techTopics.map((topic, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="bg-white rounded-lg p-5 border-l-4 border-emerald-500 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 font-mono">{topic.name}</h3>
                    <span className="text-sm text-slate-500">{topic.courses} courses</span>
                  </div>
                  <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded ring-1 ring-emerald-500/20">
                    {topic.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/courses" className="text-emerald-600 hover:text-emerald-700 font-medium font-mono transition-colors">
              View all topics →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Code in Browser - Split with live demo look */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut" as const }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Code in Your Browser</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Practice coding directly in our interactive editor. Get instant feedback
                and build projects without setting up a local environment.
              </p>
              <ul className="space-y-3">
                {['No setup required', 'Instant feedback', 'Real project challenges'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-mono text-sm">
                    <span className="text-emerald-600">$</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ease: "easeOut" as const }}
            >
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/10">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-slate-400 text-sm font-mono">exercise.ts</span>
                </div>
                <div className="p-5 font-mono text-sm">
                  <pre className="text-slate-300 leading-relaxed">
{`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

// Your code here
console.log(greet("World"));`}
                  </pre>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="text-emerald-400">// Output: Hello, World!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Features - Horizontal icon row */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Project-Based', desc: 'Build real applications' },
              { title: 'Code Exercises', desc: 'Practice in the browser' },
              { title: 'Up-to-Date', desc: 'Latest versions covered' },
              { title: 'Community', desc: 'Get help from devs' },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Single Developer Testimonial */}
      <section className="py-24 px-4 bg-white">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut" as const }}
        >
          <div className="relative">
            <div className="absolute -top-8 -left-4 text-8xl text-emerald-100 font-serif">"</div>
            <blockquote className="relative z-10 text-xl text-slate-700 mb-8 leading-relaxed pl-8">
              Landed my first dev job after completing the React track. The portfolio projects
              made all the difference in interviews. Finally understood hooks and state management.
            </blockquote>
            <div className="flex items-center gap-4 pl-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold font-mono shadow-lg shadow-emerald-500/20">
                J
              </div>
              <div>
                <div className="font-semibold text-slate-900">Jason Lee</div>
                <div className="text-emerald-600 text-sm">Bootcamp Grad → Junior Developer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: Image with stats overlay */}
      <section className="relative py-0">
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=600&fit=crop"
            alt="Developers working"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-cyan-900/80" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-12 md:gap-24 text-center text-white">
              {[
                { num: '200+', label: 'Courses' },
                { num: '50K', label: 'Developers' },
                { num: '4.8★', label: 'Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ease: "easeOut" as const }}
                >
                  <div className="text-4xl md:text-5xl font-bold font-mono">{stat.num}</div>
                  <div className="text-emerald-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut" as const }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-emerald-100 mb-8">
              Create a free account and start learning today.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-10 py-5 font-mono shadow-lg">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold font-mono text-emerald-600">Course Tutor</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={3} />
    </div>
  );
}
