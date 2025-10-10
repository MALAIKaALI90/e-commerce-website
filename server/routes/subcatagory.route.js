import { Router } from "express";
import auth from "../middleware/auth.js";
import {addSubCatagory,deletesubcatagory,getAllSubCatagories, updateSubCatagory} from "../controllers/subCatogary.js";
import upload from "../middleware/multer.js";
const subCatogaryRouter=Router()

subCatogaryRouter.post("/create",auth,upload.single("image"),addSubCatagory)
subCatogaryRouter.post("/All-subcatagories",getAllSubCatagories)
subCatogaryRouter.put("/update",auth,upload.single("image"),updateSubCatagory)
subCatogaryRouter.delete("/delete",auth,deletesubcatagory)
export default subCatogaryRouter
