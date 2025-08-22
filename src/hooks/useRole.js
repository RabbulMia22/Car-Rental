import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useSelector } from "react-redux";

const useRole = () => {
  const { loading: authLoading, user } = useSelector((state) => state.auth);
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      console.log("User role fetched:", res.data.role);
      return res.data?.role || "user";
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useRole;
