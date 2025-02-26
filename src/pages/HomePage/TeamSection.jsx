import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import kareemImage from "../../assets/images/kareem.jpg";
import mohamedImage from "../../assets/images/mohamed.jpg";
import asmaaImage from "../../assets/images/asmaa.jpg";

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
    // {
    //   name: "Kareem Ragab",
    //   position: "Frontend Developer",
    //   image: `${kareemImage}`,
    //   social: {
    //     twitter: "#",
    //     facebook: "#",
    //     instagram: "#",
    //     linkedin: "#",
    //   },
    // },
    // {
    //   name: "Mohamed Khaled",
    //   position: "Backend Developer",
    //   image: `${mohamedImage}`,
    //   social: {
    //     twitter: "#",
    //     facebook: "#",
    //     instagram: "#",
    //     linkedin: "#",
    //   },
    // },
    // {
    //   name: "Asmaa Abdelbari",
    //   position: "Chief Financial Officer",
    //   image: `${asmaaImage}`,
    //   social: {
    //     twitter: "#",
    //     facebook: "#",
    //     instagram: "#",
    //     linkedin: "#",
    //   },
    // },
  ];

  // Map social media platforms to React Icons components
  const socialIcons = {
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="team" className="font-poppins bg-[#F5E6D3] py-16 pt-64 pb-52">
      {/* Section Title */}
      <motion.div
        className="w-[95%] mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold mb-6"
          variants={itemVariants}
        >
          Team
        </motion.h2>
        <motion.p
          className="text-gray-500"
          variants={itemVariants}
        >
          Empowering Diverse Talents, Uniting Innovative Minds Behind iShare's Vision
        </motion.p>
      </motion.div>

      {/* Team Members */}
      <motion.div
        className="w-[95%] mx-auto flex flex-wrap justify-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group max-w-sm bg-[#E6D5C1] rounded-lg shadow-lg overflow-hidden"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300 }}
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
                      className="bg-gray-600 text-gray-400 mt-40 hover:text-white w-12 h-12 flex items-center justify-center rounded-full text-xl transition-transform duration-300 transform translate-y-6 group-hover:translate-y-0"
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
              <p className="text-sm">{member.position}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TeamSection;