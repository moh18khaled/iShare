import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const Pricing = () => {
  return (
    <section id="pricing" className="text-white py-16">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl text-black font-bold mb-4">
          Membership Tiers
        </h2>
        <p className="text-gray-500">
          Unlock More Value, Insights, and Opportunities with iShare Community Memberships
        </p>
      </div>

      <div className="w-[90%] mx-auto grid gap-6 md:grid-cols-3">
        {/* Free Tier */}
        <div
          className="bg-gray-700 rounded-lg shadow-lg p-10"
          
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Community Explorer
          </h3>
          <h4 className="text-center text-4xl font-bold text-green-400 mb-6">
            <sup className="text-2xl">$</sup>0
            <span className="text-xl"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Post up to 3 reviews per month</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Access to basic community insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Standard content visibility</span>
            </li>
            <li className="flex items-center opacity-50">
              <FaTimes className="text-red-400 mr-2" />
              <span>Limited AI-powered recommendation</span>
            </li>
            <li className="flex items-center opacity-50">
              <FaTimes className="text-red-400 mr-2" />
              <span>No advanced analytics</span>
            </li>
          </ul>
          <div className="text-center mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Start Free
            </a>
          </div>
        </div>
        {/* Pro Tier */}
        <div
          className="bg-gray-700 rounded-lg shadow-lg p-10"
          
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Experience Pro
          </h3>
          <h4 className="text-center text-5xl font-bold text-green-400 mb-6">
            <sup className="text-2xl">$</sup>9.99
            <span className="text-xl"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Unlimited review submissions</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Advanced community insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Priority content visibility</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Full AI-powered recommendations</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Detailed personal analytics</span>
            </li>
          </ul>
          <div className="text-center mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Start Free
            </a>
          </div>
        </div>
        {/* Enterprise Tier */}
        <div
          className="bg-gray-700 rounded-lg shadow-lg p-10"
          
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Business Insights
          </h3>
          <h4 className="text-center text-4xl font-bold text-green-400 mb-6">
            <sup className="text-2xl">$</sup>49.99
            <span className="text-xl"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Comprehensive market research</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Anonymized consumer behavior data</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Custom demographic insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Competitor analysis reports</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-400 mr-2" />
              <span>Dedicated account manager</span>
            </li>
          </ul>
          <div className="text-center mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Start Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
