import { Address } from "../model/address.model.js"
import { User } from "../model/user.model.js"


const addAddress=async (req,res) => {
    try {
        const userId=req.user
        const {addressline,city,postalcode,country,phone}=req.body;
        if (!addressline || !city || !postalcode || !country || !phone) {
             return res.status(400).json({
            message:"Please provide All the fields",
            error:true,
            success:false
        })
        }
        const createAddress=await Address.create({
           addressline,
           city,
           postalcode,
           country,
           phone,
           userId:userId
        })
    const adduserAddressId=await User.findByIdAndUpdate(userId,{
        $push:{
            addressDetail:createAddress._id
        }
    })
     return res.status(200).json({
            message:"Address created successfully",
            error:false,
            success:true,
            dats:adduserAddressId
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
}
const getAddress=async (req,res) => {
const user=req.user
    try {
        const user=req.user;
        const alladdress=await Address.find({userId:user})
         return res.status(200).json({
            message:"Your Addresses",
            error:false,
            success:true,
            data:alladdress
        })

    } catch (error) {
         return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
}
const updateAddress=async (req,res) => {
    try {
        const {_id,addressline,city,country,postalcode,phone}=req.body
 const updatedData = await Address.updateOne({
            _id: _id
        }, {
          addressline,city,country,postalcode,phone
        })
        return res.json({
            message: "Address Updated",
            error: false,
            success: true,
            data: updatedData
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
    
}
const deleteAddress=async (req,res) => {
    
    const {_id}=req.body;
       const Addressdeleted = await Address.findByIdAndDelete(_id);
            
                if (!Addressdeleted) {
                  return res.status(404).json({
                    message: "Address not found",
                    error: true,
                    success: false,
                  });
                }
            
                return res.status(200).json({
                  message: "Address deleted successfully",
                  error: false,
                  success: true,
                });
}
export  {addAddress,getAddress,updateAddress,deleteAddress}
