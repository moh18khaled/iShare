import axios from "axios";
import React, { useContext } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { User } from "../../context/context";
import Swal from "sweetalert2"; // For displaying error messages

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Pricing = () => {
  const businessOwnerNow = useContext(User);

  const handlePayment = async () => {
    try {
      // Check if businessOwnerNow contains data
      if (!businessOwnerNow.businessOwnerAuth.businessOwnerDetails) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You must be logged in as a business owner to proceed with payment.",
        });
        return;
      }

      // Proceed with payment if businessOwnerNow contains data
      const response = await axios.post(`${apiBaseUrl}/payments/create-order`, {
        amount: "25",
        currency: "USD",
      });

      console.log("Response:", response.data); // Debugging

      if (response.data && response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl; // Redirect to PayPal
      } else {
        console.error("Error: No checkout URL found.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No checkout URL found. Please try again.",
        });
      }
    } catch (error) {
      console.error("Payment request failed:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.response?.data?.error || "An error occurred during payment. Please try again.",
      });
    }
  };

  // Animation variants for the title and subtitle
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the pricing cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="pricing" className="font-raleway bg-[#F5E6D3] py-16">
      {/* Section Title */}
      <motion.div
        className="container mx-auto text-center mb-12"
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
          className="text-3xl text-black font-bold mb-4"
          variants={titleVariants}
        >
          Membership Tiers
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500"
          variants={titleVariants}
        >
          Unlock More Value, Insights, and Opportunities with iShare Community Memberships
        </motion.p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        className="w-[90%] mx-auto grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3, // Delay between each pricing card animation
            },
          },
        }}
      >
        {/* Free Tier */}
        <motion.div
          className="bg-[#E6D5C1] rounded-lg shadow-lg p-10"
          variants={cardVariants}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Community Explorer
          </h3>
          <h4 className="text-center text-4xl font-bold text-mainColor mb-6">
            <sup className="text-2xl">$</sup>0
            <span className="text-xl text-[#ADA091]"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Post up to 3 reviews per month</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Access to basic community insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Standard content visibility</span>
            </li>
            <li className="flex items-center opacity-50">
              <FaTimes className="text-[#8B8175] mr-2 line-t" />
              <span className="line-through">Limited AI-powered recommendation</span>
            </li>
            <li className="flex items-center opacity-50">
              <FaTimes className="text-[#8B8175] mr-2" />
              <span className="line-through">No advanced analytics</span>
            </li>
          </ul>
          <div className="text-center mt-16 pb-10">
            <button
              className="px-10 py-3 bg-[#F5E6D3] text-[#8B8175] font-medium rounded-lg hover:bg-mainColor hover:text-white transition duration-300"
            >
              Start Free
            </button>
          </div>
        </motion.div>

        {/* Pro Tier */}
        <motion.div
          className="bg-[#E6D5C1] rounded-lg shadow-lg p-10"
          variants={cardVariants}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Experience Pro
          </h3>
          <h4 className="text-center text-5xl font-bold mb-6">
            <sup className="text-2xl">$</sup>9.99
            <span className="text-xl"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Unlimited review submissions</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Advanced community insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Priority content visibility</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Full AI-powered recommendations</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Detailed personal analytics</span>
            </li>
          </ul>
          <div className="text-center mt-8 pb-10">
            <button
              onClick={handlePayment}
              className="px-10 py-3 bg-[#030303] text-white font-medium rounded-lg hover:bg-[#8B4513] transition duration-300"
            >
              Go Pro
            </button>
          </div>
        </motion.div>

        {/* Enterprise Tier */}
        <motion.div
          className="bg-[#E6D5C1] rounded-lg shadow-lg p-10"
          variants={cardVariants}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Business Insights
          </h3>
          <h4 className="text-center text-4xl font-bold text-mainColor mb-6">
            <sup className="text-2xl">$</sup>49.99
            <span className="text-xl text-[#ADA091]"> / month</span>
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Comprehensive market research</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Anonymized consumer behavior data</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Custom demographic insights</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Competitor analysis reports</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-[#0A9755] mr-2" />
              <span>Dedicated account manager</span>
            </li>
          </ul>
          <div className="text-center mt-16 pb-10">
            <a
              href="#"
              className="px-10 py-3 bg-[#F5E6D3] text-[#8B8175] font-medium rounded-lg hover:bg-mainColor hover:text-white transition duration-300"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Pricing;