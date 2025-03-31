import { useParams } from 'react-router-dom';
import GroupDetails from '../groups/GroupDetails';
import ContributionForm from '../transactions/ContributionForm';
import WithdrawalRequestForm from '../Withdrawals/WithdrawalRequestForm';
import GroupTransactions from '../groups/GroupTransactions';

const MemberDashboard = () => {
  const { groupId } = useParams();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Member Dashboard</h1>
        <GroupDetails groupId={groupId} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ContributionForm groupId={groupId} />
          <WithdrawalRequestForm groupId={groupId} />
        </div>
        <div>
          <GroupTransactions groupId={groupId} />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;