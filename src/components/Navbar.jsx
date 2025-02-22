import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const userEmail = Cookies.get("userEmail");
  console.log(userEmail);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [handleError,setHandleError] = useState("");

  const handleLogout = async() => {
   try {
    await axios.post(`${apiBaseUrl}/user/logout`,{},{withCredentials : true});
    if (response.status === 200) {
      Swal.fire({
        title: "Are you sure to delete your account?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(
            Cookies.remove("userEmail"),
            navigate("/login")
          );
        }
      });
    }
   } catch (error) {
    console.log(error);
    setHandleError(error.response.data.error);
    Swal.fire({
      icon: "error",
      title: "Failed to Logout",
      text: `${handleError}`,
    });
   }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-[#F9F9F9] font-roboto z-50 shadow-md fixed w-full top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-4xl text-mainColor font-bold whitespace-nowrap">weinfluence</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navbar Links and Mobile Menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#F9F9F9]">
              <li>
                <a
                  href="#hero"
                  className="block py-2 px-3 text-mainColor hover:text-mainColor rounded md:bg-transparent md:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#users-experience"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  Users Experience
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/posts"
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  Posts
                </Link>
              </li>
            </ul>

            {/* Auth Buttons for Mobile Menu */}
            <div className="md:hidden mt-4">
              {!userEmail ? (
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/register-select"
                    type="button"
                    className="text-white bg-mainColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    type="button"
                    className="text-white bg-mainColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/profile"
                    type="button"
                    className="text-white bg-mainColor hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Profile
                  </Link>
                  

                  <Link
                    to="/"
                    onClick={handleLogout}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons for Larger Screens */}
          <div className="hidden md:flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!userEmail ? (
              <div className="flex space-x-4">
                  <Link
              to="/all/posts"
              type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Posts
                  </Link>
                <Link
                  to="/register-select"
                  type="button"
                  className="text-white bg-mainColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  type="button"
                  className="text-white bg-mainColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/profile"
                  type="button"
                  className="text-white bg-mainColor hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Profile
                </Link>
                <Link
              to="/all/posts"
              type="button"
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Posts
                  </Link>
                <Link
                  to="/"
                  onClick={handleLogout}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
