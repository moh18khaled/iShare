import React from 'react';
import { FaSmile, FaBook, FaHeadset, FaUsers } from "react-icons/fa"; // Import React Icons
import { motion } from 'framer-motion'; // Import Framer Motion

const StatsSection = () => {
  const stats = [
    { icon: <FaSmile className="text-4xl text-mainColor mb-2" />, end: 500, title: "Happy Clients" },
    { icon: <FaBook className="text-4xl text-mainColor mb-2" />, end: 200, title: "Businesses and SMEs" },
    { icon: <FaHeadset className="text-4xl text-mainColor mb-2" />, end: 1463, title: "Hours Of Support" },
    { icon: <FaUsers className="text-4xl text-mainColor mb-2" />, end: 15, title: "Hard Workers" },
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

  // Animation variants for individual stat cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="stats" className="font-poppins mt-20 stats section py-10">
      <div className="w-[90%] mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} // Ensures the animation only happens once
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-4 h-48"
              variants={cardVariants}
            >
              {/* Icon Container */}
              <div className="bg-white shadow-lg w-[50px] h-[50px] mx-auto rounded-[50%] -mt-10 mb-8 flex justify-center items-center">
                {stat.icon}
              </div>

              {/* Stat Content */}
              <div className="stats-item flex flex-col justify-center items-center">
                <span className="text-3xl font-extrabold text-gray-800">
                  {stat.end}
                </span>
                <p className="text-gray-600 mt-2 text-base">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;