import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import useUserAuth from "../../hooks/useUserLogin";

function MyProfile() {
  const { loading: authLoading, user } = useSelector((state) => state.auth);
  const axiosSecure = useAxiosSecure();
  useUserAuth();

  const { data: userRole, isLoading, isError } = useQuery({
    queryKey: ["adminProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data; // <- this will be { role: "admin" }
    },
    enabled: !!user?.email, // only run when email exists
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;

  return (
    <div>
      <h1>My Profile</h1>
      <p>Email: {user?.email}</p>
      imag
      <p>Role: {userRole?.role}</p> {/* ✅ correct way */}
    </div>
  );
}

export default MyProfile;
