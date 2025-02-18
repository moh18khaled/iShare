import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const ViewPosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState({
    username: '',
    profilePicture: '',
    userId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [publicId,setPublicId] = useState("");
  const apiBaseUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get(`${apiBaseUrl}/posts`);
        const posts = postsResponse.data.posts;
        const foundPost = posts.find((p) => p._id === id);
        setPublicId(foundPost.image.public_id);

        if (foundPost) {
          setPost(foundPost);
          setUser({
            username: foundPost.author?.username,
            profilePicture: foundPost.author?.profilePicture?.url,
            userId: foundPost.author?._id,
          });
          setLikeCount(foundPost.likeCount || 0);

          const commentsResponse = await axios.get(`${apiBaseUrl}/posts/${id}/comments`);
          setComments(commentsResponse.data.comments);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.patch(`${apiBaseUrl}/posts/${id}/toggleLike`);
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post(`${apiBaseUrl}/posts/${id}/addComment`, {
          text: comment,
          userId: user.userId,
        });
        setComments([...comments, response.data]);
        setComment('');
        setShowCommentInput(false);
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${apiBaseUrl}/posts/${id}/removeComment/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };
  
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/posts/${id}/${publicId}`);
      navigate('/posts');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-32">Loading...</div>;
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
          src={user.profilePicture}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{user.username}</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Media (Image or Video) */}
      {post.mediaType === 'video' ? (
        <video
          src={post.video.url}
          controls
          className="w-72 h-auto mx-auto object-cover rounded-lg"
        />
      ) : (
        <img
          src={post.image.url}
          alt={post.title}
          className="w-72 h-auto mx-auto object-cover rounded-lg"
        />
      )}

      {/* Additional Details */}
      <div className="mt-6">
        <p className="text-gray-700">{post.content}</p>
      </div>

      {/* Icons for Like, Comment, Share */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2" onClick={handleLike}>
            <FaHeart className={liked ? 'text-red-500' : 'text-gray-500'} />
            <span>{likeCount}</span>
          </div>
          <div
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="flex items-center space-x-2"
          >
            <FaComment className="text-gray-500 cursor-pointer" />
            <span>{comments.length}</span>
          </div>
          <button
            onClick={handleDeletePost}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Comment Input Area */}
      {showCommentInput && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-mainColor"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-hoverColor"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {/* Display Comments */}
      <div className="mt-6 text-left">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={comment.user.profilePicture.url}
                    alt="User"
                  />
                  <p className="text-sm text-gray-500 mt-2">{comment.user.username}</p>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPosts;