import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GroupDetails from '../groups/GroupDetails';
// import GroupMembers from '../groups/GroupMembers';
import PendingWithdrawals from '../withdrawals/PendingWithdrawals';
import GroupStats from '../transactions/GroupStats_'

const AdminDashboard = () => {
  const { groupId } = useParams();
  const { isAdmin } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <GroupDetails groupId={groupId} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* <GroupMembers groupId={groupId} isAdmin={isAdmin(groupId)} /> */}
          <PendingWithdrawals groupId={groupId} />
        </div>
        <div>
          <GroupStats groupId={groupId} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;