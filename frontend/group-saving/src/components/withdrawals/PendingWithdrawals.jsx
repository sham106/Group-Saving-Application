import { useState, useEffect } from 'react';
import { getPendingWithdrawals, processWithdrawal } from '../../services/WithdrawalService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const PendingWithdrawals = ({ groupId }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState([]);

  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      try {
        const response = await getPendingWithdrawals(groupId);
        setWithdrawals(response.pending_withdrawals);
      } catch (err) {
        console.error("Error fetching withdrawals:", err);
        setError(err.message || "Failed to load pending withdrawals");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingWithdrawals();
  }, [groupId]);

  const handleProcessWithdrawal = async (withdrawalId, action) => {
    try {
      setProcessingIds(prev => [...prev, withdrawalId]);
      setError(null);
      
      // Convert action to lowercase to match backend enum values
      const payload = { status: action.toLowerCase() };
      console.log(`Processing withdrawal ${withdrawalId} with action:`, payload);
      
      const result = await processWithdrawal(withdrawalId, payload);
      console.log("Process result:", result);
      
      // Remove the processed withdrawal from the list
      setWithdrawals(withdrawals.filter(w => w.id !== withdrawalId));
    } catch (err) {
      console.error("Error processing withdrawal:", err);
      setError(`Failed to process withdrawal: ${err.message || "Unknown error"}`);
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== withdrawalId));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-4">
      {error && (
        <ErrorMessage 
          message={error} 
          className="mb-4"
          onClose={() => setError(null)}
        />
      )}
      
      {withdrawals.length === 0 ? (
        <div className="p-4 bg-gray-50 rounded-md text-center">
          <p className="text-gray-500">
            No pending withdrawals
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {withdrawals.map((withdrawal) => {
            const isProcessing = processingIds.includes(withdrawal.id);
            
            return (
              <div 
                key={withdrawal.id} 
                className="p-4 border rounded-md shadow-sm bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">
                      {withdrawal.user_username || withdrawal.user} requested ${withdrawal.amount}
                    </p>
                    {withdrawal.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {withdrawal.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {withdrawal.id} | Requested: {new Date(withdrawal.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleProcessWithdrawal(withdrawal.id, 'approved')}
                      disabled={isProcessing}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md hover:bg-green-200 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => handleProcessWithdrawal(withdrawal.id, 'rejected')}
                      disabled={isProcessing}
                      className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-md hover:bg-red-200 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PendingWithdrawals;