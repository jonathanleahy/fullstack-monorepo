import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CoursesPage } from './pages/CoursesPage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { EditCoursePage } from './pages/EditCoursePage';
import { DashboardPage } from './pages/DashboardPage';
import { ImportCoursePage } from './pages/ImportCoursePage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Public routes with layout */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      {/* Course routes - public browsing, auth required for enrollment */}
      <Route
        path="/courses"
        element={
          <Layout>
            <CoursesPage />
          </Layout>
        }
      />
      <Route
        path="/courses/new"
        element={
          <ProtectedRoute>
            <Layout>
              <CreateCoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/import"
        element={
          <ProtectedRoute>
            <Layout>
              <ImportCoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <Layout>
            <CourseDetailPage />
          </Layout>
        }
      />
      <Route
        path="/courses/:id/edit"
        element={
          <ProtectedRoute>
            <Layout>
              <EditCoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-courses"
        element={
          <ProtectedRoute>
            <Layout>
              <MyCoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <ProtectedRoute>
            <Layout>
              <BookmarksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <AnalyticsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
