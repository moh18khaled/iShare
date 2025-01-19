import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      {/* Footer Top */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer About */}
          <div>
            <a href="index.html" className="text-white text-2xl font-bold">
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
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          {/* Useful Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Services
                </a>
              </li>
            </ul>
          </div>
          {/* Our Services */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Food and Beverage Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Healthcare Service Feedback
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Education Program Insights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Stylish Fashion Perspectives
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Business Promotion Opportunities
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Our Newsletter</h4>
            <p className="mb-4">
              Subscribe to our newsletter and receive the latest news about our
              products and services!
            </p>
            <form action="forms/newsletter.php" method="post" className="flex flex-col space-y-4">
              <input
                type="email"
                name="email"
                className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Email"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
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
          Copyright <strong className="text-green-500">iShare.</strong> All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
