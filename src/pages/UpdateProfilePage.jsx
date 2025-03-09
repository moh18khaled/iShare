import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiCamera } from "react-icons/fi";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    profilePicture: "",
    previewImage: "",
  });

  const [initialData, setInitialData] = useState({ username: "", profilePicture: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user/account`, { withCredentials: true });

        setFormData({
          username: response.data.data.username,
          profilePicture: response.data.data.profilePicture,
          previewImage: response.data.data.profilePicture,
        });

        setInitialData({
          username: response.data.data.username,
          profilePicture: response.data.data.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          previewImage: imageUrl,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqmp5l622/image/upload", {
        method: "POST",
        body: data,
      });
      return await response.json();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureUrl = formData.profilePicture;
      let profilePicturePublic_id = "";

      if (formData.profilePicture instanceof File) {
        const result = await uploadImageToCloudinary(formData.profilePicture);
        profilePictureUrl = result.url;
        profilePicturePublic_id = result.public_id;
      }

      const updateData = new FormData();

      if (formData.username.trim() && formData.username !== initialData.username) {
        updateData.append("username", formData.username);
      }

      if (formData.profilePicture instanceof File) {
        updateData.append("profilePictureUrl", profilePictureUrl);
        updateData.append("profilePicturePublic_id", profilePicturePublic_id);
      }

      if (Array.from(updateData.keys()).length === 0) {
        Swal.fire("No changes detected", "", "info");
        return;
      }

      const response = await axios.patch(`${apiBaseUrl}/user/account`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({ title: "Profile Updated Successfully", icon: "success" }).then(() => {
          navigate("/profile");
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Profile",
        text: error.response?.data?.error || "An error occurred",
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 cursor-pointer transition-transform transform group-hover:scale-105"
                src={formData.previewImage}
                alt="Profile"
                onClick={handleImageClick}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                onClick={handleImageClick}
              >
                <FiCamera className="text-white text-2xl" />
              </div>
            </div>
            <input
              type="file"
              name="profilePicture"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
