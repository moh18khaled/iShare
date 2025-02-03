import React, { useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";

const CreatePostPage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId,setImagePublicId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPublicId,setVideoPublicId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the post data
    const postData = {
      text,
      imageUrl,
      imagePublicId,
      videoUrl,
      videoPublicId,
    };

    try {
      // Send the post data to your backend API
      const response = await fetch("https://your-backend-api.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Post created successfully:", result);
        alert("Post created successfully!");
        // Reset the form
        setText("");
        setImageUrl("");
        setImagePublicId("");
        setVideoUrl("");
        setVideoPublicId("");
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
      setImagePublicId(uploadImage.public_id)
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

      const uploadVideoUrl = await videoResponse.json();
      console.log("Video URL:", uploadVideoUrl.url);
      console.log("Video Public_id:", uploadVideoUrl.public_id);
      setVideoUrl(uploadVideoUrl.url); // Store the video URL in the state
      setVideoPublicId(uploadVideoUrl.public_id);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Create Post Form */}
      <div className="max-w-2xl mx-auto my-auto mt-32 bg-red-200 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <FaImage className="text-red-500 text-2xl" />
              <span className="ml-2 text-red-700">Image</span>
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
            </label>
          </div>
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