import React from 'react'
import { useState } from 'react';
import OpenSubCatagory from '../components/OpenSubCatagory';
import toast from 'react-hot-toast';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryApi';
import { useEffect } from 'react';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from "@tanstack/react-table"
import ViewImage from '../components/ViewImage';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditSubCatagpry from '../components/EditSubCatagpry';
import ConfirmBox from '../components/ConfirmBox';
const SubCatagory = () => {
  const   [ImageUrl,setImageUrl]=useState("")
    const [opensubCatagory, setopensubCatagory] =useState(false);
    const [subcatogaryData,setsubcatogaryData]=useState([])
    const [loading,setloadng]=useState(false)
    const [openEditSubCatgory ,setopenEditSubCatgory]=useState(false)
    const [editData,seteditData]=useState({
      _id:""
    })
      const [confirmBox,setConfirmBox]=useState(false)
        const [deleteCatagory, setdeleteCatagory] = useState({ _id: "" });
      
    
    // console.log( "editData",editData);
      const handleDelete = async () => {
    try {
      const res = await Axios({
        ...summaryApi.delete_subcatagory,
        data: { _id: deleteCatagory._id },
      });

      toast.success(res.data.message);
          setsubcatogaryData((prev) =>
      prev.filter((item) => item._id !== deleteCatagory._id)
    );
     setConfirmBox(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
const columnHelper = createColumnHelper()
  const fetchSubCatagory=async () => {
    try {
      setloadng(true)
      const res=await Axios({
        ...summaryApi.get_subcatagories
      })
      // console.log(res.data.data);
      
setsubcatogaryData(res.data.data)
    } catch (error) {
    toast.error(error.message)
    } finally{
      setloadng(false)
    }
    
  }
  useEffect(()=>{
    fetchSubCatagory()
  },[])
  // console.log(subcatogaryData);
  const column=[
    columnHelper.accessor('name',{
   header:"Name"
    }),
    columnHelper.accessor("image",
      {header:"Image",
cell:({row})=>{
  // console.log( "info",row.original.image
  // );
  
  return <img
  src={row.original.image}
  alt=''
   className="w-16 h-16 object-cover rounded-lg shadow"
   onClick={()=>setImageUrl(row.original.image)}
  />
}

      }
    ),
    columnHelper.accessor("catagory",{
      header:"Catagory",
      cell:({row})=>{
        // console.log(row.original.catagory[0].name);
        return <>
        
        {row.original.catagory.map((c,index)=>{
          return(
            <p key={c._id+index}>{c.name}</p>
          )
        })}
        </>
      }
    }),
    columnHelper.accessor("_id",{
      header:"Action",
      cell:({row})=>{
        return(
        <div className="flex gap-3">
  
  <button
  onClick={()=>{
    
    setopenEditSubCatgory(true) ;
      seteditData(row.original)}}
  
      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors shadow-sm"
  >
    <CiEdit size={20}  />

  </button>

 
  <button onClick={()=>{setConfirmBox(true) 
  setdeleteCatagory(row.original)}
  
  }
  
    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
  >
    <MdDelete size={20} />
  </button>
</div>
        )
      }
    })
  ]
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800"> Sub Categories</h2>
        <button
          onClick={() => setopensubCatagory(true)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition duration-300"
        >
          + Add Sub Category
        </button>
      </div>

      <div>

        <DisplayTable  data={subcatogaryData}
        columns={column}
        />
        { ImageUrl &&
        <ViewImage url={ImageUrl} close={()=>setImageUrl("")}/>}
      </div>
      {opensubCatagory && (
        <OpenSubCatagory close={() => setopensubCatagory(false)}/>
      ) }
      {openEditSubCatgory && <EditSubCatagpry data={editData} close={()=>setopenEditSubCatgory(false)} />}
{confirmBox && (
  <ConfirmBox 
    close={() => setConfirmBox(false)} 
    confirm={handleDelete} 
    cancel={() => setConfirmBox(false)} 
  />
)}    </div>
  )
}

export default SubCatagory
