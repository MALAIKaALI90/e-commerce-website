import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CiCamera } from "react-icons/ci";
import Axios from "../utils/axios"
import summaryApi from '../common/summaryApi';
import { useDispatch } from 'react-redux';
import FetchUserDetail from '../utils/FetchUserDetail';
import { AvatarUPdate } from '../store/userSlice';
import toast from 'react-hot-toast';
const Profile = () => {
    const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch=useDispatch()
  const fileInputRef = useRef(null)

  const handleAvatarChange = async (e) => {
    const formData = new FormData()
    formData.append("avatar", e.target.files[0])
    
    
    // const userDetail=AvatarUPdate()

    try {
        setLoading(true) 
      const res = await Axios({
        ...summaryApi.update_avatar,
         data:formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      dispatch(AvatarUPdate({ avatar: res.data?.data?.updatedAvatar }))


      console.log("Upload Response:", res.data)
      toast.success(res.data.message)
 
    } catch (error) {
      console.log("Avatar upload failed:", error)
    }
    finally {
      setLoading(false) // stop loading
    }
  }
// const handleUserDetailUpdate=async (e) => {
  
// }
  return (
<div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
  {/* Avatar */}
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      {/* Avatar Image */}
      <img
        src={
          typeof user?.avatar === "string" && user.avatar.trim() !== ""
            ? user.avatar
            : "https://ui-avatars.com/api/?name=" + (user?.username)
        }
        alt="User Avatar"
        className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
      />

      {/* Camera Icon overlay */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full cursor-pointer shadow-md hover:bg-yellow-500 transition"
      >
        <CiCamera size={18} className="text-white" />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        name="avatar"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
    </div>


        <h2 className="mt-3 text-xl font-bold text-gray-800">
          {user?.username || "Guest"}
        </h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Mobile</span>
          <span className="text-gray-800">{user?.mobileNum || "Not added"}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Role</span>
          <span className="text-gray-800">{user?.role}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Status</span>
          <span
            className={`font-medium ${
              user?.status === "active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {user?.status}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Last Login</span>
          <span className="text-gray-800">
            {user?.lastLoginDate
              ? new Date(user.lastLoginDate).toLocaleString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile
