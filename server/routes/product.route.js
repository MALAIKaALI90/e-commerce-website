import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import { addProduct, deleteProduct, editProduct, getOneProduct, getProduct, getProductByCatagory, getproductByCatagoryAndSubCatagory, searchProduct } from "../controllers/product.controller.js";
import admin from "../middleware/admin.js";
const productRouter=Router()
productRouter.post("/create",auth,upload.array("image", 10),admin,addProduct)
productRouter.post("/get",getProduct)
productRouter.post("/get-product-by-catagory",getProductByCatagory)
productRouter.post("/get-product-by-catagory-and-subCatagory",getproductByCatagoryAndSubCatagory)
productRouter.post("/get-product-by-catagory-and-subCatagory",getproductByCatagoryAndSubCatagory)
productRouter.post("/get-productDetail",getOneProduct)
productRouter.put("/update-product",auth,admin,editProduct)
productRouter.delete("/delete-product",auth,admin,deleteProduct)
productRouter.post("/get-search-product",searchProduct)

export default productRouter