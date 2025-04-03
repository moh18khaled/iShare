import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaUserMinus ,FaThumbsUp,FaUserPlus, FaUserFriends,FaEnvelope , FaHeart,FaBuilding,FaPhone,FaGlobe,FaMapMarkerAlt, FaNewspaper } from "react-icons/fa";
import ExpandableBox from "../components/ExpandableBox";
import ExpandableBoxForUsers from "../components/ExpandableBoxForUsers";
import { Outlet } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const OtherUserProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [handleError, setHandleError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const isUpdatePage = location.pathname.includes("/profile/update");

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
    isUser:false,
  });

  useEffect(() => {
    fetchUser();
    
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/user/account/${id}`, {
        withCredentials: true,
      });
console.log(response.data.data);
      setUserAccount({
        id: response.data.data.id,
        username: response.data.data.username,
        email: response.data.data.email,
        profilePicture: response.data.data.profilePicture,
        postsCount: response.data.data.postsCount,
        likedPostsCount: response.data.data.likedPostsCount,
        followersCount: response.data.data.followersCount,
        followingCount: response.data.data.followingCount,
        role: response.data.data.role,
        mentionedPosts: response.data.data.mentionedPosts || [], // Ensure it's always an array
        businessName: response.data.data.businessDetails?.businessName || "",
        phoneNumber: response.data.data.businessDetails?.phoneNumber || "",
        website: response.data.data.businessDetails?.websiteUrl || "",
        address: response.data.data.businessDetails?.address || "",
        businessEmail: response.data.data.businessDetails?.email || "",
        isUser:response.data.data?.isUser || "",
        isFollowing:response.data.data?.isFollowing || "",
      });
      setIsFollowing(response.data.data?.isFollowing || false);
    } catch (error) {
      setHandleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
  };

    const toggleFollow = async () => {
      try {
        
        const response = await axios.patch(`${apiBaseUrl}/user/${id}/toggleFollow`);
        setIsFollowing(!isFollowing);
        setUserAccount(prev => ({
          ...prev,
          followersCount: isFollowing ? prev.followersCount - 1 : prev.followersCount + 1
        }));
      } catch (error) {
        console.error("Failed to toggle follow:", error);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg p-6 relative">
        
                    {userAccount.isUser&&(<div className="absolute top-4 right-4">
                        <button
                          onClick={toggleFollow}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            isFollowing 
                              ? "bg-gray-300 text-gray-800 hover:bg-gray-400" 
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {isFollowing ? (
                            <>
                              <FaUserMinus /> Unfollow
                            </>
                          ) : (
                            <>
                              <FaUserPlus /> Follow
                            </>
                          )}
                        </button>
                      </div>)}

        
        {!isUpdatePage && (
          <>
            {/* Profile Image and User Info */}
            <div className="flex flex-col items-center text-center mt-8">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                  src={userAccount.profilePicture}
                  alt="Profile"
                />
              </div>
              {userAccount.role === "businessOwner" && userAccount.businessName ? (
  <div className="flex items-center mt-1 text-gray-600">
    <FaBuilding className="mr-1" />
    <span>{userAccount.businessName}</span>
  </div>
) : (
  <div className="flex items-center mt-1 text-gray-600">
    <span>{userAccount.username || "No Username"}</span>
  </div>
)}
           
            </div>            
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
              {userAccount.role !== "businessOwner" && (<ExpandableBox
                icon={<FaNewspaper className="text-2xl text-gray-700 mx-auto" />}
                title="User's Posts"
                value={userAccount.postsCount}
                endpoint={`${apiBaseUrl}/user/account/${id}/posts`}
              />)}

              <ExpandableBox
                icon={<FaThumbsUp className="text-2xl text-gray-700 mx-auto" />}
                title="Posts User loved"
                value={userAccount.likedPostsCount}
                endpoint={`${apiBaseUrl}/user/account/${id}/liked-posts`}
              />

              <ExpandableBoxForUsers
                icon={<FaUserFriends className="text-2xl text-gray-700 mx-auto" />}
                title="User's Followers"
                value={userAccount.followersCount}
                endpoint={`${apiBaseUrl}/user/account/${id}/followers`}
              />

              <ExpandableBoxForUsers
                icon={<FaHeart className="text-2xl text-gray-700 mx-auto" />}
                title="User's Following"
                value={userAccount.followingCount}
                endpoint={`${apiBaseUrl}/user/account/${id}/following`}
              />
            </div>
          </>
        )}

        {userAccount.role === "businessOwner" && userAccount.mentionedPosts.length !== 0 && (
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

export default OtherUserProfilePage;
