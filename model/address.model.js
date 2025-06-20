import mongoose from "mongoose";
import  Mongoose,{Schema } from "mongoose";
const AddressSchema= new Schema ({
    houseNum:{
        type:String,
        default:""
    },
    city:{
        type:String,
        defaut:""
    },
     state:{
        type:String,
        defaut:""
    },
     pincode:{
        type:String,
        defaut:""
    },
     coutry:{
        type:String,
        defaut:""
    },
     mobileNum:{
        type:Number,
        defaut:null
    },

},{timestamps:true})
export const Address=mongoose.model("Address",AddressSchema)