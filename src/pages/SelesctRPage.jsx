import React from 'react';
import { Link } from 'react-router-dom';
import image1 from "../assets/images/ownership.png";
import image2 from "../assets/images/working.png";
import logo from "../assets/images/weinfluence.png";
const SelectRPage = () => {
  return (
    <div className='bg-[#F9F9F9] min-h-screen flex flex-col items-center'>
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center justify-center pt-4 text-3xl font-bold sm:text-4xl text-mainColor"
      >
        <img className='w-56 h-48' src={logo} alt="weinfluence logo" />
      </Link>

      {/* Heading */}
      <h1 className='text-center text-2xl sm:text-4xl font-semibold text-gray-700'>
        Choose Your Role to Register
      </h1>

      {/* Container for Image-Button Pairs */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-12 w-full sm:space-x-16 space-y-6 sm:space-y-0">
        {/* First Image and Button */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <img 
            className='w-[70%] sm:w-[30%] rounded-lg' 
            src={image2} 
            alt="Selection illustration 1" 
          />
          <Link 
            to="/user-register" 
            className="mt-6 sm:mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-red-500 group-hover:from-red-700 group-hover:to-red-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 w-[80%] sm:w-[300px] text-center"
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-mainColor rounded-md group-hover:bg-opacity-0">
              Register as a User
            </span>
          </Link>
        </div>

        {/* Second Image and Button */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <img 
            className='w-[70%] sm:w-[32%] rounded-lg' 
            src={image1} 
            alt="Selection illustration 2" 
          />
          <Link 
            to="/business-owner-register" 
            className="mt-6 sm:mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-red-500 group-hover:from-red-700 group-hover:to-red-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 w-[80%] sm:w-[300px] text-center"
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-mainColor rounded-md group-hover:bg-opacity-0">
              Register as a Business Owner
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectRPage;