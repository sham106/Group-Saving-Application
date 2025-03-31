import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role, redirect based on role
    return <Navigate 
      to={user.role === 'ADMIN' ? '/admin-dashboard' : '/member-dashboard'} 
      replace 
    />;
  }

  return children;
};

export default PrivateRoute;