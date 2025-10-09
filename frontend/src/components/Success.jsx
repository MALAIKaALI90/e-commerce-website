import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white text-center px-6">
     
      <CheckCircle2 className="text-green-600 w-24 h-24 mb-6 animate-bounce" />

     
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {location.state?.text ? location.state.text : "Payment"} Successfully Done!
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        Thank you for your purchase. Your order has been received and is now being processed.
      </p>

      
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition-all duration-300"
      >
        Go to Home
      </button>

    
      <p className="text-sm text-gray-400 mt-6">
        You will receive an order confirmation email shortly.
      </p>
    </div>
  );
};

export default Success;
