import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

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

      {/* Protected routes */}
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
    </Routes>
  );
}

export default App;
