import { User } from "../model/user.model.js"
import {Card} from "../model/card.model.js"

const AddtoCard=async (req,res) => {
    try {
        const userId=req.user;
        const {productId}=req.body;
        if (!productId) {
              return res.status(400).json({
            message:"Provide Product Id",
            error:true,
            success:false
        })
            
        }
        const checkItemInCard=await Card.findOne({
            userId:userId,
            productId:productId
        })
        if (checkItemInCard) {
         return res.status(400).json({
            message:"Product Alrady in Card",
            error:true,
            success:false
        })
            
        }
        const cardItem=await Card.create({
            productId:productId,
            quantity:1,
            userId:userId
        })
        const updateCrdUser=await User.updateOne({
            _id:userId},{
                 $push :{shoppingCart:productId}
            }
        )

         return res.json({
            message:"Item Add in Card Successfully",
            error:false,
            success:true,
            data:cardItem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
}
const getAllCardProduct=async (req,res) => {
    try {
       const userId=req.user;
       const cardItem=await Card.find({userId:userId}).populate("productId")
       return res.status(200).json({
            data:cardItem,
            error:false,
            success:true
        }) 
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        }) 
    }
}
const updateCardItemQuantity=async (req,res) => {
    try {
        const userId=req.user;
        const {_id,quantity}=req.body;
        if (!_id || !quantity) {
           return res.status(400).json({
            message:"Id or quantity not provided",
            error:true,
            success:false
        })  
        }
        const updateQuantity=await Card.findOne({_id:_id},{quantity:quantity})
           return res.json({
            message:"Item Added",
            error:false,
            success:true,
            data:updateQuantity
        })  
    } catch (error) {
         return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        }) 
    }
}
const  deleteCardItemQuantity=async (req,res) => {
    try {
        const {_id}=req.body;
        const userId=req.user

        const deleteItem=await Card.deleteOne({_id:_id})
         return res.status(200).json({
            message:"Item Removed from Cart",
            error:false,
            success:true,
            data:deleteItem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })   
    }
}
export {AddtoCard,getAllCardProduct,updateCardItemQuantity,deleteCardItemQuantity}