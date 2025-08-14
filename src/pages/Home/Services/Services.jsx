import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Services() {
    useEffect(() => {
        AOS.init({
          duration: 1000, 
          delay: 900,     
          once: true      
        });
      }, []);
    const features = [
        {
            title: "Affordable Rates",
            desc: "Enjoy competitive rental rates with no hidden charges—quality service within your budget.",
        },
        {
            title: "Well-Maintained Fleet",
            desc: "Our vehicles are regularly serviced to ensure top-notch performance and reliability.",
        },
        {
            title: "Expert Drivers",
            desc: "Our trained drivers prioritize your safety and comfort, making every journey smooth.",
        },
        {
            title: "Flexible Rental Plans",
            desc: "Whether you need a car for a few hours, a day, or longer, we have you covered.",
        },
        {
            title: "24/7 Customer Support",
            desc: "Day or night, our support team is ready to assist you with bookings and emergencies.",
        },
    ];

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        We Offer Top Class Rental Service in Bangladesh
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Experience top-class car rental service in Bangladesh with Khan Rent A Car.
                        From sedans to SUVs and luxury cars, our well-maintained fleet suits all needs—business, travel, or events.
                        Enjoy affordable rates, expert drivers, and flexible rental plans for a smooth, safe, and reliable journey.
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="flex justify-center" data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500">
                        <img
                            src="https://khanrentacar.com/wp-content/uploads/2025/06/Toyota-Land-Cruiser-Prado-Exterior.webp"
                            alt="Car Rental Service"
                            className=" w-full max-w-lg object-cover"
                        />
                    </div>

                    {/* Features */}
                    <div  data-aos="fade-left">
                        <ul className="space-y-6">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-5">
                                    <FaCheckCircle className="text-green-500 gap-3 text-2xl mt-[7px]" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
