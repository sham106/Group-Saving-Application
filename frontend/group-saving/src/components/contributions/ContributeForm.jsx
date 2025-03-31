import { useState } from 'react';

const ContributeForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock data - would come from API in real app
  const groups = [
    { id: '1', name: 'Family Savings' },
    { id: '2', name: 'Vacation Fund' },
    { id: '3', name: 'Emergency Fund' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        amount,
        paymentMethod,
        groupId: selectedGroup,
      });
      setIsSubmitting(false);
      setSuccess(true);
      setAmount('');
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-3">New Contribution</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
            Select Group
          </label>
          <select
            id="group"
            required
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a group</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              id="amount"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['mpesa', 'bank', 'card', 'cash'].map(method => (
              <label key={method} className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !amount || !selectedGroup}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting || !amount || !selectedGroup ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Processing...' : 'Make Contribution'}
          </button>
        </div>
        
        {success && (
          <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md text-center animate-fadeIn">
            Contribution successful! Group savings updated.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContributeForm;