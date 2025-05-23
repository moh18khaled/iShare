import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaComment, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { User } from "../../context/context";
import Swal from "sweetalert2";

const ViewPosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [businessOwner, setBusinessOwner] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const { auth } = useContext(User);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/postss/${id}`);
      console.log(response);
      const data = response.data;
      setBusinessOwner(data.post.businessOwner);
      setPost(data.post);
      setIsLiked(data.isLiked);
      setLikesCount(data.likesCount);
      setIsOwner(data.isOwner);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response.data?.error,
        confirmButtonColor: "#d33",
      })
      navigate("/posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/postss/${id}/comments`);
      const fetchedComments = response.data.comments || [];
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await axios.post(`${apiBaseUrl}/postss/${id}/addComment`, { text: comment });
        setComment("");
        fetchComments();
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/postss/${id}`);
      navigate("/posts");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const toggleLike = async () => {
    try {
      setIsLiked(!isLiked);
      const response = await axios.patch(`${apiBaseUrl}/postss/${id}/toggleLike`);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFullScreen();
    };

    if (fullScreenImage) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullScreenImage]);

  if (loading) return (
    <div className="text-center mt-32">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div className="text-center mt-16 text-red-500">Error: {error}</div>;

  return (
    <div className="w-[95%] mx-auto text-center max-w-4xl shadow-2xl p-10 rounded-lg">
      {/* Post Author */}
      <div
        className="flex items-center justify-between mb-6 mt-6 cursor-pointer"
        onClick={() => post?.author.isCurrentUser ? navigate("/profile") : navigate(`/profile/${post?.author?._id}`)}
      >
        <div className="flex items-center gap-3">
          <img
            src={post?.author?.profilePicture?.url || "/default-profile.png"}
            alt={post?.author?.username || "Unknown User"}
            className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
            loading="lazy"
          />
          <p className="flex flex-col text-lg font-semibold text-gray-900 truncate max-w-[150px]">
            {post?.author?.username || "Unknown User"}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-3xl font-bold mb-4">{post?.title || "No Title"}</h1>
      <p className="text-gray-700 mt-6">{post?.content || "No content available."}</p>

      {/* Media Section */}
      <div className="flex justify-center gap-4 mt-4">
        {post?.video?.url && (
          <video
            src={post.video.url}
            controls
            className="w-72 h-auto object-cover rounded-lg"
          />
        )}

        {post?.image?.url && !post.image.url.startsWith("thumbnail.") && (
          <img
            src={post.image.url}
            alt={post.title}
            className="w-72 h-auto object-cover rounded-lg cursor-pointer"
            onClick={() => handleImageClick(post.image.url)}
          />
        )}

      </div>
      {isOwner && (
    <>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 m-4"
        onClick={() =>navigate(`/editPost/${id}`)}
      >
        <FaEdit />
        Edit Post
      </button></>)}

      {/* Business Owner Section */}
      {businessOwner && (
        <div className="mt-8 bg-gradient-to-r from-[#f8f4f0] to-[#fff] rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Business Owner
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Business Owner Info */}
            <div
              className="flex items-center gap-4 cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() =>
                businessOwner?.user_id?.isCurrentUser
                  ? navigate("/profile")
                  : navigate(`/profile/${businessOwner?.user_id?._id}`)
              }
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-20"></div>
                <img
                  src={businessOwner?.user_id?.profilePicture?.url || "/default-profile.png"}
                  alt={businessOwner?.businessName || "Unknown User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-500 relative z-10"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-bold text-gray-800">
                  {businessOwner?.businessName || "Unknown User"}
                </p>
              </div>
            </div>

            {/* Buttons Container */}
            <div className="flex flex-col gap-3">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                onClick={() =>
                  businessOwner?.user_id?.isCurrentUser
                    ? navigate("/profile")
                    : navigate(`/profile/${businessOwner?.user_id?._id}`)
                }
              >
                <span>Contact {businessOwner?.businessName} Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                onClick={() =>
                  businessOwner?.user_id?.isCurrentUser
                    ? navigate("/profile")
                    : navigate(`/profile/${businessOwner?.user_id?._id}`)
                }
              >
                <span>Order Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <button className="flex items-center space-x-2" onClick={toggleLike}>
          <FaHeart className={`cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`} />
          <span>{likesCount}</span>
        </button>

        <div className="flex items-center space-x-2">
          <FaComment
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowCommentInput(!showCommentInput)}
          />
          <span>{comments.length}</span>
        </div>

        {isOwner && (
          <button className="text-red-500" onClick={handleDeletePost}>
            <FaTrash className="cursor-pointer" />
          </button>
        )}
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-6 text-left">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet.</p>
        ) : comments.map((cmt, index) => (
          <div key={index} className="p-2 border-b border-gray-300">
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer" 
              onClick={() => cmt.user.isCurrentUser ? navigate("/profile") : navigate(`/profile/${cmt?._doc?.user?._id}`)}
            >
              <div className="flex items-center">
                <img
                  src={cmt._doc?.user?.profilePicture?.url || "/default-profile.png"}
                  alt={cmt._doc?.user?.username || "Anonymous"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="ml-2 text-sm font-semibold">{cmt._doc?.user?.username || "Anonymous"}</p>
              </div>
            </div>
            <p className="text-gray-700">{cmt._doc?.text || "No comment text."}</p>
          </div>
        ))}
      </div>

      {/* Full-Screen Image Modal */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
          onClick={closeFullScreen}
        >
          <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ViewPosts;