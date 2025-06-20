import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaFacebook, FaInstagram, FaYoutube, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Added FaUserCircle, FaSignOutAlt
import communityLogo from './images/orioz-logo.png';

// Import AuthProvider and useAuth hook
import { AuthProvider, useAuth } from './context/AuthContext';

// Import ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute'; // Make sure this path is correct

// Import all your page components
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import AboutUsPage from './pages/AboutUsPage';
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SupportPage from './pages/SupportPage';
import DashboardPage from './pages/DashboardPage';

// --- Main Application Component ---
function App() {
  return (
    // Router should wrap your entire application to enable navigation
    <Router>
      {/* AuthProvider wraps the entire application to provide authentication state globally */}
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {/* Navbar component */}
          <Navbar />

          {/* Main content area, pushed down by the footer */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />

              {/* Protected Routes - only accessible if logged in */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              {/* Example of nested protected dashboard routes */}
              <Route path="/dashboard/profile" element={<ProtectedRoute><PlaceholderPage title="Profile Settings" /></ProtectedRoute>} />
              <Route path="/dashboard/messages" element={<ProtectedRoute><PlaceholderPage title="Messages Inbox" /></ProtectedRoute>} />

              {/* Catch-all for undefined routes (optional but good practice) */}
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </main>

          {/* Footer component */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

// --- Navbar component handles the responsive navigation bar. ---
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate(); // Initialize useNavigate for redirection on logout

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
        {/* Logo/Community Name */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-200 rounded-lg p-2 transition duration-300">
            <img src={communityLogo} alt="Community Portal Logo" className="h-8 md:h-10 w-auto rounded-md filter invert" />
            <span>Community Portal</span>
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 rounded-lg p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row md:ml-auto items-start md:items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/support">Support</NavLink> {/* Added Support link to Navbar */}
          </div>
          {/* Conditional Login/Dashboard/Logout Button */}
          {isLoggedIn ? (
            <>
              <span className="ml-4 mr-2 hidden lg:inline text-white text-lg font-medium">
                Welcome, {user?.name || 'Member'}
              </span>
              <NavLink to="/dashboard" className="mt-2 md:mt-0 md:ml-4 px-5 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300 transform hover:scale-105">
                <FaUserCircle className="inline-block mr-2" /> Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="mt-2 md:mt-0 md:ml-4 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
              >
                <FaSignOutAlt className="inline-block mr-2" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-4 md:mt-0 md:ml-6 px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Helper component for navigation links - updated styling for better visibility on dark background
const NavLink = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`block py-2 px-4 text-white hover:bg-blue-700 hover:text-white rounded-lg md:inline-block md:mt-0 md:ml-4 font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ${className}`}
  >
    {children}
  </Link>
);

// Footer component provides a standard footer with copyright and links.
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Community Name */}
        <div className="mb-6 md:mb-0">
          <Link to="/" className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
            ORIOZCommunity
          </Link>
          <p className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
          <Link to="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition duration-300">Terms of Service</Link>
          <Link to="/support" className="hover:text-white transition duration-300">Support</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://www.facebook.com/ORIOZCommunity/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/o_r_i_o_z/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.youtube.com/user/Oriozcommunity/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaYoutube className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Placeholder component for pages under construction
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-lg text-gray-600">This page is under construction. Please check back later!</p>
      </div>
    </div>
  );
}