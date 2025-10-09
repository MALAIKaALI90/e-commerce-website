import React, { useEffect, useState } from 'react';
import Loading from '../common/loading';
import Axios from "../utils/axios";
import summaryApi from '../common/summaryApi';
import { useLocation } from 'react-router-dom';
import image from "../OIP.jpeg";

const Searchpage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const params = useLocation();
  const searchText = params.search.slice(3); // better: use URLSearchParams

  const fetchSearchProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.getSearchProduct,
        data: {
          search: searchText,
          page: page,
          limit: 12
        }
      });

      setData(res.data.data);
      setTotalPage(res.data.totalPage);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [page, searchText]);

  return (
    <section>
      <div>
        <p>Search Result: {data.length}</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : data.length === 0 && !loading? (
        // No Results Found
        <div className="flex flex-col items-center justify-center py-30">
          <img src={image} alt="no data" className="w-40 h-40 object-contain mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((product, index) => (
            <div
              key={product._id || index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Unit: {product.unit}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data.length > 0 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-gray-600 font-medium">
            Page {page} of {totalPage}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPage}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Searchpage;
