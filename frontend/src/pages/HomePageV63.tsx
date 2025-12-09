/**
 * VARIANT 63: NONPROFIT & SOCIAL IMPACT
 *
 * Target Audience: Nonprofit leaders, social workers, community organizers
 * Design Style: Hopeful blue, community orange, nature green - Mission-driven, accessible, inspiring
 * Tone: Mission-focused, inspiring, "Amplify your impact"
 * Aesthetic: Welcoming (12px borders), soft shadows, community feel
 * Wildcard Element: Rising sun/hope animation
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
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

export function HomePageV63() {
  const { isAuthenticated } = useAuth();

  const missionAreas = [
    { title: 'Community Development', icon: '🏘️', courses: 18 },
    { title: 'Environmental Justice', icon: '🌱', courses: 22 },
    { title: 'Education & Youth', icon: '📚', courses: 26 },
    { title: 'Healthcare Access', icon: '❤️', courses: 15 },
  ];

  const skills = [
    { title: 'Grant Writing', icon: '✍️' },
    { title: 'Fundraising', icon: '💝' },
    { title: 'Program Management', icon: '📋' },
    { title: 'Volunteer Coordination', icon: '🤝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-orange-50/20 to-green-50/30">
      {/* Header - Mission-driven with heart icon and prominent donate button */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-blue-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl flex items-center gap-2">
              <span className="text-3xl">❤️</span>
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Course Tutor Impact
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>📚</span> Courses
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>🌍</span> About
              </Link>
              <Link to="/help" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>🤝</span> Help
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md rounded-xl font-bold">
                💝 Donate
              </Button>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="rounded-xl">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-md rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Impact story hero with beneficiary photo and donation meter */}
      <section className="relative py-16 lg:py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50/20 to-green-50/30">
        {/* Wildcard: Rising sun animation */}
        <motion.div
          className="absolute top-12 right-[10%] w-32 h-32"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full shadow-lg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-t from-orange-400/40 to-transparent rounded-t-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-t from-orange-300/20 to-transparent rounded-t-full" />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Badge className="bg-blue-100 text-blue-700 shadow-sm rounded-xl border-2 border-blue-200">
                  🌟 Change Makers
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                Amplify Your
                <span className="block bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
                  Impact
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-slate-700 mb-6 leading-relaxed">
                Empower your nonprofit with skills that matter. From grant writing to
                community organizing, learn to create lasting change in the communities you serve.
              </motion.p>

              {/* Cause stats */}
              <motion.div variants={itemVariants} className="mb-6 grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border-2 border-blue-100 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">5K+</div>
                  <div className="text-xs text-slate-600">Leaders</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border-2 border-orange-100 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">$50M+</div>
                  <div className="text-xs text-slate-600">Grants</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border-2 border-green-100 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">2M+</div>
                  <div className="text-xs text-slate-600">Lives</div>
                </div>
              </motion.div>

              {/* Donation meter style CTA */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-5 shadow-lg rounded-xl w-full md:w-auto font-bold">
                    Start Learning Free
                  </Button>
                </Link>
                <div className="bg-white rounded-xl p-4 border-2 border-blue-100 shadow-sm">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Our Mission Progress</span>
                    <span className="text-blue-600 font-bold">78%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Impact story with beneficiary photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=450&fit=crop"
                  alt="Community volunteers working together"
                  className="w-full h-full object-cover"
                />
                {/* Impact badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-2xl">
                      ❤️
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Creating Change Together</div>
                      <div className="text-sm text-slate-600">Building stronger communities</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Mission area categories */}
      <section className="py-20 px-4 bg-white rounded-3xl mx-4 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Learn by Mission Area</h2>
            <p className="text-slate-600">Training tailored to your cause</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {missionAreas.map((area, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100 shadow-sm"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{area.title}</h3>
                <p className="text-slate-600">{area.courses} courses available</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Grant writing & fundraising tracks */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Essential Nonprofit Skills</h2>
            <p className="text-slate-600">Build organizational capacity</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-md border border-orange-100 text-center"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="font-bold text-slate-900">{skill.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Impact metrics */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 text-white rounded-3xl mx-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '5,000+', label: 'Nonprofit Leaders Trained', icon: '👥' },
              { num: '$50M+', label: 'Grants Secured by Alumni', icon: '💰' },
              { num: '2M+', label: 'Lives Touched', icon: '❤️' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.num}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Path to Greater Impact</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: '1', title: 'Identify Your Needs', desc: 'Choose courses aligned with your mission', color: 'from-blue-600 to-blue-500' },
              { step: '2', title: 'Learn & Collaborate', desc: 'Connect with fellow changemakers', color: 'from-orange-500 to-orange-400' },
              { step: '3', title: 'Apply Knowledge', desc: 'Implement strategies in your community', color: 'from-green-600 to-green-500' },
              { step: '4', title: 'Measure Impact', desc: 'Track outcomes and amplify success', color: 'from-blue-600 to-green-600' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white font-bold text-xl flex items-center justify-center rounded-xl flex-shrink-0 shadow-md`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100"
          >
            <p className="text-slate-700 text-xl mb-6 leading-relaxed italic">
              "The grant writing course helped us secure $250,000 in funding for our youth
              programs. These skills transformed our organization's ability to serve our community."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                MR
              </div>
              <div>
                <div className="font-bold text-slate-900">Maria Rodriguez</div>
                <div className="text-slate-600">Executive Director, Hope Community Center</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-3xl mx-4 shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make a Difference Today
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of changemakers building stronger communities.
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-xl shadow-xl font-bold">
                Start Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Community-focused */}
      <footer className="bg-white text-slate-700 py-8 mt-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Course Tutor Impact
          </span>
          <div className="flex gap-6 text-sm">
            <Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="/help" className="hover:text-blue-600 transition-colors">Help</Link>
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={63} />
    </div>
  );
}
