import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaImage, FaVideo, FaStar, FaCheckCircle } from "react-icons/fa";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [rating, setRating] = useState(0);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageData, setImageData] = useState({ url: "", publicId: "" });
  const [videoData, setVideoData] = useState({ url: "", publicId: "" });
  const [thumbnailData, setThumbnailData] = useState({ url: "", publicId: "" });
  const [removedMedia, setRemovedMedia] = useState([]); // Store removed media

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRes = await axios.get(`${apiBaseUrl}/postss/${id}`);
        const catRes = await axios.get(`${apiBaseUrl}/businessOwner/signup-data`);

        const post = postRes.data.post;
        setTitle(post.title);
        setContent(post.content);
        setBusinessName(post.businessOwner.businessName);
        setRating(post.rating || 0);
        setSelectedCategories(post.categories || []);
        setVideoData({ url: post.video.url, publicId: post.video.publicId });
        setAvailableCategories(catRes.data.categories);

        // Check if the image URL starts with 'thumbnail.' and set thumbnail data accordingly
        if (post.imageUrl && post.imageUrl.startsWith("thumbnail.")) {
          setThumbnailData({ url: post.image.url, publicId: post.image.publicId });
        } else {
          setImageData({ url: post.image.url, publicId: post.image.publicId });
        }
      } catch (error) {
        console.error("Error loading post:", error);
        Swal.fire("Error", "Could not load post data", "error");
      }
    };

    fetchPostData();
  }, [id]);

  const handleMediaUpload = async (event, type) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    if (type === "video" && !thumbnailData.url && !imageData.url) {
      Swal.fire({
        icon: "warning",
        title: "Thumbnail Required",
        text: "Please upload a thumbnail image for your video first",
      });
      event.target.value = "";
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    const endpoint =
      type === "image"
        ? "https://api.cloudinary.com/v1_1/dqmp5l622/image/upload"
        : "https://api.cloudinary.com/v1_1/dqmp5l622/video/upload";

    try {
      const res = await fetch(endpoint, { method: "POST", body: data });
      const result = await res.json();

      if (type === "image") {
        setImageData({ url: result.url, publicId: result.public_id });
      } else {
        setVideoData({ url: result.url, publicId: result.public_id });
      }
    } catch (err) {
      Swal.fire("Error", "Upload failed. Please try again.", "error");
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqmp5l622/image/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setThumbnailData({ url: result.url, publicId: result.public_id });
    } catch (err) {
      Swal.fire("Error", "Thumbnail upload failed.", "error");
    }
  };

  const handleRemoveMedia = async (type) => {
    let publicId = "";

    if (type === "image") {
      publicId = imageData.publicId;
      console.log(videoData);

      setImageData({ url: "", publicId: "" });
    } else if (type === "video") {
      publicId = videoData.publicId;
      console.log(videoData);

      setVideoData({ url: "", publicId: "" });
    } else if (type === "thumbnail") {
      publicId = thumbnailData.publicId;
      setThumbnailData({ url: "", publicId: "" });
    }
console.log(publicId);
    if (publicId) {
      // Step 1: Add removed media publicId to the array
      setRemovedMedia((prev) => [...prev, { type, publicId }]);

      Swal.fire("Success", `${type} removed successfully.`, "success");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      Swal.fire("Missing Data", "Please select at least one category.", "error");
      return;
    }

    try {
      const updatedPost = {
        title,
        content,
        businessName,
        imageUrl: imageData.url,
        imagePublicId: imageData.publicId,
        videoUrl: videoData.url,
        videoPublicId: videoData.publicId,
        thumbnailUrl: thumbnailData.url,
        thumbnailPublicId: thumbnailData.publicId,
        rating,
        categories: selectedCategories,
        removedMedia,  // Include removed media in the request
      };

      const res = await axios.patch(`${apiBaseUrl}/postss/${id}`, updatedPost);
      if (res.status === 200) {
        Swal.fire("Success", "Post updated successfully.", "success");
        navigate("/posts"); // or wherever you want to redirect
      } else {
        Swal.fire("Error", "Failed to update post.", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", error.response?.data?.error || "Server error", "error");
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-red-200 rounded-lg shadow-lg p-8 mt-32">
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 mb-4 rounded-lg border"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 mb-4 rounded-lg border"
            rows="4"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full p-3 mb-4 rounded-lg border"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />

          {/* Categories */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Categories</label>
            {availableCategories.map((cat) => (
              <label key={cat} className="block">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="ml-2">{rating} / 5</span>
          </div>

          {/* Media Upload */}
          <div className="space-y-4 mb-6">
            {/* Image */}
            <label className="flex items-center">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleMediaUpload(e, "image")} />
              <FaImage className="text-red-500 mr-2" />
              <span>Image</span>
              {imageData.url && <FaCheckCircle className="text-green-500 ml-2" />}
              {imageData.url && (
                <button type="button" onClick={() => handleRemoveMedia("image")} className="ml-2 text-red-500">
                  Remove
                </button>
              )}
            </label>

            {/* Video */}
            <label className="flex items-center">
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleMediaUpload(e, "video")} />
              <FaVideo className="text-red-500 mr-2" />
              <span>Video</span>
              {videoData.url && <FaCheckCircle className="text-green-500 ml-2" />}
              {videoData.url && (
                <button type="button" onClick={() => handleRemoveMedia("video")} className="ml-2 text-red-500">
                  Remove
                </button>
              )}
            </label>

            {/* Thumbnail */}
            <label className="flex items-center">
              <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
              <span>Thumbnail (for video)</span>
              {thumbnailData.url && <FaCheckCircle className="text-green-500 ml-2" />}
              {thumbnailData.url && (
                <button type="button" onClick={() => handleRemoveMedia("thumbnail")} className="ml-2 text-red-500">
                  Remove
                </button>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
