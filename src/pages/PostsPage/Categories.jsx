import React from 'react';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
    
    // Animation variants for the filter buttons
    const filterButtonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };  

    const categories = [
        { name: "All Categories", value: "all" },
        { name: "Dining", value: "Dining" },
        { name: "Healthcare", value: "Healthcare" },
        { name: "Education", value: "Education" },
        { name: "Fashion", value: "Fashion" },
        { name: "Movies", value: "Movies" },
        { name: "Books", value: "Books" }
    ];

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
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                <div className="filter-buttons inline-flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <motion.button
                            key={category.value}
                            className={`filter-btn px-8 py-4 rounded-full text-lg transition-all duration-300 ${
                                selectedCategory === category.value
                                    ? 'bg-[#FF7D5F] text-white'
                                    : 'bg-white shadow-lg text-gray-700 hover:bg-[#FF7D5F] hover:text-white'
                            }`}
                            variants={filterButtonVariants}
                            onClick={() => setSelectedCategory(category.value)}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Categories;