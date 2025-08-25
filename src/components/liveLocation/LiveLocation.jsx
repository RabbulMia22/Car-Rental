import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserCarMap from "../../pages/UserCarMap/UserCarMap";

function LiveLocation() {
  const axiosSecure = useAxiosSecure();

  const { data: car, error, isLoading } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/cars/${id}`);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 5000,
  });
  console.log(car);
  

  if (isLoading) return <p>Loading car location...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!car) return <p>No car found</p>;

  return (
    <div className="mt-52">
      <UserCarMap car={car} />
    </div>
  );
}

export default LiveLocation;
