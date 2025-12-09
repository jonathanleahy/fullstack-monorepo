/**
 * VARIANT 14: CREATIVE ARTISTS (Light Theme)
 * Reference: docs/website-brief.md
 *
 * Target Persona: Creative artists, illustrators, photographers
 * - Age: 20-45
 * - Motivation: Portfolio building, creative expression, artistic community
 * - Pain point: Need platform showcasing creative work effectively
 * - Tech comfort: Moderate to high
 *
 * Design Style:
 * - Aesthetic: Inspiring, artistic, community-focused
 * - Color palette: Amber/sky/blue/teal (NO purple/violet/indigo - amber-600, sky-500, blue-500, teal-500)
 * - Shadows: Artistic with colored glow (shadow-xl shadow-amber-500/20)
 * - Border radius: Generous, artistic (12-20px)
 * - Typography: Bold, creative, expressive
 *
 * Effects:
 * - Solar flares: Vibrant amber/sky (bg-amber-200/25, bg-sky-200/20)
 * - Texture: Artistic brush texture at opacity-[0.08]
 *
 * Tone of Voice:
 * - Inspiring and artistic
 * - Community-focused
 * - Celebrates creativity
 * - "Express yourself"
 *
 * Sales Approach:
 * - Portfolio building emphasis
 * - Creative tools and features
 * - Artistic community connection
 * - Gallery and showcase opportunities
 * - No pressure, pure inspiration
 *
 * Layout Flow (UNIQUE):
 * Full-bleed artistic hero → Wavy divider → Medium badges row → Centered manifesto →
 * Portfolio showcase grid (3x2 - overlapping cards wildcard) → Single artist spotlight → Community gallery →
 * Creative stats → Amber gradient CTA
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent } from '@repo/playbook/molecules';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function HomePageV14() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Artistic parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const flare1Y = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const flare2Y = useTransform(smoothProgress, [0, 0.5], [0, -60]);
  const portfolioY = useTransform(smoothProgress, [0.2, 0.5], [60, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header - Artistic/Brush Stroke Style */}
      <header className="relative bg-gradient-to-r from-amber-50 via-white to-sky-50 border-b-4 border-amber-200 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 Q50,10 100,30 T200,30" stroke="rgba(245,158,11,0.3)" fill="none" strokeWidth="2"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo as artistic text */}
            <div className="flex items-center">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-sky-500 italic transform -rotate-2">
                ArtSpace
              </span>
              <span className="ml-2 text-2xl">✨</span>
            </div>

            {/* Nav scattered creatively */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#courses" className="text-slate-700 hover:text-amber-600 transition-colors font-medium transform hover:rotate-1">Courses</a>
              <a href="#about" className="text-slate-700 hover:text-sky-600 transition-colors font-medium transform hover:-rotate-1">About</a>
              <a href="#help" className="text-slate-700 hover:text-amber-600 transition-colors font-medium transform hover:rotate-1">Help</a>
              <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-sky-500 text-white rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Masonry Style with Overlapping Boxes */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-white">
        {/* Artistic texture background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Vibrant solar flares - amber/sky */}
        <motion.div
          style={{ y: flare1Y }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: flare2Y }}
          className="absolute bottom-10 left-1/3 w-80 h-80 bg-sky-200/20 rounded-full blur-[100px]"
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            style={{ y: heroY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative min-h-[600px]"
          >
            {/* Headline broken across overlapping boxes */}
            <motion.div
              variants={itemVariants}
              className="absolute top-0 left-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-8 shadow-2xl shadow-amber-500/20 transform rotate-[-2deg] max-w-md z-10"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Create.
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="absolute top-24 left-64 bg-gradient-to-br from-sky-100 to-sky-200 rounded-3xl p-8 shadow-2xl shadow-sky-500/20 transform rotate-[3deg] max-w-md z-20"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-sky-500 leading-tight">
                Share.
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="absolute top-48 left-32 bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 shadow-2xl shadow-amber-500/10 transform rotate-[-1deg] max-w-md z-30"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Inspire.
              </h1>
            </motion.div>

            {/* Content below the masonry headline */}
            <motion.div
              variants={itemVariants}
              className="absolute top-96 left-0 right-0 text-center mt-12"
            >
              <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join a vibrant community of creative artists building stunning portfolios
                and mastering new techniques. Your artistic journey starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-amber-600 to-sky-500 hover:from-amber-700 hover:to-sky-600 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-amber-500/20"
                      >
                        Continue Creating →
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-amber-600 to-sky-500 hover:from-amber-700 hover:to-sky-600 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-amber-500/20"
                        >
                          Start Your Portfolio →
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/courses">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 px-10 py-7 text-lg rounded-2xl"
                        >
                          Explore Courses
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </div>

              {/* Artist avatars */}
              <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
                  ].map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt=""
                      className="w-10 h-10 rounded-full border-3 border-white shadow-lg"
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="font-medium">Join 50,000+ creative artists</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wavy Divider */}
      <svg className="w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="white" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
      </svg>

      {/* Medium badges row */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: '🎨', text: 'Digital Art' },
              { icon: '📸', text: 'Photography' },
              { icon: '✏️', text: 'Illustration' },
              { icon: '🎬', text: 'Video Editing' },
              { icon: '🖌️', text: 'Graphic Design' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <Badge className="bg-amber-100 text-amber-700 border-0 px-6 py-3 text-base rounded-full">
                  <span className="mr-2">{badge.icon}</span>
                  {badge.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Centered manifesto */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Your creative vision deserves the perfect platform
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Whether you're an illustrator crafting stunning visuals, a photographer capturing moments,
            or a designer shaping brands—we provide the tools, community, and inspiration to elevate your craft.
          </p>
          <p className="text-sm text-amber-600 font-medium">
            ★★★★★ 4.9/5 from 25,000+ creative reviews • FREE portfolio hosting
          </p>
        </motion.div>
      </section>

      {/* Portfolio showcase grid (3x2) with Overlapping Cards Wildcard */}
      <section className="py-24 px-4 bg-amber-50/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-sky-100 text-sky-700 border-0 mb-4 rounded-full px-6 py-2">
              Featured Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Gallery of Inspiration
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Discover what our creative community is building
            </p>
          </motion.div>

          {/* Overlapping Portfolio Cards Wildcard Element */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="flex justify-center mb-12 relative h-48"
          >
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-64 h-40 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-xl rotate-[-8deg] z-10 border-4 border-white"
              whileHover={{ rotate: -12, scale: 1.05, zIndex: 30 }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-64 h-40 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl shadow-xl rotate-[0deg] z-20 border-4 border-white"
              whileHover={{ rotate: 4, scale: 1.05, zIndex: 30 }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-64 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-xl rotate-[8deg] z-10 border-4 border-white"
              whileHover={{ rotate: 12, scale: 1.05, zIndex: 30 }}
            />
          </motion.div>

          <motion.div
            style={{ y: portfolioY }}
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { img: 'photo-1618005182384-a83a8bd57fbe', title: 'Abstract Patterns', artist: 'Sarah M.' },
              { img: 'photo-1634986666676-ec8fd927c23d', title: 'Urban Photography', artist: 'David K.' },
              { img: 'photo-1541701494587-cb58502866ab', title: 'Character Design', artist: 'Luna P.' },
              { img: 'photo-1611162617474-5b21e879e113', title: 'Brand Identity', artist: 'Alex R.' },
              { img: 'photo-1618556450994-a6a128ef0d9d', title: 'Digital Painting', artist: 'Maya T.' },
              { img: 'photo-1634193295627-1cdddf751ebf', title: 'Motion Graphics', artist: 'Chris L.' },
            ].map((work, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <Card className="border-0 shadow-xl shadow-amber-500/20 rounded-2xl overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img
                        src={`https://images.unsplash.com/${work.img}?w=400&h=300&fit=crop`}
                        alt={work.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-slate-900 mb-1">{work.title}</h3>
                      <p className="text-sm text-amber-600">by {work.artist}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Single artist spotlight */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Card className="border-0 shadow-2xl shadow-sky-500/20 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <motion.div
                  className="relative h-96 lg:h-auto"
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=face"
                    alt="Featured artist"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                </motion.div>
                <motion.div
                  className="p-12 flex flex-col justify-center bg-gradient-to-br from-amber-50 to-sky-50"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="bg-amber-600 text-white border-0 mb-6 w-fit px-4 py-2 rounded-full">
                    Artist Spotlight
                  </Badge>
                  <blockquote className="text-2xl text-slate-800 mb-6 leading-relaxed font-medium">
                    "Course Tutor gave me the skills and confidence to turn my art into a thriving freelance career.
                    The community support is incredible."
                  </blockquote>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Jordan Martinez</div>
                    <div className="text-amber-600">Freelance Illustrator • Portfolio: 50+ clients</div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community gallery */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Join Our Creative Community
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              Connect, collaborate, and get feedback from fellow artists
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              'photo-1618005198919-d3d4b5a92ead',
              'photo-1634170380004-0b2c4f64d562',
              'photo-1618556450991-2f1af64e8191',
              'photo-1634224143538-ce0221abf732',
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="rounded-2xl overflow-hidden shadow-lg shadow-amber-500/10"
              >
                <img
                  src={`https://images.unsplash.com/${img}?w=300&h=300&fit=crop`}
                  alt="Community work"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Creative stats */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: '50K+', label: 'Creative Artists', icon: '🎨' },
              { value: '200+', label: 'Courses', icon: '📚' },
              { value: '15K+', label: 'Portfolios Created', icon: '🖼️' },
              { value: '4.9★', label: 'Community Rating', icon: '⭐' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-sky-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Amber gradient CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-600 via-sky-500 to-blue-600 relative overflow-hidden">
        {/* Artistic texture overlay */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80)',
          }}
        />

        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your creative breakthrough starts today
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Build a stunning portfolio, master new techniques, and join a community that celebrates your artistry.
          </p>
          <p className="text-sm text-amber-200 mb-10">
            <span className="font-semibold">✓ FREE portfolio hosting</span> • No credit card • Join in 60 seconds
          </p>
          <Link to={isAuthenticated ? "/courses" : "/register"}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-amber-50 px-12 py-7 text-lg rounded-2xl shadow-2xl shadow-black/20 font-bold"
              >
                {isAuthenticated ? "Explore Courses" : "Start Creating Free"} →
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-sky-400"
              whileHover={{ scale: 1.02 }}
            >
              Course Tutor
            </motion.div>
            <div className="flex gap-8 text-sm">
              <Link to="/courses" className="text-slate-300 hover:text-amber-400 transition-colors">Courses</Link>
              <Link to="/about" className="text-slate-300 hover:text-amber-400 transition-colors">About</Link>
              <Link to="/help" className="text-slate-300 hover:text-amber-400 transition-colors">Help</Link>
              <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-400">
            Empowering creative artists worldwide • © 2025 Course Tutor
          </div>
        </div>
      </footer>
      <DesignNavigation currentVersion={14} />
    </div>
  );
}
