import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

export default function AddCarForm() {
  const { register, handleSubmit, reset } = useForm({});
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(null);
  const [selected, setSelected] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await axiosSecure.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      }
      let rentalStart = null;
      let rentalEnd = null;

      if (startDate && startTime) {
        const [hours, minutes] = startTime.split(":");
        const start = new Date(startDate);
        start.setHours(parseInt(hours, 10));
        start.setMinutes(parseInt(minutes, 10));
        rentalStart = start.toISOString();
      }

      if (endDate && endTime) {
        const [hours, minutes] = endTime.split(":");
        const end = new Date(endDate);
        end.setHours(parseInt(hours, 10));
        end.setMinutes(parseInt(minutes, 10));
        rentalEnd = end.toISOString();
      }

      const payload = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        available: data.available,
        image: imageUrl,
        rentalStartTime: rentalStart,
        rentalEndTime: rentalEnd,
        rentalStart: startDate || null,
        rentalEnd: endDate || null,
        pickupLocation: {
          address: data.pickupAddress,
          coordinates: {
            lat: Number(data.pickupLat),
            lng: Number(data.pickupLng),
          },
        },
        dropoffLocation: {
          address: data.dropoffAddress,
          coordinates: {
            lat: Number(data.dropoffLat),
            lng: Number(data.dropoffLng),
          },
        },
        isRented: data.isRented,
        renter: data.renter || null,
        type: selected || "",
        seat: Number(data.seat) || 0,
        fuel: data.fuel || "",
      };


      await axiosSecure.post("/cars", payload);
      Swal.fire({
        title: "Success!",
        text: "Car added successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
      reset();
      setImageFile(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Error adding car",
        confirmButtonColor: "#d33",
      });
    }
  };

  const filterTypes = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
    { value: "electric-vehicle", label: "Electric Vehicle" },
    { value: "pickup-truck", label: "Pickup Truck" },
    { value: "luxury", label: "Luxury" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 my-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🚗 Add New Car
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Car Info */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Car Name*</label>
              <input
                type="text"
                placeholder="e.g., Tesla Model 3"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                placeholder="e.g., Tesla"
                {...register("brand")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price*</label>
              <input
                type="number"
                placeholder="Daily rate in USD"
                {...register("price", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Car Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Car Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Car Type</label>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {filterTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Rental Dates */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rental Period</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-1">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Select date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                {/* Start Time */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-1">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="Select date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                {/* End Time */}
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input
                type="text"
                placeholder="Address"
                {...register("pickupAddress")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Latitude"
                  {...register("pickupLat")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  {...register("pickupLng")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Dropoff Location</label>
              <input
                type="text"
                placeholder="Address"
                {...register("dropoffAddress")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Latitude"
                  {...register("dropoffLat")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  {...register("dropoffLng")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Seats</label>
                <input
                  type="number"
                  placeholder="Number of seats"
                  {...register("seat")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                <input
                  type="text"
                  placeholder="e.g., Electric"
                  {...register("fuel")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  {...register("available")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                Available
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  {...register("isRented")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                Currently Rented
              </label>
            </div>

            {/* Renter ID */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Renter ID (if rented)</label>
              <input
                type="text"
                placeholder="User ID"
                {...register("renter")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:scale-[1.01]"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}