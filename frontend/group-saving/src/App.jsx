import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import GroupForm from './components/Groups/GroupForm';
import Profile from './components/Auth/Profile';
import GroupDetails from './components/Groups/GroupDetails';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import MemberDashboard from './components/dashboard/MemberDashboard';
import GroupList from  './components/Groups/GroupList'
import GroupDiscovery from './components/Groups/GroupDiscovery';


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<GroupList />} />
                <Route path="discover" element={<GroupDiscovery />} />
                <Route path="create-group" element={<GroupForm />} />
                <Route path="profile" element={<Profile />} />
                <Route path="group/:groupId" element={<GroupDetails />}>
                  <Route index element={<MemberDashboard />} />
                  <Route path="admin" element={<AdminDashboard />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;