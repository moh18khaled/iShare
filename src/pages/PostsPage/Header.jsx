import { FiSearch, FiBell, FiCreditCard, FiUser } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/WeinfluenceLogo.png";
import { useContext } from "react";
import { User } from "../../context/context";

const Header = ({ searchQuery, onSearch }) => {
  const user = useContext(User);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query); // Call the onSearch function passed from the parent
  };

  return (
    <>
      {/* Main Header */}
      <nav className="bg-white shadow-sm p-4 fixed w-full top-0 z-10 lg:h-24 h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
            <img
            className="w-36 h-24 lg:w-48 lg:h-28 lg:ml-16 ml-1 object-contain"
            src={logo}
            alt="weinfluence logo"
          />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="text-gray-400 cursor-pointer" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-mainColor focus:ring-1 focus:ring-mainColor"
            />
          </div>

          {/* Icons Section */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 md:space-x-10">
              {/* Create Post Icon */}
              {user.businessOwnerAuth.businessOwnerDetails ? "" : (
                <Link to="/create-post">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaPlus className="text-gray-600 text-xl" />
                  </button>
                </Link>
              )}

              {/* User Account Icon */}
              {user.profilePicture ? (
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <img src={user.profilePicture} className="w-10 h-10 rounded-full" />
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-sm z-10 md:hidden">
        <div className="flex justify-around items-center p-2">
          {/* Create Post Icon */}
          {user.businessOwnerAuth.businessOwnerDetails ? "" : (
            <Link to="/create-post">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaPlus className="text-gray-600 text-xl" />
              </button>
            </Link>
          )}

          {/* User Account Icon */}
          {user.profilePicture ? (
            <Link to="/profile">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <img src={user.profilePicture} className="w-10 h-10 rounded-full" />
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Header;