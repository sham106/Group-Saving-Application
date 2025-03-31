import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import transactionService from '../../service/TransactionService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const GroupTransactions = () => {
  const { groupId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'contributions', 'withdrawals'
  const [timeRange, setTimeRange] = useState('30days'); // '7days', '30days', '90days', 'alltime'

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await transactionService.getGroupTransactions(groupId);
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [groupId, filter, timeRange]);

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'contributions') return transaction.type === 'contribution';
    if (filter === 'withdrawals') return transaction.type === 'withdrawal';
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Transaction History</h3>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="all">All Transactions</option>
            <option value="contributions">Contributions Only</option>
            <option value="withdrawals">Withdrawals Only</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No transactions found</p>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{transaction.memberName}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {transaction.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'contribution' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.amount} {transaction.currency}
                  </p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    transaction.type === 'contribution'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </div>
              </div>
              {transaction.status === 'pending' && (
                <div className="mt-2 bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded inline-block">
                  Pending Approval
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupTransactions;