import { FiSearch, FiHome, FiChevronDown } from "react-icons/fi";
import { FaPlus, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/WeinfluenceLogo.png";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context/context";
import { getNotifications } from "./NotificationsApi";

const Header = ({ searchQuery, onSearch, onBrandSelect }) => {
  const [notifications, setNotifications] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { 
    auth, 
    businessOwnerAuth, 
    profilePicture, 
    markAsRead,
  } = useContext(User);

  const brands = [
    "بشمينة",
    "ilNilo Cafe",
    "Beesline - بزلين",
    "Hbshop",
    "Cosmopolitan WWE - Work and Travel",
    "Defacto",
    "PESTLO",
    "هُنّ",
    "TBS",
    "Bosporus Restaurant"
  ];

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const handleBrandSelect = (brand) => {
    setIsDropdownOpen(false);
    onBrandSelect(brand);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = () => {
    markAsRead();
  };

  useEffect(() => {
    const unReadCount = notifications.filter(notify => !notify.isRead).length;
    setUnReadCount(unReadCount);
  }, [notifications]);

  return (
    <>
      <nav className="bg-white shadow-sm p-4 fixed w-full top-0 z-20 lg:h-24 h-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <Link to="/">
            <div className="flex items-center">
              <img
                className="w-36 h-24 lg:w-48 lg:h-28 lg:ml-16 ml-1 object-contain"
                src={logo}
                alt="weinfluence logo"
              />
            </div>
          </Link>

          <div className="flex-1 max-w-xl mx-4 flex items-center">
            <div className="relative mr-4">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span>Brands</span>
                <FiChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-30 max-h-96 overflow-y-auto">
                  {brands.map((brand, index) => (
                    <div 
                      key={index}
                      onClick={() => handleBrandSelect(brand)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 relative">
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
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4 md:space-x-10">
              {auth.userDetails && <Link to="/posts">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiHome className="text-gray-600 text-xl" />
                </button>
              </Link>}

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

              {businessOwnerAuth.businessOwnerDetails ? "" : (
                <Link to="/create-post">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaPlus className="text-gray-600 text-xl" />
                  </button>
                </Link>
              )}

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

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-sm z-10 md:hidden">
        <div className="flex justify-around items-center p-2">
          {auth.userDetails && <Link to="/posts">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiHome className="text-gray-600 text-xl" />
            </button>
          </Link>}

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

          {businessOwnerAuth.businessOwnerDetails ? "" : (
            <Link to="/create-post">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaPlus className="text-gray-600 text-xl" />
              </button>
            </Link>
          )}

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