import { FiSearch, FiHome } from "react-icons/fi"; // Added FiHome
import { FaPlus, FaBell, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/WeinfluenceLogo.png";
import { useContext } from "react";
import { User } from "../../context/context";

const Header = ({ searchQuery, onSearch }) => {
  const { 
    auth, 
    businessOwnerAuth, 
    profilePicture, 
    unreadCount,
    markAsRead,
    walletBalance
  } = useContext(User);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const handleNotificationClick = () => {
    markAsRead();
  };

  const formattedBalance = walletBalance !== undefined 
    ? `$${walletBalance.toFixed(2)}` 
    : "$0.00";

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
              {/* Home Icon */}
              <Link to="/posts">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiHome className="text-gray-600 text-xl" />
                </button>
              </Link>

              {/* Wallet Balance */}
              <Link to="/wallet">
                <button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                  <FaWallet className="text-gray-600 text-xl mr-2" />
                  <span className="text-gray-700 font-medium">
                    {formattedBalance}
                  </span>
                </button>
              </Link>

              {/* Notification Icon */}
              <Link to="/notifications" onClick={handleNotificationClick}>
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <FaBell className="text-gray-600 text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Create Post Icon */}
              {businessOwnerAuth.businessOwnerDetails ? "" : (
                <Link to="/create-post">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaPlus className="text-gray-600 text-xl" />
                  </button>
                </Link>
              )}

              {/* User Account Icon */}
              {profilePicture ? (
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <img 
                      src={profilePicture} 
                      className="w-10 h-10 rounded-full" 
                      alt="Profile" 
                    />
                  </button>
                </Link>
              ) : (
                <Link to="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-lg">
                        {auth.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-sm z-10 md:hidden">
        <div className="flex justify-around items-center p-2">
          {/* Home Icon for mobile */}
          <Link to="/posts">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiHome className="text-gray-600 text-xl" />
            </button>
          </Link>

          {/* Wallet Icon for mobile */}
          <Link to="/wallet">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaWallet className="text-gray-600 text-xl" />
            </button>
          </Link>

          {/* Notification Icon */}
          <Link to="/notifications" onClick={handleNotificationClick}>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FaBell className="text-gray-600 text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </Link>

          {/* Create Post Icon */}
          {businessOwnerAuth.businessOwnerDetails ? "" : (
            <Link to="/create-post">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaPlus className="text-gray-600 text-xl" />
              </button>
            </Link>
          )}

          {/* User Account Icon */}
          {profilePicture ? (
            <Link to="/profile">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <img 
                  src={profilePicture} 
                  className="w-10 h-10 rounded-full" 
                  alt="Profile" 
                />
              </button>
            </Link>
          ) : (
            <Link to="/profile">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-lg">
                    {auth.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;