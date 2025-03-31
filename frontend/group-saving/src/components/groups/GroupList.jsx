const GroupList = ({ groups }) => {
    return (
      <div className="space-y-4">
        {groups.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            You haven't joined any groups yet.
          </div>
        ) : (
          groups.map((group) => (
            <div 
              key={group.id} 
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{group.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Active
                </span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full" 
                    style={{ width: `${(group.currentAmount / group.targetAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>${group.currentAmount.toLocaleString()}</span>
                  <span>${group.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default GroupList;