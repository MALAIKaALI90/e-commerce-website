import mongoose from "mongoose";
import  Mongoose,{Schema } from "mongoose";
const AddressSchema= new Schema ({
    addressline:{
        type:String,
        default:""
    },
    city:{
        type:String,
        defaut:""
    },
    
     postalcode:{
        type:String,
        defaut:""
    },
     country:{
        type:String,
        defaut:""
    },
     phone:{
        type:Number,
        defaut:null
    },
    status:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        default:""
    }

},{timestamps:true})
export const Address=mongoose.model("Address",AddressSchema)