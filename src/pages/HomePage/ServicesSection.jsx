import React from "react";
import { Link } from "react-router-dom"; 

const ServicesSection = () => {
  const services = [
    {
      icon: "https://i.postimg.cc/vDz6wQVN/photo-1.jpg",
      alt : "Food and Beverage Reviews",
      title: "Food and Beverage Insights",
      description:
        "Users share their feedback on various dining experiences, helping others make informed choices about restaurants, cafes, and culinary destinations.",
    },
    {
      icon: "https://i.postimg.cc/Bj88FHwr/photo-2.jpg",
      alt : "Healthcare Service Feedback",
      title: "Healthcare Service Feedback",
      description:
        "Individuals provide reviews on healthcare services, assisting users in selecting the best healthcare products, medical professionals, clinics, and hospitals.",
    },
    {
      icon: "https://i.postimg.cc/mtg1b032/photo-3.jpg",
      alt : "Fashion and Lifestyle Reviews",
      title: "Educational Insights Services",
      description:
        "Get personalized education advice, discover the latest trends that match your style. Share your experiences to help others make informed education, extracurricular program choices inside and outside Egypt.",
    },
    {
      icon: "https://i.postimg.cc/6yb2TYzV/photo-4.jpg",
      alt : "Education Service Reviews",
      title: "Fashion and Lifestyle Perspectives",
      description:
        "Users review fashion and lifestyle products, giving insights that help peers choose the right products and sharing shopping experiences for comprehensive learning.",
    },
    {
      icon: "https://i.postimg.cc/WdQdwzBh/photo-5.jpg",
      alt : "Travel Experience Reviews",
      title: "Businesses Promotion",
      description:
        "Businesses showcase their offerings through user-driven feedback and reviews, increasing visibility and connecting directly with potential customers.",
    },
  ];

  return (
    <div>
      <section className="pt-36 pb-16 bg-gray-50 text-center z-10">
        <h1 className="md:text-4xl sm:text-2xl font-semibold font-montserrat text-mainColor mb-[40px]">SERVICES</h1>
      <h2 className="md:text-2xl sm:text-xl text-black mb-[80px]">
      Discover, Share, and Empower Your Experiences Across Multiple Domains
      </h2>
      <div className="flex flex-wrap justify-center gap-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative max-w-xs md:w-auto bg-white border-2 z-20 border-mainColor rounded-3xl shadow-md p-6 px-4 transition-transform transform hover:scale-105 min-h-[380px]"
          >
            <div className="absolute inset-1 border-2 border-mainColor rounded-3xl pointer-events-none"></div>

            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border-2 border-mainColor rounded-full h-20 w-20 flex items-center justify-center shadow-md">
              <div className="border-2 border-mainColor rounded-full h-16 w-16 flex items-center justify-center">
                <img
                  src={service.icon}
                  alt={service.alt}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>

            <h3 className="mt-12 text-xl font-semibold font-nunito mb-4">
              {service.title}
            </h3>
            <p className="text-med text-gray-600 mb-6 px-2 font-nunito">{service.description}</p>

            
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default ServicesSection;
