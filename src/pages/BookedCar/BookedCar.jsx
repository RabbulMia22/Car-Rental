import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSelector } from "react-redux";

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

  

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Booked Cars</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Pickup</th>
            <th className="py-3 px-4 border-b text-left">Dropoff</th>
            <th className="py-3 px-4 border-b text-left">Start Date</th>
            <th className="py-3 px-4 border-b text-left">Status</th>
            <th className="py-3 px-4 border-b text-left">Car ID</th>
          </tr>
        </thead>
        <tbody>
          {reserves.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No bookings found
              </td>
            </tr>
          ) : (
            reserves.map((reserve) => (
              <tr key={reserve._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{reserve.name}</td>
                <td className="py-2 px-4 border-b">{reserve.email}</td>
                <td className="py-2 px-4 border-b">{reserve.pickupLocation}</td>
                <td className="py-2 px-4 border-b">{reserve.dropoffLocation}</td>
                <td className="py-2 px-4 border-b">{new Date(reserve.startDate).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  {reserve.isPending ? (
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  ) : (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                      Confirmed
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{reserve.car}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookedCar;
