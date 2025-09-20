
import { useState } from "react";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
const EditCatagory = ({ close ,data:catagaryData}) => {
  const [loading,setloading]=useState(false)
  const [data, setData] = useState({
    _id:catagaryData._id,
    name: catagaryData.name,
    image: catagaryData.image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setloading(true)
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file,
      }));
    setloading(false)

    }}
  
    const handleSubmit=async (e) => {
      try {
        setloading(true)
        e.preventDefault()
    const formdata = new FormData();
formdata.append("_id", data._id);
formdata.append("name", data.name);
formdata.append("image", data.image)
        const res=await Axios({
          ...summaryApi.update_catagory,
        data: {
    _id: data._id,
    name: data.name,
    image: data.image, 
  },
          headers: {
            "Content-Type": "multipart/form-data",
          },
          
        })
        setData({
          name:"",
          image:""
        })
        // console.log("res",res.data);
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.message|| error.res.message)
      } finally{
        setloading(false)
      }
      
    }
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Category
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <input
            type="text"
            placeholder="Enter category name"
            name="name"
            value={data.name}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />

          {/* File Input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            disabled={!data.name} // disable if no name
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-500 file:text-white
              hover:file:bg-green-600
              disabled:file:bg-gray-400 disabled:cursor-not-allowed"
          />

         
          {data.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={data.image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Save Button */}
         <button
  type="submit"
  disabled={!data.name || !data.image} // disable if name OR image missing
  className={`w-full mt-6 px-6 py-3 text-white font-medium rounded-lg shadow transition duration-300 
    ${!data.name || !data.image 
      ? "bg-gray-400 cursor-not-allowed"  
      : "bg-green-500 hover:bg-green-600" 
    }`}
>
    {loading?"...Loading":"Edit Category"}

</button>
      
        </form>
      </div>
    </div>
  );
};

export default EditCatagory;

