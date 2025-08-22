import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingCar = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reserve data
  const { data: reserves = [], isLoading, isError, error } = useQuery({
    queryKey: ["reserves"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reserve");
      return res.data;
    },
  });

  // Mutation for confirming booking
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/reserve/${id}`);
      return res.data.data; // updated reserve
    },
    onSuccess: (updatedReserve) => {
      // Update the cache permanently
      queryClient.setQueryData(["reserves"], (old) =>
        old.map((r) => (r._id === updatedReserve._id ? updatedReserve : r))
      );
    },
  });


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="overflow-x-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">All Bookings</h2>
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
          {reserves.map((reserve) => (
            <tr key={reserve._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{reserve.name}</td>
              <td className="py-2 px-4 border-b">{reserve.email}</td>
              <td className="py-2 px-4 border-b">{reserve.pickupLocation}</td>
              <td className="py-2 px-4 border-b">{reserve.dropoffLocation}</td>
              <td className="py-2 px-4 border-b">
                {new Date(reserve.startDate).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                {reserve.isPending ? (
                  <button
                    onClick={() => confirmMutation.mutate(reserve._id)}
                    disabled={confirmMutation.isLoading}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    {confirmMutation.isLoading ? "Confirming..." : "Confirm"}
                  </button>
                ) : (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                    Confirmed
                  </span>
                )}
              </td>
              <td className="py-2 px-4 border-b">{reserve.car}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingCar;
