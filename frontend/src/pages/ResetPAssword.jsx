import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import summaryApi from '../common/summaryApi';
import Axios from '../utils/axios';
import { Link } from 'react-router-dom';
const ResetPAssword = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    email: "",
    newPass: "",
    confirmPass: ""
  })
  const location = useLocation()


  useEffect(() => {
    if (!(location.state?.data?.success)) {
      navigate("/")
    }
    if (location?.state?.email) {
      setdata((prev) => {
        return {
          ...prev,
          email: location?.state?.email
        }
      })
    }
  }, [])
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...summaryApi.reset_pass,
      data:data
      
      });
console.log("data",data);

      toast.success(res.data.message);
     
      navigate("/login")
      setdata({
        email:"",
        newPass:"",
        confirmPass:""
      })
    } catch (error) {
 
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }
}
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
<form onSubmit={handleSubmit}>
 

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            value={data.newPass}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setdata({ ...data, newPass: e.target.value })}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={data.confirmPass}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setdata({ ...data, confirmPass: e.target.value })}
          />
        </div>
         <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Reset Password
        </button>
             <p className="text-center text-gray-600 mt-6 text-sm">
                  Remembered your password?{" "}
                  <Link
                    to="/login"
                    className="text-yellow-600 font-semibold hover:underline hover:text-yellow-700 transition"
                  >
                    Login
                  </Link>
                </p>
</form>
      
       
      </div>
    </div>
  )
}

export default ResetPAssword
