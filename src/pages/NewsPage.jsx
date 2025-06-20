import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaCalendarAlt, FaUserEdit, FaInfoCircle } from 'react-icons/fa';
import { format, parseISO } from 'date-fns'; // For date formatting

function NewsPage() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, you'd fetch from your backend:
        // const response = await fetch('/api/news');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        // --- Mock Data for Demonstration ---
        const mockArticles = [
          {
            id: 'news-1',
            title: 'ORIOZ Inc. Celebrates 20 Years of Community Building',
            summary: 'A look back at two decades of connecting Odias in Australia, from our humble beginnings to a thriving national organization. Join us for upcoming anniversary celebrations!',
            date: '2025-06-15T10:00:00', // Yesterday
            imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            author: 'ORIOZ Editorial Team',
          },
          {
            id: 'news-2',
            title: 'Volunteer Spotlight: Meet Our Dedicated Clean-up Crew',
            summary: 'We highlight the incredible efforts of our volunteers who regularly contribute to the neighbourhood clean-up initiatives. Their dedication makes a real difference!',
            date: '2025-06-10T14:30:00', // A few days ago
            imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            author: 'Community Engagement Team',
          },
          {
            id: 'news-3',
            title: 'New Cultural Workshop Series Announced',
            summary: 'Get ready to dive deep into Odia culture with our new series of workshops. Learn about traditional art, music, and dance. Registration now open!',
            date: '2025-06-01T09:00:00', // Earlier this month
            imageUrl: 'https://images.unsplash.com/photo-1579547621868-b76920155b55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            author: 'Events Coordinator',
          },
          {
            id: 'news-4',
            title: 'Important Notice: Website Maintenance Schedule',
            summary: 'Our website will undergo scheduled maintenance on June 25th from 2 AM to 5 AM AEST. Services may be temporarily unavailable during this period. We apologize for any inconvenience.',
            date: '2025-05-28T11:00:00', // Last month
            imageUrl: '', // Example of an article without an image
            author: 'Webmaster',
          },
        ];

        // Sort articles by date, newest first
        const sortedArticles = mockArticles.sort((a, b) => parseISO(b.date) - parseISO(a.date));

        setNewsArticles(sortedArticles);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading news...</p>
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
            Latest Community News
          </h1>
          <p className="text-xl text-gray-700">
            Stay informed with updates, announcements, and stories from our community.
          </p>
        </div>

        {newsArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-200">
            <FaNewspaper className="text-indigo-400 text-6xl mx-auto mb-6" />
            <p className="text-3xl font-semibold text-gray-700 mb-4">No News Articles Yet</p>
            <p className="text-lg text-gray-600">
              We're working on new content! Please check back soon for the latest updates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
              >
                {article.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3 flex-grow">
                    {article.summary}
                  </p>
                  <div className="mt-auto space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-500" />
                      <span>{format(parseISO(article.date), 'MMMM do, yyyy')}</span>
                    </div>
                    {article.author && (
                      <div className="flex items-center">
                        <FaUserEdit className="mr-2 text-indigo-500" />
                        <span>By {article.author}</span>
                      </div>
                    )}
                  </div>
                  {/* You can make this a Link to a full article page later */}
                  <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                    Read More
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

export default NewsPage;