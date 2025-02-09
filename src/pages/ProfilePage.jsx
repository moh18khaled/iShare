import React, { useEffect, useState } from "react";
import image from "../assets/images/select.jfif";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const location = useLocation();

  // Check if the current route is `/profile/update`
  const isUpdatePage = location.pathname.includes("/profile/update");

  const [user,setUseer] = useState([]);

  useEffect(()=>{
    axios.get(`${apiBaseUrl}/user/account`)
    .then(res=>console.log(res));
  },[])

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
      <div className="w-full max-w-[100%] md:max-w-[50%] h-screen md:h-[90vh] bg-white rounded-lg shadow-lg p-6">
        {!isUpdatePage && (
          <>
            {/* Profile Image and User Info */}
            <div className="flex flex-col items-center text-center">
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
                />
              </div>
              <h2 className="mt-3 font-semibold text-xl">username</h2>
              <p className="text-sm text-gray-600">email</p>
            </div>

            {/* User Stats */}
            <div className="mt-6 flex justify-between text-center">
              <div className="flex-1">
                <h4 className="font-semibold text-lg">25</h4>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">120</h4>
                <p className="text-sm text-gray-600">Reactions</p>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">300</h4>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">150</h4>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>

            {/* Form for Updating Profile */}
            {/* <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Link to="update">
                <button
                  type="button"
                  className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                >
                  Update
                </button>
              </Link>
            </form> */}
          </>
        )}

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
