import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Axios from  "../utils/axios"
import summaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import { logout } from '../store/userSlice'
import { FaExternalLinkAlt } from "react-icons/fa";
import IsAdmin from './isAdmin'
const UserMenu = () => {
  const user = useSelector((state) => state?.user)
  console.log(user);
  
  const dispatch=useDispatch()
const handleLogout=async()=>{
try {
  const res=await Axios({
    ...summaryApi.user_logout
    
  })
  dispatch(logout)
  localStorage.clear()
  toast.success(res.data.message)
}  catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
}
// const user=useSelector(state=>state.user)
// console.log(user);

  return (
<div className="w-48 bg-white shadow-lg rounded-xl p-3 text-sm fixed top-0 left-0 h-full">
  {/* Username Section */}
  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-300">
    <h2 className="text-lg font-semibold text-gray-800">My Account</h2>
    <p className='text-red-600'>({user.role})</p>
    <Link to="/dashboard/profile">
      <FaExternalLinkAlt className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
    </Link>
  </div>

  <p className="font-medium text-gray-800 text-sm mb-4">
    {user?.username || "Guest"}
  </p>
{IsAdmin(user.role) && (
  <>
  <div className="space-y-1">

  <Link
      to="/dashboard/catagory"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      Category
    </Link>
     <Link
      to="/dashboard/sub-catagory"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      Sub Category
    </Link>
     <Link
      to="/dashboard/upload-product"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      Upload Product
    </Link>
    <Link
      to="/dashboard/admin-products"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      Admin Products
    </Link>
    </div>
  </>
  )}
  {/* Links */}
  <div className="space-y-1">
    <Link
      to="/dashboard/orders"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      My Orders
    </Link>
    <Link
      to="/dashboard/address"
      className="block px-2 py-1 rounded-md text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors"
    >
      Saved Addresses
    </Link>
  </div>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="mt-4 w-full px-2 py-1 text-red-500 hover:bg-red-100 rounded-md transition-colors"
  >
    Logout
  </button>
</div>
)}

export default UserMenu
