import mongoose from "mongoose";
import  Mongoose,{Schema } from "mongoose";
const userSchema= new Schema ({
    username:{
        type:String,
        require:[true,"provide username"]
    },
    email:{
        type:String,
require:[true,"provide email"],
unique:true

    },
    password:{
        type:String,
        require:[true,"provide password"]
    },
avatar:{
    typ:String,
     require:[true,"provide avatar"]
},
mobileNum:{
    typ:Number,
    default:null
},

verifyEmail:{
    type:Boolean,
default:false
},
refreshToken:{
    type:String,
    default:""
},
forgotPassword:{
    type:number,
    default:null
},
lastLoginDate:{
type:Date,
default:""
},
status:{
    type:String,
    enum:["active","notActive","suspended"],
    default:"active"
},
addressDetail:[{
    type:mongoose.Schema.ObjectId,
    ref:"Address"}],

    shoppingCart:[{
    type:mongoose.Schema.ObjectId,
    ref:"Cart"}],

    OrderHistory:[{
    type:mongoose.Schema,ObjectId,
    ref:"Order"}],
role:{
    type:String,
    enum:["ADMIN","USER"],
    default:"USER"
}
},{timestamps:true})
export const User=mongoose.model("User",userSchema)