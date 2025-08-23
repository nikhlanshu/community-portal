import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) errors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email address.';

    if (!formData.password) errors.password = 'Password is required.';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setLoading(true);

    if (!validateForm()) {
      setGlobalError('Please correct the errors in the form.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/v1/members/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Check for tokens and store them in localStorage
        if (data.idToken && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }

          let userFromToken, accessPayload;
          try {
            userFromToken = jwtDecode(data.idToken);
            accessPayload = jwtDecode(data.accessToken);
          } catch (decodeError) {
            setGlobalError('Failed to decode authentication token.');
            setLoading(false);
            return;
          }

          userFromToken.roles = accessPayload.roles || [];
          userFromToken.status = accessPayload.status;

          // Save user info in your auth context
          login(userFromToken);

          setGlobalError('');
          setTimeout(() => navigate('/dashboard'), 800);
        } else {
          setGlobalError('Did not receive login information.');
        }
      } else {
        let errData;
        try {
          errData = await response.json();
        } catch {
          errData = null;
        }
        setGlobalError((errData && errData.message) || 'Invalid email or password.');
      }
    } catch (err) {
      setGlobalError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 drop-shadow-lg">Welcome Back!</h1>
          <p className="text-lg text-gray-700">Sign in to your ORIOZ Inc. account.</p>
        </div>
        {globalError && (
          <div
            className={`px-4 py-3 rounded relative mb-6 border ${
              globalError.includes('successful')
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-red-100 border-red-400 text-red-700'
            }`}
            role="alert"
          >
            <strong className="font-bold">{globalError.includes('successful') ? 'Success!' : 'Error!'}</strong>
            <span className="block sm:inline ml-2">{globalError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 mt-1 block w-full px-4 py-3 border ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg`}
                placeholder="you@example.com"
                required
              />
            </div>
            {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 mt-1 block w-full px-4 py-3 border ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-lg`}
                placeholder="********"
                required
              />
            </div>
            {formErrors.password && <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>}
            <div className="mt-4 text-right">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-indigo-800 text-base font-medium transition duration-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-xl text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FaSignInAlt className="mr-3" />
            )}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
