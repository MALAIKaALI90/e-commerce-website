import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";
const SubcategorySchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    catagory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }]
}, { timestamps: true })
export const Subcategory = mongoose.model("Subcategory", SubcategorySchema)