const GroupApprovalList = () => {
    // Mock data - would come from API in real app
    const pendingGroups = [
      {
        id: '1',
        name: 'Tech Savers Group',
        creator: 'Jane Smith',
        targetAmount: 10000,
        membersCount: 5,
        createdAt: '2023-05-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'Family Vacation Fund',
        creator: 'John Doe',
        targetAmount: 5000,
        membersCount: 3,
        createdAt: '2023-05-14T14:45:00Z',
      },
    ];
  
    const handleApprove = (groupId) => {
      console.log('Approved group:', groupId);
      // API call would go here
    };
  
    const handleReject = (groupId) => {
      console.log('Rejected group:', groupId);
      // API call would go here
    };
  
    return (
      <div className="space-y-4">
        {pendingGroups.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No groups pending approval.
          </div>
        ) : (
          pendingGroups.map(group => (
            <div 
              key={group.id} 
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{group.name}</h4>
                  <p className="text-sm text-gray-600">
                    Created by {group.creator} • {group.membersCount} members
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pending
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Target Amount</p>
                  <p className="font-medium text-gray-800">
                    ${group.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium text-gray-800">
                    {new Date(group.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleApprove(group.id)}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(group.id)}
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
  
  export default GroupApprovalList;