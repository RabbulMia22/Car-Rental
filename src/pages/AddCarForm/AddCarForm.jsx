import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import { useState } from "react";

export default function AddCarForm() {
  const { register, handleSubmit, reset, watch } = useForm({});
   const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        available: data.available,
        rentalStart: data.rentalStart || null,
        rentalEnd: data.rentalEnd || null,
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
      };

    await axiosSecure.post("/cars", payload);
    } catch (err) {
      console.error(err);
      alert("Error adding car");
    }
  };

  const available = watch("available");
  const isRented = watch("isRented");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 mt-20">
      <input
        type="text"
        placeholder="Car Name"
        {...register("name", { required: true })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Brand"
        {...register("brand")}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Price"
        {...register("price", { required: true, valueAsNumber: true })}
        className="border p-2 w-full mb-2"
      />

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          {...register("available")}
          className="mr-2"
        />
        Available
      </label>

     <div className="flex flex-col gap-4">
  {/* First Row */}
  <div className="flex">
    <DatePicker
    selected={startDate} // ✅ Pass state
      onChange={(date) => setStartDate(date)} 
      placeholderText="Date"
      className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      dateFormat="MMMM d, yyyy"
    />
    <input
      type="time"
      className="px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Second Row */}
  <div className="flex">
    <DatePicker
      selected={endDate} // ✅ Pass state
      onChange={(date) => setEndDate(date)} // ✅ Update state
      placeholderText="Date"
      className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      dateFormat="MMMM d, yyyy"
    />
    <input
      type="time"
      className="px-3 py-2  border-t border-b border-r border-gray-300 rounded-r-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>


      <input
        type="text"
        placeholder="Pickup Address"
        {...register("pickupAddress")}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Pickup Latitude"
        {...register("pickupLat", { valueAsNumber: true })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Pickup Longitude"
        {...register("pickupLng", { valueAsNumber: true })}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Dropoff Address"
        {...register("dropoffAddress")}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Dropoff Latitude"
        {...register("dropoffLat", { valueAsNumber: true })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Dropoff Longitude"
        {...register("dropoffLng", { valueAsNumber: true })}
        className="border p-2 w-full mb-2"
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          {...register("isRented")}
          className="mr-2"
        />
        Currently Rented
      </label>

      <input
        type="text"
        placeholder="Renter ID (optional)"
        {...register("renter")}
        className="border p-2 w-full mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Add Car
      </button>
    </form>
  );
}
