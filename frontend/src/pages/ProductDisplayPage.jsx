import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import Loading from "../common/loading";
import AddtoCardBtn from "../components/addtoCardBtn";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.getOneProduct,
        data: {
          productId: productId,
        },
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
  <div className="flex flex-col md:flex-row items-start gap-8 p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto">
  {/* Left: Image Section */}
  <div className="flex flex-col items-center gap-4 w-full md:w-1/2">
    {loading && <Loading />}

    {/* Main Product Image */}
    <img
      src={data.image[image]}
      alt="product"
      className="w-72 h-72 object-contain rounded-xl shadow-md border"
    />

    {/* Thumbnails Row */}
    <div className="flex gap-3">
      {data.image.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`thumb-${index}`}
          onClick={() => setImage(index)}
          className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition 
            ${index === image ? "border-green-600" : "border-gray-200"}`}
        />
      ))}
    </div>

    {/* Dots Indicators */}
    <div className="flex gap-2 mt-2">
      {data.image.map((_, index) => (
        <div
          key={index}
          onClick={() => setImage(index)}
          className={`w-3 h-3 rounded-full cursor-pointer transition 
            ${index === image ? "bg-green-600" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>

    {/* 👉 Description Under Images */}
    <div className="mt-6 text-left w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
      <p className="text-gray-600 leading-relaxed">{data.description}</p>
    </div>
  </div>

  {/* Right: Product Details */}
  <div className="flex flex-col gap-5 w-full md:w-1/2">
    {/* Delivery Time */}
    <p className="text-green-600 font-medium flex items-center gap-2">
      ⏱️ <span>10 mins delivery</span>
    </p>

    {/* Product Info */}
    <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
    <p className="text-gray-500">Pack Size: {data.unit}</p>

    {/* Price */}
    <div className="flex items-center gap-4">
      <p className="text-2xl font-bold text-gray-900">₹{data.price}</p>
    </div>

    {/* Action Button */}
    {data.stock === 0 ? (
      <button
        disabled
        className="px-6 py-2 bg-gray-300 text-gray-600 font-medium rounded-full shadow-md w-fit cursor-not-allowed transition"
      >
        ❌ Out of Stock
      </button>
    ) : (
   <AddtoCardBtn p={data}/>
    )}

    {/* Why Shop Section */}
    <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Why Shop From Blinkit?
            </h2>

            {/* Feature 1 */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png"
                alt="express delivery"
                className="w-12 h-12 object-contain"
              />
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Superfast Delivery –{" "}
                </span>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
             {/* Feature 2 */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Best_Prices_Offers.png"
                alt="best price"
                className="w-12 h-12 object-contain"
              />
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Best Prices & Offers –{" "}
                </span>
                Best price destination with offers directly from the
                manufacturers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Wide_Assortment.png"
                alt="genuine products"
                className="w-12 h-12 object-contain"
              />
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Wide Assortment –{" "}
                </span>
                Choose from 5000+ products across food, personal care, household
                & other categories.
              </p>
            </div>
          </div>
    
    </div>
  </div>


  );
};

export default ProductDisplayPage;
