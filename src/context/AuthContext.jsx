import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = sessionStorage.getItem('accessToken');
    return !!token;
  });

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse currentUser", e);
      return null;
    }
  });

  // Idle logout
  const idleTimeout = 15 * 60 * 1000;
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => logout(), idleTimeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer(); // start timer on mount

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  // Auto-refresh access token for active users
  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) return logout();

        fetch('http://localhost:8082/api/v1/members/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })
          .then(res => {
            if (!res.ok) throw new Error('Refresh failed');
            return res.json();
          })
          .then(data => {
            if (data.accessToken) {
              sessionStorage.setItem('accessToken', data.accessToken);
            } else {
              logout();
            }
          })
          .catch(() => logout());
      }, 5 * 60 * 1000); // every 5 mins
    }

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const login = (userData, tokens) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('accessToken', tokens.accessToken);
    sessionStorage.setItem('idToken', tokens.idToken);
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };

  const value = { isLoggedIn, user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
