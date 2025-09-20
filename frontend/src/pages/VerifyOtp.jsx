import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const navigate = useNavigate();
  const location=useLocation()
useEffect(()=>{
if (!location.state?.email) {
  navigate("/forgot-password")
  
}

},[])
  

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...summaryApi.otp_verify,
        data: { otp: otp.join("") ,
          email:location.state?.email
        }, // send OTP as string
      });

      toast.success(res.data.message);
      setOtp(["", "", "", "", "", ""]);
      navigate("/reset-pass" ,{
      state:{
        data :res.data,
       email:location.state?.email
      }
      });
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
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg font-semibold"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition shadow-sm mt-4"
          >
            Verify OTP
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

export default VerifyOtp;
