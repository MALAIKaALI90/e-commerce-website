import React, { useState, useEffect } from "react";
import UploadCatagory from "../components/UploadCatagory";
import toast from "react-hot-toast";
import Loading from "../common/loading";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/axios";
import EditCatagory from "../components/EditCatagory";
import ConfirmBox from "../components/ConfirmBox";
import { useSelector } from "react-redux";

const Category = () => {
  const [openuploadCatagory, setopenuploadCatagory] = useState(false);
  const [catagoryData, setcatagoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, seteditData] = useState({ name: "", image: null });
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteCatagory, setdeleteCatagory] = useState({ _id: "" });
const catagory=useSelector(state=>state.product.allCatagory)
  // const fetchCatagory = async () => {
  //   try {
  //     setloading(true);
  //     const res = await Axios({ ...summaryApi.get_catagories });
  //     setcatagoryData(res.data.data);
  //   } catch (error) {
  //     toast.error(error.message || error.res?.data?.message);
  //   } finally {
  //     setloading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCatagory();
  // }, []);
useEffect(()=>{setcatagoryData(catagory)},[catagory])
  const handleDelete = async () => {
    try {
      const res = await Axios({
        ...summaryApi.delete_catagory,
        data: { _id: deleteCatagory._id },
      });
      toast.success(res.data.message);
      // fetchCatagory();
      setOpenConfirmBox(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="ml-48 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <button
          onClick={() => setopenuploadCatagory(true)}
          className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-lg shadow transition-colors"
        >
          + Add Category
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        Manage your categories easily and keep everything organized.
      </p>

      {/* Loading */}
      {loading && <Loading />}

      {/* Empty State */}
      {!loading && catagoryData.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400">No categories added yet.</p>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catagoryData.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col items-center justify-between transition-transform hover:scale-[1.02] h-[280px]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-28 h-28 object-contain rounded-lg bg-gray-100 mb-3"
              />
              <p className="font-semibold text-gray-700 text-lg">{cat.name}</p>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    seteditData(cat);
                  }}
                  className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBox(true);
                    setdeleteCatagory({ _id: cat._id });
                  }}
                  className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {openuploadCatagory && (
        <UploadCatagory close={() => setopenuploadCatagory(false)} />
      )}
      {openEdit && (
        <EditCatagory data={editData} close={() => setOpenEdit(false)} />
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

export default Category;
