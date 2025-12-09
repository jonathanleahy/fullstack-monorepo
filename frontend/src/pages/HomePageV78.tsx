import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV78() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();
  const [cartCount] = useState(3);

  const categories = [
    { name: 'All Courses', icon: '📚', count: 1247 },
    { name: 'Development', icon: '💻', count: 342 },
    { name: 'Design', icon: '🎨', count: 218 },
    { name: 'Business', icon: '💼', count: 156 },
    { name: 'Marketing', icon: '📊', count: 189 },
    { name: 'Data Science', icon: '📈', count: 127 },
  ];

  const products = [
    {
      id: 1,
      title: 'Complete React Development Bootcamp',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      reviews: 2341,
      price: 89.99,
      oldPrice: 149.99,
      image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      badge: 'Bestseller',
      badgeColor: 'bg-amber-500',
      students: '12,450',
    },
    {
      id: 2,
      title: 'Advanced Python Programming',
      instructor: 'Michael Chen',
      rating: 4.9,
      reviews: 1876,
      price: 79.99,
      oldPrice: 129.99,
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      badge: 'Hot',
      badgeColor: 'bg-rose-500',
      students: '9,823',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Rodriguez',
      rating: 4.7,
      reviews: 1542,
      price: 69.99,
      oldPrice: 119.99,
      image: 'bg-gradient-to-br from-rose-400 to-pink-500',
      badge: 'New',
      badgeColor: 'bg-blue-500',
      students: '7,651',
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      instructor: 'James Anderson',
      rating: 4.6,
      reviews: 1234,
      price: 59.99,
      oldPrice: 99.99,
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      badge: 'Sale',
      badgeColor: 'bg-emerald-500',
      students: '6,432',
    },
    {
      id: 5,
      title: 'Data Science with TensorFlow',
      instructor: 'Lisa Thompson',
      rating: 4.9,
      reviews: 2108,
      price: 94.99,
      oldPrice: 159.99,
      image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      badge: 'Bestseller',
      badgeColor: 'bg-amber-500',
      students: '11,234',
    },
    {
      id: 6,
      title: 'Full Stack Web Development',
      instructor: 'David Kim',
      rating: 4.8,
      reviews: 1923,
      price: 84.99,
      oldPrice: 139.99,
      image: 'bg-gradient-to-br from-teal-400 to-emerald-500',
      badge: 'Popular',
      badgeColor: 'bg-cyan-500',
      students: '10,567',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                CT
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">CourseTutor</span>
                <p className="text-xs text-gray-500">Marketplace</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="w-full px-4 py-2 pl-12 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Help
              </Link>

              {/* Cart Icon */}
              <button className="relative">
                <svg className="w-7 h-7 text-gray-700 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/signout">
                    <Button variant="outline">
                      Sign Out
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/signin">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-gray-700 font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-gray-700">Free</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    <span className="text-gray-700">$0 - $50</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-gray-700">$50 - $100</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-gray-700">$100+</span>
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-gray-700 ml-2">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Featured Courses
                <span className="text-gray-500 text-lg ml-3">(1,247 results)</span>
              </h1>
              <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                >
                  <div className="relative">
                    <div className={`${product.image} h-48 group-hover:scale-105 transition-transform duration-300`} />
                    <span className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {product.badge}
                    </span>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.instructor}</p>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">{product.students} students</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-400 line-through ml-2">${product.oldPrice}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12">
                Load More Courses
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <DesignNavigation currentVersion={78} />
    </div>
  );
}
