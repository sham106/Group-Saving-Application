import { useState } from 'react';
import withdrawalService from '../../service/WithdrawalService';
import ErrorMessage from '../common/ErrorMessage';

const ProcessWithdrawal = ({ withdrawal, groupId, onUpdate }) => {
  const [action, setAction] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!action) return;
    
    setProcessing(true);
    try {
      const response = await withdrawalService.processWithdrawal(
        withdrawal.id,
        { action, notes }
      );
      onUpdate(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process withdrawal');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{withdrawal.memberName}</p>
          <p className="text-sm text-gray-600">
            Amount: {withdrawal.amount} | {withdrawal.reason}
          </p>
          <p className="text-xs text-gray-500">
            Requested: {new Date(withdrawal.requestDate).toLocaleString()}
          </p>
        </div>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
          Pending
        </span>
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <div className="flex space-x-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name={`action-${withdrawal.id}`}
              value="approve"
              onChange={() => setAction('approve')}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Approve</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name={`action-${withdrawal.id}`}
              value="reject"
              onChange={() => setAction('reject')}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Reject</span>
          </label>
        </div>
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            rows="2"
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!action || processing}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProcessWithdrawal;