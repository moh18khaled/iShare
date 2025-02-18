import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaImage, FaVideo, FaStar, FaCheckCircle } from "react-icons/fa";

const apiBaseUrl = "http://localhost:5000";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [mediaUrl, setMediaUrl] = useState(""); // Single state for media URL (image or video)
  const [mediaPublicId, setMediaPublicId] = useState(""); // Single state for media public ID
  const [mediaType, setMediaType] = useState(null); // Track whether the media is an image or video
  const [rating, setRating] = useState(0);
  const [mediaUploaded, setMediaUploaded] = useState(false); // State for media upload success
  const [businessNames, setBusinessNames] = useState([]);

  // Fetch business names from the backend
  useEffect(() => {
    const fetchBusinessNames = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/businessOwner/business-names`);
        console.log(response);
        setBusinessNames(response.data.businessNames);
      } catch (error) {
        console.error("Error fetching business names:", error);
      }
    };

    fetchBusinessNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the post data
      const postData = {
        title,
        text,
        businessName,
        mediaUrl,
        mediaPublicId,
        mediaType, // Include the media type (image or video)
        rating,
      };

      // Send the post data to your backend API
      const response = await axios.post(`${apiBaseUrl}/posts`, postData);
      if (response.status === 200 || response.status === 201) {
        console.log("Post created successfully:", response.data);
        alert("Post created successfully!");
        // Reset the form
        setTitle("");
        setText("");
        setBusinessName("");
        setMediaUrl("");
        setMediaPublicId("");
        setMediaType(null);
        setRating(0);
        setMediaUploaded(false);
      } else {
        console.error("Failed to create post:", response.statusText);
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleMediaUpload = async (event, type) => {
    event.preventDefault();
    const file = event.target.files[0]; // Access the first file in the FileList
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    // Set the endpoint based on the media type
    const endpoint =
      type === "image"
        ? "https://api.cloudinary.com/v1_1/dqmp5l622/image/upload"
        : "https://api.cloudinary.com/v1_1/dqmp5l622/video/upload";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
      });

      const uploadData = await response.json();
      console.log("Media URL:", uploadData.url);
      console.log("Media Public_id:", uploadData.public_id);
      setMediaUrl(uploadData.url); // Store the media URL in the state
      setMediaPublicId(uploadData.public_id);
      setMediaType(type); // Set the media type (image or video)
      setMediaUploaded(true);
    } catch (error) {
      console.error("Error uploading media:", error);
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
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          {/* BusinessName Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#8B4513]">
              Select one Business Name
            </label>
            <div className="space-y-2">
              {businessNames.map((business,idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="radio"
                    name="single-select"
                    value={business}
                    checked={businessName === business}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300"
                  />
                  <span className="ml-2 text-sm text-[#8B4513]">{business}</span>
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

          {/* Media Upload (Image or Video) */}
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, "image")}
                disabled={mediaType === "video"} // Disable if video is already selected
              />
              <FaImage className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Image</span>
              {mediaUploaded && mediaType === "image" && (
                <FaCheckCircle className="text-green-500 ml-2" />
              )}
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, "video")}
                disabled={mediaType === "image"} // Disable if image is already selected
              />
              <FaVideo className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Video</span>
              {mediaUploaded && mediaType === "video" && (
                <FaCheckCircle className="text-green-500 ml-2" />
              )}
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