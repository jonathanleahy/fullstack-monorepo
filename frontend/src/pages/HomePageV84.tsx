import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV84() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <DesignNavigation currentVersion={84} />

      {/* Header - Event Ticketing Style */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center transform rotate-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-bold text-2xl text-gray-900">CoursePass</span>
              <div className="text-xs text-gray-500">Your Learning Events</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Help
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg px-6 py-2 font-medium shadow-md">
                  My Tickets
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg px-6 py-2 font-medium shadow-md">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - Event Ticketing Theme */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              style={{ y }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm font-semibold">LIVE NOW</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
              >
                Your Ticket to
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Knowledge
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Join live learning events, workshops, and masterclasses.
                Book your seat in the future of education.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex space-x-4"
              >
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg px-8 py-4 text-lg font-semibold shadow-lg">
                  Browse Events
                </Button>
                <Button className="bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-lg px-8 py-4 text-lg font-semibold">
                  View Calendar
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                {[
                  { value: '250+', label: 'Events/Month' },
                  { value: '50K+', label: 'Attendees' },
                  { value: '4.9★', label: 'Avg Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Featured Event Ticket */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm font-semibold mb-1">FEATURED EVENT</div>
                      <h3 className="text-3xl font-bold">Full-Stack Development Masterclass</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold">
                      LIVE
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Virtual Venue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>3 Days</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gray-50 border-b-2 border-dashed border-gray-200 p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">EVENT STARTS IN</div>
                    <div className="flex items-center justify-center space-x-4">
                      {[
                        { value: 2, label: 'DAYS' },
                        { value: 14, label: 'HRS' },
                        { value: 32, label: 'MIN' }
                      ].map((time, index) => (
                        <div key={index} className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                            className="text-3xl font-bold text-blue-600"
                          >
                            {time.value.toString().padStart(2, '0')}
                          </motion.div>
                          <div className="text-xs text-gray-500 mt-1">{time.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Instructor</span>
                      <span className="font-semibold text-gray-900">Dr. Sarah Chen</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Available Seats</span>
                      <span className="font-semibold text-rose-600">23 / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-semibold text-gray-900">Intermediate</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Price</div>
                      <div className="text-3xl font-bold text-gray-900">$99</div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg px-6 py-3 font-semibold shadow-md">
                      Get Ticket
                    </Button>
                  </div>
                </div>

                {/* Ticket Perforations */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-2 border-gray-100" />
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-2 border-gray-100" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Reserve your spot in these exclusive learning experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'React Advanced Patterns',
                instructor: 'John Davis',
                date: 'Dec 15, 2024',
                time: '2:00 PM EST',
                seats: '45/50',
                price: '$79',
                category: 'Development',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'UI/UX Design Sprint',
                instructor: 'Emma Wilson',
                date: 'Dec 18, 2024',
                time: '10:00 AM EST',
                seats: '12/30',
                price: '$129',
                category: 'Design',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                title: 'Data Science Bootcamp',
                instructor: 'Michael Zhang',
                date: 'Dec 20, 2024',
                time: '9:00 AM EST',
                seats: '38/40',
                price: '$199',
                category: 'Data',
                color: 'from-teal-500 to-teal-600'
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all cursor-pointer"
              >
                <div className={`h-32 bg-gradient-to-r ${event.color} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    animate={hoveredEvent === index ? { scale: 1.2, opacity: 0.3 } : { scale: 1, opacity: 0.2 }}
                    className="absolute inset-0 bg-white"
                  />
                  <div className="relative z-10 text-white text-center">
                    <div className="text-sm font-semibold mb-1">{event.category}</div>
                    <div className="text-2xl font-bold">{event.date.split(',')[0]}</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <span>{event.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500">Seats Left</div>
                      <div className="text-sm font-semibold text-rose-600">{event.seats.split('/')[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{event.price}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🎫', value: '50K+', label: 'Tickets Sold' },
              { icon: '🎓', value: '250+', label: 'Monthly Events' },
              { icon: '⭐', value: '4.9/5', label: 'Event Rating' },
              { icon: '🌍', value: '120+', label: 'Countries' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 text-center border-2 border-blue-200 relative overflow-hidden"
          >
            {/* Ticket stub effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-600" />

            <div className="relative z-10">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                LIMITED AVAILABILITY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Don't Miss Out on Exclusive Events
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get early access to premium learning events and masterclasses
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg px-8 py-4 text-lg font-semibold shadow-lg">
                Browse All Events
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="font-bold text-xl">CoursePass</span>
          </div>
          <p className="text-gray-400">© 2024 CoursePass. Your passport to learning excellence.</p>
        </div>
      </footer>
    </div>
  );
}
