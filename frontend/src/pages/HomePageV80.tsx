import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV80() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();

  const skills = [
    { name: 'React', level: 95, color: 'from-cyan-500 to-blue-600' },
    { name: 'TypeScript', level: 90, color: 'from-blue-500 to-cyan-600' },
    { name: 'Node.js', level: 88, color: 'from-emerald-500 to-teal-600' },
    { name: 'Python', level: 85, color: 'from-amber-500 to-orange-600' },
    { name: 'UI/UX Design', level: 82, color: 'from-rose-500 to-pink-600' },
    { name: 'GraphQL', level: 80, color: 'from-teal-500 to-emerald-600' },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Full Stack Development',
      description: 'Built a scalable e-commerce platform serving 100K+ users with real-time inventory management.',
      image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      tech: ['React', 'Node.js', 'MongoDB'],
      metrics: { users: '100K+', revenue: '$2.5M', rating: '4.9' },
    },
    {
      id: 2,
      title: 'AI Learning Assistant',
      category: 'Machine Learning',
      description: 'Developed an AI-powered learning platform with personalized course recommendations.',
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      tech: ['Python', 'TensorFlow', 'React'],
      metrics: { accuracy: '94%', students: '50K+', satisfaction: '4.8' },
    },
    {
      id: 3,
      title: 'Design System Library',
      category: 'UI/UX Design',
      description: 'Created a comprehensive design system used by 20+ companies for consistent branding.',
      image: 'bg-gradient-to-br from-rose-400 to-pink-500',
      tech: ['Figma', 'React', 'Storybook'],
      metrics: { components: '150+', companies: '20+', downloads: '10K+' },
    },
    {
      id: 4,
      title: 'Real-time Analytics Dashboard',
      category: 'Data Visualization',
      description: 'Built a high-performance analytics dashboard processing millions of events per day.',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      tech: ['D3.js', 'WebSocket', 'PostgreSQL'],
      metrics: { events: '5M/day', latency: '<100ms', uptime: '99.9%' },
    },
    {
      id: 5,
      title: 'Mobile Learning App',
      category: 'Mobile Development',
      description: 'Created a cross-platform mobile app for on-the-go learning with offline support.',
      image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      tech: ['React Native', 'Firebase', 'Redux'],
      metrics: { downloads: '250K+', rating: '4.7', retention: '68%' },
    },
    {
      id: 6,
      title: 'API Gateway System',
      category: 'Backend Architecture',
      description: 'Architected a microservices gateway handling 1M+ requests per hour.',
      image: 'bg-gradient-to-br from-teal-400 to-emerald-500',
      tech: ['GraphQL', 'Node.js', 'Redis'],
      metrics: { requests: '1M/hr', response: '50ms', services: '15' },
    },
  ];

  const clients = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'EduStart', logo: '🎓' },
    { name: 'DataFlow', logo: '📊' },
    { name: 'CloudNine', logo: '☁️' },
    { name: 'DesignHub', logo: '🎨' },
    { name: 'CodeLab', logo: '💻' },
  ];

  const testimonials = [
    {
      text: 'Outstanding work on our platform. Delivered beyond expectations with excellent communication.',
      author: 'Sarah Johnson',
      role: 'CTO, TechCorp',
      avatar: '👩‍💼',
    },
    {
      text: 'The best developer we have worked with. Highly skilled and professional.',
      author: 'Michael Chen',
      role: 'CEO, EduStart',
      avatar: '👨‍💼',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                CT
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">CourseTutor</span>
                <p className="text-xs text-gray-500">Portfolio</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Help
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
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
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
            👨‍💻
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CourseTutor Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Creating exceptional learning experiences through innovative course design and development
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8">
              View Projects
            </Button>
            <Button variant="outline">
              Download Resume
            </Button>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-center text-gray-600 mb-8 font-medium">TRUSTED BY LEADING COMPANIES</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-2">{client.logo}</div>
                <p className="text-sm font-bold text-gray-700">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{skill.name}</h3>
                  <span className="text-sm font-bold text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    className={`bg-gradient-to-r ${skill.color} h-3 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
              >
                <div className={`${project.image} h-48 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                  <div className="text-6xl">📱</div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-lg font-bold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-500 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to create something amazing? Get in touch to discuss your project.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Contact Me
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              View All Work
            </Button>
          </div>
        </motion.div>
      </div>

      <DesignNavigation currentVersion={80} />
    </div>
  );
}
