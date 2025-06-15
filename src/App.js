import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaBullhorn, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import communityHeroImage from './images/community-hero.png';
import communityLogo from './images/orioz-logo.png';

// Main Application Component
function App() {
  return (
    // Router should wrap your entire application to enable navigation
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar component */}
        <Navbar />

        {/* Main content area, pushed down by the footer */}
        <main className="flex-grow">
          <Routes>
            {/* The Home page is the default route */}
            <Route path="/" element={<HomePageContent />} />
            {/* Placeholder routes for future pages */}
            <Route path="/register" element={<PlaceholderPage title="Register" />} />
            <Route path="/events" element={<PlaceholderPage title="Events" />} />
            <Route path="/news" element={<PlaceholderPage title="News" />} />
            <Route path="/about" element={<PlaceholderPage title="About Us" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
            <Route path="/login" element={<PlaceholderPage title="Login" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
            <Route path="/support" element={<PlaceholderPage title="Support" />} />
          </Routes>
        </main>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App; 

function HomePageContent() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CallToActionSection />
    </>
  );
}

// Navbar component handles the responsive navigation bar.
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Updated Navbar styling: Gradient background, larger shadow, and text color
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
        {/* Logo/Community Name */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-200 rounded-lg p-2 transition duration-300">
            {/* Logo image, adjust styling as needed for visibility on dark background */}
            <img src={communityLogo} alt="Community Portal Logo" className="h-8 md:h-10 w-auto rounded-md filter invert" /> {/* Added filter invert for potentially white logos */}
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
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
          {/* Login Button - Kept contrasting white with blue text */}
          <Link
            to="/login"
            className="mt-4 md:mt-0 md:ml-6 px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Helper component for navigation links - updated styling for better visibility on dark background
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block py-2 px-4 text-white hover:bg-blue-700 hover:text-white rounded-lg md:inline-block md:mt-0 md:ml-4 font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
  >
    {children}
  </Link>
);

// HeroSection component creates the main impactful hero section with a call to action.
function HeroSection() {
  return (
    <div
      className="relative bg-cover bg-center h-[50vh] md:h-[70vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${communityHeroImage})`, // Use the imported image variable here
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
          Welcome to Our Vibrant Community!
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
          Connect with neighbors, discover local events, and stay updated on what's happening.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-200"
        >
          Join Our Community Today!
        </Link>
      </div>
    </div>
  );
}

// FeatureSection component showcases key features of the application.
function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Discover the Benefits
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Being part of our community opens up a world of possibilities for connection and growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1: Connect with Members */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-5xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Connect with Members</h3>
            <p className="text-gray-600">
              Create your personalized profile, discover common interests, and connect with fellow community members.
            </p>
          </div>

          {/* Feature Card 2: Upcoming Events */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <FaCalendarAlt className="text-5xl text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Upcoming Events</h3>
            <p className="text-gray-600">
              Never miss out! Get real-time updates on community gatherings, workshops, and social events.
            </p>
          </div>

          {/* Feature Card 3: Latest News & Updates */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <FaBullhorn className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Latest News & Updates</h3>
            <p className="text-gray-600">
              Stay informed with the freshest news, important announcements, and community insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CallToActionSection component provides a final call to action for users to register.
function CallToActionSection() {
  return (
    <section className="bg-blue-600 py-16 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Join Your Community Today!
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Connect, engage, and make a difference. Registration is quick, easy, and opens up a world of possibilities.
        </p>
        <Link
          to="/register"
          className="inline-block px-10 py-5 bg-white text-blue-600 text-2xl font-semibold rounded-lg shadow-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 transition duration-300 transform hover:scale-105"
        >
          Get Started Now!
        </Link>
      </div>
    </section>
  );
}

// Footer component provides a standard footer with copyright and links.
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Community Name */}
        <div className="mb-6 md:mb-0">
          <Link to="/" className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition duration-300">
            Community Portal
          </Link>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
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

// Placeholder page for routes not yet implemented
function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-gray-100 text-gray-800">
      <div className="text-center p-8 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold mb-4">{title} Page</h2>
        <p className="text-lg">This page is under construction. Please check back later!</p>
      </div>
    </div>
  );
}