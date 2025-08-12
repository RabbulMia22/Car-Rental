import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";

const menuItems = [
    { label: "Rent a car in Barishal", link: "/barishal" },
    { label: "Rent a Car Chittagong", link: "/chittagong" },
    { label: "Rent a car in Dhaka", link: "/dhaka" },
    { label: "Rent a Car in Khulna", link: "/khulna" },
    { label: "Rent a Car in Mymensingh", link: "/mymensingh" },
    { label: "Rent a Car in Rajshahi", link: "/rajshahi" },
    { label: "Rent a Car in Rangpur", link: "/rangpur" },
    { label: "Rent a Car in Sylhet", link: "/sylhet" },
];

function RentACar() {
    return (
        <div className="relative">
            <FlyoutLink FlyoutContent={RentalContent}>
                <span className="text-gray-800 hover:text-blue-800 transition-colors duration-200 font-medium">
                    Rent A Car
                </span>
            </FlyoutLink>
        </div>
    );
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div
            className="group relative"
            onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
            onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
        >
            <button
                onClick={() => isMobile && setOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
                {children}
                <IoIosArrowDown
                    className={`text-gray-800 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`${isMobile ? "relative" : "absolute left-0"} z-50 mt-1`}
                    >
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden w-64">
                            <FlyoutContent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const RentalContent = () => {
    return (
        <div className="py-2">
            <ul className="space-y-1">
                {menuItems.map(({ label, link }) => (
                    <li key={label}>
                        <a
                            href={link}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                            <span className="flex items-center">
                                <span className="ml-3 text-sm font-medium">{label}</span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RentACar;