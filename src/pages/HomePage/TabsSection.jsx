import React, { useState } from "react";
import { FaChartBar, FaCube, FaSun, FaShieldAlt } from "react-icons/fa";

const TabsComponent = () => {
  const [active, setActive] = useState(1); // State to track active tab

  const tabs = [
    { id: 1, icon: <FaChartBar size={40} />, label: "Optimizing the Businesses' Marketing" },
    { id: 2, icon: <FaCube size={40} />, label: "Increases Loyalty" },
    { id: 3, icon: <FaSun size={40} />, label: "Trust-Building & Word of Mouth" },
    { id: 4, icon: <FaShieldAlt size={40} />, label: "Enhance the Brand Image" },
  ];

  return (
    <div className="w-[90%] mx-auto mt-16 mb-16">
      <ul className="flex flex-wrap justify-between gap-6" data-aos="fade-up" data-aos-delay="100">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`flex-1 text-center border border-gray-300 rounded-lg shadow-lg transition-all ${
              active === tab.id ? "border-red-500 shadow-xl" : "hover:shadow-md"
            }`}
          >
            <a
              href={`#tabs-tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex items-center justify-center gap-6 py-10 px-4 text-xl font-semibold transition-all ${
                active === tab.id
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "text-gray-600 hover:text-red-500"
              }`}
              tabIndex="0" // Ensures focus accessibility
            >
              {tab.icon}
              <span>{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsComponent;
