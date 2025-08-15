import React from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCar, FaGasPump, FaCogs, FaUsers, FaStar, FaHeart, FaShareAlt, FaMapMarkerAlt, FaCalendarAlt, FaCarSide } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";

export default function CarDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: car, isLoading, isError, error } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cars/${id}`);
      return res.data;
    },
  });

  const getBangladeshDateTime = (utcDateString) => {
  const date = new Date(utcDateString);
  return date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 24-hour format
  });
};


  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-lg shadow-md">
        <h2 className="font-bold text-xl mb-2">Oops! Something went wrong</h2>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50  mt-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{car.name}</h1>
              <div className="flex items-center gap-2 text-blue-200">
                <FaMapMarkerAlt className="text-sm" />
                <span>Available at our downtown location</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-yellow-300">${car.price}<span className="text-lg text-white">/day</span></div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-sm ${i < Math.floor(car.rating || 4.8) ? 'text-yellow-400' : 'text-gray-400'}`} />
                ))}
                <span className="ml-1 text-white/80">({car.reviews || 24} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex-1 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"}
                alt={car.name}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all">
                  <img
                    src={car[`image${item}`] || `https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
                    alt={`${car.name} view ${item}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-6">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                  <FaHeart />
                </button>
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                  <FaShareAlt />
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {car.description || "This premium vehicle combines luxury and performance with its sleek design and advanced features. Perfect for both city driving and long road trips, offering comfort and style in one package."}
                </p>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <FaCar className="text-blue-600 text-xl" />
                    <span className="font-medium">{car.type || "Premium Sedan"}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <FaGasPump className="text-blue-600 text-xl" />
                    <span className="font-medium">{car.fuel || "Hybrid"}</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <FaUsers className="text-blue-600 text-xl" />
                    <span className="font-medium">{car.seats || "5"} Seats</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <IoMdSpeedometer className="text-blue-600 text-xl" />
                    <span className="font-medium">{car.mileage || "28"} MPG</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <GiCarDoor className="text-blue-600 text-xl" />
                    <span className="font-medium">{car.doors || "4"} Doors</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <FaCogs className="text-blue-600 text-xl" /><br />
                <p className="font-medium"> Available Time: {getBangladeshDateTime(car.rentalStartTime)} to <br /> <span>{getBangladeshDateTime(car.rentalEndTime)}</span> </p>
              </div>

              {/* Booking Card */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">


                <div className="space-y-4">

                  <Link to={`/reserve/${car._id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2">
                      <FaCarSide /> Reserve Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}