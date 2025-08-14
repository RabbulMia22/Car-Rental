import React, { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import RentACar from "../RentACar/RentACar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "Our Services", to: "/our-services" },
    { name: "Our Cars", to: "/our-cars" },
    { name: "About Us", to: "/aboutus" },
    { name: "Blogs", to: "/blogs" },
    { name: "Contact Us", to: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white text-gray-800 fixed top-0 left-0 w-full shadow-lg z-50 border-b border-gray-100">
        <div className="relative max-w-6xl md:max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              MyLogo
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative group text-lg font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800 hover:text-blue-500"
                    }`
                  }
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
            <li className="flex items-center ml-4">
              <RentACar />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsOpen(true)}
          >
            <RiMenu2Fill size={24} className="text-gray-700" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-opacity-30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="md:hidden fixed top-0 left-0 w-72 sm:w-80 h-full bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={20} className="text-gray-600" />
              </button>

              {/* Menu Items */}
              <div className="px-6 py-20 flex flex-col gap-6">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  MyLogo
                </h2>

                {menuItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block text-lg font-medium transition-colors duration-300 ${
                        isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-500"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* RentACar Button */}
                <div>
                  <RentACar onClick={() => setIsOpen(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
