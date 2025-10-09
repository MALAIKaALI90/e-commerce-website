import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white text-center px-6">
      {/* Error Icon */}
      <XCircle className="text-red-600 w-24 h-24 mb-6 animate-pulse" />

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Order Cancelled
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-8 max-w-md">
        Your Order was not completed. If this was a mistake, you can try again or go back to the homepage.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/checkout")}
          className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
        >
          Try Again
        </button>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-400 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>

      {/* Footer note */}
      <p className="text-sm text-gray-400 mt-6">
        If you need help, please contact our support team.
      </p>
    </div>
  );
};


export default Cancel;
