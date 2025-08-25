// api.js
const PUBLIC_PATHS = [
  '/api/v1/members/register',
  '/api/v1/members/auth/login',
  '/api/v1/token',
  '/api/v1/token/',
  '/api/v1/token/refresh',
];

// Check if URL is public
const isPublicPath = (url) => PUBLIC_PATHS.some(path => url.includes(path));

// Decode JWT payload
const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    console.error('Failed to decode JWT', err);
    return null;
  }
};

// Refresh access token if expired
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
      sessionStorage.clear();
      return null;
    }
  } catch (err) {
    console.error('Token refresh error', err);
    sessionStorage.clear();
    return null;
  }
};

// Ensure valid access token
export const ensureAccessToken = async () => {
  let token = sessionStorage.getItem('accessToken');
  if (!token) return null;

  const payload = decodeJwt(token);
  const now = Math.floor(Date.now() / 1000);

  if (!payload || payload.exp <= now) {
    token = await refreshAccessToken();
  }

  return token;
};

// Main API call function
export const apiCall = async (url, options = {}) => {
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
