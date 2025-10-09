import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddtoCardBtn from "./addtoCardBtn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const OpenCartMenu = ({ close }) => {
  const cartItems = useSelector((state) => state.cardItem.card);
  const user = useSelector((state) => state?.user)

// console.log("user",user);

  const totalPrice = cartItems.reduce((acc, item) => {
    const product = item.productId[0];
    return acc + (product?.price || 0) * item.quantity;
  }, 0);
  const navigate=useNavigate()
const redirecttoCheckoutPage=()=>{
  if (user._id) {

    navigate("/checkout")
    if (close) {
      close()
    }
    return
  }
  toast("please login first")
}
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-300">
    
      <section className="w-full sm:w-[400px] h-full bg-white shadow-2xl flex flex-col animate-slideInRight">
       
        <div className="flex justify-between items-center p-5 border-b bg-gray-50">
          <h2 className="text-2xl font-bold tracking-wide">🛒 Your Cart</h2>
          <IoClose
            className="text-3xl cursor-pointer hover:text-red-500 transition-colors"
            onClick={close}
          />
        </div>

     
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const product = item.productId[0];
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-3"
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
                      <p className="text-xs text-gray-400">{product?.unit}</p>
                    </div>
                  </div>

                
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      Rs {product?.price * item.quantity}
                    </p>
                    <div className="mt-1">
                      <AddtoCardBtn p={product} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="empty cart"
                className="w-24 h-24 mb-3 opacity-70"
              />
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t bg-gray-50">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-600">Rs {totalPrice}</span>
            </div>
          
            <button onClick={redirecttoCheckoutPage}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>

     
    
    </div>
  );
};

export default OpenCartMenu;
