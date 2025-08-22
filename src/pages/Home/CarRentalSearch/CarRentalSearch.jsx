import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function CarRentalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState(null);
  const [pickUpTime, setPickUpTime] = useState("");
  const [carType, setCarType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [extraFeatures, setExtraFeatures] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const axiosSearch = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: ["carRentals"],
    queryFn: async () => {
      const response = await axiosSearch.get("/cars");
      return response.data;
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000, delay: 900, once: true });
  }, []);

  const divisions = [
    "Pick-Up Division",
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Rangpur",
    "Barishal",
    "Sylhet",
    "Mymensingh",
  ];

  const handleSearch = () => {
    if (!data) return;

    const results = data.filter((car) => {
      const matchesPickup = pickupLocation
        ? car.pickupLocation.address === pickupLocation
        : true;
      const matchesDrop = dropoffLocation
        ? car.dropoffLocation.address === dropoffLocation
        : true;
      const matchesDate = pickUpDate
        ? new Date(car.rentalStartTime) <= pickUpDate &&
          new Date(car.rentalEndTime) >= pickUpDate
        : true;
      const matchesType = carType
        ? car.type.toLowerCase().includes(carType.toLowerCase())
        : true;
      const matchesPrice =
        priceRange && priceRange.includes("-")
          ? (() => {
              const [min, max] = priceRange.split("-").map(Number);
              return car.price >= min && car.price <= max;
            })()
          : true;

      return matchesPickup && matchesDrop && matchesDate && matchesType && matchesPrice;
    });

    setFilteredCars(results);
  };

  if (isLoading) return <p className="text-white text-center">Loading cars...</p>;
  if (error) return <p className="text-white text-center">Error fetching cars!</p>;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 md:p-6 rounded-lg max-w-7xl mx-auto py-8 md:py-12 mb-5 shadow-lg">
      {/* Search Fields */}
      <div
        className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3 md:gap-4"
        data-aos="fade-down"
      >
        {/* Pick-Up Location */}
        <div className="flex flex-col w-full">
          <label className="text-white text-sm font-medium mb-1">Pick-Up Location</label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
          >
            {divisions.map((division, index) => (
              <option
                key={index}
                value={division === "Pick-Up Division" ? "" : division}
                disabled={division === "Pick-Up Division"}
              >
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Pick-Up Date + Time */}
        <div className="flex flex-col w-full">
          <label className="text-white text-sm font-medium mb-1">Pick-Up Date</label>
          <div className="grid grid-cols-[1fr_auto] w-full">
            <DatePicker
              selected={pickUpDate}
              onChange={(date) => setPickUpDate(date)}
              placeholderText="Date"
              className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 w-full"
              dateFormat="MMMM d, yyyy"
            />
            <input
              type="time"
              value={pickUpTime}
              onChange={(e) => setPickUpTime(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-r-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex flex-col w-full">
          <label className="text-white text-sm font-medium mb-1">Drop Location</label>
          <select
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
          >
            {divisions.map((division, index) => (
              <option
                key={index}
                value={division === "Pick-Up Division" ? "" : division}
                disabled={division === "Pick-Up Division"}
              >
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end w-full">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md text-sm shadow-md w-full"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="mt-3 md:mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={`text-white flex items-center justify-center gap-1 px-4 py-2 rounded-md text-sm shadow-md transition-all duration-200 ${
            isOpen ? "bg-indigo-600" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Filter
          <IoIosArrowDown
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 md:gap-3 mt-2 md:mt-3">
            <input
              type="text"
              placeholder="Car Type"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Price Range (e.g. 10000-50000)"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Extra Features"
              value={extraFeatures}
              onChange={(e) => setExtraFeatures(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="p-4 bg-white rounded-md shadow-md">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="font-bold text-lg">{car.name}</h2>
              <p className="text-gray-700">{car.type} | {car.fuel}</p>
              <p className="text-gray-700">Price: ${car.price}</p>
              <p className="text-gray-700">
                Pick-Up: {car.pickupLocation.address} | Drop: {car.dropoffLocation.address}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No cars found for selected criteria.
          </p>
        )}
      </div>
    </div>
  );
}
