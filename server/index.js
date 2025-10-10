import connectToDb from "./db/connection.js";
import dotenv  from "dotenv";
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet  from "helmet"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import catagoryRouter from "./routes/catagory.route.js";
import subCatogaryRouter from "./routes/subcatagory.route.js";
import productRouter from "./routes/product.route.js";
import cardRouter from "./routes/Card.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import { webhooksStripe } from "./controllers/order.controller.js";
import bodyParser from "body-parser";
const app=express()
app.post(
  "/api/order/webhook",
  bodyParser.raw({ type: 'application/json' }),
  webhooksStripe
);
app.use(morgan("dev"))
app.use(helmet({
    crossOriginEmbedderPolicy:false
}))

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URI
}))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.get("/", (req, res) => {
  res.send("Backend server is running successfully 🚀");
});
dotenv.config()
connectToDb().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`app is  running on ${ process.env.PORT}`);
        
    })

})
.catch((err)=>{
    console.log( err.message,"cant connect to db")
})
app.use("/api/user",userRouter)
app.use("/api/catagory",catagoryRouter)
app.use("/api/subcatagory",subCatogaryRouter)
app.use("/api/product",productRouter)
app.use("/api/card",cardRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)

