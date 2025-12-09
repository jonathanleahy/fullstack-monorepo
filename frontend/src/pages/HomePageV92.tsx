import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { DesignNavigation } from '../components/DesignNavigation';

export function HomePageV92() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 150, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      <DesignNavigation currentVersion={92} />

      {/* Blueprint Header */}
      <header className="border-b-2 border-dashed border-cyan-400 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between relative">
            {/* Logo with technical annotation */}
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="border-4 border-cyan-500 px-6 py-3 relative">
                  <span className="font-mono font-bold text-2xl text-cyan-600">COURSEBLUE</span>
                  {/* Dimension markers */}
                  <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs font-mono text-cyan-500">
                    <span>├─</span>
                    <span>200px</span>
                    <span>─┤</span>
                  </div>
                  <div className="absolute top-0 -left-8 bottom-0 flex flex-col justify-between text-xs font-mono text-cyan-500">
                    <span>┬</span>
                    <span className="rotate-90">40px</span>
                    <span>┴</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  <div>COMPONENT: LOGO</div>
                  <div>VERSION: 1.0</div>
                </div>
              </div>
            </div>

            {/* Navigation with blueprint style */}
            <nav className="flex gap-8">
              {['COURSES', 'INSTRUCTORS', 'ABOUT'].map((item) => (
                <div key={item} className="relative group">
                  <Link to={`/${item.toLowerCase()}`} className="font-mono text-sm tracking-wider text-slate-700 hover:text-cyan-600 transition-colors">
                    {item}
                  </Link>
                  {/* Corner markers */}
                  <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500"></div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Auth buttons with corner markers */}
            <div className="flex gap-4">
              {!isAuthenticated ? (
                <>
                  <div className="relative group">
                    <Link to="/login">
                      <button className="border-2 border-cyan-500 px-6 py-2 font-mono text-sm hover:bg-cyan-50 transition-colors">
                        SIGN IN
                      </button>
                    </Link>
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="relative group">
                    <Link to="/register">
                      <button className="bg-cyan-500 text-white px-6 py-2 font-mono text-sm border-2 border-cyan-600 hover:bg-cyan-600 transition-colors">
                        GET STARTED
                      </button>
                    </Link>
                    <div className="absolute -inset-1 border border-dashed border-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </>
              ) : (
                <Link to="/dashboard">
                  <button className="bg-cyan-500 text-white px-6 py-2 font-mono text-sm border-2 border-cyan-600">
                    DASHBOARD
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Wireframe Style */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Annotated wireframe */}
          <div className="relative">
            <div className="space-y-4">
              <div className="relative">
                <h1 className="text-6xl font-bold text-slate-800 border-4 border-dashed border-slate-300 p-6 inline-block">
                  BUILD YOUR
                  <br />
                  FUTURE
                </h1>
                {/* Arrow annotation */}
                <div className="absolute -right-32 top-8 flex items-center gap-2">
                  <svg width="80" height="2" className="text-cyan-500">
                    <line x1="0" y1="1" x2="70" y2="1" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                  <div className="text-xs font-mono text-cyan-600 whitespace-nowrap">
                    <div>HERO TITLE</div>
                    <div className="text-slate-500">72px Bold</div>
                  </div>
                </div>
              </div>

              <div className="relative border-l-4 border-cyan-400 pl-6 py-2">
                <p className="text-xl text-slate-600 font-mono">
                  Expert-led courses designed
                  <br />
                  for systematic learning and
                  <br />
                  measurable results.
                </p>
                <div className="absolute -left-8 top-1/2 text-cyan-500 text-xs font-mono">SPEC</div>
              </div>

              <div className="flex gap-4 pt-4">
                <div className="relative group">
                  <Link to="/courses">
                    <button className="border-4 border-slate-800 px-8 py-4 font-mono font-bold hover:bg-slate-800 hover:text-white transition-colors">
                      BROWSE COURSES
                    </button>
                  </Link>
                  {/* Selection handles */}
                  <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 rounded-full"></div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="border-2 border-dashed border-slate-400 px-8 py-4 font-mono hover:border-solid hover:border-cyan-500 transition-all">
                    LEARN MORE
                  </button>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    SECONDARY ACTION
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Technical diagram */}
          <div className="relative">
            <div className="border-4 border-slate-300 p-8 relative">
              {/* Component structure */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-cyan-400 p-4 bg-cyan-50/50">
                  <div className="text-xs font-mono text-cyan-600 mb-2">COMPONENT: COURSE_CARD</div>
                  <div className="bg-white border-2 border-slate-200 p-4">
                    <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 border border-dashed border-slate-300 mb-3 flex items-center justify-center">
                      <span className="font-mono text-sm text-slate-400">[IMAGE_PLACEHOLDER]</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 w-3/4"></div>
                      <div className="h-3 bg-slate-100 w-1/2"></div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-cyan-400 p-4 bg-cyan-50/50">
                  <div className="text-xs font-mono text-cyan-600 mb-2">COMPONENT: STATS_MODULE</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="bg-white border-2 border-slate-200 p-3 text-center">
                        <div className="text-2xl font-bold text-slate-700">{num * 500}+</div>
                        <div className="text-xs font-mono text-slate-500">METRIC_{num}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dimension lines */}
              <div className="absolute -right-12 top-0 bottom-0 flex flex-col justify-center items-center text-xs font-mono text-cyan-500">
                <span>├</span>
                <span className="rotate-90 my-2">CONTAINER</span>
                <span>┤</span>
              </div>
            </div>

            {/* Technical notes */}
            <div className="mt-4 border-l-4 border-slate-300 pl-4">
              <div className="text-xs font-mono text-slate-500 space-y-1">
                <div>// LAYOUT: GRID SYSTEM</div>
                <div>// SPACING: 16px BASE</div>
                <div>// BREAKPOINT: 1024px</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - Blueprint Cards */}
        <div className="border-t-2 border-dashed border-slate-300 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-mono text-slate-800 inline-block border-4 border-slate-300 px-6 py-3">
              SYSTEM FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              { id: 'A01', title: 'Expert Instruction', metric: '500+', unit: 'INSTRUCTORS' },
              { id: 'A02', title: 'Quality Content', metric: '1000+', unit: 'COURSES' },
              { id: 'A03', title: 'Global Access', metric: '50K+', unit: 'STUDENTS' },
            ].map((feature, i) => (
              <div key={i} className="relative border-4 border-slate-300 p-6 hover:border-cyan-500 transition-colors group">
                <div className="absolute -top-3 -left-3 bg-white px-2 font-mono text-sm text-cyan-600">
                  MODULE_{feature.id}
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto border-4 border-dashed border-slate-300 group-hover:border-cyan-400 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-200 group-hover:bg-cyan-100 transition-colors"></div>
                  </div>

                  <h3 className="font-mono font-bold text-xl text-slate-800">{feature.title}</h3>

                  <div className="border-t-2 border-dashed border-slate-200 pt-4">
                    <div className="text-3xl font-bold text-cyan-600">{feature.metric}</div>
                    <div className="text-xs font-mono text-slate-500">{feature.unit}</div>
                  </div>
                </div>

                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-400"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
