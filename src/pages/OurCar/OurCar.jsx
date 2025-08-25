import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCar, FaGasPump, FaCogs, FaUsers, FaStar, FaHeart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function OurCar() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cars");
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading our premium collection...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto mt-10 rounded-lg shadow-md">
      <p className="font-bold">Error</p>
      <p>{error.message}</p>
      <button
        onClick={refetch}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="py-16 mt-4">
      {/* Enhanced Heading */}
      <div className="relative text-center mb-16 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 px-6 py-16 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white opacity-5"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-white opacity-5"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Premium Collection
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the perfect vehicle for your journey among our carefully curated selection
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {Array.isArray(data) && data.map(car => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Image with gradient overlay */}
            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
              <img
                src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              
              {/* Featured badge */}
              {car.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md z-20">
                  Featured
                </div>
              )}
              
              {/* Price tag */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg z-20">
                ${car.price}/day
              </div>
              
              {/* Availability badge */}
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md z-20 ${car.isRented ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {car.isRented ? "Not Available" : "Available"}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col">
              {/* Name */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 truncate">
                {car.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                {car.description || "Luxury vehicle with premium features for your comfort and style."}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 text-gray-700 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <FaCar className="text-blue-500" /> 
                  <span>{car.type || "Sedan"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaGasPump className="text-blue-500" /> 
                  <span>{car.fuel || "Petrol"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaCogs className="text-blue-500" /> 
                  <span>{car.transmission || "Automatic"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaUsers className="text-blue-500" /> 
                  <span>{car.seat || "5"} Seats</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-2">
                <Link 
                  to={`/car/${car._id}`} 
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                >
                  <FaEye className="text-blue-600" />
                  <span>Details</span>
                </Link>
                
                <Link to={`/reserve/${car._id}`}>
                  <button
                    disabled={car.isRented}
                    className={`flex items-center gap-2 font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300 ${
                      car.isRented 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white'
                    }`}
                  >
                    {car.isRented ? "Already Rented" : "Reserve Now"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurCar;