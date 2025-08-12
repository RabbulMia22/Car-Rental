import React from 'react';

function Banner() {
  return (
    <div className="max-w-7xl mx-auto mt-14 mb-14 px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 mt-24">

  {/* Image Section - Top on mobile */}
  <div className="flex-1 order-1 md:order-2">
    <img 
      src="https://khanrentacar.com/wp-content/uploads/2025/03/p32.webp" 
      alt="Luxury Car Rental"
      className="w-[613px] h-[300px] md:h-[400px] "
    />
  </div>

  {/* Text Section - Bottom on mobile */}
  <div className="flex-1 text-center md:text-left order-2 md:order-1">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
      Best <span className="text-blue-600">Rent A Car</span> in Bangladesh
    </h2>
    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
      Looking for a reliable car rental service? 
      <span className="font-semibold text-gray-800"> Khan Rent A Car </span> 
      offers well-maintained vehicles like Prado, Premio, HiAce, and Noah for city rides, tours, 
      and business trips. Enjoy flexible plans, easy booking, and trusted service. Drive with confidence today!
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
