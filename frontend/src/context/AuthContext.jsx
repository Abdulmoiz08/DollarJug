
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');

      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Failed to restore user session:', error);
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = (userData) => {
    try {
      localStorage.setItem('userInfo', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user session:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
