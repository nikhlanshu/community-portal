import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    // In a real application, you would send this data to your backend
    // Example:
    // try {
    //   const response = await fetch('/api/contact', { // Replace with your actual API endpoint
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setIsSubmitted(true);
    //     setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    //   } else {
    //     setError('Failed to send message. Please try again later.');
    //   }
    // } catch (err) {
    //   setError('An unexpected error occurred. Please try again later.');
    // }

    // For demonstration purposes:
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form for demo
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
            Let's Connect!
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Whether you have a question, feedback, or just want to say hello, we're here to help.
            Reach out to us using the form below or our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">

          {/* Contact Form Section */}
          <div className="lg:pr-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 pb-4 border-b-2 border-indigo-200">Send Us a Message</h2>
            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline ml-2">Your message has been sent. We'll get back to you shortly.</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder="Nikhlanshu Jena"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder="Nikhlanshu.Jena@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder="Inquiry about..."
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-xl text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="mt-12 lg:mt-0 lg:pl-8 border-t-2 pt-12 lg:border-t-0 lg:border-l-2 border-gray-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 pb-4 border-b-2 border-indigo-200">Our Details</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 text-3xl text-indigo-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">Email Us</h3>
                  <p className="mt-1 text-xl text-gray-600">
                    <a href="mailto:oriozcommunity@gmail.com" className="hover:text-indigo-600 transition duration-300">oriozcommunity@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="flex-shrink-0 text-3xl text-indigo-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="mt-1 text-xl text-gray-600">
                    <strong className="text-gray-800">NSW:</strong> <a href="tel:0450237078" className="hover:text-indigo-600 transition duration-300">0450 237 078</a><br />
                    <strong className="text-gray-800">QLD:</strong> <a href="tel:0478153385" className="hover:text-indigo-600 transition duration-300">0478 153 385</a><br />
                    <strong className="text-gray-800">WA:</strong> <a href="tel:0405202516" className="hover:text-indigo-600 transition duration-300">0405 202 516</a><br />
                    <strong className="text-gray-800">VIC:</strong> <a href="tel:0401159511" className="hover:text-indigo-600 transition duration-300">0401 159 511</a><br />
                    <strong className="text-gray-800">ACT:</strong> <a href="tel:0428208525" className="hover:text-indigo-600 transition duration-300">0428 208 525</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 text-3xl text-indigo-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">Our Location</h3>
                  <p className="mt-1 text-xl text-gray-600">
                    123 Community Way,<br />
                    Aspley, QLD 4034,<br />
                    Australia
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaClock className="flex-shrink-0 text-3xl text-indigo-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">Operating Hours</h3>
                  <p className="mt-1 text-xl text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM AEST<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Social Media Links for Contact */}
              <div className="pt-8 border-t-2 border-indigo-200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <a href="https://www.facebook.com/ORIOZCommunity/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                    <FaFacebook className="text-4xl" />
                  </a>
                  <a href="https://www.instagram.com/o_r_i_o_z/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                    <FaInstagram className="text-4xl" />
                  </a>
                  <a href="https://www.youtube.com/user/Oriozcommunity/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                    <FaYoutube className="text-4xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;