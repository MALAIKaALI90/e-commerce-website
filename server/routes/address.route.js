import { Router } from "express";
import auth from "../middleware/auth.js";
import { addAddress,  deleteAddress,  getAddress, updateAddress } from "../controllers/address.controller.js";
 const addressRouter=Router()
 addressRouter.post("/create",auth,addAddress)
 addressRouter.get("/get",auth,getAddress)
 addressRouter.put("/update",auth,updateAddress)
 addressRouter.delete("/delete",auth,deleteAddress)
 export default addressRouter