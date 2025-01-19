import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mustafa Abdelghany",
      position: "Founder & Chief Executive Officer",
      image: "https://i.postimg.cc/pV0bLN2f/team-1.jpg",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Nourhan Nassr",
      position: "Chief Marketing Officer",
      image: "https://i.postimg.cc/KvV6tn34/team-2.jpg",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Ahmed Abdelbari",
      position: "Chief Financial Officer",
      image: "https://i.postimg.cc/Nf5hyNMW/team-3.jpg",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  // Map social media platforms to React Icons components
  const socialIcons = {
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
  };

  return (
    <section id="team" className=" py-16">
      {/* Section Title */}
      <div className="w-[95%] mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Team</h2>
        <p className="text-gray-500">
          Empowering Diverse Talents, Uniting Innovative Minds Behind iShare's Vision
        </p>
      </div>
      {/* Team Members */}
      <div className="w-[95%] mx-auto flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group max-w-sm bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
          >
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  {Object.entries(member.social).map(([platform, url], i) => (
                    <a
                      key={i}
                      href={url}
                      className="bg-gray-700 text-gray-400 mt-40 hover:text-white w-12 h-12 flex items-center justify-center rounded-full text-xl transition-transform duration-300 transform translate-y-6 group-hover:translate-y-0"
                      aria-label={platform}
                    >
                      {socialIcons[platform]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 text-center">
              <h4 className="text-lg font-bold">{member.name}</h4>
              <p className="text-sm text-gray-400">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
