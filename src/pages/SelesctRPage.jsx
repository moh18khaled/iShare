import React from 'react';
import { Link } from 'react-router-dom';
import image1 from "../assets/images/select.jfif"
const SelesctRPage = () => {
  return (
    <div className='bg-[#F9F9F9] max-h-screen flex flex-col items-center'>
      <Link
            to="/"
            className="flex items-center justify-center  pt-6 text-3xl font-bold sm:text-4xl text-mainColor"
          >
            iShare
          </Link>
        <h1 className='text-center pt-10 text-2xl sm:text-4xl font-semibold text-gray-700'>Choose Your Role to Register</h1>
        <img className='mt-12 w-[70%] h-[600px] sm:w-[35%] sm:h-[300px] rounded-lg'  src={image1} alt="imge for selection" />
        <div className="flex items-center justify-center h-screen"> 
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Link 
          to="/register" 
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="w-[300px] text-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register as a User
          </span>
        </Link>
        <Link 
          to="/business-owner-register" 
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="w-[300px] text-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register as a Business Owner
          </span>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default SelesctRPage;
