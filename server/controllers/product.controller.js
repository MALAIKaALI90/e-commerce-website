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
        Product.find(query).sort({createdAt:-1}).skip(skip).limit(limit).populate("category subCategory"),
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
const getProductByCatagory=async (req,res) => {
    try {
        const {id}=req.body
        if (!id) {
             return res.status(400).json({
            message:"Provide Catagory Id",
            error:true,
            success:false
        })  
            
        }
        const products=await Product.find({
            category:{$in :[id]}
        }).limit(20)
        return res.json({
            message:"Catagory Product List",
            error:false,
            success:true,
            data:products

        })  
    } catch (error) {
         return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
}
const getproductByCatagoryAndSubCatagory=async (req,res) => {
    try {
         const {catagoryId,subCategoryId}=req.body;
        if (!catagoryId || !subCategoryId) {
            return res.status(400).json({
            message:"Providing Catagory and SubCatagory Id",
            error:true,
            success:false
        })  
        }
       
        const query={
            category:{$in:[catagoryId]},
            subCategory:{$in:[subCategoryId]}

        }
   
        const [data,dataCount]= await Promise.all([
            Product.find(query).sort({createdAt :-1}),
            Product.countDocuments(query)

        ])
       return res.json({
        message:"Product List",
        data:data,
       
        error:false,
        success:true
       })

    } catch (error) {
         return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
    
}
const getOneProduct=async (req,res) => {
    try {
        const {productId}=req.body
        const product=await Product.findOne({_id:productId})
return res.json({
    message:"Product DEtails",
    data:product,
    error:false,
    success:true
})
    } catch (error) {
          return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
}
const editProduct=async (req,res) => {
    try {
        const {_id}=req.body;
        if (!_id) {
             return res.status(400).json({
            message:"PRovide Product Id",
            error:true,
            success:false
        })  
            
        }

        const updateProduct=await Product.updateOne({_id:_id},{
            ...req.body
        })
          return res.status(200).json({
            message:"Updated Successfully",
            error:false,
            success:true,
            data:updateProduct
        })  
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
}
const deleteProduct=async (req,res) => {
    try {
        const {_id}=req.body;
          const deletedProduct = await Product.findByIdAndDelete(_id);
        
            if (!deletedProduct) {
              return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
              });
            }
        
            return res.status(200).json({
              message: "Product deleted successfully",
              error: false,
              success: true,
            });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })  
    }
}
const searchProduct=async (req,res) => {
    try {
        let {search ,page,limit}=req.body;
        if (!page) {
           page=1
        }
        if (!limit) {
            limit=10
        }
const query=search? {
$text:{
    $search :search
}
}:{}
const skip=(page-1)*limit
const [data,dataCount]=await Promise.all([
    Product.find(query).sort({createdAt :-1}).skip(skip).limit(limit).populate("category subCategory"),
    Product.countDocuments(query)
])
 return res.status(200).json({
              message: "Search Product",
              error: false,
              success: true,
              page:page,
              limit:limit,
              data:data,
              totalCount:dataCount,
              totalPage:Math.ceil(dataCount/limit)

            });
    } catch (error) {
         return res.status(500).json({
              message: error.message,
              error: true,
              success: false,
            }); 
    }
}
export {addProduct,getProduct,getProductByCatagory,getproductByCatagoryAndSubCatagory,getOneProduct,editProduct,deleteProduct,searchProduct}