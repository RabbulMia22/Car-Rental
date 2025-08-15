import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "motion/react"


function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      delay: 900,     
      once: true      
    });
  }, []);

  return (
   <div className="max-w-7xl mx-auto mt-14 mb-14 px-4">
  <div className="flex flex-col md:flex-row items-center gap-10 mt-24">

    {/* Image Section */}
    <div 
      className="flex-1 order-1 md:order-2 flex justify-center" 
      data-aos="zoom-in-down"
    >
      <motion.img
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
        src="https://khanrentacar.com/wp-content/uploads/2025/03/p32.webp"
        alt="Luxury Car Rental"
        className="w-full max-w-md h-auto"
      />
    </div>

    {/* Text Section */}
    <div 
      className="flex-1 text-center md:text-left order-2 md:order-1" 
      data-aos="fade-right"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
        Best{" "}
        <motion.span 
          animate={{
            color: [
              "#3B82F6", "#1D4ED8", "#3B82F6", "#60A5FA", 
              "#2563EB", "#3B82F6", "#C084FC", "#8B5CF6", "#7C3AED"
            ],
            transition: { duration: 3, repeat: Infinity, repeatType: "loop" }
          }}
          className="text-blue-600"
        >
          Rent A Car
        </motion.span>{" "}
        in Bangladesh
      </h2>
      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
        Looking for a reliable car rental service?{" "}
        <span className="font-semibold text-gray-800">Khan Rent A Car</span>{" "}
        offers well-maintained vehicles like Prado, Premio, HiAce, and Noah
        for city rides, tours, and business trips. Enjoy flexible plans,
        easy booking, and trusted service. Drive with confidence today!
      </p>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md">
          Book Now
        </button>
        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  </div>
</div>
  );
}

export default Banner;
