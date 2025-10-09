import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Home, Phone, MapPin, Globe } from "lucide-react";
import AddAddress from "../components/AddAddress";
import EditAddress from "../components/EditAddress";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/axios";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";

const MyAddress = () => {
  const addressList = useSelector((state) => state.addresses.AllAddressList);
  const [openAddressBox,setopenAddressBox]=useState(false)
const [openEdt,setOpenEdit]=useState(false)
const [editData,seteditData]=useState("")
const [openConfirmBox,setOpenConfirmBox]=useState(false)
const [deleteAddress,setDeleteAddress]=useState({_id:""})
const handleDelete=async () => {
 
    try {
      const res = await Axios({
        ...summaryApi.AddressDelete,
        data: { _id: deleteAddress._id},
      });
      toast.success(res.data.message);
      
      setOpenConfirmBox(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen ml-[200px] bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        My Saved Addresses
      </h2>

      {addressList.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No addresses found. Please add one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {addressList.map((address, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-3xl p-8 border border-gray-200 hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Home className="text-blue-600 w-6 h-6" />
                
                <h3 className="text-2xl font-semibold text-gray-900">
                  {address.addressline}
                </h3>
              </div>

              <div className="space-y-3 text-gray-700 text-base">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {address.city}, {address.postalcode}
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  {address.country}
                </p>
                <p className="flex items-center gap-2 mt-3 font-medium text-gray-900">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {address.phone}
                </p>
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={()=>{setOpenEdit(true) ;
                  seteditData(address)}} className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition">
                  Edit
                </button>
                <button  onClick ={()=>{setOpenConfirmBox(true); setDeleteAddress({ _id: address._id })} } className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-xl hover:bg-red-500 hover:text-white transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
      )}
       <div className="space-y-4">
           

            <button onClick={()=>setopenAddressBox(true)} className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
              + Add New Address
            </button>
          </div>
      {openAddressBox && <AddAddress close={()=>setopenAddressBox(false)}/>}
         {openEdt && (
                <EditAddress data={editData} close={() => setOpenEdit(false)} />
              )}
             {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          confirm={handleDelete}
          cancel={() => setOpenConfirmBox(false)}
        />
             )}
    </div>
  );
  
};

export default MyAddress;
