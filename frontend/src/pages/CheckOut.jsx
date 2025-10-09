import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom"
import {loadStripe} from "@stripe/stripe-js"
const CheckOut = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const [openAddressBox,setopenAddressBox]=useState(false)
  const cartItems = useSelector((state) => state.cardItem.card);
  // console.log(cartItems);
  
  // const user = useSelector((state) => state?.user);
const addressList=useSelector(state=>state.addresses.AllAddressList)
// console.log("list",addressList);
const [selectedAddress,setselectedAddress]=useState(false)
// console.log(addressList[
//   selectedAddress
// ]);

const handleCashOnDelivary=async()=>{

try {
  const res=await Axios({
    ...summaryApi.CashOnDelvaryOrder,
   data: {
  list_items: cartItems,
  subTotalAmt:cartItems.reduce((acc, item) => acc + item.productId[0].price * item.quantity, 0),
  totalAmt: cartItems.reduce((acc, item) => acc + item.productId[0].price * item.quantity, 0),
  addressId: addressList[selectedAddress]?._id,
}
  })
  // console.log(res.data);
  toast.success(res.data.message)
  navigate("/success",
    {state:{
      text:"Order"
    }}
  )
} catch (error) {
  console.log(error.message);
  
}
}
  const totalPrice = cartItems.reduce((acc, item) => {
    const product = item.productId[0];
    return acc + (product?.price || 0) * item.quantity;
  }, 0);
const handleOnlinePayment=async () => {

  try {
    toast.loading()
    const stripePublicKey=import.meta.env.VITE_STRIPE_PUBLIC_KEY
    const stripePromise=await loadStripe(stripePublicKey)
    const res=await Axios({
      ...summaryApi.payment_url,
      data: {
  list_items: cartItems,
  subTotalAmt:cartItems.reduce((acc, item) => acc + item.productId[0].price * item.quantity, 0),
  totalAmt: cartItems.reduce((acc, item) => acc + item.productId[0].price * item.quantity, 0),
  addressId: addressList[selectedAddress]?._id,
}

    })
  window.location.href = res.data.url;

  } catch (error) {
    console.log(error);
    
  }
}
  return (
    <section>
    <div className="w-full min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE — ADDRESS SECTION */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Choose Your Address
          </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {addressList.map((address, index) => (

    
  <label htmlFor={"address"+index} key={"add"+index}>
    <div>
  <input type="radio" id={"address"+index} name="address" value={index} onChange={(e)=>setselectedAddress(e.target.value)} />
    <div
      key={index}
      className="bg-white shadow-lg rounded-3xl p-8 border  hover:bg-blue-50 border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        {address.addressline}
      </h3>

      <div className="space-y-2 text-gray-700 text-base">
        <p>{address.city}</p>
        <p>{address.postalcode}</p>
        <p>{address.country}</p>
        <p className="text-gray-900 font-medium mt-3">{address.phone}</p>
      </div>
    </div>

     </div>
     </label>

  ))}
</div>


        
          <div className="space-y-4">
           

            <button onClick={()=>setopenAddressBox(true)} className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
              + Add New Address
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — CART SUMMARY */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Order Summary
          </h3>

          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-5">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const product = item.productId[0];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product?.image?.[0]}
                        alt={product?.name}
                        className="w-16 h-16 rounded-xl object-cover border"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {product?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × Rs {product?.price}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product?.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        Rs {product?.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 py-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  alt="empty cart"
                  className="w-24 h-24 mb-3 opacity-70"
                />
                <p>Your cart is empty</p>
              </div>
            )}
          </div>

     
          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between mb-4 text-lg font-semibold">
                <span>Total:</span>
                <span className="text-green-600">Rs {totalPrice}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button   onClick={handleOnlinePayment}className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                  Online Payment
                </button>
                <button onClick={handleCashOnDelivary} className="w-full border border-green-600 text-green-600 py-2 rounded-xl hover:bg-green-50 transition">
                  Cash on Delivery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
    {openAddressBox && <AddAddress close={()=>setopenAddressBox(false)}/>}
    </section>
  );
};

export default CheckOut;
