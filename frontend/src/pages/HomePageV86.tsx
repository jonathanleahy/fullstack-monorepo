import { Link } from 'react-router-dom';
import { Button } from '@repo/playbook/atoms';
import { useAuth } from '../hooks/useAuth';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV86() {
  const { isAuthenticated } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black font-mono">
      <DesignNavigation currentVersion={86} />

      {/* BRUTALIST HEADER - Top Left Corner Stack */}
      <header className="fixed top-0 left-0 z-50 border-b-4 border-r-4 border-black bg-white p-4">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tighter border-4 border-black px-3 py-1 bg-black text-white">
            COURSE<br/>TUTOR
          </div>
          <nav className="flex flex-col gap-1 text-xs uppercase tracking-wider">
            <Link to="/courses" className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-none">
              COURSES
            </Link>
            <Link to="/about" className="border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-none">
              ABOUT
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="border-2 border-black px-2 py-1 bg-black text-white">
                LOGIN
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* NEWSPAPER HERO */}
      <main className="pt-32 pl-8 pr-8">
        <div className="grid grid-cols-12 gap-0 border-8 border-black p-8 bg-white relative">

          {/* Main Headline - Overlapping */}
          <motion.div
            style={{ rotate }}
            className="col-span-12 border-4 border-black bg-white p-6 relative z-30 -mb-12"
          >
            <div className="text-xs tracking-widest mb-2 border-b-2 border-black pb-2">
              VOL. 001 | ISSUE 86 | {new Date().toLocaleDateString().toUpperCase()}
            </div>
            <h1 className="text-7xl font-black leading-none tracking-tighter">
              LEARN.<br/>
              BUILD.<br/>
              MASTER.
            </h1>
            <div className="absolute -top-4 -right-4 border-4 border-black bg-white px-4 py-2 rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-2xl font-bold">NEW!</span>
            </div>
          </motion.div>

          {/* Article Column 1 */}
          <div className="col-span-12 md:col-span-7 border-4 border-black bg-white p-6 relative z-20">
            <div className="border-b-4 border-black pb-2 mb-4">
              <h2 className="text-3xl font-bold tracking-tight">BREAKING: EDUCATION REVOLUTION</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="border-l-4 border-black pl-4">
                In an unprecedented move, CoursetuTor has announced a complete paradigm shift in online learning.
                Sources confirm that traditional passive learning is DEAD.
              </p>
              <p>
                The new approach focuses on hands-on mastery, real-world projects, and immediate application.
                "We're not here to lecture," says the platform. "We're here to transform."
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-black p-3">
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-xs uppercase">Active Students</div>
                </div>
                <div className="border-2 border-black p-3">
                  <div className="text-4xl font-bold">50+</div>
                  <div className="text-xs uppercase">Expert Courses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Articles */}
          <div className="col-span-12 md:col-span-5 space-y-0 relative z-10">
            <div className="border-4 border-black bg-white p-4">
              <div className="text-xs font-bold border-b-2 border-black pb-1 mb-2">FEATURED</div>
              <h3 className="text-xl font-bold mb-2">CODING BOOTCAMP SOLD OUT</h3>
              <p className="text-xs leading-relaxed mb-4">
                Last 3 seats remaining for the intensive 12-week program. Students report 300% skill increase.
              </p>
              <Link to="/courses">
                <Button className="w-full border-4 border-black bg-white text-black font-bold text-sm py-3 hover:bg-black hover:text-white transition-none uppercase tracking-wider">
                  ENROLL NOW
                </Button>
              </Link>
            </div>

            <div className="border-4 border-black bg-black text-white p-4 -mt-6 ml-4 rotate-2">
              <div className="text-xs font-bold border-b-2 border-white pb-1 mb-2">OPINION</div>
              <h3 className="text-lg font-bold mb-2">"WHY I QUIT MY JOB TO LEARN"</h3>
              <p className="text-xs leading-relaxed">
                Former banker shares journey from spreadsheets to successful developer in just 6 months.
              </p>
            </div>

            <div className="border-4 border-black bg-white p-4 -mt-8">
              <div className="text-xs font-bold border-b-2 border-black pb-1 mb-2">CLASSIFIEDS</div>
              <div className="space-y-2 text-xs">
                <div className="border-l-2 border-black pl-2">• Web Development Fundamentals</div>
                <div className="border-l-2 border-black pl-2">• Advanced React Patterns</div>
                <div className="border-l-2 border-black pl-2">• Backend Architecture</div>
                <div className="border-l-2 border-black pl-2">• Database Design Mastery</div>
              </div>
            </div>
          </div>

          {/* Bottom Torn Edge */}
          <div className="col-span-12 border-t-4 border-black pt-6 mt-8">
            <div className="flex justify-between items-center">
              <div className="text-xs">
                PRINTED IN THE DIGITAL AGE • ESTABLISHED 2024
              </div>
              <div className="flex gap-2">
                <Link to="/browse">
                  <Button className="border-4 border-black bg-white text-black font-bold text-xs py-2 px-6 hover:bg-black hover:text-white transition-none uppercase">
                    BROWSE ALL
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link to="/signup">
                    <Button className="border-4 border-black bg-black text-white font-bold text-xs py-2 px-6 hover:bg-white hover:text-black transition-none uppercase">
                      SUBSCRIBE
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Stamp Badge */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-8 border-black rounded-full bg-white flex items-center justify-center rotate-12 z-40">
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs font-bold">VERIFIED</div>
            </div>
          </div>
        </div>

        {/* Course Listings - Newspaper Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 mb-32 border-8 border-black">
          {[
            { title: 'FULL STACK DEV', desc: 'Master frontend & backend in brutal efficiency', price: '$299' },
            { title: 'DATA SCIENCE', desc: 'Raw numbers to actionable insights', price: '$349' },
            { title: 'MOBILE FIRST', desc: 'React Native from zero to deployment', price: '$279' }
          ].map((course, idx) => (
            <div key={idx} className="border-4 border-black p-6 bg-white hover:bg-black hover:text-white transition-none group">
              <div className="text-xs border-b-2 border-current pb-2 mb-3">COURSE #{idx + 1}</div>
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="text-sm mb-4 leading-tight">{course.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{course.price}</span>
                <Button className="border-2 border-current bg-transparent text-current font-bold text-xs py-2 px-4 group-hover:bg-white group-hover:text-black uppercase">
                  VIEW
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
