import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import logo from "../assets/images/WeinfluenceLogo.png";
import { User } from "../context/context";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const user = useContext(User);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = Cookies.get("user");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (isConfirmed) {
        const response = await axios.post(
          `${apiBaseUrl}/user/logout`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          // Clear cookies
          Cookies.remove("auth");
          Cookies.remove("businessOwnerAuth");
          Cookies.remove("profilePicture");
          Cookies.remove("user");

          // Clear context state
          user.setAuth({});
          user.setBusinessOwnerAuth({});
          user.setProfilePicture("");

          // Navigate to login page
          navigate("/login");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success",
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

  const handleNavigation = (href) => {
    if (href.startsWith("#")) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
    closeMenu();
  };

  return (
    <nav className="bg-white  backdrop-blur-sm font-roboto z-50 shadow-md fixed w-full top-0 border-b border-gray-200 lg:h-24 h-20">
      <div className="max-w-[100%] mx-auto px-3 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            className="w-36 h-24 lg:w-48 lg:h-28 lg:ml-16 ml-1 object-contain"
            src={logo}
            alt="weinfluence logo"
          />
        </a>

        {/* Mobile Menu Button and Profile Picture/Login Button */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Profile Picture or Login Button */}
          {user.auth.userDetails || user.businessOwnerAuth.businessOwnerDetails ? (
            <Link to="/profile" className="flex items-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white bg-mainColor hover:bg-hoverColor px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center w-10 h-10 justify-center text-gray-500 rounded-lg focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
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

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 lg:hidden`}
        >
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="block py-2 px-4 text-gray-900 hover:text-mainColor"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="p-4 border-t border-gray-300">
            {user.auth.userDetails ||
            user.businessOwnerAuth.businessOwnerDetails ? (
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : ""}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="text-gray-900 hover:text-mainColor"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          {user.auth.userDetails ||
          user.businessOwnerAuth.businessOwnerDetails ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <img
                  src={user.profilePicture || "default-profile-picture-url"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white bg-mainColor hover:bg-hoverColor px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;