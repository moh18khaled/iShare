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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto px-4 place-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative w-full max-w-[350px] h-[450px] bg-gradient-to-br from-[#E8D8C5] to-[#F5E6D3] border-2 z-20 border-mainColor rounded-[2rem] shadow-lg p-8 transition-transform transform hover:scale-105 backdrop-blur-sm hover:shadow-2xl"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-mainColor opacity-10 rounded-tr-[2rem] rounded-bl-[5rem]"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-mainColor opacity-10 rounded-bl-[2rem] rounded-tr-[5rem]"></div>

              {/* Icon Container */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-mainColor to-hoverColor rounded-full blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-[#E8D8C5] to-[#F5E6D3] border-2 border-mainColor rounded-full p-4 shadow-xl">
                    <img
                      src={service.icon}
                      alt={service.alt}
                      className="h-16 w-16 rounded-full object-cover transform transition-transform hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="mt-16">
                <h3 className="text-xl font-bold font-nunito mb-3 bg-gradient-to-r from-mainColor to-hoverColor bg-clip-text text-transparent">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-nunito text-base">
                  {service.description}
                </p>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-mainColor rounded-full opacity-20"></div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesSection;