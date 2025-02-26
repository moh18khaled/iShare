import React from 'react';
import backgroundImage from "../../assets/images/re.jpg";
import { FaPlay } from "react-icons/fa"; // Import the play icon from react-icons
import { motion } from 'framer-motion'; // Import Framer Motion

const HeroSection = () => {
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

  // Animation variants for individual children
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div>
      <div 
        id='hero' 
        className="font-poppins min-h-screen text-white mt-16 grid bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Background Overlay */}
        <div className="col-start-1 row-start-1 bg-black bg-opacity-50"></div>

        {/* Content */}
        <motion.div
          className="col-start-1 row-start-1 mx-auto my-auto w-[80%]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.h1
            variants={childVariants}
            className="font-bold text-3xl md:text-5xl text-center md:text-left leading-snug md:leading-snug"
          >
            Share your <br />
            digital experience now <br />
            Contribute to empowering the digital <br /> word-of-mouth
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={childVariants}
            className="mt-4 text-xl md:text-2xl text-gray-300 text-center md:text-left leading-snug"
          >
            Join iShare.com to connect with top experiences and insights across F&B, Fashion,
            <br /> healthcare, and education.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-col md:flex-row items-center gap-12"
          >
            {/* Create Account Button */}
            <button className="bg-mainColor hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Create an Account
            </button>

            {/* Watch Video Button */}
            <button className="flex items-center text-white hover:text-mainColor transition duration-300">
              <FaPlay className="w-6 h-6 mr-2 text-mainColor" /> {/* Play Icon */}
              watch the video to learn how to make money
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;