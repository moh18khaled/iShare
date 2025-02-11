import React, { useEffect, useState } from "react";
import image from "../assets/images/select.jfif";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaUserFriends, FaHeart, FaNewspaper } from "react-icons/fa"; // FontAwesome icons

const apiBaseUrl = "http://localhost:5000";

const ProfilePage = () => {
  const location = useLocation();

  // Check if the current route is `/profile/update`
  const isUpdatePage = location.pathname.includes("/profile/update");

  const [userAccount, setUserAccount] = useState({
    id : 0,
    username : "",
    email : "",
    profilePicture : "",
  });
  const [runUseEffect,setRunUseEffect] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:1337/api/users/44")
      .then(res=>{
        console.log(res);
        setUserAccount({
          id : res.data.id,
          username : res.data.username,
          email : res.data.email,
        })
      });
  }, [runUseEffect])

  // function to delete the account
  const deleteAccount = async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:1337/api/users/${id}`);
      if(res.status===200){
        setRunUseEffect((prev)=>prev+1);
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
                  onChange={handleImageChange}
                />
              </div>
              <h2 className="mt-3 font-semibold text-xl">{userAccount.username}</h2>
              <p className="text-sm text-gray-600">{userAccount.email}</p>
            </div>

            {/* User Stats */}
            <div className="mt-6 flex justify-between text-center">
              <div className="flex-1 space-y-2">
              <FaNewspaper className="text-2xl text-gray-700 mx-auto" /> {/* Posts icon */}
                <p className="text-sm text-gray-600">Posts</p>
                <h4 className="font-semibold text-lg">25</h4>
              </div>
              <div className="flex-1 space-y-2">
              <FaThumbsUp className="text-2xl text-gray-700 mx-auto" /> {/* Reactions icon */}
                <p className="text-sm text-gray-600">Reactions</p>
                <h4 className="font-semibold text-lg">120</h4>
              </div>
              <div className="flex-1 space-y-2">
              <FaUserFriends className="text-2xl text-gray-700 mx-auto" /> {/* Followers icon */}
                <p className="text-sm text-gray-600">Followers</p>
                <h4 className="font-semibold text-lg">300</h4>
              </div>
              <div className="flex-1 space-y-2">
              <FaHeart className="text-2xl text-gray-700 mx-auto" /> {/* Following icon */}
                <p className="text-sm text-gray-600">Following</p>
                <h4 className="font-semibold text-lg">150</h4>
              </div>
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
              <Link to={userAccount.id} className="flex-grow-[8]">
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
                  onClick={()=>deleteAccount(userAccount.id)}
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