const LoanApprovalList = () => {
    // Mock data - would come from API in real app
    const pendingLoans = [
      {
        id: '1',
        memberName: 'Jane Smith',
        groupName: 'Tech Savers Group',
        amount: 1500,
        repaymentDate: '2023-08-15',
        purpose: 'Laptop upgrade for work',
        requestedAt: '2023-05-15T10:30:00Z',
      },
      {
        id: '2',
        memberName: 'John Doe',
        groupName: 'Family Vacation Fund',
        amount: 800,
        repaymentDate: '2023-07-30',
        purpose: 'Flight tickets',
        requestedAt: '2023-05-14T14:45:00Z',
      },
    ];
  
    const handleApprove = (loanId) => {
      console.log('Approved loan:', loanId);
      // API call would go here
    };
  
    const handleReject = (loanId) => {
      console.log('Rejected loan:', loanId);
      // API call would go here
    };
  
    return (
      <div className="space-y-4">
        {pendingLoans.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No loans pending approval.
          </div>
        ) : (
          pendingLoans.map(loan => (
            <div 
              key={loan.id} 
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{loan.memberName}</h4>
                  <p className="text-sm text-gray-600">
                    {loan.groupName} • Due {new Date(loan.repaymentDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pending
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="font-medium text-blue-700">
                    ${loan.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium text-gray-800">
                    {loan.purpose}
                  </p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-gray-500">Requested</p>
                <p className="text-sm text-gray-600">
                  {new Date(loan.requestedAt).toLocaleString()}
                </p>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleApprove(loan.id)}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(loan.id)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default LoanApprovalList;