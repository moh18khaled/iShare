import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaUserFriends, FaHeart, FaNewspaper } from "react-icons/fa"; // FontAwesome icons
import Swal from 'sweetalert2';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdatePage = location.pathname.includes("/profile/update");
  const [handleError,setHandleError] = useState("");

  const [userAccount, setUserAccount] = useState({
    id: 0,
    username: "",
    email: "",
    profilePicture: "",
    postsCount: 0,
    likedPostsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  const [runUseEffect, setRunUseEffect] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user/account`, {
          withCredentials: true,
        });
        console.log(response);
        setUserAccount({
          id: response.data.id,
          username: response.data.data.username,
          email: response.data.data.email,
          profilePicture: response.data.data.profilePicture,
          postsCount: response.data.data.postsCount,
          likedPostsCount: response.data.data.likedPostsCount,
          followersCount: response.data.data.followersCount,
          followingCount: response.data.data.followingCount,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [runUseEffect, apiBaseUrl]);

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
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success"
            }).then(
              navigate("/")
            );
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[100%] md:max-w-[50%] h-screen md:h-[90vh] bg-white rounded-lg shadow-lg p-6">
        {!isUpdatePage && (
          <>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 cursor-pointer"
                  src={userAccount.profilePicture}
                  alt="Profile"
                />
              </div>
              <h2 className="mt-3 font-semibold text-xl">{userAccount.username}</h2>
              <p className="text-sm text-gray-600">{userAccount.email}</p>
            </div>

            <div className="mt-6 flex justify-between text-center">
              <div className="flex-1 space-y-2">
                <FaNewspaper className="text-2xl text-gray-700 mx-auto" />
                <p className="text-sm text-gray-600">Posts</p>
                <h4 className="font-semibold text-lg">{userAccount.postsCount}</h4>
              </div>
              <div className="flex-1 space-y-2">
                <FaThumbsUp className="text-2xl text-gray-700 mx-auto" />
                <p className="text-sm text-gray-600">Liked Posts</p>
                <h4 className="font-semibold text-lg">{userAccount.likedPostsCount}</h4>
              </div>
              <div className="flex-1 space-y-2">
                <FaUserFriends className="text-2xl text-gray-700 mx-auto" />
                <p className="text-sm text-gray-600">Followers</p>
                <h4 className="font-semibold text-lg">{userAccount.followersCount}</h4>
              </div>
              <div className="flex-1 space-y-2">
                <FaHeart className="text-2xl text-gray-700 mx-auto" />
                <p className="text-sm text-gray-600">Following</p>
                <h4 className="font-semibold text-lg">{userAccount.followingCount}</h4>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Link
                to="/profile/update"
                className="flex-grow-[8] bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition text-center"
              >
                Update Profile
              </Link>
              <button
                type="button"
                className="flex-grow-[2] bg-mainColor text-white py-2 px-4 rounded-lg hover:bg-hoverColor transition"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;