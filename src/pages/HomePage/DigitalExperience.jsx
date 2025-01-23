import React from "react";
import { FaCheckDouble } from "react-icons/fa"; // For check2-all icon
import { BsArrowRightShort } from "react-icons/bs"; // For arrow-right-short icon

const TabContent = () => {
  return (
    <div
      className="tab-content mt-12"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="tab-pane fade active show w-[90%] mx-auto" id="tabs-tab-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 mt-3 lg:mt-0 space-y-6">
            <div className="section-header">
              <h2 className="mb-6 text-2xl lg:text-5xl font-bold">Revolutionizing Digital Experiences</h2>
              <p className="text-lg text-gray-500 mb-4">
                iShare: Your One-Stop Platform for Authentic, AI-Powered Insights
              </p>
            </div>

            {/* Feature List */}
            <div className="feature-list">
              <div className="feature-item mb-3 flex items-center">
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Save Time and Money: Avoid Unsuitable Products and Services</span>
              </div>
              <div className="feature-item mb-3 flex items-center">
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Enhance Decision-Making with Verified Insights</span>
              </div>
              <div className="feature-item mb-3 flex items-center">
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Monetize Your Experiences: Earn from Valuable Sharing Experiences</span>
              </div>
            </div>

            {/* Description */}
            <div className="description mt-4">
              <h4 className="mb-3 text-2xl font-semibold">AI-Powered Insights Platform</h4>
              <p className="text-gray-500">
                Leverage our comprehensive dashboard designed for businesses and SMEs. Our AI-driven platform delivers:
              </p>
              <ul className="list-none text-gray-500 mt-3">
                <li className="mb-2 flex items-center">
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Personalized recommendations based on user behavior and preferences
                </li>
                <li className="mb-2 flex items-center">
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Advanced review authenticity filtering
                </li>
                <li className="mb-2 flex items-center">
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Anonymized consumer behavior insights
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 text-center">
            <img
              src="https://i.postimg.cc/rw1r5NZ9/working-1.jpg"
              alt="iShare Platform Insights"
              className="w-[80%] mx-auto h-[500px] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;
