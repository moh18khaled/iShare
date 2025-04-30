import { FiSearch, FiHome } from "react-icons/fi"; // Added FiHome
import { FaPlus, FaBell, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/WeinfluenceLogo.png";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context/context";
import { getNotifications } from "./NotificationsApi";

const Header = ({ searchQuery, onSearch }) => {
  const [notifications,setNotifications] = useState([]);
  const [unReadCount,setUnReadCount] = useState(0);
  const { 
    auth, 
    businessOwnerAuth, 
    profilePicture, 
    markAsRead,
  } = useContext(User);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);
  console.log(notifications.length);
  const handleNotificationClick = () => {
    markAsRead();
  };

  useEffect(() => {
    const unReadCount = notifications.filter(notify => !notify.isRead).length;
    setUnReadCount(unReadCount);
  }, [notifications])
  console.log(unReadCount);

  

  return (
    <>
      {/* Main Header */}
      <nav className="bg-white shadow-sm p-4 fixed w-full top-0 z-20 lg:h-24 h-20">
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

              {auth.userDetails && <Link to="/posts">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiHome className="text-gray-600 text-xl" />
                </button>
              </Link>}

              {/* Notification Icon */}

              {auth.userDetails && <Link to="/notifications" onClick={handleNotificationClick}>
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <FaBell className="text-gray-600 text-xl" />
                  {unReadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unReadCount}
                    </span>
                   )}
                </button>
              </Link>}

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
              ) : ""}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-sm z-10 md:hidden">
        <div className="flex justify-around items-center p-2">
          {/* Home Icon for mobile */}

          {auth.userDetails && <Link to="/posts">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiHome className="text-gray-600 text-xl" />
            </button>
          </Link>}

          {/* Notification Icon */}

          {auth.userDetails && <Link to="/notifications" onClick={handleNotificationClick}>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FaBell className="text-gray-600 text-xl" />
              {unReadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unReadCount}
                </span>
              )}
            </button>
          </Link>}

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
          ) : ""}
        </div>
      </div>
    </>
  );
};

export default Header;