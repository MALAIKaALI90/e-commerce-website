import mongoose from "mongoose";
 const connectToDb=(async()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
console.log("successfully conect to db");
    } catch (error) {
        console.log("there is an error to connet to db");
        throw error
    }
 })
export default connectToDb