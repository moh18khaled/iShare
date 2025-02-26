import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Almahdy",
      title: "Ceo & Founder",
      image: "https://i.postimg.cc/PpqnLzSZ/testimonials-1.png",
      feedback:
        "iShare revolutionized how I gather market insights. The AI-powered review analysis gives me deeper understanding of customer experiences than any traditional market research tool. It's like having a real-time focus group at my fingertips.",
    },
    {
      id: 2,
      name: "Nada Hegazy",
      title: "Pharmacist",
      image: "https://i.postimg.cc/TpbMWPJk/testimonials-2.png",
      feedback:
        "I've found iShare incredibly valuable. The platform's verified reviews help patients make informed healthcare decisions. It's not just a review site; it's a community that genuinely supports each other's well-being.",
    },
    {
      id: 3,
      name: "Mohamed Abdrashid",
      title: "Educational activist",
      image: "https://i.postimg.cc/mPGx3GdT/testimonials-3.png",
      feedback:
        "What sets iShare apart is its cross-domain insights. I can explore educational program reviews, restaurant experiences, and professional services all in one place. The AI filtering ensures I'm getting genuine, trustworthy information.",
    },
    {
      id: 4,
      name: "Marwa Sayed",
      title: "F&B Business Owner",
      image: "https://i.postimg.cc/8s9g5vMJ/testimonials-4.png",
      feedback:
        "iShare has been a lifeline for my restaurant. The platform's authentic reviews help me understand customer experiences and continuously improve. It's more than feedback; it's a collaborative improvement ecosystem.",
    },
    {
      id: 5,
      name: "Hossam Mohammed",
      title: "Entrepreneur",
      image: "https://i.postimg.cc/tnZ0kRQ4/testimonials-5.jpg",
      feedback:
        "iShare's business insights are game-changing. I've discovered emerging trends in my industry and connected with potential clients through authentic, detailed reviews. The community-driven approach sets it apart from generic review platforms.",
    },
  ];

  // Animation variants for the title and subtitle
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the Swiper slides
  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="font-roboto py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
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
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={titleVariants}
          >
            Testimonials
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-gray-600"
            variants={titleVariants}
          >
            Real Voices, Real Experiences: Transforming Insights Across Industries
          </motion.p>
        </motion.div>

        {/* Swiper Component */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3, // Delay between each Swiper slide animation
              },
            },
          }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={600}
            autoplay={{
              delay: 5000,
            }}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="init-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="p-4">
                <motion.div
                  className="bg-white shadow-xl rounded-lg p-6 mb-12 text-center"
                  variants={slideVariants}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mx-auto mb-4 w-28 h-28 rounded-full"
                  />
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <h4 className="text-sm text-gray-500">{testimonial.title}</h4>
                  <div className="mt-2 text-yellow-500 flex gap-1 justify-center">
                    {Array(5)
                      .fill()
                      .map((i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                  <p className="text-gray-600 mt-4 italic">
                    <FaQuoteLeft className="inline-block mr-2 text-mainColor" />
                    {testimonial.feedback}
                    <FaQuoteRight className="inline-block ml-2 text-mainColor" />
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;