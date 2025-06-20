import connectToDb from "./db/connection.js";
import dotenv  from "dotenv";
import express from "express"
const app=express()

dotenv.config()
connectToDb().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log("connection to db");
        
    })

})
.catch((err)=>{
    console.log("cant connect to db");
    

})