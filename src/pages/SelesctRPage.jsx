import React from 'react';
import { Link } from 'react-router-dom';
import image1 from "../assets/images/ownership.png";
import image2 from "../assets/images/working.png";

const SelectRPage = () => {
  return (
    <div className='bg-[#F9F9F9] min-h-screen flex flex-col items-center'>
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center justify-center pt-6 text-3xl font-bold sm:text-4xl text-mainColor"
      >
        iShare
      </Link>

      {/* Heading */}
      <h1 className='text-center pt-10 text-2xl sm:text-4xl font-semibold text-gray-700'>
        Choose Your Role to Register
      </h1>

      {/* Images Side by Side */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-12 space-y-6 sm:space-y-0 sm:space-x-16">
        <img 
          className='w-[70%] sm:w-[30%] rounded-lg' 
          src={image2} 
          alt="Selection illustration 1" 
        />
        <img 
          className='w-[70%] sm:w-[32%] rounded-lg' 
          src={image1} 
          alt="Selection illustration 2" 
        />
      </div>

      {/* Selection Buttons (Side by Side on Larger Screens) */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
        {/* Register as a User (Moved further to the left) */}
        <Link 
          to="/register" 
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-[300px] text-center sm:mr-8 sm:translate-x-[-20px]"
        >
          <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register as a User
          </span>
        </Link>

        {/* Register as a Business Owner */}
        <Link 
          to="/business-owner-register" 
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-[300px] text-center"
        >
          <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register as a Business Owner
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SelectRPage;
