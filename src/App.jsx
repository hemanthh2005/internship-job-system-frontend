import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationContainer from './components/NotificationContainer';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import UploadResume from './pages/UploadResume';
import ApplyJobLink from './pages/ApplyJobLink';
import AdminDashboard from './pages/AdminDashboard';
import AdminJobs from './pages/AdminJobs';
import AddJob from './pages/AddJob';
import AdminApplications from './pages/AdminApplications';

// Layout wrapper component
const Layout = ({ children, role }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar role={role} />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
      <NotificationContainer />
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { userRole } = useApp();

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
};

function AppRoutes() {
  const { userRole } = useApp();

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Student Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Layout role="student">
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRole="student">
              <Layout role="student">
                <Jobs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRole="student">
              <Layout role="student">
                <Applications />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute allowedRole="student">
              <Layout role="student">
                <ApplyJobLink />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute allowedRole="student">
              <Layout role="student">
                <UploadResume />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout role="admin">
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout role="admin">
                <AdminJobs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout role="admin">
                <AddJob />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout role="admin">
                <AdminApplications />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
