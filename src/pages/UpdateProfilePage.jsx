import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference for the file input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: "",
    previewImage: "", // For showing the selected image
  });

  // Fetch the account data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user/account`, {
          withCredentials: true,
        });

        setFormData((prev) => ({
          ...prev,
          username: response.data.data.username,
          email: response.data.data.email,
          profilePicture: response.data.data.profilePicture,
          previewImage: response.data.data.profilePicture, // Show current profile picture
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [apiBaseUrl]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Create preview URL
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          previewImage: imageUrl, // Update preview
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original"); // Replace with your upload preset
    data.append("cloud_name", "dqmp5l622"); // Replace with your cloud name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqmp5l622/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureUrl = formData.profilePicture;

      // If a new profile picture is selected, upload it to Cloudinary
      if (formData.profilePicture instanceof File) {
        profilePictureUrl = await uploadImageToCloudinary(formData.profilePicture);
      }

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profilePicture", profilePictureUrl);

      const response = await axios.patch(`${apiBaseUrl}/user/account`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Profile Updated Successfully",
          icon: "success",
        }).then(() => {
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

  // Trigger file input when user clicks the profile picture
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[100%] min-h-screen rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 cursor-pointer"
                src={formData.previewImage}
                alt="Profile"
                onClick={handleImageClick} // Click to select new image
              />
              <input
                type="file"
                name="profilePicture"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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