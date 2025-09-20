import React, { useState } from "react";
import ViewImage from "../components/ViewImage";
import { useSelector } from "react-redux";
import Axios from  '../utils/axios';
import summaryApi from "../common/summaryApi";
import SuccessAlert from "../utils/SuccessAlert";



const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [cotagory, setCotagory] = useState([]);
  const [subcotagory, setSubcotagory] = useState([]);
  const category = useSelector((state) => state.product.allCatagory);
  const subCategory = useSelector((state) => state.product.setAllSubCatagory);

  // console.log("Redux", subCategory);
  // console.log("subcotagory", subcotagory);

  const [data, setData] = useState({
    name: "",
    image: [],
    description: "",
    category: [],
    subCategory: [],
    unit: "",
    stock: 0,
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
 const files = Array.from(e.target.files);    setData((prev) => ({
      ...prev,
     image:[...prev.image,...files]
    }));
  };

  // ✅ Remove category
  const handleRemoveCategory = (catId) => {
    setCotagory((prev) => prev.filter((el) => el._id !== catId));
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((id) => id !== catId),
    }));
  };
const handleSubmit=async(e)=>{try {
  e.preventDefault()
  // console.log("data",data);
  const fromdata=  new FormData()
  fromdata.append("name",data.name)
data.image.forEach((file) => {
  fromdata.append("image", file); 
});  fromdata.append("description",data.description)
  fromdata.append("category",data.category)
  fromdata.append("subCategory",data.subCategory)
  fromdata.append("unit",data.unit)
  fromdata.append("stock",data.stock)
  fromdata.append("price",data.price)
  fromdata.append("discount",data.discount)
  
  const res=await Axios({
...summaryApi.upload_product,data:fromdata,
     headers: {
              "Content-Type": "multipart/form-data",
            },
       

  })
       
  setData({
    name: "",
    image:[],
    description: "",
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
  })
    SuccessAlert("Upload Successfully")
} catch (error) {
  console.log(error);
  
}
}
  // ✅ Remove subcategory
  const handleRemoveSubCatagory = (subcatId) => {
    setSubcotagory((prev) => prev.filter((el) => el._id !== subcatId));
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((id) => id !== subcatId),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Upload Product</h2>
      </div>

      <form  onSubmit={handleSubmit}className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Upload Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          disabled={!data.name}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-green-500 file:text-white
            hover:file:bg-green-600
            disabled:file:bg-gray-400 disabled:cursor-not-allowed"
        />

        {/* Image Preview */}
      {data.image.length > 0 && (
  <div className="flex gap-4 flex-wrap mt-4">
    {data.image.map((img, index) => (
      <img
        key={index}
        src={URL.createObjectURL(img)}
        alt={`preview-${index}`}
        onClick={() => setViewImage(img)} // show clicked image
        className="w-32 h-32 object-cover rounded-lg shadow-md cursor-pointer"
      />
    ))}
  </div>
)}
        {/* Product Description */}
        <textarea
          placeholder="Write Product Description"
          name="description"
          rows={3}
          value={data.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Select Category */}
        <select
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            const categoryDetails = category.find((el) => el._id === value);
            if (categoryDetails) {
              setCotagory((prev) => [...prev, categoryDetails]);
              setData((prev) => ({
                ...prev,
                category: [...prev.category, categoryDetails._id],
              }));
            }
          }}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            ----- Select Category -----
          </option>
          {category.map((cat) => (
            <option value={cat._id} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Show selected categories */}
        {cotagory.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {cotagory.map((c) => (
              <span
                key={c._id}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {c.name}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(c._id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Select SubCategory */}
        <select
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;

            const subCategoryDetails = subCategory[0]?.find(
              (el) => el._id === value
            );

            if (subCategoryDetails) {
              setSubcotagory((prev) => [...prev, subCategoryDetails]);
              setData((prev) => ({
                ...prev,
                subCategory: [...prev.subCategory, subCategoryDetails._id],
              }));
            }
          }}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            ----- Select SubCategory -----
          </option>
          {subCategory[0]?.map((subcat) => (
            <option value={subcat._id} key={subcat._id}>
              {subcat.name}
            </option>
          ))}
        </select>

        {/* Show selected subcategories */}
        {subcotagory.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {subcotagory.map((subcat) => (
              <span
                key={subcat._id}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {subcat.name}
                <button
                  type="button"
                  onClick={() => handleRemoveSubCatagory(subcat._id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
{/**stock */}


          </div>
        )}
     

      {/* View Image Modal */}
     {viewImage && (
  <ViewImage
    url={URL.createObjectURL(viewImage)}
    close={() => setViewImage(null)}
  />
)}
        <label htmlFor="unit">Unit</label>

         <input id="unit"
          type="text"
          placeholder="Enter Product Unit"
          name="unit"
          value={data.unit}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label htmlFor="stock"> Number of Stock</label>
           <input
           id="stock"
          type="Number"
          placeholder="Enter Product stock"
          name="stock"
          value={data.stock}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
         <label htmlFor="price">Price </label>
           <input
           id="price"
          type="Number"
          placeholder="Enter Product Price"
          name="price"
          value={data.price}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
         <label htmlFor="discount">Discount</label>
           <input
           id="discount"
          type="Number"
          placeholder="Enter Product Discount"
          name="discount"
          value={data.discount}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
     <button
  type="submit"
  disabled={loading}
  className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl 
             shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 
             focus:ring-green-400 focus:ring-offset-1 transition disabled:bg-gray-400"
>
  {loading ? "Uploading..." : "Submit"}
</button>
         </form>
    </div>
    
  );
};

export default UploadProduct;
