import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // Try to get initial login state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginState = sessionStorage.getItem('isLoggedIn');
    return storedLoginState === 'true';
  });

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse currentUser from sessionStorage", e);
      return null;
    }
  });

  // Persist login state and user data to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }, [isLoggedIn, user]);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('accessToken');
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};