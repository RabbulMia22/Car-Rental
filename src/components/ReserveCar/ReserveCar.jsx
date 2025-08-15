import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

export default function ReserveCar() {
  const { register, handleSubmit, control, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
   const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [value, setValue] = useState("");

  const { data: car, isLoading, isError, error } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cars/${id}`);
      return res.data;
    },
  });

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

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-20">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        🚗 Reserve Your Car
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Car Preview */}
        <div className="flex-1 overflow-hidden">
          <img
            src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
            alt="Car"
            className="w-full mt-20 rounded-lg object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Toyota Camry
            </h2>
            <p className="text-gray-600 mb-4">
              Luxury sedan, automatic transmission, 5 seats, Petrol.
            </p>
            <span className="text-xl font-semibold text-blue-600">$75/day</span>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                <MdDriveFileRenameOutline className="inline mr-1" /> Types Your Name
              </label>
              <input
                type="text"
                {...register("pickupLocation", { required: true })}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                <MdMarkEmailRead className="inline mr-1" /> Give Your Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Pickup Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                <FaMapMarkerAlt className="inline mr-1" /> Pickup Location
              </label>
              <input
                type="text"
                {...register("pickupLocation", { required: true })}
                placeholder="Enter pickup address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                <FaMapMarkerAlt className="inline mr-1" /> Dropoff Location
              </label>
              <input
                type="text"
                {...register("dropoffLocation", { required: true })}
                placeholder="Enter dropoff address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Rental Dates */}
            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  <FaCalendarAlt className="inline mr-1" /> Start Date
                </label>
                <Controller
                  control={control}
                  name="startDate"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select start date"
                    />
                  )}
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  <FaClock className="inline mr-1" /> Start Time
                </label>
                <input
                  type="time"
                  {...register("startTime", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  <FaCalendarAlt className="inline mr-1" /> End Date
                </label>
                <Controller
                  control={control}
                  name="endDate"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select end date"
                    />
                  )}
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  <FaClock className="inline mr-1" /> End Time
                </label>
                <input
                  type="time"
                  {...register("endTime", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Reserve Now
            </button>

            {submitted && (
              <p className="mt-4 text-green-600 font-semibold text-center">
                ✅ Car reserved successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
