import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-[#0b2a5f] text-white pt-10 pb-4">
      {/* Zigzag Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      className="relative block w-full h-[20px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 20"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0 L10 20 L20 0 L30 20 L40 0 L50 20 L60 0 L70 20 L80 0 L90 20 L100 0 L110 20 L120 0 Z"
        fill="#0b2a5f"
      />
    </svg>
  </div>

      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-4 relative z-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-green-500 mb-4">Khan Rent A Car</h2>
          <p className="text-sm leading-6">
            <strong>Khan Rent A Car</strong> is the best car rental company in Dhaka, Bangladesh, offering luxury vehicles
            for office use and personal tours, ensuring comfort, reliability, and exceptional customer service.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="bg-white text-green-500 p-2 rounded-full hover:scale-110 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="bg-white text-green-500 p-2 rounded-full hover:scale-110 transition">
              <FaWhatsapp size={20} />
            </a>
            <a href="#" className="bg-white text-green-500 p-2 rounded-full hover:scale-110 transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-green-500 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Rent A Car In Dhaka</li>
            <li>Rent A Car In Chittagong</li>
            <li>Rent A Car In Khulna</li>
            <li>Rent A Car In Barishal</li>
            <li>Rent A Car In Rajshahi</li>
            <li>Rent A Car In Sylhet</li>
            <li>Rent A Car In Rangpur</li>
            <li>Rent A Car In Mymensingh</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold text-green-500 mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Blogs</li>
            <li>Our Cars</li>
            <li>Our Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-green-500 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> 01319-258737
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> 01942-032037
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> 01319-258737
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@khanrentacar.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Demra Dhaka , Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm relative z-10">
        <p>Copyright © 2025 Khan Rent A Car, All rights reserved.</p>
        <p className="mt-1">
          Developed by <span className="text-red-500">♡ CodeClub IT Solutions.</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
