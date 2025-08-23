import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// List of public endpoints (no token needed)
const publicEndpoints = [
  '/api/v1/members/register',
  '/api/v1/members/auth/login',
  '/api/v1/token',
  '/api/v1/token/refresh',
];

// Request interceptor - add token only to secured endpoints
api.interceptors.request.use(config => {
  // Check if the request URL is a public endpoint
  console.log("Inside intercepter ", config.url)
  const isPublic = publicEndpoints.some(path => 
    config.url === path || config.url?.startsWith(path + '/')
  );

  console.log("isPublic value intercepter ", isPublic)
  if (!isPublic) {
    // For secured endpoints, attach access token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
        console.log("token from localStorage ", token)
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    // For public endpoints, make sure no Authorization header is set
    delete config.headers['Authorization'];
  }

  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor - handle 401 and try refresh token flow
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        // Call refresh token endpoint
        const res = await axios.post(
          'http://localhost:8082/api/v1/token/refresh',
          { token: refreshToken },
          { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );

        const newAccessToken = res.data.accessToken;
        // Save new access token
        localStorage.setItem('accessToken', newAccessToken);

        // Retry original request with new token
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
