import React, { useState } from "react";
import { FaChartBar, FaCube, FaSun, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const TabsComponent = () => {
  const [active, setActive] = useState(1); // State to track active tab

  const tabs = [
    { id: 1, icon: <FaChartBar size={40} />, label: "Optimizing the Businesses' Marketing" },
    { id: 2, icon: <FaCube size={40} />, label: "Increases Loyalty" },
    { id: 3, icon: <FaSun size={40} />, label: "Trust-Building & Word of Mouth" },
    { id: 4, icon: <FaShieldAlt size={40} />, label: "Enhance the Brand Image" },
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each child animation
      },
    },
  };

  // Animation variants for individual tabs
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.1 } }, // Scale up on hover
  };

  return (
    <div className="font-roboto w-[90%] mx-auto mt-16 mb-16">
      <motion.ul
        className="flex flex-col lg:flex-row justify-between gap-6" // Flex column on small screens, row on large screens
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Ensures the animation only happens once
      >
        {tabs.map((tab) => (
          <motion.li
            key={tab.id}
            className={`w-full lg:w-1/4 text-center border border-gray-300 rounded-lg shadow-lg transition-all ${
              active === tab.id ? "border-red-500 shadow-xl" : "hover:shadow-md"
            }`}
            variants={tabVariants}
            whileHover="hover"
            animate={active === tab.id ? "active" : "visible"}
          >
            <a
              href={`#tabs-tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center justify-center gap-4 py-10 px-4 text-xl font-semibold transition-all ${
                active === tab.id
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "text-gray-600 hover:text-red-500"
              }`}
              tabIndex="0" // Ensures focus accessibility
            >
              {tab.icon}
              <span>{tab.label}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default TabsComponent;