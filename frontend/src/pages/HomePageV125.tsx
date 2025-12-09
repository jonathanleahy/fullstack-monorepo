import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';
import { useState } from 'react';

export function HomePageV125() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'business', name: 'Business', icon: '📈' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'marketing', name: 'Marketing', icon: '📢' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const popularSearches = [
    'Python for Beginners',
    'Web Development',
    'Machine Learning',
    'UI/UX Design',
    'Digital Marketing',
    'Data Analysis',
    'React.js',
    'Photography'
  ];

  const trendingCourses = [
    { title: 'Complete Web Development Bootcamp', category: 'Programming', level: 'Beginner', students: '125K', rating: '4.8' },
    { title: 'Advanced Machine Learning', category: 'Data Science', level: 'Advanced', students: '45K', rating: '4.9' },
    { title: 'UI/UX Design Masterclass', category: 'Design', level: 'Intermediate', students: '78K', rating: '4.7' },
    { title: 'Digital Marketing Strategy', category: 'Marketing', level: 'Beginner', students: '92K', rating: '4.6' },
    { title: 'Python Data Science', category: 'Data Science', level: 'Intermediate', students: '110K', rating: '4.8' },
    { title: 'Business Leadership', category: 'Business', level: 'Advanced', students: '35K', rating: '4.9' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <DesignNavigation currentVersion={125} />

      {/* Hero Section with Search */}
      <section className="container mx-auto px-6 pt-32 pb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 text-center">
          Find Your Perfect Course
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Search through 3,000+ courses. Filter by category, level, and more to discover exactly what you need.
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full px-6 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg pl-16"
            />
            <svg
              className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Button variant="default" className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-5">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="default" className="text-lg px-8 py-4">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="default" className="text-lg px-8 py-4">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Popular Searches */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Popular searches:</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {popularSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(search)}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors shadow-sm border border-gray-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-md mb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 min-w-[200px]"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 min-w-[200px]"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="secondary" className="px-8 py-3">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(1).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-bold">{category.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Courses */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Trending Courses
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl">📖</span>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>👥 {course.students} students</span>
                  <span>⭐ {course.rating}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Course
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20 mb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">3,000+</div>
              <div className="text-gray-600 text-lg">Courses Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600 text-lg">Expert Instructors</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">120K+</div>
              <div className="text-gray-600 text-lg">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Learn from Industry Experts
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Our instructors are professionals working at top companies worldwide
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Sarah Chen', expertise: 'AI & Machine Learning', company: 'Google', icon: '🤖' },
            { name: 'James Wilson', expertise: 'Web Development', company: 'Meta', icon: '💻' },
            { name: 'Maria Garcia', expertise: 'UX Design', company: 'Apple', icon: '🎨' },
            { name: 'Alex Kumar', expertise: 'Data Science', company: 'Amazon', icon: '📊' }
          ].map((instructor, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className="text-5xl mb-4">{instructor.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
              <p className="text-blue-600 font-semibold mb-1">{instructor.expertise}</p>
              <p className="text-gray-600 text-sm">Previously at {instructor.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="container mx-auto px-6 py-12 mb-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-pink-50 to-rose-50 p-12 rounded-3xl shadow-lg text-center">
          <p className="text-2xl text-gray-700 italic mb-6">
            "The search and filter options made it incredibly easy to find exactly what I was looking for. I discovered courses I didn't even know existed!"
          </p>
          <p className="text-xl font-semibold text-gray-900">— Emily Rodriguez, Marketing Manager</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20 bg-white mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Common Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: 'How do I find the right course?', a: 'Use our advanced search and filters. You can search by keyword, filter by category, level, instructor, and ratings to find courses that match your needs.' },
            { q: 'Can I try before I buy?', a: 'Yes! Every course has free preview videos. You can also start with our free plan to explore basic courses before upgrading.' },
            { q: 'Are courses updated regularly?', a: 'Absolutely. We update courses quarterly to ensure content stays current with industry trends and best practices.' },
            { q: 'What if I need help?', a: 'Our support team is available 24/7 via chat, email, or phone. Pro and Team members get priority support with faster response times.' }
          ].map((faq, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* More Testimonials */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Success Stories
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: 'The filtering system is brilliant. I found advanced Python courses in seconds!', author: 'Robert Kim', role: 'Software Engineer' },
            { quote: 'Being able to search by skill level helped me find courses that matched my experience perfectly.', author: 'Olivia Brown', role: 'Product Designer' }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Request a course and we'll create it for you. Your learning journey matters to us.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/signup">
            <Button variant="default" className="text-lg px-8 py-4">
              Request a Course
            </Button>
          </Link>
          <Button variant="outline" className="text-lg px-8 py-4">
            Browse All Courses
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 Course Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
