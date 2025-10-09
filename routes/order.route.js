import { Router } from "express";
import auth from "../middleware/auth.js";
import { cashOnDelivary, getOrderDetails, paymentIntigration, webhooksStripe} from "../controllers/order.controller.js";
const orderRouter=Router()
orderRouter.post("/cash-on-delivery",auth,cashOnDelivary)
orderRouter.post("/checkout",auth,paymentIntigration)
orderRouter.post("/webhook",webhooksStripe)
orderRouter.get("/order-list",auth,getOrderDetails)


export default orderRouter