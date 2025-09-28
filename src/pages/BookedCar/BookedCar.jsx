import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Custom car icon
const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

// Socket.IO client
const socket = io("https://car-rental-server-seven-lovat.vercel.app"); 

// Recenter map helper
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);
  return null;
};

const BookedCar = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useSelector((state) => state.auth);

  const { data: reserves = [], isLoading, isError, error } = useQuery({
    queryKey: ["reserves", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reserve?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  const [locations, setLocations] = useState({});

  useEffect(() => {
    reserves.forEach((reserve) => {
      if (reserve.reservedCarLocation) {
        const { lat, lng } = reserve.reservedCarLocation;
        if (lat && lng) {
          setLocations((prev) => ({ ...prev, [reserve._id]: { lat, lng } }));
        }
      }
      socket.emit("joinRide", reserve._id);
    });

    const handleLocationUpdate = ({ reserveId, lat, lng }) => {
      setLocations((prev) => ({ ...prev, [reserveId]: { lat, lng } }));
    };

    socket.on("locationUpdate", handleLocationUpdate);
    return () => socket.off("locationUpdate", handleLocationUpdate);
  }, [reserves]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">Loading your bookings...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your reservations</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text">
            Your Booked Cars
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your reservations and view car locations in real-time with our interactive map
          </p>
        </div>

        {reserves.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any car reservations yet. Start by booking your first car!</p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-8 rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
              Book a Car Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reserves.map((reserve) => {
              const carLocation = locations[reserve._id];
              return (
                <div
                  key={reserve._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{reserve.brand}</h3>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          reserve.isPending
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {reserve.isPending ? "Pending Confirmation" : "Confirmed"}
                      </span>
                    </div>

                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-4">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Pickup Location</p>
                          <p className="font-medium">{reserve.pickupLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-4">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Dropoff Location</p>
                          <p className="font-medium">{reserve.dropoffLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-4">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Booking Date</p>
                          <p className="font-medium">{new Date(reserve.startDate).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {carLocation && (
                    <div className="h-72 w-full rounded-b-2xl overflow-hidden relative">
                      <div className="absolute top-4 right-4 z-[400] bg-white px-3 py-2 rounded-lg shadow-md">
                        <p className="text-xs font-medium text-gray-700">Live Location</p>
                      </div>
                      <MapContainer
                        center={[carLocation.lat, carLocation.lng]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[carLocation.lat, carLocation.lng]} icon={carIcon}>
                          <Popup className="rounded-xl">
                            <div className="font-semibold text-gray-800">{reserve.brand}</div>
                            <div className="text-sm text-gray-600">Current Location</div>
                          </Popup>
                        </Marker>
                        <RecenterMap lat={carLocation.lat} lng={carLocation.lng} />
                      </MapContainer>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedCar;