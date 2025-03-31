import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User logged in but doesn't have required role, redirect to home
    return <Navigate to="/" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default PrivateRoute;