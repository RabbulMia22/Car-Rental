import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CarRentalSearch() {
  useEffect(() => {
      AOS.init({
        duration: 1000, 
        delay: 900,     
        once: true      
      });
    }, []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 md:p-6 rounded-lg max-w-7xl mx-auto py-8 md:py-12 mb-5 shadow-lg">
      {/* Search Fields */}
     <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3 md:gap-4" data-aos="fade-down">
  {/* Pick-up Location */}
  <div className="flex flex-col w-full">
    <label className="text-white text-sm font-medium mb-1">
      Pick-Up Location
    </label>
    <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500">
      <option>Pick-Up City & Location</option>
      <option>Dhaka</option>
      <option>Chittagong</option>
    </select>
  </div>

  {/* Pick-Up Date + Time */}
  <div className="flex flex-col w-full">
    <label className="text-white text-sm font-medium mb-1">
      Pick-Up Date
    </label>
    <div className="grid grid-cols-[1fr_auto] w-full">
      <DatePicker
        placeholderText="Date"
        className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 w-full"
        dateFormat="MMMM d, yyyy"
      />
      <input
        type="time"
        className="px-3 py-2 border border-gray-300 rounded-r-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Return Location */}
  <div className="flex flex-col w-full">
    <label className="text-white text-sm font-medium mb-1">
      Return Location
    </label>
    <select className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-blue-500">
      <option>Return City & Location</option>
      <option>Dhaka</option>
      <option>Chittagong</option>
    </select>
  </div>

  {/* Return Date + Time */}
  <div className="flex flex-col w-full">
    <label className="text-white text-sm font-medium mb-1">
      Return Date
    </label>
    <div className="grid grid-cols-[1fr_auto] w-full">
      <DatePicker
        placeholderText="Date"
        className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500 w-full"
        dateFormat="MMMM d, yyyy"
      />
      <input
        type="time"
        className="px-3 py-2 border border-gray-300 rounded-r-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Search Button */}
  <div className="flex flex-col justify-end w-full">
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md text-sm shadow-md w-full">
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
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 md:gap-3 mt-2 md:mt-3">
            <input
              type="text"
              placeholder="Car Type"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Price Range"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Extra Features"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}