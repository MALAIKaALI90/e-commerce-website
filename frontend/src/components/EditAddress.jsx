import React, { useState } from "react";
import { X } from "lucide-react";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import SuccessAlert from "../utils/SuccessAlert";

const EditAddress = ({ close, data: prevData}) => {
  const [data, setData] = useState({
    _id: prevData?._id || "",
    addressline: prevData?.addressline || "",
    city: prevData?.city || "",
    country: prevData?.country || "",
    postalcode: prevData?.postalcode || "",
    phone: prevData?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    try {
      e.preventDefault();
     const res=await Axios({
      ...summaryApi.updateAddressDetaiil,
      data:data
     })
    //  console.log(res.data.data);
     
         SuccessAlert("Update Address Successfully")
     setData({
      addressline:"",
      city:"",
      country:"",
      postalcode:"",
      phone:""

     })
     close()
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address Line
            </label>
            <input
              type="text"
              name="addressline"
              value={data.addressline}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalcode"
                value={data.postalcode}
                onChange={handleChange}
                placeholder="Enter postal code"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={close}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
