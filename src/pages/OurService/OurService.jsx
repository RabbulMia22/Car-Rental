import React, { useEffect } from 'react';
import {
    FaUsers, FaSuitcase, FaDoorOpen, FaCity, FaRoad, FaCar, FaWhatsapp, FaPhone
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const cars = [
    {
        name: "Sedan car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/03/p21-removebg-preview-e1748976372633.webp",
        passengers: 4,
        luggage: 3,
        doors: 4,
        phone: "01319-258737",
    },
    {
        name: "SUV (Prado, Harrier, Pajero) car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/06/Toyota-Land-Cruiser-Prado-Exterior.webp",
        passengers: 4,
        luggage: 3,
        doors: 4,
        phone: "01319-258737",
    },
    {
        name: "Noah, HiAce car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/06/img_591edf43e7bf0-e1495195478681.webp",
        passengers: "7-12",
        luggage: 5,
        doors: 4,
        phone: "01319-258737",
    },
    {
        name: "Sedan car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/03/p21-removebg-preview-e1748976372633.webp",
        passengers: 4,
        luggage: 3,
        doors: 4,
        phone: "01319-258737",
    },
    {
        name: "SUV (Prado, Harrier, Pajero) car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/06/Toyota-Land-Cruiser-Prado-Exterior.webp",
        passengers: 4,
        luggage: 3,
        doors: 4,
        phone: "01319-258737",
    },
    {
        name: "Noah, HiAce car rental services",
        img: "https://khanrentacar.com/wp-content/uploads/2025/06/img_591edf43e7bf0-e1495195478681.webp",
        passengers: "7-12",
        luggage: 5,
        doors: 4,
        phone: "01319-258737",
    },
];

function OurService() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 900,
            once: true
        });
    }, []);

    return (
        <div className="mt-16 sm:mt-20">
            {/* Header */}
            <div
                className="text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-800 via-blue-500 to-indigo-700 px-6 py-10 sm:py-12 shadow-lg"
                data-aos="fade-down-left"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 sm:mb-4">
                    Our Services
                </h1>
                <p className="text-blue-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                    We offer a wide range of services to meet your needs. Quality, reliability, and satisfaction guaranteed.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
                {cars.map((car, index) => (
                    <div
                        data-aos="zoom-out-down"
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:shadow-red-400 hover:-translate-y-2 flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={car.img}
                            alt={car.name}
                            className="w-full h-36 sm:h-40 md:h-44 object-contain mb-3 sm:mb-4"
                        />

                        {/* Title */}
                        <h2 className="text-base sm:text-lg font-bold text-blue-900 mb-3">{car.name}</h2>

                        {/* Features */}
                        <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700 flex-1">
                            <li className="flex items-center gap-2">
                                <FaUsers className="text-red-500" /> Max Passenger: {car.passengers}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaSuitcase className="text-red-500" /> Luggage: {car.luggage}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaDoorOpen className="text-red-500" /> Doors: {car.doors}
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCity className="text-red-500" /> Inside City Rental Service
                            </li>
                            <li className="flex items-center gap-2">
                                <FaRoad className="text-red-500" /> Outside City Rental Service
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCar className="text-red-500" /> Car Body Rental Service
                            </li>
                        </ul>

                        {/* Contact Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center justify-center">
                            <a
                                href={`tel:${car.phone}`}
                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-red-700 transition w-full sm:w-auto justify-center"
                            >
                                <FaPhone /> {car.phone}
                            </a>
                            <a
                                href={`https://wa.me/${car.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-green-600 transition w-full sm:w-auto justify-center"
                            >
                                <FaWhatsapp /> WhatsApp
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurService;
