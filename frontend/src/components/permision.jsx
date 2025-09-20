import React from "react";
import { useSelector } from "react-redux";
import IsAdmin from "./isAdmin";
import { Link } from "react-router-dom";

const Permission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {IsAdmin(user?.role) ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          {children}
        </div>
      ) : (
        <div className="text-center bg-white shadow-md rounded-2xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied 🚫
          </h2>
          <p className="text-gray-600 mb-6">
            You don’t have permission to access this page.
          </p>
        <Link to="/"> <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
          >
            Go Back
          </button></Link> 
        </div>
      )}
    </div>
  );
};

export default Permission;
