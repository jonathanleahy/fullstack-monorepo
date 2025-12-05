import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [hasAuthoredCourses, setHasAuthoredCourses] = useState(false);

  useEffect(() => {
    const checkAuthoredCourses = async () => {
      if (!user) {
        setHasAuthoredCourses(false);
        return;
      }

      try {
        const result = await courseService.getMyAuthoredCourses({ page: 1, limit: 1 });
        setHasAuthoredCourses(result.total > 0);
      } catch {
        setHasAuthoredCourses(false);
      }
    };

    checkAuthoredCourses();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Course Tutor
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            {user && (
              <>
                <Link to="/my-courses" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Courses
                </Link>
                <Link to="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bookmarks
                </Link>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                {hasAuthoredCourses && (
                  <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                    Analytics
                  </Link>
                )}
              </>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Built with React, Go, and GraphQL
        </div>
      </footer>
    </div>
  );
}
