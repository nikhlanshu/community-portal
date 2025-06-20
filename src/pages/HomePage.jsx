import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaBullhorn } from 'react-icons/fa';
import communityHeroImage from '../images/community-hero.png'; // Adjusted path for image

// Home Page Component
function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CallToActionSection />
    </>
  );
}

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

export default HomePage;