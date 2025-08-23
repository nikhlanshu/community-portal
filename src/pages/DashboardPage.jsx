import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCalendarAlt, FaCog, FaChartLine, FaEnvelope, FaUserShield, FaPlus, FaNewspaper } from 'react-icons/fa';
import { format, parseISO, isValid } from 'date-fns';

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading user data or not logged in...</p>
      </div>
    );
  }

  // Decide which name to show
  const userName = user.firstName;

  // Choose memberSince, falling back to dateOfBirth or none
  let memberSinceFormatted = 'Not provided';
  let dateString = user.memberSince || user.dateOfBirth;
  if (dateString) {
    try {
      const parsed = parseISO(dateString);
      memberSinceFormatted = isValid(parsed)
        ? format(parsed, 'MMMM do, yyyy')
        : dateString;
    } catch {
      memberSinceFormatted = dateString;
    }
  }

  const userState = user.state || user.province || 'Not provided';

  const mockDashboardData = {
    upcomingEventsCount: 2,
    unreadMessages: 1,
    latestNewsTitle: "ORIOZ Inc. Celebrates 20 Years of Community Building",
    nextEventTitle: "Community Fun Day - Aspley Park",
    nextEventDate: "2025-07-20T10:00:00",
  };

  // ADMIN CHECK
  const userRoles = user?.roles || [];
  const isAdmin = userRoles.includes('ADMIN');

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaUserCircle className="text-indigo-600 text-8xl mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 drop-shadow-lg">
            Welcome, {userName}!
          </h1>
          <p className="text-xl text-gray-700">Your personalized community hub.</p>
        </div>

        {/* --- ADMIN ONLY SECTION --- */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Moderate memberships */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform">
              <FaUserShield className="text-orange-500 text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Moderate Memberships</h3>
              <p className="text-gray-700 mb-4">Approve or reject new registrations.</p>
              <Link
                to="/dashboard/admin/review-members"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-orange-600 hover:bg-orange-700 font-medium shadow-sm">
                Review Members
              </Link>
            </div>
            {/* Add New Event */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform">
              <FaPlus className="text-green-500 text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Add Event</h3>
              <p className="text-gray-700 mb-4">Create a new community event.</p>
              <Link
                to="/dashboard/admin/events/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 font-medium shadow-sm">
                Add Event
              </Link>
            </div>
            {/* Add News */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform">
              <FaNewspaper className="text-indigo-500 text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Add News</h3>
              <p className="text-gray-700 mb-4">Post community news and updates.</p>
              <Link
                to="/dashboard/admin/news/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-medium shadow-sm">
                Add News
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions / Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* My Profile */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <FaCog className="text-blue-500 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-700 mb-4">Manage your personal information and settings.</p>
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View Profile
            </Link>
          </div>
          {/* Upcoming Events Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <FaCalendarAlt className="text-green-500 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
            <p className="text-gray-700 mb-1">You have {mockDashboardData.upcomingEventsCount} events soon!</p>
            {mockDashboardData.nextEventTitle && (
              <p className="text-sm text-gray-600 mb-4">
                Next: {mockDashboardData.nextEventTitle} on {format(parseISO(mockDashboardData.nextEventDate), 'MMM do, h:mm a')}
              </p>
            )}
            <Link
              to="/events"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Events
            </Link>
          </div>
          {/* Recent Activity / Messages */}
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <FaEnvelope className="text-purple-500 text-4xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Messages</h3>
            <p className="text-gray-700 mb-4">You have {mockDashboardData.unreadMessages} unread message(s).</p>
            <Link
              to="/dashboard/messages"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              Go to Inbox
            </Link>
          </div>
        </div>

        {/* User Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <FaChartLine className="text-indigo-600 mr-3" /> Your Account Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div>
              <p className="mb-2"><strong>Name:</strong> {userName}</p>
              <p className="mb-2"><strong>Email:</strong> {user.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="mb-2"><strong>Member Since:</strong> {memberSinceFormatted}</p>
              <p className="mb-2"><strong>State:</strong> {userState}</p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-8 py-4 border border-transparent rounded-lg shadow-xl text-xl font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 transform hover:scale-105"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
