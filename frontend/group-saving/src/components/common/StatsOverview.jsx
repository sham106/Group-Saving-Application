const StatsOverview = ({ stats }) => {
    const statItems = [
      {
        title: 'Total Groups',
        value: stats.totalGroups,
        change: '+2',
        icon: 'groups',
        color: 'bg-blue-100 text-blue-600',
      },
      {
        title: 'Pending Approvals',
        value: stats.pendingApprovals,
        change: '+1',
        icon: 'pending_actions',
        color: 'bg-yellow-100 text-yellow-600',
      },
      {
        title: 'Pending Withdrawals',
        value: stats.pendingWithdrawals,
        change: '0',
        icon: 'payments',
        color: 'bg-purple-100 text-purple-600',
      },
      {
        title: 'Pending Loans',
        value: stats.pendingLoans,
        change: '-1',
        icon: 'request_quote',
        color: 'bg-green-100 text-green-600',
      },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statItems.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
                    {stat.change}
                  </span>{' '}
                  from last week
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <span className="material-icons">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsOverview;