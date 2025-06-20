import React from 'react';
import { FaFileContract, FaCalendarCheck } from 'react-icons/fa'; // Icons for contract and date

function TermsOfServicePage() {
  const lastUpdated = "June 16, 2025"; // Current date

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
        <div className="text-center mb-10">
          <FaFileContract className="text-indigo-600 text-6xl mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 drop-shadow-lg">
            Terms of Service
          </h1>
          <p className="text-md text-gray-600 flex items-center justify-center">
            <FaCalendarCheck className="mr-2" /> Last Updated: {lastUpdated}
          </p>
        </div>

        <section className="prose prose-indigo max-w-none text-gray-700">
          <p className="mb-4">
            Welcome to ORIOZ Inc.! These Terms of Service ("Terms") govern your access to and use of the ORIOZ Inc. website, services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Service.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By creating an account, accessing, or using the Service, you confirm your acceptance of these Terms and any amendments thereto. You represent that you are at least the age of majority in your jurisdiction of residence, or that you are the age of majority in your jurisdiction of residence and you have given us your consent to allow any of your minor dependents to use this site.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">2. User Accounts</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>You may need to register for an account to access certain features of the Service.</li>
            <li>You are responsible for maintaining the confidentiality of your account password and are responsible for all activities that occur under your account.</li>
            <li>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
            <li>We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, false, or incomplete.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">3. User Conduct and Prohibited Activities</h2>
          <p className="mb-4">
            You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms. Prohibited activities include, but are not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Engaging in any conduct that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
            <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
            <li>Uploading, posting, emailing, transmitting, or otherwise making available any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
            <li>Interfering with or disrupting the Service or servers or networks connected to the Service.</li>
            <li>Attempting to gain unauthorized access to any portion or feature of the Service, or any other systems or networks connected to the Service.</li>
            <li>Using any automated system, including without limitation "robots," "spiders," or "offline readers," to access the Service in a manner that sends more request messages to the ORIOZ Inc. servers in a given period than a human can reasonably produce in the same period by using a conventional web browser.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">4. Content Ownership and User Content</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>You retain ownership of any content you submit, post, or display on or through the Service.</li>
            <li>By submitting, posting, or displaying content, you grant ORIOZ Inc. a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods (now known or later developed).</li>
            <li>You are solely responsible for the content you create, transmit, or display while using the Service.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">5. Disclaimers</h2>
          <p className="mb-4">
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. ORIOZ Inc. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">6. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall ORIOZ Inc. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service, even if ORIOZ Inc. or a ORIOZ Inc. authorised representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">7. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify, defend, and hold harmless ORIOZ Inc., its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities, and expenses (including reasonable legal fees) relating to or arising out of your use of or inability to use the Service, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">8. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">9. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of Queensland, Australia, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">10. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice before any new terms take effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">11. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at <a href="mailto:oriozcommunity@gmail.com" className="text-indigo-600 hover:underline">oriozcommunity@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfServicePage;