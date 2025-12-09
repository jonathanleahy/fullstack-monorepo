/**
 * VARIANT 55: FOOD & CULINARY
 *
 * Target: Home cooks, aspiring chefs, food entrepreneurs
 * Tone: Passionate, sensory, recipe for success metaphors - "Cook like a pro"
 * Design: Warm terracotta, herb green, cream backgrounds
 * Effects: Steam/sizzle animation effect
 * Sales: Highlight cuisine types, chef instructors, recipe completion stats
 * Layout Flow: Kitchen hero → Cuisine categories → Chef spotlights → Recipe stats →
 *              Home chef testimonial → "Start Cooking" CTA → Menu-style footer
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useSpring } from 'framer-motion';
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

export function HomePageV55() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const cuisineTypes = [
    { title: 'Italian Classics', region: 'Mediterranean', icon: '🍝' },
    { title: 'French Techniques', region: 'European', icon: '🥐' },
    { title: 'Asian Fusion', region: 'Pan-Asian', icon: '🍜' },
    { title: 'Pastry & Baking', region: 'Global', icon: '🥖' },
  ];

  const chefInstructors = [
    { name: 'Chef Maria Rossi', specialty: 'Italian Cuisine', credential: 'Michelin-Starred' },
    { name: 'Chef Jean Baptiste', specialty: 'French Pastry', credential: 'Le Cordon Bleu' },
    { name: 'Chef Kenji Yamamoto', specialty: 'Japanese Fusion', credential: 'James Beard Award' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-orange-50">
      {/* Header - Menu-Style with Chef Hat & Recipe Card Aesthetic */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-orange-500">
        {/* Menu Header Bar */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">👨‍🍳</span>
              <div>
                <div className="font-bold text-lg">Chef's Special</div>
                <div className="text-xs text-orange-100">Michelin-Starred Instruction</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>50K+ Recipes Mastered</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>98% Success Rate</span>
              </div>
            </div>
            <div className="text-3xl">🍽️</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="font-bold text-2xl text-orange-700 flex items-center gap-2">
              Course Tutor <span className="text-sm text-slate-600">| Culinary School</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses" className="text-slate-600 hover:text-orange-700 transition-colors font-semibold flex items-center gap-1">
                <span>📚</span> Courses
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-orange-700 transition-colors font-semibold flex items-center gap-1">
                <span>ℹ️</span> About
              </Link>
              <Link to="/help" className="text-slate-600 hover:text-orange-700 transition-colors font-semibold flex items-center gap-1">
                <span>❓</span> Help
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="border-orange-600 text-orange-600">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-orange-700 text-sm font-semibold">Sign In</Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Recipe Card Layout with Hero Dish Image, Ingredients & Cooking Time */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Recipe Card */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-200"
              >
                {/* Recipe Header Card */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="bg-yellow-400 text-orange-900 border-0 mb-3 font-bold">
                        Featured Recipe
                      </Badge>
                      <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Cook Like a Professional Chef
                      </h1>
                      <p className="text-orange-100 text-lg">
                        Master culinary arts with Michelin-starred instruction
                      </p>
                    </div>
                    <div className="text-6xl">👨‍🍳</div>
                  </div>

                  {/* Cooking Time & Info */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-orange-500">
                    <div>
                      <div className="text-xs text-orange-200 mb-1">Prep Time</div>
                      <div className="text-xl font-bold">Start Today</div>
                    </div>
                    <div>
                      <div className="text-xs text-orange-200 mb-1">Difficulty</div>
                      <div className="text-xl font-bold">All Levels</div>
                    </div>
                    <div>
                      <div className="text-xs text-orange-200 mb-1">Servings</div>
                      <div className="text-xl font-bold">15K+ Students</div>
                    </div>
                  </div>
                </div>

                {/* Hero Dish Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop"
                    alt="Professional chef cooking"
                    className="w-full h-full object-cover"
                  />
                  {/* Steam animation overlay */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      y: [0, -40, -80],
                      scale: [1, 1.8, 2.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    <div className="text-5xl">💨</div>
                  </motion.div>
                  <motion.div
                    className="absolute top-1/3 left-1/3"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      y: [0, -35, -70],
                      scale: [1, 1.5, 2]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.8
                    }}
                  >
                    <div className="text-4xl">💨</div>
                  </motion.div>
                </div>

                {/* Recipe Description */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Course</h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Master the art of cooking with courses taught by Michelin-starred chefs and culinary experts.
                    From basic techniques to advanced gastronomy, elevate your culinary skills and create restaurant-quality dishes at home.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-6 shadow-lg rounded-2xl text-lg">
                        Start Cooking
                      </Button>
                    </Link>
                    <Link to="/courses">
                      <Button size="lg" variant="outline" className="px-10 py-6 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-2xl text-lg">
                        View Menu
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Ingredients Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24"
              >
                {/* Ingredients Card */}
                <div className="bg-white rounded-2xl shadow-xl border-4 border-green-200 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">📋</span>
                    <h3 className="text-2xl font-bold text-slate-900">What You'll Learn</h3>
                  </div>

                  <ul className="space-y-3">
                    {[
                      { icon: '🍝', text: 'Italian Classics' },
                      { icon: '🥐', text: 'French Techniques' },
                      { icon: '🍜', text: 'Asian Fusion' },
                      { icon: '🥖', text: 'Pastry & Baking' },
                      { icon: '🔪', text: 'Knife Skills' },
                      { icon: '🍷', text: 'Wine Pairing' }
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-semibold text-slate-800">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition Facts Style Stats */}
                <div className="bg-white rounded-2xl shadow-xl border-4 border-amber-200 p-6">
                  <div className="border-b-8 border-slate-900 pb-2 mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Course Facts</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-semibold text-slate-700">Recipes Mastered</span>
                      <span className="font-bold text-orange-700 text-lg">50,000+</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-semibold text-slate-700">Success Rate</span>
                      <span className="font-bold text-green-700 text-lg">98%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="font-semibold text-slate-700">Students Trained</span>
                      <span className="font-bold text-orange-700 text-lg">15,000+</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-semibold text-slate-700">Expert Chefs</span>
                      <span className="font-bold text-orange-700 text-lg">Michelin ⭐</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Cuisine Type Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Explore World Cuisines</h2>
            <p className="text-slate-600">Master techniques from around the globe</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cuisineTypes.map((cuisine, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-md border-2 border-orange-200 hover:shadow-xl hover:border-green-400 transition-all duration-300"
              >
                <div className="text-5xl mb-3">{cuisine.icon}</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">{cuisine.title}</h3>
                <div className="text-sm text-green-700 font-medium">{cuisine.region}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Chef Instructor Spotlights */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Learn from Master Chefs</h2>
            <p className="text-slate-600">Award-winning instructors sharing their expertise</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {chefInstructors.map((chef, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-green-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl mb-4 mx-auto shadow-lg">
                  👨‍🍳
                </div>
                <h3 className="font-semibold text-slate-900 text-center mb-1">{chef.name}</h3>
                <div className="text-sm text-orange-700 text-center mb-1 font-medium">{chef.specialty}</div>
                <div className="text-xs text-green-600 text-center">{chef.credential}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Recipe Completion Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '50,000+', label: 'Recipes Mastered' },
              { number: '15,000+', label: 'Home Chefs Trained' },
              { number: '98%', label: 'Success Rate' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-4xl font-bold mb-2 text-amber-300">{stat.number}</div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Culinary Journey</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Cuisine', desc: 'Select from world-class cooking styles', icon: '🌍' },
              { step: '2', title: 'Master Techniques', desc: 'Learn from expert chef instructors', icon: '🔪' },
              { step: '3', title: 'Create & Share', desc: 'Cook delicious meals for loved ones', icon: '🍽️' },
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
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Home Chef Success Testimonial */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-8 shadow-xl border-2 border-orange-200"
          >
            <p className="text-slate-700 italic mb-6 text-xl leading-relaxed">
              "I went from burning toast to hosting dinner parties! The French Techniques course transformed my cooking completely. My friends now call me for recipe advice. I even started a successful food blog documenting my journey."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                L
              </div>
              <div>
                <div className="font-semibold text-slate-900">Lisa Anderson</div>
                <div className="text-green-700 text-sm">Home Chef & Food Blogger</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: "Start Cooking" CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-700 to-green-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Master the Kitchen?
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              Join thousands of home cooks creating delicious meals
            </p>
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-amber-400 text-green-900 hover:bg-amber-300 px-10 py-5 font-semibold shadow-xl rounded-2xl">
                  Start Cooking Today
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Menu Style */}
      <footer className="bg-orange-900 text-orange-100 py-8 border-t-4 border-amber-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-amber-400 mb-3 text-lg">Course Tutor</h4>
              <p className="text-sm">Your culinary journey starts here</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Cuisines</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/italian" className="hover:text-amber-400 transition-colors">Italian</Link>
                <Link to="/french" className="hover:text-amber-400 transition-colors">French</Link>
                <Link to="/asian" className="hover:text-amber-400 transition-colors">Asian</Link>
                <Link to="/baking" className="hover:text-amber-400 transition-colors">Baking</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
                <Link to="/recipes" className="hover:text-amber-400 transition-colors">Recipes</Link>
                <Link to="/help" className="hover:text-amber-400 transition-colors">Help</Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm pt-6 border-t border-orange-700">
            © 2024 Course Tutor. All rights reserved. 🍽️
          </div>
        </div>
      </footer>

      <DesignNavigation currentVersion={55} />
    </div>
  );
}
