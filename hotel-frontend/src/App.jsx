import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Bookings from './pages/Bookings';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotels/:id" element={<HotelDetails />} />
        
        {/* Protected User Routes */}
        <Route path="bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />
        
        {/* Protected Admin Routes */}
        <Route path="admin/*" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<div className="p-8 text-center"><h1 className="text-3xl font-bold">404 Not Found</h1></div>} />
      </Route>
    </Routes>
  );
};

export default App;
