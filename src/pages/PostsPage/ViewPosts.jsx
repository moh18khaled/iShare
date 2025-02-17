import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaComment, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ViewPosts = () => {
  const { id } = useParams();
      const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts/${id}`);
      const data = response.data;
      setPost(data.post);
      setIsLiked(data.isLiked);
      setLikesCount(data.likesCount);
      setIsOwner(data.isOwner);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts/${id}/comments`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await axios.post(`${apiBaseUrl}/posts/${id}/addComment`, { text: comment });
        setComment("");
        fetchComments();
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    }
  };
// Handle delete post
const handleDeletePost = async () => {
  try {
    await axios.delete(`${apiBaseUrl}/posts/${id}`);
    navigate('/all/posts');
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};

  const toggleLike = async () => {
    try {
      setIsLiked(!isLiked); // Optimistic UI update
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1); // Adjust like count
  
      const response = await axios.patch(`${apiBaseUrl}/posts/${id}/toggleLike`);
      setIsLiked(response.data.isLiked); // Ensure actual state from API
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };
  if (loading) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-[95%] mx-auto text-center max-w-4xl shadow-2xl p-10 rounded-lg">
      {/* Post Author */}
      <div className="flex items-center mb-6">
        <img
          src={post?.author?.profilePicture?.url || "/default-profile.png"}
          alt={post?.author?.username || "Unknown User"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{post?.author?.username || "Unknown User"}</p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-3xl font-bold mb-4">{post?.title || "No Title"}</h1>

      {post?.image?.url && (
        <img
          src={post.image.url}
          alt={post.title}
          className="w-72 h-auto mx-auto object-cover rounded-lg"
        />
      )}

      <p className="text-gray-700 mt-6">{post?.content || "No content available."}</p>

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
        ) : (
          comments.map((cmt, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <div className="flex items-center mb-2">
                <img
                  src={cmt?.user?.profilePicture?.url || "/default-profile.png"}
                  alt={cmt?.user?.username || "Anonymous"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="ml-2 text-sm font-semibold">{cmt?.user?.username || "Anonymous"}</p>
              </div>
              <p className="text-gray-700">{cmt?.text || "No comment text."}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPosts;
