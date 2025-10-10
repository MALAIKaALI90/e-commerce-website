import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";
const cardSchema = new Schema({
    productId: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }],
    quantity: {
        type: Number,
        default: 1
    },
    userId: [{
        type: mongoose.Schema.ObjectId,
        ref: "UserId"
    }],
}, { timestamps: true })
export const Card = mongoose.model("Card", cardSchema)