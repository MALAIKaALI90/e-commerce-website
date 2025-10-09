import React from "react";
import { useForm } from "react-hook-form";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();


 
  const onSubmit = async (data) => {
    try {
      const res = await Axios({
        ...summaryApi.createAddress,
        data: {
          addressline: data.addressline,
          city: data.city,
          postalcode: data.postalcode,
          country: data.country,
          phone: data.phone,
        },
      });

      toast.success(res.data.message);
      reset();
      close();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Address
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Address Line */}
          <div>
            <label
              htmlFor="addressline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Line
            </label>
            <input
              type="text"
              id="addressline"
              {...register("addressline", { required: true })}
              placeholder="House #12, Street #4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
              placeholder="Country"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
              placeholder="e.g. Lahore"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="postalcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalcode"
              {...register("postalcode", { required: true })}
              placeholder="e.g. 54000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              placeholder="0300-1234567"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full border border-gray-400 text-gray-600 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
