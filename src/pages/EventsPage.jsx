import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import { format, isFuture, parseISO } from 'date-fns'; // For date formatting and checking future dates

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, you'd fetch from your backend:
        // const response = await fetch('/api/events/upcoming');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        // --- Mock Data for Demonstration ---
        const mockEvents = [
          {
            id: 'event-1',
            title: 'Community Fun Day - Aspley Park',
            description: 'Join us for a day of family fun, games, food stalls, and live music at Aspley Park! All welcome.',
            date: '2025-07-20T10:00:00', // Example: July 20, 2025, 10:00 AM
            location: 'Aspley Park, 123 Park Rd, Aspley QLD 4034',
            imageUrl: 'https://images.unsplash.com/photo-1549427909-fd48ef9a0f5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          },
          {
            id: 'event-2',
            title: 'Monthly Neighbourhood Clean-up',
            description: 'Help keep our neighbourhood tidy! Gloves and bags provided. Meet at the community hall.',
            date: '2025-08-05T09:00:00', // Example: August 5, 2025, 9:00 AM
            location: 'Aspley Community Hall, 456 Hall St, Aspley QLD 4034',
            imageUrl: 'https://images.unsplash.com/photo-1574626156108-62a26569ec13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
          {
            id: 'event-3',
            title: 'Local Art Exhibition Opening',
            description: 'Discover local talent at our inaugural art exhibition. Refreshments will be served.',
            date: '2025-09-10T18:30:00', // Example: September 10, 2025, 6:30 PM
            location: 'Aspley Gallery & Studio, 789 Art Ave, Aspley QLD 4034',
            imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7dee5b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
          // Past event (should not show up)
          {
            id: 'event-past',
            title: 'Past Event Example',
            description: 'This event happened in the past and should not be displayed.',
            date: '2024-01-01T10:00:00',
            location: 'Somewhere',
            imageUrl: '',
          },
        ];

        // Filter for upcoming events based on the current date and time
        const now = new Date();
        const upcomingEvents = mockEvents
          .filter(event => isFuture(parseISO(event.date)))
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

        setEvents(upcomingEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-700">
        <FaInfoCircle className="text-4xl mr-4" />
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
            Upcoming Community Events
          </h1>
          <p className="text-xl text-gray-700">
            Discover what's happening next in our vibrant community!
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-200">
            <FaCalendarAlt className="text-indigo-400 text-6xl mx-auto mb-6" />
            <p className="text-3xl font-semibold text-gray-700 mb-4">No Upcoming Events</p>
            <p className="text-lg text-gray-600">
              Check back soon! We're always planning exciting new activities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
              >
                {event.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3 flex-grow">
                    {event.description}
                  </p>
                  <div className="mt-auto space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-500" />
                      <span>{format(parseISO(event.date), 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-indigo-500" />
                      <span>{format(parseISO(event.date), 'h:mm a')} AEST</span> {/* Assuming AEST */}
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mr-2 text-indigo-500 mt-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;