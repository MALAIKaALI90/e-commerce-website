import React, { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import Loading from "../common/loading";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddtoCardBtn from "./addtoCardBtn";
const CatagoryWiseProducts = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const fetchCatagoryProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.getProductByCatagory,
        data: { id },
      });
      setData(res.data.data || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 300;
  };
  const subcatagoryData = useSelector(state =>state.product.setAllSubCatagory);
  // console.log({subcatagoryData});
  
  const handleRedirectProductListPage = ({ id, name }) => {
  const flatSubCatagoryData = subcatagoryData?.flat?.() || [];

  const subCatagory = flatSubCatagoryData.find(sub =>
    sub.catagory?.some(c => c._id?.toString() === id?.toString())
  );

  // If nothing found, return fallback URL
  if (!subCatagory) {
    return `/${name.replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-")}-${id}`;
  }

  return `/${name.replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-")}-${id}/${subCatagory.name}-${subCatagory._id}`;
};



  useEffect(() => {
    fetchCatagoryProduct();
  }, [id]);

  return (
    <div className="my-12 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        <Link
            to={handleRedirectProductListPage({ id, name })}
          className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold"
        > 
          See All →
        </Link>
      </div>

      {/* Loading State */}
      {loading && <Loading />}

      {/* Products Section */}
      {data.length > 0 ? (
        <div className="relative">
          {/* Horizontal Scrollable Container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
          >
            {data.map((p) => (
              <div
                key={p._id}
                className="bg-white min-w-[180px] max-w-[200px] rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-5 flex flex-col items-center border border-gray-100"
              >
                {/* Product Image */}
                <Link to={`/product/${p.name}-${p._id}`}>
                  <img
                    src={p.image?.[0]}
                    alt={p.name}
                    className="w-28 h-28 object-cover rounded-xl mb-4 hover:opacity-90 transition"
                  />
                </Link>

                {/* Product Info */}
                <h3 className="text-sm font-semibold text-gray-800 truncate w-full text-center">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500">{p.unit}</p>
                <p className="text-gray-900 font-bold mt-2">
                  {p.price ? `Rs. ${p.price}` : "Price N/A"}
                </p>

                {/* Add Button */}
                {p.stock === 0 ? (
                  <button
                    disabled
                    className="mt-3 px-4 py-2 bg-gray-200 text-gray-500 text-sm font-medium rounded-full shadow-sm w-full cursor-not-allowed"
                  >
                    ❌ Out of Stock
                  </button>
                ) : (
                  
                 <AddtoCardBtn p={p}/>
                )}
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={handleScrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-sm text-center mt-6">
            No products found
          </p>
        )
      )}
   </div>
  );
};

export default CatagoryWiseProducts;
