import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16">
      {/* Section Title */}
      <div className="w-[90%] mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-gray-500">
          Connect, Collaborate, and Shape the Future of Community-Driven Insights
        </p>
      </div>
      {/* Contact Content */}
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="100">
        {/* Contact Info */}
        <div className="space-y-8">
          <div
            className="bg-gray-800 text-white p-8 rounded-lg flex flex-col justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaMapMarkerAlt className="text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-bold">Address</h3>
            <p className="text-gray-400">Degla Square, Maadi, Cairo Governorate</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div
              className="bg-gray-800 text-white p-8 rounded-lg flex flex-col justify-center items-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaPhoneAlt className="text-4xl text-green-500 mb-4" />
              <h3 className="text-lg font-bold">Call Us</h3>
              <p className="text-gray-400">+201011031845</p>
            </div>
            <div
              className="bg-gray-800 text-white p-8 rounded-lg flex flex-col justify-center items-center overflow-x-auto sm:overflow-clip"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaEnvelope className="text-4xl text-green-500 mb-4" />
              <h3 className="text-lg font-bold">Email Us</h3>
              <p className="text-gray-400">mustafaabdelghany@isharee.com</p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div
          className="bg-gray-800 p-8 rounded-lg"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <form action="forms/contact.php" method="post" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                className="form-control w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                className="form-control w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Email"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              className="form-control w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Subject"
              required
            />
            <textarea
              name="message"
              rows="4"
              className="form-control w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Message"
              required
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
