import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes, FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import DashBoardHome from "../pages/AdminDashBoard/DashBoardHome";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white 
  z-30 md:z-auto transform 
  transition-transform duration-500 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
  md:flex flex-col min-h-screen`}
      >
        
        <div className="h-16 flex items-center justify-between md:justify-center px-4 border-b border-indigo-700">
         <Link to="/dashboard">  <span className="font-bold text-xl">MyDashboard</span> </Link>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="text-lg" /> <span>Home</span>
          </Link>
           <Link
            to="/dashboard/profile"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="text-lg" /> <span>My Profile</span>
          </Link>
          <Link
            to="/dashboard/bookings"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="text-lg" /> <span>Booking Car</span>
          </Link>
          <Link
            to="/dashboard/all-cars"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="text-lg" /> <span>All Cars</span>
          </Link>
          <Link
            to="/dashboard/add-car"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers className="text-lg" /> <span>Add Car</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FaCog className="text-lg" /> <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button className="flex items-center w-full space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={20} className="text-indigo-600" />
            </button>

            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="relative p-1 rounded-full hover:bg-gray-100">
                <FaBell size={18} className="text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-100"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700">John Doe</span>
                <FaChevronDown size={12} className="text-gray-500 hidden md:inline" />
              </button>
              

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">Logout</a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;