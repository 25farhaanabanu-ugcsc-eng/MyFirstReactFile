import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest, setAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState([]);

  // Save users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('styleaura_users', JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users", e);
    }
  }, [users]);

  // Save current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('styleaura_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('styleaura_current_user');
      }
    } catch (e) {
      console.error("Failed to save current user", e);
    }
  }, [currentUser]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('styleaura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders", e);
    }
  }, [orders]);

  const login = async (email, password) => {
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (data.token) {
        setAuthToken(data.token);
      }
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed. Please try again.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const data = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email: email.trim(), password }),
      });
      if (data.token) {
        setAuthToken(data.token);
      }
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    setOrders([]);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser || !getAuthToken()) return;
      try {
        const data = await apiRequest('/api/orders');
        const list = Array.isArray(data) ? data : (data.orders || []);
        setOrders(list.map(o => ({ ...o, id: o.id || o._id })));
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, [currentUser]);

  const updateProfile = (data) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    return updated;
  };

  const switchDemoRole = (role) => {
    const target = users.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  const addOrder = async (orderData) => {
    try {
      const data = await apiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      const created = data.order || data;
      const normalized = { ...created, id: created.id || created._id };
      setOrders(prev => [normalized, ...prev]);
      return normalized;
    } catch (err) {
      console.error('Failed to create order:', err);
      throw err;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      orders,
      login,
      signup,
      logout,
      updateProfile,
      switchDemoRole,
      addOrder,
      updateOrderStatus,
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
