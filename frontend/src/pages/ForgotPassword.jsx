import { useState } from "react";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...summaryApi.forgot_password,
        data,
      });

      toast.success(res.data.message);
        navigate("/verify-otp",{
        state : data
        }
      );
      setData({ email: "" });
    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your registered email, and we’ll send you an OTP to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition shadow-sm"
          >
            Send OTP
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-yellow-600 font-semibold hover:underline hover:text-yellow-700 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
