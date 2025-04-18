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
  const [removedMedia, setRemovedMedia] = useState([]);

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
        setVideoData(post.video || { url: "", publicId: "" });
        setAvailableCategories(catRes.data.categories);

        if (post.imageUrl && post.imageUrl.startsWith("thumbnail.")) {
          setThumbnailData(post.image || { url: "", publicId: "" });
        } else {
          setImageData(post.image || { url: "", publicId: "" });
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

  const handleRemoveMedia = (type) => {
    let currentMedia;
    let publicId = "";

    switch (type) {
      case "image":
        currentMedia = imageData;
        setImageData({ url: "", publicId: "" });
        break;
      case "video":
        currentMedia = videoData;
        setVideoData({ url: "", publicId: "" });
        break;
      case "thumbnail":
        currentMedia = thumbnailData;
        setThumbnailData({ url: "", publicId: "" });
        break;
      default:
        return;
    }

    if (currentMedia.publicId) {
      publicId = currentMedia.publicId;
      setRemovedMedia(prev => [...prev, { type, publicId }]);
    }

    Swal.fire("Success", `${type} removed successfully. It will be deleted when you save your changes.`, "success");
  };

  // Add this to your state declarations at the top
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modify the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
  
    if (selectedCategories.length === 0) {
      Swal.fire("Missing Data", "Please select at least one category.", "error");
      setIsSubmitting(false);
      return;
    }
  
    // Check if there's at least one media (image or video with thumbnail)
    if (!imageData.url && !videoData.url && !thumbnailData.url) {
      Swal.fire({
        icon: "error",
        title: "Media Required",
        text: "Please upload either an image or a video",
      });
      setIsSubmitting(false);
      return;
    }
  
    // Thumbnail is only required if there's a video and no image
    if (videoData.url && !thumbnailData.url && !imageData.url) {
      Swal.fire({
        icon: "error",
        title: "Thumbnail Required",
        text: "Please upload a thumbnail image for your video",
      });
      setIsSubmitting(false);
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
        removedMedia: removedMedia.map(item => ({
          mediaType: item.type,
          publicId: item.publicId
        }))
      };
  
      const res = await axios.patch(`${apiBaseUrl}/postss/${id}`, updatedPost);
      if (res.status === 200) {
        Swal.fire("Success", "Post updated successfully.", "success");
        navigate("/posts");
      } else {
        Swal.fire("Error", "Failed to update post.", "error");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", error.response?.data?.error || "Server error", "error");
      setIsSubmitting(false);
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

          <div className="space-y-4 mb-6">
            <label className="flex items-center">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleMediaUpload(e, "image")} />
              <FaImage className="text-red-500 mr-2" />
              <span>Image</span>
              {imageData.url && <FaCheckCircle className="text-green-500 ml-2" />}
              {imageData.url && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveMedia("image")} 
                  className="ml-2 text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </label>

            <label className="flex items-center">
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleMediaUpload(e, "video")} />
              <FaVideo className="text-red-500 mr-2" />
              <span>Video</span>
              {videoData.url && <FaCheckCircle className="text-green-500 ml-2" />}
              {videoData.url && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveMedia("video")} 
                  className="ml-2 text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </label>

            {/* Only show thumbnail upload if there's a video or no image */}
            {(videoData.url || !imageData.url) && (
              <label className="flex items-center">
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                <FaImage className="text-red-500 mr-2" />
                <span>Thumbnail {videoData.url ? "(for video)" : ""}</span>
                {thumbnailData.url && <FaCheckCircle className="text-green-500 ml-2" />}
                {thumbnailData.url && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveMedia("thumbnail")} 
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </label>
            )}
          </div>

          

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 text-white rounded-lg transition ${
              isSubmitting 
                ? 'bg-red-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;