import React from "react";
import { FaCheckDouble } from "react-icons/fa"; // For check2-all icon
import { BsArrowRightShort } from "react-icons/bs"; // For arrow-right-short icon
import { motion } from "framer-motion"; // Import Framer Motion

const DigitalExperience = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Delay between each child animation
      },
    },
  };

  // Animation variants for the left content
  const leftContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the right image
  const rightImageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="tab-content mt-12 font-roboto">
      <div className="tab-pane fade active show w-[90%] mx-auto" id="tabs-tab-1">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} // Ensures the animation only happens once
        >
          {/* Left Content */}
          <motion.div
            className="order-2 lg:order-1 mt-3 lg:mt-0 space-y-6"
            variants={leftContentVariants}
          >
            <div className="section-header">
              <h2 className="mb-6 text-2xl lg:text-5xl font-bold">Revolutionizing Digital Experiences</h2>
              <p className="text-lg text-gray-500 mb-4">
                iShare: Your One-Stop Platform for Authentic, AI-Powered Insights
              </p>
            </div>

            {/* Feature List */}
            <div className="feature-list">
              <motion.div
                className="feature-item mb-3 flex items-center"
                variants={leftContentVariants}
              >
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Save Time and Money: Avoid Unsuitable Products and Services</span>
              </motion.div>
              <motion.div
                className="feature-item mb-3 flex items-center"
                variants={leftContentVariants}
              >
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Enhance Decision-Making with Verified Insights</span>
              </motion.div>
              <motion.div
                className="feature-item mb-3 flex items-center"
                variants={leftContentVariants}
              >
                <span className="bg-mainColor text-white p-2 rounded-full mr-3">
                  <FaCheckDouble size={20} />
                </span>
                <span>Monetize Your Experiences: Earn from Valuable Sharing Experiences</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              className="description mt-4"
              variants={leftContentVariants}
            >
              <h4 className="mb-3 text-2xl font-semibold">AI-Powered Insights Platform</h4>
              <p className="text-gray-500">
                Leverage our comprehensive dashboard designed for businesses and SMEs. Our AI-driven platform delivers:
              </p>
              <ul className="list-none text-gray-500 mt-3">
                <motion.li
                  className="mb-2 flex items-center"
                  variants={leftContentVariants}
                >
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Personalized recommendations based on user behavior and preferences
                </motion.li>
                <motion.li
                  className="mb-2 flex items-center"
                  variants={leftContentVariants}
                >
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Advanced review authenticity filtering
                </motion.li>
                <motion.li
                  className="mb-2 flex items-center"
                  variants={leftContentVariants}
                >
                  <BsArrowRightShort className="text-mainColor mr-2" size={20} />
                  Anonymized consumer behavior insights
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="order-1 w-[100%] md:w-[80%] lg:order-2 text-center"
            variants={rightImageVariants}
          >
            <img
              src="https://i.postimg.cc/rw1r5NZ9/working-1.jpg"
              alt="iShare Platform Insights"
              className="w-full mx-auto h-[500px] rounded-xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DigitalExperience;