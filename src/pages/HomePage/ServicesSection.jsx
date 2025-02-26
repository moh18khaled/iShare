import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const ServicesSection = () => {
  const services = [
    {
      icon: "https://i.postimg.cc/vDz6wQVN/photo-1.jpg",
      alt: "Food and Beverage Reviews",
      title: "Food and Beverage Insights",
      description:
        "Users share their feedback on various dining experiences, helping others make informed choices about restaurants, cafes, and culinary destinations.",
    },
    {
      icon: "https://i.postimg.cc/Bj88FHwr/photo-2.jpg",
      alt: "Healthcare Service Feedback",
      title: "Healthcare Service Feedback",
      description:
        "Individuals provide reviews on healthcare services, assisting users in selecting the best healthcare products, medical professionals, clinics, and hospitals.",
    },
    {
      icon: "https://i.postimg.cc/mtg1b032/photo-3.jpg",
      alt: "Fashion and Lifestyle Reviews",
      title: "Educational Insights Services",
      description:
        "Get personalized education advice, discover the latest trends that match your style. Share your experiences to help others make informed education, extracurricular program choices inside and outside Egypt.",
    },
    {
      icon: "https://i.postimg.cc/6yb2TYzV/photo-4.jpg",
      alt: "Education Service Reviews",
      title: "Fashion and Lifestyle Perspectives",
      description:
        "Users review fashion and lifestyle products, giving insights that help peers choose the right products and sharing shopping experiences for comprehensive learning.",
    },
    {
      icon: "https://i.postimg.cc/WdQdwzBh/photo-5.jpg",
      alt: "Travel Experience Reviews",
      title: "Businesses Promotion",
      description:
        "Businesses showcase their offerings through user-driven feedback and reviews, increasing visibility and connecting directly with potential customers.",
    },
  ];

  // Animation variants for the title and subtitle
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each child animation
      },
    },
  };

  // Animation variants for individual service cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }, // Hover effect
  };

  return (
    <div>
      <section id="services" className="font-poppins pt-36 pb-16 bg-[#F5E6D3] mt-20 text-center z-10">
        {/* Title and Subtitle */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // Delay between title and subtitle animations
              },
            },
          }}
        >
          {/* Title */}
          <motion.h1
            className="md:text-4xl sm:text-2xl font-semibold font-montserrat mb-[40px]"
            variants={titleVariants}
          >
            SERVICES
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="md:text-2xl sm:text-xl text-black mb-[80px]"
            variants={titleVariants}
          >
            Discover, Share, and Empower Your Experiences Across Multiple Domains
          </motion.h2>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} // Ensures the animation only happens once
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative max-w-xs md:w-auto bg-[#E8D8C5] border-2 z-20 border-mainColor rounded-3xl shadow-md p-6 px-4 transition-transform transform hover:scale-105 min-h-[380px]"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="absolute inset-1 border-2 border-mainColor rounded-3xl pointer-events-none"></div>

              {/* Icon Container */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#E8D8C5] border-2 border-mainColor rounded-full h-20 w-20 flex items-center justify-center shadow-md">
                <div className="border-2 border-mainColor rounded-full h-16 w-16 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.alt}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </div>

              {/* Service Content */}
              <h3 className="mt-12 text-xl font-semibold font-nunito mb-4">
                {service.title}
              </h3>
              <p className="text-med text-gray-600 mb-6 px-2 font-nunito">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesSection;