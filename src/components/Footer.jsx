import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5E6D3] py-12">
      {/* Footer Top */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer About */}
          <div>
            <a href="index.html" className="text-mainColor text-2xl font-bold">
              iShare.
            </a>
            <div className="mt-4">
              <p>Degla Square, Maadi, Cairo Governorate</p>
              <p className="mt-3">
                <strong>Phone:</strong> +201011031845
              </p>
              <p>
                <strong>Email:</strong> mustafaabdelghany@isharee.com
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className=" bg-[#E6D5C1] p-3 rounded-full hover:text-white hover:bg-[#8B4513]">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="bg-[#E6D5C1] p-3 rounded-full hover:text-white hover:bg-[#8B4513]">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="bg-[#E6D5C1] p-3 rounded-full hover:text-white hover:bg-[#8B4513]">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="bg-[#E6D5C1] p-3 rounded-full hover:text-white hover:bg-[#8B4513]">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          {/* Useful Links */}
          <div>
            <h4 className="text-mainColor text-lg font-bold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-mainColor">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  Services
                </a>
              </li>
            </ul>
          </div>
          {/* Our Services */}
          <div>
            <h4 className="text-mainColor text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-mainColor">
                  Food and Beverage Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  Healthcare Service Feedback
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  Education Program Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  Stylish Fashion Perspectives
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mainColor">
                  Business Promotion Opportunities
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-mainColor text-lg font-bold mb-4">Our Newsletter</h4>
            <p className="mb-4">
              Subscribe to our newsletter and receive the latest news about our
              products and services!
            </p>
            <form action="forms/newsletter.php" method="post" className="flex">
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded bg-[#F5E6D3] border-2 border-r-0 border-[#CDCDCD] text-mainColor placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-0"
                required
              />
              <button
                type="submit"
                className="bg-mainColor hover:bg-hoverColor text-white font-bold py-2 px-4 rounded transition-all duration-300"
              >
                Subscribe
              </button>
              <div className="loading hidden">Loading</div>
              <div className="error-message hidden">Error occurred.</div>
              <div className="sent-message hidden">Your subscription request has been sent. Thank you!</div>
            </form>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-12 text-center text-gray-500">
        <p>
          Copyright <strong className="text-mainColor">iShare.</strong> All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
