import React, { useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";

const CreatePostPage = () => {
    const [text,setText] = useState("");

   const handleSubmit = (e)=>{
    e.preventDefault();
   } 

  const handleImageUpload = async(event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Access the first file in the FileList
    if(!file) return;

    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","original")
    data.append("cloud_name","dqmp5l622")

    const imageResponse = await fetch("https://api.cloudinary.com/v1_1/dqmp5l622/image/upload",{
        method : "POST",
        body : data,
    })

    const uploadImageUrl = await imageResponse.json();
    console.log(uploadImageUrl);

    console.log(file);
  };

  const handleVideoUpload = async(event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Access the first file in the FileList
    if(!file) return;

    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","original")
    data.append("cloud_name","dqmp5l622")
    data.append("chunk_size", 6000000);

    const videoResponse = await fetch("https://api.cloudinary.com/v1_1/dqmp5l622/video/upload", {
        method: "POST",
        body: data,
      });

    const uploadVideoUrl = await videoResponse.json();
    console.log(uploadVideoUrl);

    console.log(file);
  };
  console.log(text);
  return (
    <div className="min-h-screen bg-red-50 p-6">
      {/* Create Post Form */}
      <div className="max-w-2xl mx-auto my-auto bg-red-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-red-900 mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e)=>setText(e.target.value)}
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