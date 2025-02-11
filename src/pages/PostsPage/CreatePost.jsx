import axios from "axios";
import React, { useState } from "react";
import { FaImage, FaVideo, FaStar, FaCheckCircle } from "react-icons/fa"; // Import FaCheckCircle for checkmark

const apiBaseUrl = "http://localhost:5000";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPublicId, setVideoPublicId] = useState("");
  const [rating, setRating] = useState(0); // State for rating
  const [imageUploaded, setImageUploaded] = useState(false); // State for image upload success
  const [videoUploaded, setVideoUploaded] = useState(false); // State for video upload success

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare the post data
      const postData = {
        title,
        text,
        businessName, // Use businessName instead of category
        imageUrl,
        imagePublicId,
        videoUrl,
        videoPublicId,
        rating, // Include the rating in the post data
      };
  
      // Send the post data to your backend API
      const response = await axios.post(`${apiBaseUrl}/posts`, postData);
  
      if (response.status === 200 || response.status === 201) {
        console.log("Post created successfully:", response.data);
        alert("Post created successfully!");
        // Reset the form
        setTitle("");
        setContent("");
        setBusinessName(""); // Reset businessName instead of category
        setImageUrl("");
        setImagePublicId("");
        setVideoUrl("");
        setVideoPublicId("");
        setRating(0);
        setImageUploaded(false);
        setVideoUploaded(false);
      } else {
        console.error("Failed to create post:", response.statusText);
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Access the first file in the FileList
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    try {
      const imageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dqmp5l622/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadImage = await imageResponse.json();
      console.log("Image URL:", uploadImage.url);
      console.log("Image Public_id:", uploadImage.public_id);
      setImageUrl(uploadImage.url); // Store the image URL in the state
      setImagePublicId(uploadImage.public_id);
      setImageUploaded(true);

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Access the first file in the FileList
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");
    data.append("chunk_size", 6000000);

    try {
      const videoResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dqmp5l622/video/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadVideo = await videoResponse.json();
      console.log("Video URL:", uploadVideo.url);
      console.log("Video Public_id:", uploadVideo.public_id);
      setVideoUrl(uploadVideo.url); // Store the video URL in the state
      setVideoPublicId(uploadVideo.public_id);
      setVideoUploaded(true);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  // Handle star click
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Create Post Form */}
      <div className="max-w-2xl mx-auto my-auto mt-32 bg-red-200 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white mb-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Content Field */}
          <textarea
            className="w-full p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white mb-4"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          {/* Category Dropdown */}
          {/* Radio Buttons for Single Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#8B4513]">
              Select one option
            </label>
            <div className="space-y-2">
              {["option1", "option2", "option3", "option4"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="single-select"
                    value={option}
                    checked={businessName === option}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300"
                  />
                  <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-2 mb-4 mt-4">
            <span className="text-red-700">Rate the product :</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-lg cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
            <span className="text-red-700 ml-2">{rating} / 5</span>
          </div>

          {/* Image and Video Upload */}
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                required
              />
              <FaImage className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Image</span>
              {imageUploaded && <FaCheckCircle className="text-green-500 ml-2" />}
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
              />
              <FaVideo className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Video</span>
              {videoUploaded && <FaCheckCircle className="text-green-500 ml-2" />}
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