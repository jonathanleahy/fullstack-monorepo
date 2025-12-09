/**
 * VARIANT 58: ARCHITECTURE & DESIGN
 *
 * Target: Architects, interior designers, urban planners
 * Tone: Design-forward, technical - "Design the future"
 * Design: Concrete gray, blueprint blue, clean white
 * Effects: Structural, precise borders (4-8px), architectural shadows
 * Sales: Portfolio-focused, software tools (CAD, Revit, SketchUp)
 * Layout Flow: Blueprint hero → Discipline grid → Software courses → Project stats →
 *              Architect testimonial → Portfolio CTA → Grid footer
 * Wildcard: Blueprint line-drawing animation
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

export function HomePageV58() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -20]);

  const disciplines = [
    { title: 'Architecture', icon: '🏛️', courses: 42 },
    { title: 'Interior Design', icon: '🛋️', courses: 38 },
    { title: 'Urban Planning', icon: '🏙️', courses: 26 },
    { title: 'Landscape', icon: '🌳', courses: 22 },
    { title: 'Sustainable Design', icon: '♻️', courses: 30 },
    { title: 'Historic Preservation', icon: '🏰', courses: 18 },
  ];

  const softwareTools = [
    { name: 'AutoCAD', level: 'Beginner to Advanced' },
    { name: 'Revit', level: 'BIM Mastery' },
    { name: 'SketchUp', level: '3D Modeling' },
    { name: 'Rhino + Grasshopper', level: 'Parametric Design' },
  ];

  const projectStats = [
    { number: '25,000+', label: 'Designers Trained' },
    { number: '12,500', label: 'Portfolio Projects' },
    { number: '450+', label: 'Design Courses' },
    { number: '98%', label: 'Job Placement' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Blueprint/Drafting Style */}
      <header className="sticky top-0 z-50 bg-white border-b-8 border-slate-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-1">
          {/* Technical header bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span>PROJECT: COURSE-TUTOR-2025</span>
              <span className="text-blue-600">|</span>
              <span>SCALE: 1:1</span>
              <span className="text-blue-600">|</span>
              <span>DWG NO: CT-EDU-001</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span>DATE: 2025</span>
              <span className="text-blue-600">|</span>
              <span>REV: A</span>
            </div>
          </div>

          {/* Main navigation with compass motif */}
          <div className="py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 border-4 border-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-blue-600 rotate-45" />
                <span className="font-mono font-bold text-slate-900 text-xs relative z-10">CT</span>
              </div>
              <div>
                <div className="font-light text-2xl tracking-tight text-slate-900">
                  COURSE <span className="font-bold">TUTOR</span>
                </div>
                <div className="text-xs text-blue-700 font-mono tracking-wider">DESIGN EDUCATION PLATFORM</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/courses" className="text-slate-600 hover:text-blue-700 transition-colors text-sm uppercase tracking-wider font-mono">Courses</Link>
              <Link to="/about" className="text-slate-600 hover:text-blue-700 transition-colors text-sm uppercase tracking-wider font-mono">About</Link>
              <Link to="/help" className="text-slate-600 hover:text-blue-700 transition-colors text-sm uppercase tracking-wider font-mono">Help</Link>
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-2 border-slate-900 font-mono uppercase tracking-wide">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm uppercase tracking-wider font-mono">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-mono uppercase tracking-wide">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Technical grid line accent */}
        <div className="h-2 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900" />
      </header>

      {/* SECTION 1: Hero - Building Elevation Layout */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden bg-blue-50">
        {/* Blueprint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1e40af 1px, transparent 1px),
              linear-gradient(to bottom, #1e40af 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Blueprint line-drawing animation */}
        <motion.div
          className="absolute top-1/4 right-[5%] w-96 h-96 opacity-[0.05]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.rect
              x="20" y="20" width="160" height="160"
              stroke="#1e40af"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="100" y1="20" x2="100" y2="180"
              stroke="#1e40af"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 0.5, repeat: Infinity }}
            />
            <motion.line
              x1="20" y1="100" x2="180" y2="100"
              stroke="#1e40af"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 1, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto relative z-10">
          {/* Technical drawing title block */}
          <div className="mb-8 bg-white border-8 border-slate-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-slate-500 mb-1">PROJECT TITLE:</div>
                <div className="text-sm font-mono font-bold text-slate-900">PROFESSIONAL DESIGN EDUCATION PLATFORM</div>
              </div>
              <Badge className="bg-blue-600 text-white border-4 border-blue-500 uppercase tracking-wider font-mono px-4 py-2">
                Design Professionals
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Main elevation - Image with technical annotations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative md:col-span-3"
            >
              <div className="relative border-8 border-slate-900 shadow-2xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=600&fit=crop"
                  alt="Architectural blueprints and design workspace"
                  className="w-full h-full object-cover"
                />

                {/* Technical callouts */}
                <div className="absolute top-4 left-4 bg-white/95 border-2 border-blue-600 p-2 font-mono text-xs">
                  <div className="font-bold text-blue-700">SPEC 01:</div>
                  <div className="text-slate-700">CAD Training</div>
                </div>

                <div className="absolute top-1/2 right-4 bg-white/95 border-2 border-blue-600 p-2 font-mono text-xs">
                  <div className="font-bold text-blue-700">SPEC 02:</div>
                  <div className="text-slate-700">BIM Systems</div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 border-2 border-blue-600 p-2 font-mono text-xs">
                  <div className="font-bold text-blue-700">SPEC 03:</div>
                  <div className="text-slate-700">3D Modeling</div>
                </div>
              </div>

              {/* Blueprint corner marks */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-8 border-l-8 border-blue-600" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-8 border-r-8 border-blue-600" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-8 border-l-8 border-blue-600" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-8 border-r-8 border-blue-600" />
            </motion.div>

            {/* Specification panel */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="md:col-span-2 bg-white border-8 border-slate-900 p-6"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-light text-slate-900 mb-4 leading-tight tracking-tight border-b-4 border-blue-600 pb-3"
              >
                Design
                <span className="block font-bold text-blue-700 text-5xl">
                  the Future
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-sm text-slate-700 mb-6 leading-relaxed font-mono">
                Master cutting-edge design tools and methodologies. From conceptual sketching
                to parametric modeling, build a portfolio that stands out.
              </motion.p>

              {/* Technical specs */}
              <motion.div variants={itemVariants} className="border-4 border-slate-200 p-4 mb-6 bg-slate-50">
                <div className="text-xs font-mono font-bold text-slate-900 mb-3 uppercase tracking-wider">Technical Specifications:</div>
                <div className="space-y-2 text-xs font-mono text-slate-700">
                  <div className="flex justify-between border-b border-slate-300 pb-1">
                    <span>Total Courses:</span>
                    <span className="font-bold">450+</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300 pb-1">
                    <span>Designers Trained:</span>
                    <span className="font-bold">25,000+</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300 pb-1">
                    <span>Job Placement:</span>
                    <span className="font-bold text-blue-700">98%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full bg-slate-900 hover:bg-blue-700 text-white px-6 py-5 uppercase tracking-wider font-mono border-4 border-slate-700">
                      Start Building
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="w-full px-6 py-5 border-4 border-slate-400 hover:bg-slate-100 uppercase tracking-wider font-mono">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Project Statistics */}
      <section className="py-8 px-4 bg-blue-50 border-y-4 border-blue-600">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projectStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-bold text-slate-900 mb-1 font-mono">{stat.number}</div>
                <div className="text-slate-600 text-sm uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Discipline Category Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-slate-900 mb-3">
              Design <span className="font-bold">Disciplines</span>
            </h2>
            <p className="text-slate-600 uppercase tracking-wide text-sm">Specialized courses for every practice</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {disciplines.map((discipline, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-slate-200 p-8 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{discipline.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{discipline.title}</h3>
                <div className="text-sm text-blue-700 font-mono">{discipline.courses} courses</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Software Tool Courses */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop"
                alt="Design software on computer screen"
                className="border-8 border-slate-900 shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-slate-900 text-white mb-4 uppercase tracking-wider text-xs">Software Mastery</Badge>
              <h2 className="text-4xl font-light text-slate-900 mb-4">
                Master the <span className="font-bold">Tools</span>
              </h2>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Industry-standard software training from beginner to expert level.
                Build technical proficiency that employers demand.
              </p>
              <div className="space-y-4 mb-6">
                {softwareTools.map((tool, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200">
                    <span className="font-bold text-slate-900">{tool.name}</span>
                    <span className="text-sm text-blue-700 uppercase tracking-wide">{tool.level}</span>
                  </div>
                ))}
              </div>
              <Link to="/courses">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white uppercase tracking-wide">
                  View Software Courses →
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-slate-900 mb-3">
              The <span className="font-bold">Process</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Path', desc: 'Select discipline and software tools' },
              { step: '02', title: 'Build & Iterate', desc: 'Hands-on projects with expert feedback' },
              { step: '03', title: 'Launch Portfolio', desc: 'Showcase your work professionally' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-blue-600 pl-6"
              >
                <div className="text-5xl font-mono font-bold text-slate-200 mb-2">{item.step}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Architect Testimonial */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 border-l-8 border-blue-600 shadow-xl"
          >
            <p className="text-xl text-slate-700 mb-6 leading-relaxed italic">
              "The parametric design course completely changed how I approach complex geometries.
              The portfolio I built landed me a position at a top international firm.
              The technical depth is exactly what practicing architects need."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 text-slate-900 flex items-center justify-center font-bold text-xl">
                JL
              </div>
              <div>
                <div className="font-bold text-slate-900">James Liu, AIA</div>
                <div className="text-blue-700 text-sm uppercase tracking-wide">Licensed Architect</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Build Your <span className="font-bold">Portfolio</span>
            </h2>
            <p className="text-slate-700 mb-8 text-lg uppercase tracking-wide">
              Start designing today
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 font-bold uppercase tracking-wider border-4 border-blue-500">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Grid Based */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-light text-lg tracking-tight text-slate-900 mb-3">
                COURSE <span className="font-bold">TUTOR</span>
              </div>
              <p className="text-slate-500 text-sm uppercase tracking-wide">Design Education</p>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Disciplines</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Architecture</li>
                <li>Interior Design</li>
                <li>Urban Planning</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Resources</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/courses" className="hover:text-blue-700">Courses</Link></li>
                <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
                <li><Link to="/help" className="hover:text-blue-700">Help</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-3 uppercase tracking-wide text-sm">Software</div>
              <p className="text-sm text-slate-600">CAD • BIM • 3D Modeling</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-500 uppercase tracking-wider">
            © 2025 Course Tutor • Design the Future
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={58} />
    </div>
  );
}
