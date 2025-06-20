import React, { useState } from 'react';
import { FaHeadset, FaQuestionCircle, FaEnvelope } from 'react-icons/fa'; // Icons for support, FAQ, email, external link
import { Link } from 'react-router-dom'; // For internal navigation

function SupportPage() {
  // State to manage FAQ accordion
  const [openFAQ, setOpenFAQ] = useState(null); // Stores the index of the open FAQ item

  const faqs = [
    {
      question: 'How do I become a member of ORIOZ Inc.?',
      answer: (
        <>
          You can become a member by visiting our <Link to="/register" className="text-indigo-600 hover:underline font-semibold">Register Page</Link> and filling out the membership application form.
          We welcome all residents of Australia who originate from, or have connections to the state of Odisha in India.
        </>
      ),
    },
    {
      question: 'Where can I find information about upcoming events?',
      answer: (
        <>
          All our upcoming community events are listed on the <Link to="/events" className="text-indigo-600 hover:underline font-semibold">Events Page</Link>.
          Make sure to check it regularly for new additions!
        </>
      ),
    },
    {
      question: 'How can I volunteer for ORIOZ Inc. activities?',
      answer: (
        <>
          We greatly appreciate volunteer support! Please reach out to us via the{' '}
          <Link to="/contact" className="text-indigo-600 hover:underline font-semibold">Contact Us Page</Link> with your interest and availability.
          Our team will get back to you with available opportunities.
        </>
      ),
    },
    {
      question: 'Is ORIOZ Inc. a registered organization?',
      answer: (
        <>
          Yes, ORIOZ Inc. is a non-profit national umbrella community organisation established in 2005 and registered federally with ASIC (Australia Security & Investment Commission).
          You can learn more on our <Link to="/about" className="text-indigo-600 hover:underline font-semibold">About Us Page</Link>.
        </>
      ),
    },
    {
      question: 'What is the privacy policy regarding my data?',
      answer: (
        <>
          Your privacy is important to us. You can review our full Privacy Policy on the{' '}
          <Link to="/privacy" className="text-indigo-600 hover:underline font-semibold">Privacy Policy Page</Link> for detailed information on how we collect, use, and protect your data.
        </>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
        <div className="text-center mb-10">
          <FaHeadset className="text-indigo-600 text-6xl mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 drop-shadow-lg">
            Support
          </h1>
          <p className="text-lg text-gray-700">
            How can we help you today? Find answers to common questions or reach out to us.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <FaQuestionCircle className="text-indigo-600 mr-3" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left text-lg font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div
                  className={`px-5 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="text-center bg-indigo-50 rounded-lg p-8 shadow-inner border border-indigo-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            If you can't find what you're looking for, please don't hesitate to reach out to us directly.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
          >
            <FaEnvelope className="mr-3 text-xl" /> Contact Our Team
          </Link>
          {/* Optional: Add link to an external community forum if available */}
          {/*
          <p className="mt-6 text-gray-600">
            Or visit our community forum: {' '}
            <a href="[Your Forum URL]" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-semibold">
              ORIOZ Forum <FaExternalLinkAlt className="inline-block ml-1 text-sm" />
            </a>
          </p>
          */}
        </section>
      </div>
    </div>
  );
}

export default SupportPage;