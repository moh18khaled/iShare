import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16">
      {/* Section Title */}
      <div className="w-[90%] mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-gray-500">
          Connect, Collaborate, and Shape the Future of Community-Driven Insights
        </p>
      </div>
      {/* Contact Content */}
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8" >
        {/* Contact Info */}
        <div className="space-y-8">
          <div
            className="bg-white shadow-lg px-6 py-12 rounded-lg flex flex-col justify-center items-center"
           
          >
            <FaMapMarkerAlt className="text-4xl text-mainColor mb-4" />
            <h3 className="text-lg font-bold">Address</h3>
            <p className="text-gray-400">Degla Square, Maadi, Cairo Governorate</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div
              className="bg-white shadow-lg p-8 rounded-lg flex flex-col justify-center items-center"
              
            >
              <FaPhoneAlt className="text-4xl text-mainColor mb-4" />
              <h3 className="text-lg font-bold">Call Us</h3>
              <p className="text-gray-400">+201011031845</p>
            </div>
            <div
              className="bg-white shadow-lg p-8 rounded-lg flex flex-col justify-center items-center overflow-x-auto sm:overflow-clip"
              
            >
              <FaEnvelope className="text-4xl text-mainColor mb-4" />
              <h3 className="text-lg font-bold">Email Us</h3>
              <p className="text-gray-400">mustafaabdelghany@isharee.com</p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div
          className="bg-white shadow-lg rounded-lg"
         
        >
          <form action="forms/contact.php" method="post" className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded  placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded  placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
                placeholder="Your Email"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
              placeholder="Subject"
              required
            />
            <textarea
              name="message"
              rows="4" focus:border-0
              className="form-control border-2 border-[#CDCDCD] w-full p-3 rounded  placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-0 focus:ring-mainColor"
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
