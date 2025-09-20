import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from "../utils/axios";
import summaryApi from '../common/summaryApi';
import toast from "react-hot-toast"
const OpenSubCatagory = ({close,data}) => {
  // console.log(catagory);
  // console.log("data", data);
  const [subcatagory,setsubcatagory]=useState({
    _id:data._id,
    name:data?.name,
    image:data?.image,
    catagory:data?.catagory || []
  })
  const [updatedData,setupdatedData]=useState({
    
    name:data?.name,
    image:data?.image,
    catagory:data?.catagory || []
  })
  const allcatagories=useSelector(state=>state.product.allCatagory)

    const [loading,setloading]=useState(false)
const handleRemoveCatagory = (catagoryId) => {
  setsubcatagory((prev) => ({
    ...prev,
    catagory: prev.catagory.filter((el) => el._id !== catagoryId),
  }));
};   

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setsubcatagory((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      
      const file = e.target.files[0];
      if (file) {
        setsubcatagory((prev) => ({
          ...prev,
          image: file,
        }));
      }}
    
      const handleSubmit=async (e) => {
        try {
          setloading(true)
          e.preventDefault()
            const formdata=new FormData()
        formdata.append("image", subcatagory.image);
        formdata.append("name",subcatagory.name)
subcatagory.catagory.forEach((cat) => {
  formdata.append("catagory[]", cat._id); 
});        formdata.append("_id",subcatagory._id)


          const res=await Axios({
            ...summaryApi. update_subCatagory,
          data:formdata,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            
          })
          setupdatedData(res.data.data)
          // console.log( "data",res.data.data);
          
          setsubcatagory({
            name:"",
            image:"",
            catagory:[]
          })
          // console.log("res",res.data);
          if (close) {
            close()
          }
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
   
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

     
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Edit Sub  Category
        </h2>
        <form onSubmit={handleSubmit} >
      <label htmlFor='name'>Name</label>
          <input
            type="text"
            id='name'
            placeholder="Enter  Sub Category name"
            name="name"
            value={subcatagory.name}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />

          {/* File Input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            disabled={!subcatagory.name} // disable if no name
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-500 file:text-white
              hover:file:bg-green-600
              disabled:file:bg-gray-400 disabled:cursor-not-allowed"
          />

          {/* Image Preview Box */}
          {subcatagory.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={(updatedData.image)}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
<div>

 <label className="block text-sm font-medium text-gray-700 mb-1">
  Select  Category
</label>

<select
onChange={(e)=>{
  const value=e.target.value
  // console.log("value",value);//gives id of the catagory
  
  const catagaoryDetails=allcatagories.find(el=>el._id==value)
// console.log(catagaoryIndex);//gives specific catagory
setsubcatagory((prev) => ({
  ...prev,
  catagory: [...prev.catagory,catagaoryDetails],

}));

}}
  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
>
  <option value="">-- Select --</option>
  {allcatagories.map((cat, index) => (
    <option value={cat._id} key={cat._id + "subcatagory"+index}>
      {cat?.name}
    </option>
  ))}
</select>
  {/** display catagory */}

  <div className="flex flex-wrap gap-2 mt-3">
  {subcatagory?.catagory?.map((cat,index) => (
    <div
      key={cat._id+"setsubcatagory"+index}
      className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full shadow-sm"
    > 
      <span className="text-sm font-medium">{cat?.name}</span>
      <button
        type="button"
        onClick={() => handleRemoveCatagory(cat._id)}
        className="text-yellow-600 hover:text-red-600 font-bold"
      >
        ✕
      </button>
    </div>
  ))}
</div>
</div>
         
         <button
  type="submit"
  disabled={!subcatagory.name || !subcatagory.image} 
  className={`w-full mt-6 px-6 py-3 text-white font-medium rounded-lg shadow transition duration-300 
    ${!subcatagory.name || !subcatagory.image 
      ? "bg-gray-400 cursor-not-allowed"  
      : "bg-green-500 hover:bg-green-600" 
    }`}
>
  {loading? "...Loading ":"  Edit  Sub Category"}
 
</button>
      
        </form>
      </div>
    </div>
  );
}

export default OpenSubCatagory
