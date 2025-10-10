import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddtoCard, deleteCardItemQuantity, getAllCardProduct, updateCardItemQuantity } from "../controllers/card.controller.js";
const cardRouter=Router()
cardRouter.post("/add" ,auth,AddtoCard)
cardRouter.get("/get" ,auth,getAllCardProduct)
cardRouter.put("/update-quantity" ,auth,updateCardItemQuantity)
cardRouter.delete("/delete-item",auth,deleteCardItemQuantity)


export default cardRouter