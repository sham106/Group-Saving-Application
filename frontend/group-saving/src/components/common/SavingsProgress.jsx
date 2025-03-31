const SavingsProgress = ({ groups }) => {
    return (
      <div className="space-y-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">{group.name}</h3>
              <span className="text-sm text-gray-500">
                {Math.round((group.currentAmount / group.targetAmount) * 100)}% complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full" 
                style={{ width: `${Math.min(100, (group.currentAmount / group.targetAmount) * 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Saved: ${group.currentAmount.toLocaleString()}</span>
              <span>Target: ${group.targetAmount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SavingsProgress;