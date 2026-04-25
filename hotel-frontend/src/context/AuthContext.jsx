import { createContext, useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, role, id, name } = response.data;
      
      const userData = { id, name, email, role };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Login successful!');
      return { success: true, role };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post('/register', { name, email, password });
      toast.success('Registration successful! Please login.');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
