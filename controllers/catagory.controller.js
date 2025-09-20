import { Category } from "../model/catagory.model.js"
import { Subcategory } from "../model/subCatogary.model.js"
import { Product } from "../model/product.model.js"
import uploudImageCloudinary from "../utils/Cloudinary.js"
const uploadCatagory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({
                message: "All Fileds are Required",
                error: true,
                success: false
            })

        }
        const image = req.file
        //    console.log(image);

        if (!image) {
            return res.status(400).json({
                message: "Image is not Provided",
                error: true,
                success: false
            })
        }
        const file = await uploudImageCloudinary(image)
        // console.log(file);

        const addCatagory = await Category.create({
            name,
            image: file.url

        })
        return res.json({
            message: " Catagory Added",
            error: false,
            success: true,
            data: addCatagory
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
const getAllCatagories = async (req, res) => {
    try {
        const data = await Category.find().sort({ createdAt: -1 });
        return res.json({
            data: data,
            // message:"these are All Catagories",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
const updateCatagory = async (req, res) => {
    try {
        const { name, _id } = req.body;
        const image = req.file


        if (!image) {
            return res.status(400).json({
                message: "Image is not Provided",
                error: true,
                success: false
            })
        }
        const file = await uploudImageCloudinary(image)
        const updatedData = await Category.updateOne({
            _id: _id
        }, {
            name,
            image: file.url
        })
        return res.json({
            message: "Catagory Updated",
            error: false,
            success: true,
            data: updatedData
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
const deleteCatagory = async (req, res) => {
    try {
        const { _id } = req.body;
        const checkSubCatagory = await Subcategory.find({
            catagory: {
                "$in": [_id]
            }
        }).countDocuments()
        const checkProduct = await Product.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()
        if (checkSubCatagory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Catagory is already userd you can not delete it",
                error: true,
                success: false
            })
        }
        const deleted = await Category.deleteOne({ _id: _id })
        return res.json({
            message: "Delete Catagory successfully",
            error: false,
            success: true,
            data: deleted
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }

}
export { uploadCatagory, getAllCatagories, updateCatagory, deleteCatagory }
