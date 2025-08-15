import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCar, FaGasPump, FaCogs, FaUsers, FaStar } from 'react-icons/fa';
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
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  if (isError) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto mt-10">
      <p className="font-bold">Error</p>
      <p>{error.message}</p>
      <button
        onClick={refetch}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="py-16 mt-4">
      {/* Heading */}
      <div className="text-center mb-16 bg-gradient-to-r from-blue-800 via-blue-500 to-indigo-700 px-6 py-10 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Our Premium Collection
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
          Discover the perfect vehicle for your journey among our carefully curated selection
        </p>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Array.isArray(data) && data.map(car => (
          <Link to={`/car/${car._id}`} key={car._id}>
            <div

              className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 md:h-72 bg-gray-200 overflow-hidden rounded-t-2xl">
                <img
                  src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {car.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Featured
                  </div>
                )}
              </div>

              {/* Card Content */}
              {/* Card Content */}
              <div className="p-6 flex flex-col">
                {/* Name & Price */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                    {car.name}
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    ${car.price}/day
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {car.description || "Luxury vehicle with premium features"}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCar className="text-gray-500" /> {car.type || "Sedan"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGasPump className="text-gray-500" /> {car.fuel || "Petrol"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCogs className="text-gray-500" /> {car.transmission || "Automatic"}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-gray-500" /> {car.seat || "5"} Seats
                  </div>
                  <div className="flex items-center gap-2">
                    {car.isRented === true ? <span className="text-red-500">Not Available</span> : <span className="text-green-500">Available</span>}
                  </div>
                </div>


                {/* Rating & Button */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{car.rating || "4.8"}</span>
                  </div>
                  <Link to={`/reserve/${car._id}`}>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl shadow-md transition-all duration-300">
                      Rent Now
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OurCar;
