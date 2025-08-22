import React, { useState } from 'react';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiShoppingCart,
  FiActivity,
  FiCalendar,
  FiStar,
  FiBox,
  FiChevronRight,
  FiSearch,
  FiBell,
  FiMenu
} from 'react-icons/fi';
import { 
  BsGraphUp, 
  BsFillLightningFill, 
  BsClockHistory,
  BsDot
} from 'react-icons/bs';

function DashBoardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sample data
  const statsData = [
    { title: 'Total Revenue', value: '$24,562', change: '+12%', icon: <FiDollarSign className="text-blue-500" />, color: 'bg-blue-100' },
    { title: 'New Users', value: '1,258', change: '+8%', icon: <FiUsers className="text-green-500" />, color: 'bg-green-100' },
    { title: 'Pending Orders', value: '42', change: '-3%', icon: <FiShoppingCart className="text-yellow-500" />, color: 'bg-yellow-100' },
    { title: 'Conversion Rate', value: '18.2%', change: '+4%', icon: <FiTrendingUp className="text-purple-500" />, color: 'bg-purple-100' }
  ];

  const recentActivities = [
    { user: 'Sarah Johnson', action: 'placed an order', time: '10 mins ago', icon: <FiShoppingCart />, read: false },
    { user: 'Michael Chen', action: 'subscribed to premium', time: '2 hours ago', icon: <FiStar />, read: true },
    { user: 'Emma Wilson', action: 'submitted a ticket', time: '5 hours ago', icon: <FiActivity />, read: false },
    { user: 'Alex Rodriguez', action: 'cancelled subscription', time: 'Yesterday', icon: <BsFillLightningFill />, read: true }
  ];

  // Chart data simulation
  const chartData = [30, 45, 60, 50, 70, 65, 80, 75, 90, 95, 85, 100];
  const maxValue = Math.max(...chartData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <FiBell className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu className="text-gray-600" />
            </button>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-start">
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stat.change}
                </span>
              </div>
              <h2 className="text-sm font-medium text-gray-600 mt-4">{stat.title}</h2>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              
              {/* Mini progress indicator */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      stat.title === 'Total Revenue' ? 'bg-blue-500' :
                      stat.title === 'New Users' ? 'bg-green-500' :
                      stat.title === 'Pending Orders' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`} 
                    style={{ width: `${stat.title === 'Total Revenue' ? '70%' : stat.title === 'New Users' ? '65%' : stat.title === 'Pending Orders' ? '40%' : '55%'}` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
              <button className="text-sm text-blue-600 flex items-center font-medium bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                <BsClockHistory className="mr-1" /> Last 30 days
              </button>
            </div>
            
            {/* Chart visualization */}
            <div className="h-64">
              <div className="flex items-end h-48 space-x-1">
                {chartData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-700"
                      style={{ height: `${(value / maxValue) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Total Revenue</p>
                  <p className="text-lg font-bold text-gray-800">$24,562</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Change</p>
                  <p className="text-lg font-bold text-green-600">+12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-xs text-blue-600 font-medium">View all</button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`flex items-start p-3 rounded-xl ${!activity.read ? 'bg-blue-50' : ''}`}>
                  {!activity.read && <BsDot className="text-blue-500 text-xl -ml-2 mt-1" />}
                  <div className={`rounded-full p-2 mr-3 ${activity.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-6 w-full text-center text-sm text-blue-600 font-medium bg-blue-50 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center">
              View all activity <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
              <button className="text-xs text-blue-600 font-medium">See all</button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Premium Widget', sales: 142, growth: '+12%' },
                { name: 'Enterprise Suite', sales: 98, growth: '+8%' },
                { name: 'Starter Package', sales: 76, growth: '+5%' },
                { name: 'Basic Toolkit', sales: 52, growth: '-2%' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Schedule</h2>
              <button className="text-xs text-blue-600 font-medium">View all</button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Team Meeting', time: '10:00 AM', color: 'bg-blue-500' },
                { title: 'Client Presentation', time: '1:30 PM', color: 'bg-green-500' },
                { title: 'Product Demo', time: '3:45 PM', color: 'bg-purple-500' },
                { title: 'Strategy Review', time: '5:00 PM', color: 'bg-yellow-500' }
              ].map((event, index) => (
                <div key={index} className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-10 ${event.color} rounded-full mr-4`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-6 w-full text-center text-sm text-white font-medium bg-gradient-to-r from-blue-500 to-blue-700 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center">
              <FiCalendar className="mr-2" /> Add new event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHome;