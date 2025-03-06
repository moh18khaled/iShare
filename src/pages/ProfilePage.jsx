import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { User } from "../context/context";
import {
  FaThumbsUp,
  FaUserFriends,
  FaHeart,
  FaNewspaper,
  FaChartLine,
} from "react-icons/fa";
import ExpandableBox from "../components/ExpandableBox";
import ExpandableBoxForUsers from "../components/ExpandableBoxForUsers";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const ProfilePage = () => {
  const userProfilePicture = useContext(User);
  const user = useContext(User);
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdatePage = location.pathname.includes("/profile/update");
  const [handleError, setHandleError] = useState("");

  const [userAccount, setUserAccount] = useState({
    id: 0,
    username: "",
    email: "",
    profilePicture: "",
    postsCount: 0,
    likedPostsCount: 0,
    followersCount: 0,
    followingCount: 0,
    role: "user",
    mentionedPosts: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user/account`, {
          withCredentials: true,
        });
        setUserAccount({
          id: response.data.id,
          username: response.data.data.username,
          email: response.data.data.email,
          profilePicture: response.data.data.profilePicture,
          postsCount: response.data.data.postsCount,
          likedPostsCount: response.data.data.likedPostsCount,
          followersCount: response.data.data.followersCount,
          followingCount: response.data.data.followingCount,
          role: response.data.data.role,
          mentionedPosts: response.data.data.mentionedPosts,
        });
        userProfilePicture.setProfilePicture(response.data.data.profilePicture.url); // Set profile picture in context
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/user/account`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Are you sure to delete your account?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            user.setAuth({});
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success",
            }).then(() => navigate("/"));
          }
        });
      }
    } catch (error) {
      console.log(error);
      setHandleError(error.response.data.error);
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Account",
        text: `${handleError}`,
      });
    }
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className={`w-full max-w-[100%] md:max-w-[80%] min-h-[calc(100vh+${userAccount.mentionedPosts?.length * 50}px)] bg-white rounded-lg shadow-lg p-6 relative`}
      >
        {!isUpdatePage && (
          <>
            {userAccount.role === "businessOwner" && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#A0522D] transition-colors"
                >
                  <FaChartLine />
                  Dashboard
                </button>
              </div>
            )}

            <div className="flex flex-col items-center text-center mt-8">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                  src={userAccount.profilePicture}
                  alt="Profile"
                />
              </div>
              <h2 className="mt-3 font-semibold text-xl">{userAccount.username}</h2>
            </div>

            <div className="mt-6 flex justify-between text-center">
              <ExpandableBox
                icon={<FaNewspaper className="text-2xl text-gray-700 mx-auto" />}
                title="My Posts"
                value={userAccount.postsCount}
                endpoint={`${apiBaseUrl}/user/account/posts`}
              />
              <ExpandableBox
                icon={<FaThumbsUp className="text-2xl text-gray-700 mx-auto" />}
                title="Posts I loved"
                value={userAccount.likedPostsCount}
                endpoint={`${apiBaseUrl}/user/account/posts/liked-posts`}
              />
              <ExpandableBoxForUsers
                icon={<FaUserFriends className="text-2xl text-gray-700 mx-auto" />}
                title="Followers"
                value={userAccount.followersCount}
                endpoint={`${apiBaseUrl}/user/account/followers`}
              />
              <ExpandableBoxForUsers
                icon={<FaHeart className="text-2xl text-gray-700 mx-auto" />}
                title="Following"
                value={userAccount.followingCount}
                endpoint={`${apiBaseUrl}/user/account/following`}
              />
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userAccount.username}
                  readOnly
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userAccount.email}
                  readOnly
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/profile/update"
                  className="flex-grow-[8] bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition text-center"
                >
                  Update Profile
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

        {userAccount.role === "businessOwner" && (
          <div className="flex flex-col min-h-screen p-4">
            <h3 className="text-lg font-semibold text-center p-4 mb-4">Mentioned Posts</h3>
            <div className="flex-grow flex justify-center flex-wrap gap-10">
              {userAccount.mentionedPosts.map((post) => (
                <div
                  key={post._id}
                  className="max-w-48 h-auto rounded-lg overflow-hidden shadow-lg bg-white relative group"
                  style={{ width: "fit-content" }}
                  onClick={() => handleCardClick(post._id)}
                >
                  {post.mediaType === "video" ? (
                    <video className="w-fit h-full object-cover" controls>
                      <source src={post.video.url} type={`video/${post.video.url.split(".").pop()}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img className="w-fit h-full object-cover" src={post.image.url} alt={post.title} />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                    <h2 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {post.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;