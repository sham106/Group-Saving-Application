import { NavLink } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const adminLinks = [
    { name: 'Dashboard', icon: 'dashboard', tab: 'dashboard' },
    { name: 'Groups', icon: 'groups', tab: 'groups' },
    { name: 'Withdrawals', icon: 'payments', tab: 'withdrawals' },
    { name: 'Loans', icon: 'request_quote', tab: 'loans' },
    { name: 'Profile', icon: 'person', tab: 'profile' },
  ];

  const memberLinks = [
    { name: 'Dashboard', icon: 'dashboard', tab: 'dashboard' },
    { name: 'Contributions', icon: 'savings', tab: 'contributions' },
    { name: 'Withdrawals', icon: 'payments', tab: 'withdrawals' },
    { name: 'Loans', icon: 'request_quote', tab: 'loans' },
    { name: 'Profile', icon: 'person', tab: 'profile' },
  ];

  const links = role === 'admin' ? adminLinks : memberLinks;

  return (
    <div className="w-64 bg-blue-800 text-white shadow-lg">
      <div className="p-4 flex items-center space-x-3 border-b border-blue-700">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="material-icons text-white">account_balance</span>
        </div>
        <h1 className="text-xl font-bold">Savings App</h1>
      </div>
      
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <button
            key={link.tab}
            onClick={() => setActiveTab(link.tab)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === link.tab ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700/50'}`}
          >
            <span className="material-icons">{link.icon}</span>
            <span>{link.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-blue-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700/50 transition-all">
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;