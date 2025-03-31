import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Authentication Context
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

// Import Authentication Components
import LoginForm from './components/auth/Login';
import SignupForm from './components/auth/Signup';

// Placeholder Dashboard Components
const MemberDashboard = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-blue-50 flex items-center justify-center"
  >
    <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
      <h1 className="text-3xl font-bold text-blue-800">Member Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome, Group Member!</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-green-50 flex items-center justify-center"
  >
    <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
      <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Group Management Console</p>
    </div>
  </motion.div>
);

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isMember } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            
            {/* Member Dashboard - Accessible to all authenticated users */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <MemberDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Admin Dashboard - Accessible only to admins */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;