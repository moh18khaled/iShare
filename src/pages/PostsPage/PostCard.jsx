import React from 'react';

const PostCard = () => {
    const postData = [
        {
            image : "https://img.freepik.com/premium-vector/encanto-valentine-card_1048941-690.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://img.freepik.com/free-photo/digital-art-snake-illustration_23-2151674350.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://img.freepik.com/free-photo/young-people-spending-quality-time-together_23-2151561894.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://img.freepik.com/free-photo/stunning-nature-landscape_23-2151922428.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://img.freepik.com/free-vector/hand-drawn-timeline-infographic_23-2148383097.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://img.freepik.com/premium-photo/young-woman-holding-whatsapp-smartphone_23-2147842245.jpg?size=626&ext=jpg",
            title : "Post Title", 
        },
        {
            image : "https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-woman.webp",
            title : "Post Title", 
        },
        {
            image : "https://cdn-front.freepik.com/images/ai/image-generator/gallery/65446.webp",
            title : "Post Title", 
        },
        {
            image : "https://cdn-front.freepik.com/images/ai/image-generator/gallery/resource-tti-13.webp",
            title : "Post Title", 
        },
        {
            image : "https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-man-in-a-red-robe-standing-on-a-cliff.webp",
            title : "Post Title", 
        },
        {
            image : "https://cdn-front.freepik.com/images/ai/image-generator/gallery/pikaso-dog.webp",
            title : "Post Title", 
        },
    ]
  return (
    <div className='w-[95%] mx-auto mt-16 flex justify-center flex-wrap gap-10'>
    {postData.map((post, idx) => (
    <div 
      key={idx} 
      className="max-w-72 h-auto rounded-lg overflow-hidden shadow-lg bg-white relative group"
      style={{ width: 'fit-content' }} // Adjust width dynamically
    >
      {/* Image */}
      <img className="w-fit h-full object-cover" src={post.image} alt="postImage" />

      {/* Title (hidden by default, appears on hover) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
        <h2 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
          {post.title}
        </h2>
      </div>
    </div>
  ))}
</div>

  );
};

export default PostCard;