import { useState, useEffect } from 'react';
import TransactionService from '../../service/TransactionService';
import LoadingSpinner from '../common/LoadingSpinner';

const GroupStats = ({ groupId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await TransactionService.getGroupStats(groupId);
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [groupId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-3">Group Statistics</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Contributions</p>
          <p className="text-xl font-semibold">
            {stats.currency} {stats.totalContributions}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Withdrawals</p>
          <p className="text-xl font-semibold">
            {stats.currency} {stats.totalWithdrawals}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-xl font-semibold">
            {stats.currency} {stats.currentBalance}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Contribution</p>
          <p className="text-xl font-semibold">
            {stats.currency} {stats.averageContribution}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupStats;