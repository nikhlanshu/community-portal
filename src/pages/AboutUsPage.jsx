import React from 'react';
import { FaGlobeAsia, FaUsers, FaHandshake, FaBullseye, FaFlagCheckered, FaBuilding, FaChalkboardTeacher, FaBalanceScale } from 'react-icons/fa'; // Added more relevant icons
import aboutHeroImage from '../images/orioz-logo.png'; // Placeholder for an image representing the community

function AboutUsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center rounded-3xl shadow-xl overflow-hidden h-[40vh] md:h-[50vh] flex items-center justify-center mb-16"
          style={{
            backgroundImage: `url(${aboutHeroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="z-10 text-center text-white p-8">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg animate-fade-in-up">
              About ORIOZ Inc.
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up delay-100">
              Connecting and celebrating the vibrant Odia community across Australia.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <FaBuilding className="text-indigo-600 mr-4" /> Who We Are
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            **ORIOZ Inc.** is a non-profit national umbrella community organisation, established in **2005** and federally registered with **ASIC (Australia Security & Investment Commission)**. We proudly represent residents of Australia living across different states, who originate from, or have strong connections to the state of Odisha in India.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to foster a strong sense of community, cultural preservation, and mutual support among Odias in Australia, while contributing positively to Australia's rich multicultural tapestry.
          </p>
        </section>

        {/* Our Vision */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <FaBullseye className="text-indigo-600 mr-4" /> Our Vision
          </h2>
          <blockquote className="text-xl italic text-gray-800 border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 bg-opacity-50 rounded-r-lg shadow-inner">
            "An engaged, vibrant, united, and inclusive Odia community in Australia, celebrating and preserving rich Odia heritage and cultural identity and wholeheartedly embracing and contributing to the rich diversity of Australia – the land we call home away from home."
          </blockquote>
        </section>

        {/* Our Journey in Australia */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <FaFlagCheckered className="text-indigo-600 mr-4" /> Our Journey in Australia
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Although the migration of Odias to Australia is estimated to have started around 40 years ago, it was only in the late 1990s that there was a noticeable increase in migrants from Odisha. It is noteworthy that most Odia migrants are professionals across various fields, including IT, medicine, engineering, and university faculties, as well as full fee-paying students, hence never dependent on government support.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            With this continuous demographic growth, the idea of creating our own community identity in Australia was floated during 1998-99, led by several Odias living in larger states like NSW and VIC. This idea to formalise a community association was initially challenging due to geographic barriers and limited opportunities to meet and discuss mutual interests.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Around 2002, a group of enthusiastic and determined Odias decided to unite at a federal level to create the necessary critical mass and work towards this dream. This effort culminated in the **first-ever National Odia Sammilani**, hosted in **2003 at Wodonga, VIC**. Approximately 40-50 Odias from across different states congregated at this unique event and agreed to continue it annually, providing a platform for common discussions. This event was a huge success, followed by the second Odia Sammilani in **2004 at Megalong Valley, NSW**, attended by 70 members.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            It was at this second Sammilani, through open voting, that the historic decision was made to formalise our community's identity through a federally registered community association with state chapters. As a direct result, **ORIOZ Inc. was federally registered with ASIC in 2005**.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The organisation is now registered in all states of Australia and recognised by their local Governments as the Association of Odias living in Australia. With over **2000 members** across the country, we are currently recognised as a well-established Indian community in Australia, with Odia even being recognised as a language in the Australian Census.
          </p>
        </section>

        {/* Our Goals */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <FaBullseye className="text-indigo-600 mr-4" /> Our Goals
          </h2>
          <ul className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <li className="flex items-start">
              <FaUsers className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">An active, engaged, and vibrant community:</strong>
                Encourage all Odias living in Australia to become members of ORIOZ Inc., ensuring them to be engaged, connected, and have a sense of belonging to the Odia community.
              </div>
            </li>
            <li className="flex items-start">
              <FaGlobeAsia className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">Maintain our unique Odia identity enriching the diversity of Australian society:</strong>
                Maintain our unique Odia identity with pride and passion, contribute to the multiculturalism of Australia by being cohesive and inclusive, in celebrating, showcasing, and sharing our culture with other community groups; represent at multicultural and social forums across local, state, federal and international levels.
              </div>
            </li>
            <li className="flex items-start">
              <FaHandshake className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">A well-organised accessible community:</strong>
                Position ORIOZ Inc. as the first port of call in Australia for any Odia who is seeking basic information on Australia for pursuing a career and/or settlement purposes, provide support for their social and emotional wellbeing; and facilitate social networks for them to form relationships with individuals, groups, and institutions with common interests.
              </div>
            </li>
            <li className="flex items-start">
              <FaChalkboardTeacher className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">Think and act locally and globally:</strong>
                Let the global Odia community know that ORIOZ Inc. is a collective of citizens active locally and globally, and maintain our linkages to Odisha in a purposeful and meaningful way.
              </div>
            </li>
            <li className="flex items-start">
              <FaBuilding className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">A professional & functional organisational base:</strong>
                ORIOZ Inc. has a professional but inclusive culture, underpinned by both formal and informal robust community engagement processes and practices. Due diligence, and well-developed policy and protocols safeguard the organisation’s credibility and repute amongst its members and stakeholders.
              </div>
            </li>
            <li className="flex items-start">
              <FaUsers className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">Preparing the future generation:</strong>
                ORIOZ Inc. provides a platform for nurturing the young Odias in Australia (next generation born from migrants with links to Odisha) to have access to their cultural roots and grow up as active and proud citizens with a strong sense of self identity.
              </div>
            </li>
            <li className="flex items-start">
              <FaBalanceScale className="text-indigo-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-gray-900 mb-1">Maintain a non-partisan position:</strong>
                ORIOZ Inc. refrains from alignment with any political, religious, and affiliated groups by maintaining a non-partisan neutral position.
              </div>
            </li>
          </ul>
        </section>

        {/* How We Are Organised */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <FaBuilding className="text-indigo-600 mr-4" /> How We Are Organised
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Since **2005**, ORIOZ Inc. has been federally registered with **ASIC (Australia Security & Investment Commission)**. We operate as an Australia-wide umbrella organisation, governed by an elected Federal Executive Committee and State-level Executive Committees.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The members of these Executive Committees are elected by the members of ORIOZ across Australia. The day-to-day governance of the organisation is managed by these Executive Committees, guided by a robust constitution.
          </p>
        </section>

      </div>
    </div>
  );
}

export default AboutUsPage;