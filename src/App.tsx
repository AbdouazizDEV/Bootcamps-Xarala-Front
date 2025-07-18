import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages publiques
const HomePage = React.lazy(() => import('./pages/public/HomePage/HomePage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/public/ContactPage/ContactPage'));
const BootcampsPage = React.lazy(() => import('./pages/public/BootcampsPage/BootcampsPage'));
const BootcampDetailPage = React.lazy(() => import('./pages/public/BootcampDetailPage/BootcampDetailPage'));

// Pages admin
const LoginPage = React.lazy(() => import('./pages/admin/LoginPage/LoginPage'));
const DashboardPage = React.lazy(() => import('./pages/admin/DashboardPage/DashboardPage'));
const LeadsPage = React.lazy(() => import('./pages/admin/LeadsPage/LeadsPage'));
const BootcampsAdminPage = React.lazy(() => import('./pages/admin/BootcampsPage/BootcampsPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-orange"></div>
  </div>
);

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Routes publiques */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
            <Route
              path="/bootcamps"
              element={
                <PageTransition>
                  <BootcampsPage />
                </PageTransition>
              }
            />
            <Route
              path="/bootcamps/:id"
              element={
                <PageTransition>
                  <BootcampDetailPage />
                </PageTransition>
              }
            />

            {/* Routes admin */}
            <Route
              path="/admin/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <DashboardPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <LeadsPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bootcamps"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <BootcampsAdminPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            {/* Route 404 */}
            <Route
              path="*"
              element={
                <PageTransition>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
                      <button
                        onClick={() => window.history.back()}
                        className="btn-primary"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  );
}

export default App;
