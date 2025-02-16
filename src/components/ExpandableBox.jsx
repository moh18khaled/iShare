import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpandableBox = ({ icon, title, value, endpoint, type }) => {
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

      if (type === "followers") {
        setData(res.data.followers || []);
      } else if (type === "following") {
        setData(res.data.following || []);
      } else {
        setData(res.data.posts || []);
      }
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
              <div className="flex flex-wrap justify-center gap-4">
                {type === "followers" || type === "following" ? (
                  data.map((user) => (
                    <div key={user._id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md hover:bg-gray-100 transition">
                      <img
                        src={user.profilePicture?.url || "default-profile.jpg"}
                        alt={user.username}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <p className="text-gray-800 font-semibold">{user.username}</p>
                    </div>
                  ))
                ) : (
                  data.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                      <div className="max-w-64 rounded-lg overflow-hidden shadow-lg bg-white relative group cursor-pointer">
                        <img className="w-full h-40 object-cover" src={post.image?.url || "default-image.jpg"} alt={post.title} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                          <h2 className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
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

export default ExpandableBox;
