import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/admin/Users';
import Members from './pages/admin/Members';
import MemberConfig from './pages/admin/MemberConfig';
import Templates from './pages/admin/Templates';
import Points from './pages/admin/Points';
import Payment from './pages/admin/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="members" element={<Members />} />
          <Route path="config" element={<MemberConfig />} />
          <Route path="templates" element={<Templates />} />
          <Route path="points" element={<Points />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
