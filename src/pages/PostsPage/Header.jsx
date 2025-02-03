import { FiSearch, FiBell } from 'react-icons/fi';

const Header = () => {
  return (
    <nav className="bg-white shadow-sm p-4 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-semibold">Your Logo</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
            <FiSearch className="text-gray-400 cursor-pointer" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Notification Icon */}
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FiBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;