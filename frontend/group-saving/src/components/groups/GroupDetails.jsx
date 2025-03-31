import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import groupService from '../../service/GroupService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await groupService.getGroupDetails(groupId);
        setGroup(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch group details');
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [groupId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!group) return <p>Group not found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <p className="text-gray-600 mt-1">{group.description}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {group.isAdmin ? 'Admin' : 'Member'}
        </span>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Contribution</h3>
          <p className="text-xl mt-1">
            {group.currency} {group.contributionAmount} {group.contributionFrequency}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Members</h3>
          <p className="text-xl mt-1">{group.memberCount}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Total Savings</h3>
          <p className="text-xl mt-1">
            {group.currency} {group.totalSavings}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Recent Transactions</h3>
        {/* Transaction list would go here */}
      </div>
    </div>
  );
};

export default GroupDetails;