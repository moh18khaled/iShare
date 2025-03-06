import React, { useEffect, useState } from "react";
import image from "../assets/images/select.jfif";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isUpdatePage = location.pathname.includes(`/user/${id}/update`);

  const [userAccount, setUserAccount] = useState({
    id: 0,
    username: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    axios.get(`${apiBaseUrl}/user/account/${id}`)
      .then(res => {
        setUserAccount({
          id: res.data.data.id,
          username: res.data.data.username,
          email: res.data.data.email,
          profilePicture: res.data.data.profilePicture || image,
        });
      })
      .catch(() => {
        console.error("Failed to fetch user data");
      });
  }, [id]);

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
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                src={userAccount.profilePicture}
                alt="Profile"
              />
              <h2 className="mt-3 font-semibold text-xl">{userAccount.username}</h2>
              <p className="text-sm text-gray-600">{userAccount.email}</p>
            </div>

            {/* User Stats */}
            <div className="mt-6 flex justify-between text-center">
              <ExpandableBox 
                icon={
                  <div className="pointer-events-none">
                    <FaNewspaper className="text-2xl text-gray-700 mx-auto" style={{ pointerEvents: "none" }} />
                  </div>
                } 
                title="Posts" 
                value="25" 
                endpoint={`${apiBaseUrl}/user/account/${id}/posts`}
              />

              <ExpandableBox 
                icon={
                  <div className="pointer-events-none">
                    <FaThumbsUp className="text-2xl text-gray-700 mx-auto" style={{ pointerEvents: "none" }} />
                  </div>
                } 
                title="Liked Posts" 
                value="120" 
                endpoint={`${apiBaseUrl}/users/account/${id}/liked-posts`}
              />

              <ExpandableBoxForUsers 
                icon={
                  <div className="pointer-events-none">
                    <FaUserFriends className="text-2xl text-gray-700 mx-auto" style={{ pointerEvents: "none" }} />
                  </div>
                } 
                title="Followers" 
                value="300" 
                endpoint={`${apiBaseUrl}/users/account/${id}/followers`}
              />

              <ExpandableBoxForUsers 
                icon={
                  <div className="pointer-events-none">
                    <FaHeart className="text-2xl text-gray-700 mx-auto" style={{ pointerEvents: "none" }} />
                  </div>
                } 
                title="Following" 
                value="150" 
                endpoint={`${apiBaseUrl}/users/account/${id}/following`}
              />
            </div>
          </>
        )}

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
