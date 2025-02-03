import React from 'react';

const HeroSection = () => {
  
  return (
    <div>
      <div className="min-h-screen text-white grid bg-cover bg-[url('https://i.postimg.cc/GtnRPG5k/hero-bg.jpg')]">
        {/* Background Overlay */}
        <div className="col-start-1 row-start-1 bg-gray-900 bg-opacity-70 w-full h-full"></div>
        
        {/* Content */}
        <div className="col-start-1 row-start-1 mx-auto my-auto w-[80%]">
          <h1 className="font-bold text-3xl md:text-5xl text-center md:text-left leading-snug md:leading-snug">
            Share your <br />
            digital experience now <br />
            Contribute to empowering the digital <br /> word-of-mouth
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 text-center md:text-left leading-snug">
            Join iShare.com to connect with top experiences and insights across F&B, Fashion,
            <br /> healthcare, and education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
