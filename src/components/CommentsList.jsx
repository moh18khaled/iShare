import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments available.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg mb-3 shadow-sm"
          >
            <img
              src={comment.user.profilePicture.url}
              alt={comment.user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{comment.user.username}</h3>
              <p className="text-gray-700">{comment.text}</p>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;
