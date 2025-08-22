import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../features/authSlice";
import useUserAuth from "../../hooks/useUserLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 

function SocialLogin() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useUserAuth();

  // Call the hook to get the Axios instance
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const resultAction = await dispatch(googleLogin());
      const loggedInUser = resultAction.payload;

      if (!loggedInUser) return;

      const userInfo = {
        email: loggedInUser.email,
        displayName: loggedInUser.displayName,
        role: loggedInUser.role || "user",
      };

      await axiosSecure.post("/users", userInfo); 

    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <button
        type="button"
        className="flex items-center justify-center w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-300"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle size={24} className="mr-3" />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}

export default SocialLogin;
