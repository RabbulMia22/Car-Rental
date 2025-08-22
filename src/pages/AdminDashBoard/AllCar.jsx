import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AllCar() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all cars
  const { data: cars = [], isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cars");
      return res.data;
    },
  });

  // Delete car
  const handleDelete = async (carId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/cars/${carId}`);
        queryClient.invalidateQueries(["cars"]); // refetch cars
        Swal.fire("Deleted!", "Car has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete car.", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading cars...</p>;
  if (error) return <p className="text-center mt-5">Failed to load cars!</p>;

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Cars</h2>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Brand</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Fuel</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Pick-Up</th>
              <th className="py-2 px-4 text-left">Drop</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{car.name}</td>
                <td className="py-2 px-4">{car.brand}</td>
                <td className="py-2 px-4">{car.type}</td>
                <td className="py-2 px-4">{car.fuel}</td>
                <td className="py-2 px-4">${car.price}</td>
                <td className="py-2 px-4">{car.pickupLocation?.address}</td>
                <td className="py-2 px-4">{car.dropoffLocation?.address}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
