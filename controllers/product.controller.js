import { Product } from "../model/product.model.js";
import uploudImageCloudinary from "../utils/Cloudinary.js";

const addProduct=async (req,res) => {
    try {
        const {name,description,unit,stock,price,category,subCategory,discount}=req.body;
const image = req.files
if (!name || !description || !unit || !stock || !price || !category ||!subCategory ||!image) {
     return res.status(400).json({
            message:"All Fields are required",
            error:true,
            success:false
        })
}
           const files = [];
    for (const img of image) {
      const file = await uploudImageCloudinary(img);
      files.push(file.url);
    }
const newProduct=await Product.create({
    name,
    image:files,
    description,
    stock,
    unit,
    category,
    subCategory,
    price,
    discount
})
return res.json({
    message:"Product Upload Successfully",
    error:false,
    success:true,
    data:newProduct
})
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
    
}

const getProduct=async (req,res) => {
    try {
        let {page,limit,search}=req.body;

        if (!page) {
            page=1
            
        }
        if (!limit) {
            limit=10
            
        }
        const query=search?{
            $text:{
                $search : search
            }
        }:{}
        const skip=(page-1) *limit
       const [data,totalCount]=await Promise.all([
        Product.find(query).sort({createdAt:-1}).skip(skip).limit(limit).
        Product.countDocuments(query)
       ])
    return res.json({
        message:"Product data",
        error:false,
        success:true,
        totalCount:totalCount,
        totalNoPage:Math.ceil(totalCount/limit),
    data:data
    })
    } catch (error) {
       return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
    
}
export {addProduct,getProduct}