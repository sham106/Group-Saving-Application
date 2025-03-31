import { useState, useEffect } from 'react';
import withdrawalService from '../../service/WithdrawalService';
import ErrorMessage from '../common/ErrorMessage';

const WithdrawalRequestForm = ({ groupId }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await withdrawalService.getAvailableBalance(groupId);
        setAvailableBalance(response.data.balance);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };
    fetchBalance();
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await withdrawalService.requestWithdrawal({ groupId, amount, reason });
      setSuccess('Withdrawal request submitted');
      setAmount('');
      setReason('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Withdrawal request failed');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-3">Request Withdrawal</h3>
      <p className="text-sm text-gray-600 mb-2">
        Available balance: {availableBalance}
      </p>
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            max={availableBalance}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="2"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Request Withdrawal
        </button>
      </form>
    </div>
  );
};

export default WithdrawalRequestForm;