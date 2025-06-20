import mongoose from "mongoose";
import  Mongoose,{Schema } from "mongoose";
const orderSchema= new Schema ({
    userId:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
        orderId:[{
        type:String,
        require:true,
        unique:true
    }],

    productId:[{
           type:mongoose.Schema.ObjectId,
        ref:"Product"
    }],
    productDetail:{
        name:String,
        image:Array
    },
    paymentId:{
        type:String,
        default:""
    },
    paymentStatus:{type:String,
        default:""

    },
    deliveryAddress:[{
        type:mongoose.Schema.ObjectId,
        ref:"Address"}],
        subTotalAmt:{
            type:Number,
            default:0
        },
        totalAmt:{
            type:Number,
            default:0
        },
        invoiceReciept:{
            type:String,
            default:""
        }


},{timestamps:true})
export const Order=mongoose.model("Order",orderSchema)