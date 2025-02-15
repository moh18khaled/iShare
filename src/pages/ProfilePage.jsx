import React, { useEffect, useState } from "react";
import image from "../assets/images/select.jfif";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaThumbsUp, 
  FaUserFriends, 
  FaHeart, 
  FaNewspaper, 
  FaChartLine 
} from "react-icons/fa";
import ExpandableBox from "../components/ExpandableBox";
import ExpandableBoxForUsers from "../components/ExpandableBoxForUsers";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is `/profile/update`
  const isUpdatePage = location.pathname.includes("/profile/update");

  const [userAccount, setUserAccount] = useState({
    id: 0,
    username: "",
    email: "",
    profilePicture: "",
  });
  const [runUseEffect, setRunUseEffect] = useState(0);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/user/account`)
      .then(res => {
        console.log(res);
        setUserAccount({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
        })
      });
  }, [runUseEffect])

  // function to delete the account
  const deleteAccount = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:1337/api/users/${id}`);
      if(res.status === 200) {
        setRunUseEffect((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  }

  const [profileImage, setProfileImage] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[100%] md:max-w-[50%] h-screen md:h-[90vh] bg-white rounded-lg shadow-lg p-6 relative">
        {!isUpdatePage && (
          <>
            {/* Dashboard Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#A0522D] transition-colors"
              >
                <FaChartLine />
                Dashboard
              </button>
            </div>

            {/* Profile Image and User Info */}
            <div className="flex flex-col items-center text-center mt-8">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 cursor-pointer"
                  src={profileImage}
                  alt="Profile"
                  onClick={() => document.getElementById("imageInput").click()}
                />
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <h2 className="mt-3 font-semibold text-xl">{userAccount.username}</h2>
              <p className="text-sm text-gray-600">{userAccount.email}</p>
            </div>

            {/* User Stats */}
            <div className="mt-6 flex justify-between text-center">
  <ExpandableBox 
    icon={<FaNewspaper className="text-2xl text-gray-700 mx-auto" />} 
    title="My Posts" 
    value="25" 
    endpoint={`${apiBaseUrl}/user/account/posts`}
  />

  <ExpandableBox 
    icon={<FaThumbsUp className="text-2xl text-gray-700 mx-auto" />} 
    title="Posts I loved" 
    value="120" 
    endpoint={`${apiBaseUrl}/user/account/posts/liked-posts`}
  />

  <ExpandableBoxForUsers 
    icon={<FaUserFriends className="text-2xl text-gray-700 mx-auto" />} 
    title="Followers" 
    value="300" 
    endpoint={`${apiBaseUrl}/user/account/followers`}
  />

  <ExpandableBoxForUsers 
    icon={<FaHeart className="text-2xl text-gray-700 mx-auto" />} 
    title="Following" 
    value="150" 
    endpoint={`${apiBaseUrl}/user/account/following`}
  />
</div>
            {/* Form for Updating Profile */}
            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userAccount.username}
                  readOnly
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userAccount.email}
                  readOnly
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Link to={`${userAccount.id}`} className="flex-grow-[8]">
                  <button
                    type="button"
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    Update
                  </button>
                </Link>
                
                <button
                  type="button"
                  className="flex-grow-[2] bg-mainColor text-white py-2 px-4 rounded-lg hover:bg-hoverColor transition"
                  onClick={() => deleteAccount(userAccount.id)}
                >
                  Delete the account
                </button>
              </div>
            </form>
          </>
        )}

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;