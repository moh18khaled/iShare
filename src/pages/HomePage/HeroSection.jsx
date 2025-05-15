import React, { useContext } from 'react';
import backgroundImage from "../../assets/images/hero-bg.jpg";
import { FaPlay } from "react-icons/fa"; // Import the play icon from react-icons
import { motion } from 'framer-motion'; // Import Framer Motion
import { Link } from "react-router-dom"; // Import Link for navigation
import { User } from '../../context/context';

const HeroSection = () => {
  const user = useContext(User); // Access user context

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
        className="font-poppins min-h-screen text-white grid bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Background Overlay */}
        <div className="col-start-1 row-start-1 bg-black bg-opacity-65 md:bg-opacity-55"></div>

        {/* Content */}
        <motion.div
          className="col-start-1 row-start-1 mx-auto my-auto w-full max-w-[1200px] px-4 pt-28 lg:pt-36" // Adjusted padding for navbar height
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.h1
            variants={childVariants}
            className="font-linotte font-bold text-[27px] md:text-4xl text-left leading-snug md:leading-snug" // Align text to the left
          >
            Share your <br />
            digital experience now <br />
            Contribute to empowering the digital <br /> word-of-mouth
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={childVariants}
            className="mt-4 text-xl md:text-2xl text-gray-300 text-left leading-snug" // Align text to the left
          >
            Join weinfluence.com to connect with top experiences and insights across F&B, Fashion,
            <br /> healthcare, and education.
          </motion.p>

          {/* Buttons Container with Padding */}
          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-col items-start gap-8 pb-12" // Added pb-12 for padding after buttons
          >
            {/* Conditionally render "View Posts", "Go to Dashboard", or "Register" button */}
            {user.auth.userDetails ? (
              // If logged in as a regular user, show "View Posts" button
              <Link
                to="/posts"
                className="text-white bg-mainColor hover:bg-hoverColor px-12 py-3 rounded-lg transition-colors"
              >
                View Posts
              </Link>
            ) : user.businessOwnerAuth.businessOwnerDetails ? (
              // If logged in as a business owner, show "Go to Dashboard" button
              <Link
                to="/user/dashboard"
                className="text-white bg-mainColor hover:bg-hoverColor px-8 py-3 rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              // If not logged in, show "Register" button
              <Link
                to="/register"
                className="text-white bg-mainColor hover:bg-hoverColor px-8 py-3 rounded-lg transition-colors"
              >
                Create an account
              </Link>
            )}

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