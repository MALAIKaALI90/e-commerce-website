import { useState } from "react";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/axios";
import{ Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import FetchUserDetail from '../utils/FetchUserDetail';
import { setUserDetail } from "../store/userSlice";

const Login= () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
   
    email: "",
    password: "",
    
  });
  const dispatch=useDispatch()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
  
  try {
      const res=await Axios({
        ...summaryApi.login,
        data
        
      })
     
      toast.success(res.data.message)
      localStorage.setItem("accessToken",res.data.data.accessToken)
      localStorage.setItem("RefreshToken",res.data.data.RefreshToken)

 
  const userData=await FetchUserDetail()
 
dispatch(setUserDetail(userData.data.data))

  // useEffect(()=>{fetchUser()},[])
      
      setData({
       
        email:"",
        password:"",
        
      })
      navigate("/")
  } 
catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }
}
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to Blinkit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
         

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Write your password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
          </div>
<p className="text-right mt-2">
  <Link 
    to="/forgot-password" 
    className="text-sm text-yellow-600 font-medium hover:underline hover:text-yellow-700 transition"
  >
    Forgot Password?
  </Link>
</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
          >
          Login
          </button>
        </form>
<p className="text-center text-gray-600 mt-4">
  Don t have an account than first {" "}
  <Link 
    to="/register" 
    className="text-yellow-600 font-semibold hover:underline hover:text-yellow-700 transition"
  >
    Register
  </Link>
</p>

      </div>
    </section>
  );
};

export default Login;  