import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    publish: {
        type: Boolean,
        default: true
    },
    unit: {
        type: String,
        default: null
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }],
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory"
    }],
}, { timestamps: true })

productSchema.index({ name: 'text', description: 'text' }, { weights: { name: 10, description: 5 } });
export const Product = mongoose.model("Product", productSchema)