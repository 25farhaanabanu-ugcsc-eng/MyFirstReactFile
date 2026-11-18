import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 'user-admin-1',
    name: 'Eleanor Vance',
    email: 'admin@styleaura.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'January 2024',
    phone: '+1 (555) 234-5678',
    address: '450 Fashion Avenue, Suite 1200, New York, NY'
  },
  {
    id: 'user-cust-1',
    name: 'Aria Montgomery',
    email: 'aria@styleaura.com',
    password: 'user123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    joinedDate: 'March 2024',
    phone: '+1 (555) 890-1234',
    address: '742 Evergreen Terrace, Seattle, WA'
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_current_user');
      return saved ? JSON.parse(saved) : DEFAULT_USERS[1]; // default logged in as customer for instant preview
    } catch {
      return DEFAULT_USERS[1];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('styleaura_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ORD-8941',
        date: '2026-11-12',
        customerName: 'Aria Montgomery',
        customerEmail: 'aria@styleaura.com',
        items: [
          { name: 'Lavender Ethereal Silk Maxi Dress', quantity: 1, price: 189, size: 'S', color: 'Soft Lavender' },
          { name: 'Handmade Mulberry Silk Scarf', quantity: 1, price: 65, size: '90cm x 90cm', color: 'Lavender Garden' }
        ],
        subtotal: 254,
        discount: 25,
        total: 229,
        status: 'Delivered',
        paymentMethod: 'Credit Card (ending 4242)',
        shippingAddress: '742 Evergreen Terrace, Seattle, WA'
      },
      {
        id: 'ORD-9022',
        date: '2026-11-16',
        customerName: 'Aria Montgomery',
        customerEmail: 'aria@styleaura.com',
        items: [
          { name: 'Pastel Lilac Tailored Linen Shirt', quantity: 1, price: 95, size: 'M', color: 'Pastel Lilac' }
        ],
        subtotal: 95,
        discount: 0,
        total: 95,
        status: 'Processing',
        paymentMethod: 'Apple Pay',
        shippingAddress: '742 Evergreen Terrace, Seattle, WA'
      }
    ];
  });

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

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      return { success: false, message: 'No account found with this email address.' };
    }
    if (found.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }
    setCurrentUser(found);
    return { success: true, user: found };
  };

  const signup = (name, email, password) => {
    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.trim(),
      password,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      joinedDate: 'November 2026',
      phone: '',
      address: ''
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

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

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: currentUser?.name || 'Guest Shopper',
      customerEmail: currentUser?.email || 'guest@styleaura.com',
      status: 'Processing',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
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
