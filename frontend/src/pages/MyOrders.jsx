import React from "react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-16 ml-[200px]">
     
      <div className="bg-white shadow-md rounded-2xl p-5 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Track all your recent purchases</p>
      </div>

      {!orders?.length ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="No Orders"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-gray-600 text-lg font-medium">No Orders Yet</p>
          <p className="text-gray-400 text-sm mt-1">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={order._id + index + "order"}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">
                  Order ID: <span className="text-gray-800">{order?.orderId}</span>
                </p>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    order.payment_status === "CASH ON DELIVERY"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={order.product_details?.image?.[0]}
                  alt={order.product_details?.name}
                  className="w-20 h-20 rounded-xl object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-base">
                    {order.product_details?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rs {order.totalAmt}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Payment ID:</span>{" "}
                  {order.paymentId || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> Rs{" "}
                  {order.totalAmt}
                </p>
                <p>
                  <span className="font-medium">Subtotal:</span> Rs{" "}
                  {order.subTotalAmt}
                </p>
                <p className="text-gray-500 mt-1 text-xs">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-PK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
