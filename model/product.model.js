import mongoose from "mongoose";
import  Mongoose,{Schema } from "mongoose";
const productSchema= new Schema ({
    name:{
        type:String,
        require:true
    },
    image:{
        type:Array,
       default :[]
    },
    discription:{
        type:String,
        default:""
    },
    publish:{
        type:Boolean,
        default:true
    },
    unit:{
        type:String,
        default:null
    },
    stock:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    categoryOf:[{
        type:mongoose.Schema.ObjectId,
        ref:"Category"}],
            subCategoryOf:[{
        type:mongoose.Schema.ObjectId,
        ref:"Subcategory"}],
},{timestamps:true})
export const Product=mongoose.model("Product",productSchema)