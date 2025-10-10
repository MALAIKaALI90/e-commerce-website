import { Router } from "express";
import auth from "../middleware/auth.js";
import { deleteCatagory, getAllCatagories, updateCatagory, uploadCatagory } from "../controllers/catagory.controller.js";
import upload from "../middleware/multer.js";

const catagoryRouter=Router();
catagoryRouter.post("/upload-catagory",auth,upload.single("image"),uploadCatagory)
catagoryRouter.get("/All-catagories",getAllCatagories)
catagoryRouter.put("/update-catagories",upload.single("image"),auth,updateCatagory)
catagoryRouter.delete("/delete-catagory",deleteCatagory)

export default catagoryRouter