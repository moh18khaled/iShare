import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaImage, FaVideo, FaStar, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { BsExclamationCircle } from "react-icons/bs";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  // const [businessNames, setBusinessNames] = useState([]);
  const [bussinessName,setBussinessName] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Separate states for image and video uploads
  const [imageData, setImageData] = useState({ url: "", publicId: "" });
  const [videoData, setVideoData] = useState({ url: "", publicId: "" });

  // Fetch business names from the backend
  // useEffect(() => {
  //   const fetchBusinessNames = async () => {
  //     try {
  //       const response = await axios.get(`${apiBaseUrl}/businessOwner/business-names`);
  //       setBusinessNames(response.data.businessNames);
  //     } catch (error) {
  //       console.error("Error fetching business names:", error);
  //     }
  //   };
  //   fetchBusinessNames();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/businessOwner/signup-data`);
        setAvailableCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching signup data:", error);
      }
    };

    fetchData();
  }, [apiBaseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title,
        content,
        businessName,
        imageUrl: imageData.url,
        imagePublicId: imageData.publicId,
        videoUrl: videoData.url,
        videoPublicId: videoData.publicId,
        rating,
      };

      const response = await axios.post(`${apiBaseUrl}/postss`, postData);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          text: "Your post has been successfully created.",
          confirmButtonColor: "#3085d6",
        });
        // Reset the form
        setTitle("");
        setContent("");
        setBusinessName("");
        setRating(0);
        setImageData({ url: "", publicId: "" });
        setVideoData({ url: "", publicId: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to create post. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response.data?.error,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleMediaUpload = async (event, type) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    const endpoint = type === "image"
      ? "https://api.cloudinary.com/v1_1/dqmp5l622/image/upload"
      : "https://api.cloudinary.com/v1_1/dqmp5l622/video/upload";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
      });

      const uploadData = await response.json();

      if (type === "image") {
        setImageData({ url: uploadData.url, publicId: uploadData.public_id });
      } else {
        setVideoData({ url: uploadData.url, publicId: uploadData.public_id });
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-red-200 rounded-lg shadow-lg p-8 mt-32">
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-300 bg-white mb-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Content */}
          <textarea
            className="w-full p-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-300 bg-white mb-4"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          {/* Bussiness Name */}
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-300 bg-white mb-4"
            placeholder="Enter the Bussiness Name"
            value={bussinessName}
            onChange={(e) => setBussinessName(e.target.value)}
            required
          />

          {/* Business Name Selection */}
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-[#8B4513]">Select a Business Name</label>
            <div className="space-y-2">
              {businessNames.map((business, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="radio"
                    name="businessName"
                    value={business}
                    checked={businessName === business}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300"
                    required
                  />
                  <span className="ml-2 text-sm text-[#8B4513]">{business}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Business Categories Field */}
          <div>
                  <label className="block mb-2 text-lg font-medium text-[#8B4513]">
                    Select Business Categories
                  </label>
                  <div className="space-y-2">
                    {availableCategories.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedCategories.includes(option)}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {/* {selectedCategories.length === 0 && (
                    <p className="text-red-500 mt-1">Please select at least one category</p>
                  )} */}
                </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-2 mb-4 mt-4">
            <span className="text-red-700">Rate the product:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-lg cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
                onClick={() => handleStarClick(star)}
              />
            ))}
            <span className="text-red-700 ml-2">{rating} / 5</span>
          </div>

          {/* Media Upload */}
          <div className="flex items-center space-x-4 mt-4">
            {/* Image Upload */}
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, "image")}
              />
              <FaImage className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Image</span>
              {imageData.url && <FaCheckCircle className="text-green-500 ml-2" />}
            </label>

            {/* Video Upload */}
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, "video")}
              />
              <FaVideo className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Video</span>
              {videoData.url && <FaCheckCircle className="text-green-500 ml-2" />}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
