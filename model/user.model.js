import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "provide username"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    avatar: {
        type: String,
        default:""
    },
    mobileNum: {
        type: Number,
        default: null
    },

    verifyEmail: {
        type: Boolean,
        default: false
    },
    RefreshToken: {
        type: String,
        default: ""
    },
    forgotPassword: {
        type:String,
        default: null
    },
     forgotPasswordExpiry: {
        type: Date,
        default: null
    },
    lastLoginDate: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "notActive", "suspended"],
        default: "active"
    },
    addressDetail: [{
        type: mongoose.Schema.ObjectId,
        ref: "Address"
    }],

    shoppingCart: [{
        type: mongoose.Schema.ObjectId,
        ref: "Cart"
    }],

    OrderHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Order"
    }],
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }
}, { timestamps: true })
export const User = mongoose.model("User", userSchema)
