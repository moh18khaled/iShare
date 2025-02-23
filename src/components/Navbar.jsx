import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from 'sweetalert2'
import logo from "../assets/images/weinfluence.png"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const userEmail = Cookies.get("userEmail");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      });

      if (isConfirmed) {
        const response = await axios.post(`${apiBaseUrl}/user/logout`, {}, { withCredentials: true });
        if (response.status === 200) {
          Cookies.remove("userEmail");
          navigate("/login");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success"
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.response?.data?.error || "An error occurred during logout",
      });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "#hero", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#services", text: "Services" },
    { href: "#users-experience", text: "Users Experience" },
    { href: "#team", text: "Team" },
    { href: "#contact", text: "Contact" },
    { href: "/posts", text: "Posts" },
  ];

  return (
    <nav className="bg-[#F9F9F9] font-roboto z-50 shadow-md fixed w-full top-0 border-b border-gray-200 lg:h-32 h-24">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 h-full">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img className="w-32 lg:w-36 lg:h-32 h-28 rounded-full text-lg font-bold" src={logo} alt="weinfluence logo"/>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Navigation Content */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto`}>
          <ul className="flex flex-col p-4 mt-4 font-medium bg-gray-50 rounded-lg border border-gray-100 lg:space-x-8 lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons - Mobile */}
          <div className="lg:hidden mt-4 space-y-2">
            {userEmail ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="w-full block text-center text-white bg-mainColor hover:bg-red-600 py-2 px-4 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full block text-center text-white bg-mainColor hover:bg-hoverColor py-2 px-4 rounded-lg"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full block text-center text-white bg-mainColor hover:bg-hoverColor py-2 px-4 rounded-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {userEmail ? (
            <>
              <Link
                to="/profile"
                className="text-white bg-mainColor hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-white bg-mainColor hover:bg-hoverColor px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white bg-mainColor hover:bg-hoverColor px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;