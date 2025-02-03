import React from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa'; // Import icons

const ViewPosts = () => {
  const { id } = useParams();

  // Mock data for posts (replace with API call or context)
  const postData = [
    {
      id: 1,
      image: "https://img.freepik.com/premium-vector/encanto-valentine-card_1048941-690.jpg?size=626&ext=jpg",
      title: "Post Title 1",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/digital-art-snake-illustration_23-2151674350.jpg?size=626&ext=jpg",
      title: "Post Title 2",
      likes: 20,
      comments: 8,
    },
    // Add more posts as needed
  ];

  // Find the post by ID
  const post = postData.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="w-[95%] mx-auto mt-16 max-w-4xl shadow-2xl p-10 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Image */}
      <img
        src={post.image}
        alt="postImage"
        className="w-full h-auto object-cover rounded-lg"
      />

      {/* Icons for Like, Comment, Share */}
      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <div className="w-full flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaHeart className="text-red-500 cursor-pointer" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaComment className="text-gray-500 cursor-pointer" />
            <span>{post.comments}</span>
          </div>
          <FaShare className="text-green-500 cursor-pointer" />
        </div>
        
      </div>
    </div>
  );
};

export default ViewPosts;