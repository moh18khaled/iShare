import React from 'react'
import 'aos/dist/aos.css';
import { motion } from "framer-motion"; // Import Framer Motion

const Categories = () => {
    
    // Animation variants for the filter buttons
  const filterButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };  
  return (
    <div className='mt-12' data-aos="fade-up" data-aos-delay="100">
      <motion.div
          className="filter-container text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // Delay between each filter button animation
              },
            },
          }}
        >
          <div className="filter-buttons inline-flex flex-wrap justify-center gap-3">
            <motion.button
              className="filter-btn px-8 py-4 bg-[#FF7D5F] rounded-full text-white text-lg hover:bg-[#FF7D5F] transition-all"
              variants={filterButtonVariants}
            >
              All Categories
            </motion.button>
            <motion.button
              className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300"
              variants={filterButtonVariants}
            >
              Dining
            </motion.button>
            <motion.button
              className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300"
              variants={filterButtonVariants}
            >
              Healthcare
            </motion.button>
            <motion.button
              className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300"
              variants={filterButtonVariants}
            >
              Education
            </motion.button>
            <motion.button
              className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300"
              variants={filterButtonVariants}
            >
              Fashion
            </motion.button>
          </div>
        </motion.div>
    </div>
  )
}

export default Categories
