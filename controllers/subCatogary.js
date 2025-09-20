import { Subcategory}  from "../model/subCatogary.model.js";
import uploudImageCloudinary from "../utils/Cloudinary.js";

const addSubCatagory=async (req,res) => {
    try {
        const {name,catagory}=req.body;

        if (!name || !catagory) {
             return  res.status(400).json({

        message:"All Fields are required",
        error:true,
        success:false
         })
        }
        const image=req.file
     //    console.log( "image",image);
        
        if (!image) {
          
     return  res.status(400).json({

        message:"Files are required",
        error:true,
        success:false
         })
        }
        const file=await uploudImageCloudinary(image)  
       const createSubcategory=await Subcategory.create({
      ...(name &&{name:name}),
      ...(image &&{image:file.url}),
      ...(catagory && {catagory:catagory})
       })
          return  res.status(200).json({

        message:"Sub Catagory  Added",
        error:false,
        success:true,
        data:createSubcategory
         })
    } catch (error) {
         return res.status(500).json({

        message:error.message,
        error:true,
        success:false
         })}
    
}

const getAllSubCatagories=async (req,res) => {
     try {
          const data=await Subcategory.find().sort({createdAt:-1}).populate('catagory')
          return res.status(200).json({

        data:data,
        error:true,
        success:false
         })
          
     } catch (error) {
            return res.status(500).json({

        message:error.message,
        error:true,
        success:false
         })}
     }
const updateSubCatagory=async (req,res) => {
     try {
          const {_id,name,catagory}=req.body;
          const subCatagoryId=await Subcategory .findById(_id)
          if (!subCatagoryId) {
                  return res.status(400).json({

        message:"This  catagory is not available",
        error:true,
        success:false
         })

               
          } 
          const image=req.file
          console.log("image",image);
          
         const file= await uploudImageCloudinary(image)
         console.log ("file",file);
         
          const updatedData=await Subcategory.findByIdAndUpdate(_id,{
               name,
               catagory,
               image:file.url
          },{new:true})
      return res.status(200).json({

        message:"Sub Catagory Updated successfully",
        error:false,
        success:true,
        data:updatedData
         })
          

     } catch (error) {
           return res.status(500).json({

        message:error.message,
        error:true,
        success:false
         })
     }
}
const deletesubcatagory = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedSubCategory = await Subcategory.findByIdAndDelete(_id);

    if (!deletedSubCategory) {
      return res.status(404).json({
        message: "Subcategory not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
export { addSubCatagory,getAllSubCatagories,updateSubCatagory,deletesubcatagory}