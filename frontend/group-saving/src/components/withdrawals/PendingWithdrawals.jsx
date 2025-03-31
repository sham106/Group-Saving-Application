import { useState, useEffect } from 'react';
import withdrawalService from '../../service/WithdrawalService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import ProcessWithdrawal from './ProcessWithdrawals';

const PendingWithdrawals = ({ groupId }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await withdrawalService.getPendingWithdrawals(groupId);
        setWithdrawals(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch withdrawals');
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, [groupId]);

  const handleUpdate = (updatedWithdrawal) => {
    setWithdrawals(withdrawals.map(w => 
      w.id === updatedWithdrawal.id ? updatedWithdrawal : w
    ));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-3">Pending Withdrawal Requests</h3>
      {withdrawals.length === 0 ? (
        <p className="text-gray-500">No pending withdrawals</p>
      ) : (
        <div className="space-y-3">
          {withdrawals.map((withdrawal) => (
            <ProcessWithdrawal
              key={withdrawal.id}
              withdrawal={withdrawal}
              groupId={groupId}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawals;