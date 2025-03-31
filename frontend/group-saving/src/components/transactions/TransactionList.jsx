import { useState, useEffect } from 'react';
import transactionService from '../../services/transactionService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const TransactionList = ({ groupId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getGroupTransactions(groupId);
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [groupId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-3">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{transaction.memberName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === 'contribution' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount} {transaction.currency}
                </p>
                <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;