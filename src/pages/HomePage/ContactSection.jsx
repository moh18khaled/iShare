import axios from "axios";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Swal from 'sweetalert2';
import { motion } from "framer-motion"; // Import Framer Motion

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ContactSection = () => {
  const [confirmSendMessage, setConfirmSendMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/user/contact`, formData);
      console.log(response);
      setConfirmSendMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      Swal.fire({
        title: `${confirmSendMessage}`,
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Animation variants for the title and subtitle
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the contact info cards and form
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="py-16">
      {/* Section Title */}
      <motion.div
        className="w-[90%] mx-auto text-center mb-12"
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
          Contact
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500"
          variants={titleVariants}
        >
          Connect, Collaborate, and Shape the Future of Community-Driven Insights
        </motion.p>
      </motion.div>

      {/* Contact Content */}
      <motion.div
        className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3, // Delay between each child animation
            },
          },
        }}
      >
        {/* Contact Info */}
        <motion.div
          className="space-y-8"
          variants={cardVariants}
        >
          {/* Address Card */}
          <motion.div
            className="bg-white shadow-lg px-6 py-12 rounded-lg flex flex-col justify-center items-center"
            variants={cardVariants}
          >
            <FaMapMarkerAlt className="text-4xl text-mainColor mb-4" />
            <h3 className="text-lg font-bold">Address</h3>
            <p className="text-gray-400">Degla Square, Maadi, Cairo Governorate</p>
          </motion.div>

          {/* Phone and Email Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={cardVariants}
          >
            {/* Phone Card */}
            <motion.div
              className="bg-white shadow-lg p-8 rounded-lg flex flex-col justify-center items-center"
              variants={cardVariants}
            >
              <FaPhoneAlt className="text-4xl text-mainColor mb-4" />
              <h3 className="text-lg font-bold">Call Us</h3>
              <p className="text-gray-400">+201011031845</p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              className="bg-white shadow-lg p-8 rounded-lg flex flex-col justify-center items-center overflow-x-auto sm:overflow-clip"
              variants={cardVariants}
            >
              <FaEnvelope className="text-4xl text-mainColor mb-4" />
              <h3 className="text-lg font-bold">Email Us</h3>
              <p className="text-gray-400">mustafaabdelghany@isharee.com</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white shadow-lg rounded-lg"
          variants={cardVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
                placeholder="Your Email"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
              placeholder="Subject"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
              placeholder="Message"
              required
            ></textarea>
            <div className="text-center pb-6">
              <button
                type="submit"
                className="bg-mainColor hover:bg-hoverColor text-white font-bold py-3 px-10 rounded-full transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;