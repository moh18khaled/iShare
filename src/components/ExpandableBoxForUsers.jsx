import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpandableBoxForUsers = ({ icon, title, value, endpoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(endpoint);
      console.log("Fetched Data:", res.data);

      // Handle cases where the response may have either `followers` or `following`
      setData(res.data.followers || res.data.following || []);
    } catch (err) {
      setError("Failed to fetch data.");
      setData([]);
    }
    setLoading(false);
  };

  const toggleExpand = () => {
    if (!isOpen) fetchData();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex-1 space-y-2 text-center cursor-pointer" onClick={toggleExpand}>
        {icon}
        <p className="text-sm text-gray-600">{title}</p>
        <h4 className="font-semibold text-lg">{value}</h4>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 h-4/5 p-6 rounded-2xl shadow-lg overflow-y-auto relative">
            {/* Close Button */}
            <button className="absolute top-4 right-6 text-gray-500 text-xl" onClick={toggleExpand}>
              ✖
            </button>

            <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>

            {/* Loading State */}
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : data.length > 0 ? (
              <div className="space-y-4">
                {data.map((user) => (
                  <Link
                  
                      /*                   onClick={() => post?.author.isCurrentUser?navigate("/profile"):navigate(`/profile/${post?.author?._id}`)}>    {console.log(post?.author.isCurrentUser,"<>< ",post?.author?._id)*/
                      to={user.isCurrentUser ? "/profile" : `/profile/${user._id}`}
                      key={user._id}
                      onClick={toggleExpand} // Close the modal when clicking
                    className="flex items-center gap-4 p-4 border rounded-lg shadow-md hover:bg-gray-100 transition"
                  >
                    {/* Profile Picture with Updated Size */}
                    <img
                      src={user.profilePicture?.url}
                      alt={user.username}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    {/* Username */}
                    <p className="text-gray-800 font-semibold">{user.username}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center">No data available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableBoxForUsers;
