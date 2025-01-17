import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const handleLogout = ()=>{
    window.localStorage.removeItem("email");
    window.location.pathname = "/";
  }
  return (
    <div>
      <nav className="bg-[#F9F9F9] z-50 shadow-md fixed w-full top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-4xl text-mainColor font-bold whitespace-nowrap">iShare</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!window.localStorage.getItem("email") ?
            <div className="flex space-x-4">
            <Link to="/register-select" type='button' className="text-white bg-mainColor hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Register
            </Link>
            <Link to="/login" type='button' className="text-white bg-mainColor hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Login
            </Link>
            </div>
            :
            <div className="flex space-x-4">
            <Link to="/" type='button' className="text-white bg-mainColor hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Profile
            </Link>
            <Link to="/" onClick={handleLogout} type='button' className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Logout
            </Link>
            </div> }
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8 md:order-1" id="navbar-sticky">
            <ul className="flex space-x-6 font-medium">
              <li>
                <a
                  href="#"
                  className="text-mainColor hover:text-mainColor py-2 px-3">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-mainColor py-2 px-3">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-mainColor py-2 px-3">
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-mainColor py-2 px-3">
                  Users Experience
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-mainColor py-2 px-3">
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-mainColor py-2 px-3">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
