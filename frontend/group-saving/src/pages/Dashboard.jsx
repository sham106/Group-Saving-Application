import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import MemberDashboard from '../components/dashboard/MemberDashboard';

const Dashboard = () => {
  const { groupId } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return <LoadingSpinner />;

  if (groupId) {
    return isAdmin(groupId) ? (
      <AdminDashboard />
    ) : (
      <MemberDashboard />
    );
  }

  // Default dashboard when no group is selected
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
        {/* Group list or other dashboard content would go here */}
      </div>
    </div>
  );
};

export default Dashboard;