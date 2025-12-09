import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV88() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scanLine = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [currentPath, setCurrentPath] = useState('/home');
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullText = "Welcome to CoursetuTor Terminal v1.0.0";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-green-400 font-mono relative overflow-hidden">
      <DesignNavigation currentVersion={88} />

      {/* Scan Lines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan" />
        <motion.div
          style={{ top: scanLine }}
          className="absolute left-0 right-0 h-1 bg-green-400/30 blur-sm"
        />
      </div>

      {/* Terminal Header */}
      <header className="border-b border-green-400/30 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs mb-2">
            <span className="text-green-500">$</span>
            <span className="text-green-300">./coursetutor</span>
            <span className="text-gray-500">--help</span>
          </div>

          <div className="flex items-center justify-between border border-green-400/30 bg-black/70 p-2">
            <div className="flex items-center gap-4">
              <div className="text-green-400 font-bold text-sm">
                [COURSETUTOR:TERMINAL]
              </div>
              <div className="text-xs text-green-500/70">
                {currentPath}
              </div>
            </div>

            <nav className="flex items-center gap-2">
              {[
                { cmd: 'ls courses', label: 'COURSES', path: '/courses' },
                { cmd: 'cat about', label: 'ABOUT', path: '/about' },
                { cmd: 'man community', label: 'COMMUNITY', path: '/community' }
              ].map((item) => (
                <Link
                  key={item.cmd}
                  to={item.path}
                  onClick={() => setCurrentPath(item.path)}
                  className="px-3 py-1 border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-colors text-xs"
                >
                  <span className="text-green-600">$ </span>
                  {item.cmd}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link to="/login">
                  <Button className="px-4 py-1 bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors text-xs">
                    [LOGIN]
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Terminal Window Hero */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">

          {/* Main Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-green-400/50 bg-black/80 backdrop-blur-sm shadow-[0_0_30px_rgba(74,222,128,0.3)] mb-12"
          >
            {/* Terminal Title Bar */}
            <div className="border-b border-green-400/30 bg-green-400/10 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-400" />
              </div>
              <div className="text-xs text-green-500/70">terminal@coursetutor:~</div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-4">
              <div className="text-sm">
                <span className="text-green-500">admin@coursetutor</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-500">$ </span>
                <span className="text-green-300">./welcome.sh</span>
              </div>

              <div className="pl-4 space-y-2">
                <div className="text-green-400">
                  {typedText}
                  <span className={`inline-block w-2 h-4 bg-green-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                <div className="text-green-300/70 text-xs space-y-1 mt-4">
                  <div>{'>'} Initializing learning environment...</div>
                  <div>{'>'} Loading course modules... [████████████] 100%</div>
                  <div>{'>'} Establishing secure connection...</div>
                  <div className="text-green-400">{'>'} Ready for input.</div>
                </div>

                <div className="border-l-2 border-green-400/50 pl-4 my-6 space-y-3">
                  <h1 className="text-4xl font-bold text-green-400">
                    {`>> MASTER_SKILLS.execute()`}
                  </h1>
                  <p className="text-lg text-green-300/80 leading-relaxed max-w-3xl">
                    ## Description:<br />
                    Transform from novice to expert through systematic learning protocols.
                    Execute hands-on projects, debug real challenges, deploy production code.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="text-green-500">{'>'} Available commands:</div>
                  <div className="grid grid-cols-2 gap-2 pl-4 text-xs">
                    <Link to="/courses">
                      <Button className="w-full justify-start px-4 py-2 bg-transparent border border-green-400/30 text-green-400 hover:bg-green-400/20 hover:border-green-400 font-mono text-left">
                        [EXECUTE] Start Learning...
                      </Button>
                    </Link>
                    <Link to="/browse">
                      <Button className="w-full justify-start px-4 py-2 bg-transparent border border-green-400/30 text-green-400 hover:bg-green-400/20 hover:border-green-400 font-mono text-left">
                        [LIST] Browse Courses
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="text-green-500/50 text-xs mt-4">
                  {'>'} Press any key to continue<span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Terminal */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { label: 'ACTIVE_USERS', value: '12,450', unit: 'online' },
              { label: 'COURSES_AVAILABLE', value: '150', unit: 'modules' },
              { label: 'SUCCESS_RATE', value: '94.7', unit: 'percent' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-green-400/30 bg-black/60 p-4"
              >
                <div className="text-xs text-green-500/70 mb-1">$ echo ${stat.label}</div>
                <div className="text-3xl font-bold text-green-400">{stat.value}</div>
                <div className="text-xs text-green-500/50 mt-1"># {stat.unit}</div>
              </motion.div>
            ))}
          </div>

          {/* Course Listings as Code Blocks */}
          <div className="space-y-4 mb-12">
            <div className="text-sm text-green-500 mb-4">
              <span className="text-gray-500">$ </span>
              cat available_courses.json
            </div>

            {[
              {
                id: 'web_dev_001',
                name: 'Full Stack Development',
                description: 'Master frontend and backend technologies',
                status: 'ACTIVE',
                students: 2450
              },
              {
                id: 'data_sci_001',
                name: 'Data Science & ML',
                description: 'Python, TensorFlow, neural networks',
                status: 'ACTIVE',
                students: 1820
              },
              {
                id: 'mobile_001',
                name: 'Mobile Development',
                description: 'React Native cross-platform apps',
                status: 'ENROLLING',
                students: 980
              },
              {
                id: 'cloud_001',
                name: 'Cloud Architecture',
                description: 'AWS, Docker, Kubernetes mastery',
                status: 'ACTIVE',
                students: 1560
              }
            ].map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-green-400/30 bg-black/70 hover:border-green-400 hover:bg-black/90 transition-all group"
              >
                <div className="p-6 space-y-3 font-mono text-sm">
                  <div className="text-green-500/70">{'{'}</div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <span className="text-blue-400">"id"</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-yellow-400">"{course.id}"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-blue-400">"name"</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-yellow-400">"{course.name}"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-blue-400">"description"</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-yellow-400">"{course.description}"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-blue-400">"status"</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-green-400">"{course.status}"</span>
                      <span className="text-gray-500">,</span>
                    </div>
                    <div>
                      <span className="text-blue-400">"enrolled_students"</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-purple-400">{course.students}</span>
                    </div>
                  </div>
                  <div className="text-green-500/70">{'}'}</div>

                  <div className="pt-3 border-t border-green-400/20">
                    <Link to={`/course/${course.id}`}>
                      <Button className="px-4 py-2 bg-transparent border border-green-400/30 text-green-400 hover:bg-green-400 hover:text-black transition-colors text-xs font-mono">
                        [EXECUTE] Enroll Now
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">...</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Terminal Prompt */}
          <div className="border border-green-400/30 bg-black/60 p-4 text-xs">
            <div className="text-green-500/70">
              <span className="text-green-500">$</span> logout
              <br />
              <span className="text-green-400">Connection maintained. Session active.</span>
              <br />
              <span className="text-gray-500"># © 2024 CoursetuTor Terminal Interface v1.0.0</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
