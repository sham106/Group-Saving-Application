import { useEffect } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const { groupId } = useParams();
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If not logged in, redirect to login
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }

      // If not admin of this group, redirect to dashboard
      if (!isAdmin(groupId)) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, groupId, isAdmin, navigate]);

  if (loading) return <LoadingSpinner />;
  
  // Only render children if all checks pass
  return user && isAdmin(groupId) ? <Outlet /> : null;
};

export default AdminRoute;