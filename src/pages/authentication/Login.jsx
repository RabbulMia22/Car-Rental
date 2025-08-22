import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import useUserAuth from "../../hooks/useUserLogin";
import Swal from "sweetalert2";


export default function Login() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/"; // redirect path after login
  useUserAuth();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      dispatch(loginUser({ email: data.email, password: data.password }));

    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Watch for login success and error
  useEffect(() => {
    if (user) {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have logged in successfully 🎉",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate(from, { replace: true });
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error,
      });
    }
  }, [user, error, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
