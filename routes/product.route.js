import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import { addProduct, getProduct } from "../controllers/product.controller.js";
const productRouter=Router()
productRouter.post("/create",auth,upload.array("image", 10),addProduct)
productRouter.post("/get",getProduct)

export default productRouter