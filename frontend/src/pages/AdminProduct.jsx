import React, { useState, useEffect } from 'react';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryApi';
import toast from 'react-hot-toast';
import Loading from '../common/loading';
import EditProduct from '../components/EditProduct';
import ConfirmBox from '../components/ConfirmBox';

const AdminProduct = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [productData, setProductData] = useState([]);
  const [totalNoPage, settotalNoPage] = useState(1);
  const [loading, setLoading] = useState(false);
const [editable,seteditable]=useState(false)
const [editData,setEditData]=useState(null)
const [openconfirmBox,setOpenConfirmBox]=useState(false)
const [deletedProductId,setDeleteProductId]=useState("")
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await Axios({
        ...summaryApi.get_product,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      // console.log('product all', res);
      // console.log('product all page', res.data.totalNoPage);

      settotalNoPage(res.data.totalNoPage);
      setProductData(res.data.data);
      // toast.success(res.data.message);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async () => {
    try {
      const res = await Axios({
        ...summaryApi.deletedProduct,
        data:{_id:deletedProductId}
      });
      toast.success(res.data.message);
      // fetchCatagory();
      setOpenConfirmBox(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]); 


  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
  
    if (page < totalNoPage) {
      setPage(prev => prev + 1);
    }
  };

  const handleOnChange = (e) => {
    // Good practice: Reset the page to 1 when a new search is initiated.
    setPage(1);
    const { value } = e.target;
    setSearch(value);
  };
useEffect(() => {
 
  const timer = setTimeout(() => {
    fetchProducts();
  }, 300);

  return () => {
    clearTimeout(timer);
  };
}, [search]);
  // console.log(search);

return (
  <div className="container mx-auto px-4 py-8">
    {/* Header with Search */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
        Our Products 🛒
      </h2>
      <input
        type="text"
        placeholder="Search your products..."
        className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={search}
        onChange={handleOnChange}
      />
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image[0]}
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

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Edit */}
                <button
                 onClick={() => {
                    seteditable(true);
                    setEditData(product);
                  }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  Edit
                </button>

                {/* Delete */}
                <button onClick={() => {
                    setOpenConfirmBox(true);
                   setDeleteProductId( product._id );
                  }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 shadow-sm transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3-4h6l1 1H8l1-1z" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Pagination */}
    <div className="mt-12 flex flex-col items-center gap-3">
      <p className="text-gray-600 font-medium">
        Page {page} of {totalNoPage}
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
          disabled={page === totalNoPage}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
{editable && <EditProduct data={editData} close={()=>seteditable(false)}/>}
 {openconfirmBox&& <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          confirm={handleDelete}
          cancel={() => setOpenConfirmBox(false)}
        />  }
  </div>
);

};

export default AdminProduct;