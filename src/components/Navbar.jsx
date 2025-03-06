import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import logo from "../assets/images/weinfluence.png";
import { User } from "../context/context";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const user = useContext(User);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [profilePicture, setProfilePicture] = useState(""); // State to store the user's profile picture

  // Check if the user is logged in on component mount
  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
      // Fetch the user's profile picture or other details if needed
      // Example: fetchUserDetails(userEmail);
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
        const response = await axios.post(`${apiBaseUrl}/user/logout`, {}, { withCredentials: true });
        if (response.status === 200) {
          Cookies.remove("userEmail");
          setIsLoggedIn(false); // Update the logged-in state
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
    <nav className="bg-[#F9F9F9] font-roboto z-50 shadow-md fixed w-full top-0 border-b border-gray-200 lg:h-32 h-24 overflow-hidden">
      <div className="w-full">
        <div className="max-w-[100%] mx-auto px-3 h-full flex flex-wrap items-center justify-between">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              className="w-36 lg:w-48 lg:h-36 h-28 pl-10 rounded-full object-cover object-center lg:scale-150"
              src={logo}
              alt="weinfluence logo"
            />
          </a>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto`}>
            <ul className="flex flex-col p-4 mt-4 font-medium bg-gray-50 rounded-lg border border-gray-100 lg:space-x-8 lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
              {navLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.href);
                    }}
                    className="block py-2 px-3 text-gray-900 hover:text-mainColor rounded md:p-0"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Buttons */}
            <div className="lg:hidden mt-4 space-y-2">
              {user.auth ? ( // Check if user is logged in
                <>
                  <img
                    src={profilePicture || "default-profile-picture-url"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
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

          {/* Desktop Menu Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user.auth ? ( // Check if user is logged in
              <>
                <img
                  src={profilePicture || "default-profile-picture-url"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
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
      </div>
    </nav>
  );
};

export default Navbar;