import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import axios from "axios";
import image from "./../../assets/images/select.jfif";

const ViewPosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`${apiBaseUrl}/posts/${id}`);
        setPost(postResponse.data.post);
      } catch (error) {
        setError("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
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
  }

  if (error) {
    return <div className="text-center mt-16 text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-16">Post not found!</div>;
  }

  return (
    <div className="w-[95%] mx-auto text-center max-w-4xl shadow-2xl p-10 rounded-lg">
      {/* User Details */}
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt="kareem"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">kareem Ragab</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Image */}
      <img
        src={post.image?.url}
        alt={post.title}
        className="w-72 h-auto mx-auto object-cover rounded-lg"
      />

      {/* Additional Details */}
      <div className="mt-6">
        <p className="text-gray-700">{post.content}</p>
      </div>

      {/* Icons for Like, Comment, Share */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaHeart className="text-red-500 cursor-pointer" />
            <span>{post.likes || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaComment className="text-gray-500 cursor-pointer" />
            <span>{post.comments || 0}</span>
          </div>
          <FaShare className="text-green-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ViewPosts;
