import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem('accessToken'));

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse currentUser", e);
      return null;
    }
  });

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.clear();
    navigate('/login');
  };

  const login = (userData, tokens) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('accessToken', tokens.accessToken);
    sessionStorage.setItem('idToken', tokens.idToken);
    sessionStorage.setItem('refreshToken', tokens.refreshToken);
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Idle logout
  const idleTimeout = 30 * 60 * 1000; // 30 minutes
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
  }, [logout]);

  // API helper integrated with AuthContext
  const PUBLIC_PATHS = [
    '/api/v1/members/register',
    '/api/v1/members/auth/login',
    '/api/v1/token',
    '/api/v1/token/',
    '/api/v1/token/refresh',
  ];

  const isPublicPath = (url) => PUBLIC_PATHS.some(path => url.includes(path));

  const decodeJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Failed to decode JWT', err);
      return null;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
      const res = await fetch('http://localhost:8082/api/v1/token/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!res.ok) throw new Error('Refresh failed');

      const data = await res.json();
      if (data.accessToken) {
        sessionStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
      } else {
        logout();
        return null;
      }
    } catch (err) {
      console.error('Token refresh error', err);
      logout();
      return null;
    }
  };

  const ensureAccessToken = async () => {
    let token = sessionStorage.getItem('accessToken');
    if (!token) return null;

    const payload = decodeJwt(token);
    const now = Math.floor(Date.now() / 1000);

    if (!payload || payload.exp <= now) {
      token = await refreshAccessToken();
    }

    return token;
  };

  const apiCall = async (url, options = {}) => {
    if (!isPublicPath(url)) {
      const token = await ensureAccessToken();
      if (!token) throw new Error('No valid access token');

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    } else {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const error = new Error('API call failed');
      error.response = errorData || res.statusText;
      throw error;
    }

    return res.json();
  };

  const value = { isLoggedIn, user, login, logout, apiCall };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
