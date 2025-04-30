import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../context/context";
import {
  FaThumbsUp,
  FaUserFriends,
  FaHeart,
  FaNewspaper,
  FaChartLine,
  FaPhone,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserPlus,
  FaUserMinus,
  FaWallet
} from "react-icons/fa";
import ExpandableBox from "../components/ExpandableBox";
import ExpandableBoxForUsers from "../components/ExpandableBoxForUsers";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const { id } = useParams();
  const user = useContext(User);
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdatePage = location.pathname.includes("/profile/update");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

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
    businessName: "",
    phoneNumber: "",
    website: "",
    address: "",
    businessEmail: "",
    walletNumber: "",
    walletType: "",
    walletAmount : 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const endpoint = id ? `${apiBaseUrl}/user/${id}` : `${apiBaseUrl}/user/account`;
        const response = await axios.get(endpoint, {
          withCredentials: true,
        });
        console.log(response.data);
        const data = id ? response.data.user : response.data.data;
        setUserAccount({
          id: data._id || data.id,
          username: data.username || "",
          email: data.email,
          profilePicture: data.profilePicture || "/default-profile.png",
          postsCount: data.postsCount,
          likedPostsCount: data.likedPostsCount,
          followersCount: data.followersCount,
          followingCount: data.followingCount,
          walletNumber: data.walletNumber || "",
          walletType: data.walletType || "",
          walletAmount : data.walletAmount || 0,
          role: data.role,
          mentionedPosts: data.mentionedPosts || [],
          businessName: data.businessDetails?.businessName || "",
          phoneNumber: data.businessDetails?.phoneNumber || "",
          website: data.businessDetails?.websiteUrl || "",
          address: data.businessDetails?.address || "",
          businessEmail: data.businessDetails?.email || "",
        });

        setIsFollowing(data.isFollowed || false);
        setIsCurrentUser(!id || (user.auth && user.auth.id === data._id));
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/profile");
      }
    };

    fetchUserData();
  }, [id, user.auth]);

  const toggleFollow = async () => {
    try {
      const response = await axios.patch(`${apiBaseUrl}/user/${userAccount.id}/toggleFollow`);
      setIsFollowing(!isFollowing);
      setUserAccount(prev => ({
        ...prev,
        followersCount: isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
      }));
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`w-full max-w-[100%] md:max-w-[80%] min-h-[calc(100vh+${userAccount.mentionedPosts?.length * 50}px)] bg-white rounded-lg shadow-lg p-6 relative`}>
        {!isUpdatePage && (
          <>
            {!isCurrentUser && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={toggleFollow}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isFollowing 
                      ? "bg-gray-300 text-gray-800 hover:bg-gray-400" 
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isFollowing ? <FaUserMinus /> : <FaUserPlus />}
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}

            {userAccount.role === "businessOwner" && isCurrentUser && (
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
              {userAccount.role === "businessOwner" && userAccount.businessName && (
                <div className="flex items-center mt-1 text-gray-600">
                  <FaBuilding className="mr-1" />
                  <span>{userAccount.businessName}</span>
                </div>
              )}
            </div>

            {/* Wallet Information - Displayed for all users */}
            {(userAccount.walletNumber || userAccount.walletType) && (
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center space-x-4">
                  <div className=" p-3 rounded-full flex items-center gap-4">
                    <FaWallet className="text-blue-600 text-xl" />
                    <p>{userAccount.walletAmount}$</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-800">Payment Details</h3>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                    {userAccount.walletType && (
  <div className="bg-white px-4 py-2 rounded-lg shadow-xs">
    <span className="text-gray-500 text-sm">Wallet Type</span>
    <p className="font-medium">
      {Array.isArray(userAccount.walletType) 
        ? userAccount.walletType.join(', ') // Add comma+space between array items
        : userAccount.walletType}
    </p>
  </div>
)}
                      {userAccount.walletNumber && (
                        <div className="bg-white px-4 py-2 rounded-lg shadow-xs">
                          <span className="text-gray-500 text-sm">Wallet Number</span>
                          <p className="font-mono font-bold">{userAccount.walletNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Owner Contact Information */}
            {userAccount.role === "businessOwner" && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAccount.phoneNumber && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaPhone className="text-gray-600 mr-3" />
                    <a href={`tel:${userAccount.phoneNumber}`} className="text-gray-700 hover:text-blue-600">
                      {userAccount.phoneNumber}
                    </a>
                  </div>
                )}
                
                {userAccount.website && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaGlobe className="text-gray-600 mr-3" />
                    <a 
                      href={userAccount.website.startsWith('http') ? userAccount.website : `https://${userAccount.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 break-all"
                    >
                      {userAccount.website}
                    </a>
                  </div>
                )}
                
                {userAccount.businessEmail && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaEnvelope className="text-gray-600 mr-3" />
                    <a href={`mailto:${userAccount.businessEmail}`} className="text-gray-700 hover:text-blue-600 break-all">
                      {userAccount.businessEmail}
                    </a>
                  </div>
                )}
                
                {userAccount.address && (
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-gray-600 mr-3 mt-1" />
                    <span className="text-gray-700">{userAccount.address}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between text-center">
              {userAccount.role !== "businessOwner" && (
                <ExpandableBox
                  icon={<FaNewspaper className="text-2xl text-gray-700 mx-auto" />}
                  title="Posts"
                  value={userAccount.postsCount}
                  endpoint={id ? `${apiBaseUrl}/user/${id}/posts` : `${apiBaseUrl}/user/account/posts`}
                />
              )}
              <ExpandableBox
                icon={<FaThumbsUp className="text-2xl text-gray-700 mx-auto" />}
                title="Liked Posts"
                value={userAccount.likedPostsCount}
                endpoint={id ? `${apiBaseUrl}/user/${id}/liked-posts` : `${apiBaseUrl}/user/account/posts/liked-posts`}
              />
              <ExpandableBoxForUsers
                icon={<FaUserFriends className="text-2xl text-gray-700 mx-auto" />}
                title="Followers"
                value={userAccount.followersCount}
                endpoint={id ? `${apiBaseUrl}/user/${id}/followers` : `${apiBaseUrl}/user/account/followers`}
              />
              <ExpandableBoxForUsers
                icon={<FaHeart className="text-2xl text-gray-700 mx-auto" />}
                title="Following"
                value={userAccount.followingCount}
                endpoint={id ? `${apiBaseUrl}/user/${id}/following` : `${apiBaseUrl}/user/account/following`}
              />
            </div>

            {isCurrentUser && (
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
                    className="flex-grow bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition text-center"
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/profile/update-password"
                    className="flex-grow bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-center"
                  >
                    Update Password
                  </Link>
                </div>
              </form>
            )}
          </>
        )}

        {userAccount.role === "businessOwner" && userAccount.mentionedPosts.length !== 0 && (
          <div className="flex flex-col min-h-screen p-4">
            <h3 className="text-lg font-semibold text-center p-4 mb-4">Mentioned Posts</h3>
            <div className="flex-grow flex justify-center flex-wrap gap-10">
              {userAccount.mentionedPosts?.map((post) => (
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