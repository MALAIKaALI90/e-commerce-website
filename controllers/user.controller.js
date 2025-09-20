
import sendEmail from "../config/sendEmail.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt"
import verifyEmailTemplate from "../utils/EmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploudImageCloudinary from "../utils/Cloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPassTemplate from "../utils/forgotPassTemplate.js";
import  jwt  from "jsonwebtoken";

const userRegister=async (req,res) => {
try {
     const {username,email,password}=req.body;
     if (!username|| !email || !password) {
        return res.status(400).json({
            message:'All Fields are required',
            error:true,
            success:false
        })
       
      
        
     }
     const user=await User.findOne({email})
     if (user) {
       return res.status(400).json({
            message:'Already register email',
            error:true,
            success:false
        })
     
        
     }
        const salt=await bcrypt.genSalt(10)
        const hashPass=await bcrypt.hash(password,salt)
       
        const newUser=await User.create({
            username,
            email,
            password:hashPass
        })
        // now we verify that the email is provided is user email
        const verifyUrl=`${process.env.FRONTEND_URI}/verify-url?code=${newUser?._id}`
        const verificationEmail=await sendEmail({
            sendTo:email,
            subject:"Verify Email from Blinkit",
            html:verifyEmailTemplate({
                url:verifyUrl,
            username
            })
        });
return res.status (200).json({
    message :"User Successfully registered",
    error:false,
    success:true,
    data:newUser
})
} catch (error) {
    return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
}


}
const verifyEmail=async (req,res) => {
    try {
        const {code}=req.body;
         const user=await User.findById({_id:code})
if (!user) {
        return res.status(400).json({
            message:'Invalid Code',
            error:true,
            success:false
        })
}
   const updateUser=await User.updateOne({_id:code},{
    verifyEmail:true
   })
return res.status (200).json({
    message :"Verify email successfully ",
    error:false,
    success:true,
    data:updateUser
})
    } catch (error) {
         
    return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
    }
}
const loginUser=async (req,res) => {
try {
        const {email,password}=req.body;
        if (!email || !password) {
             return res.status (400).json({
    message :"All fields are required",
    error:true,
    success:false,
    
})
            
        }
        const user=await User.findOne({email})
        if (!user) {
            return res.status (400).json({
    message :"User not Register ",
    error:true,
    success:false,
    
}) }
if (user.status!=="active") {
     return res.status (400).json({
    message :"Contact to Admin",
    error:true,
    success:false
    
})
    
}
const verifyPass=await bcrypt.compare(password,user.password)
if (!verifyPass) {
      return res.status (400).json({
    message :"Check Your Password",
    error:true,
    success:false
    
})
    
}
const accessToken=await generateAccessToken(user._id)
const RefreshToken=await  generateRefreshToken (user._id)
const updateUser=await User.findByIdAndUpdate(user?._id,{
lastLoginDate:new Date()

})
const cookieOption={
    httpOnly:true,
    secure:true,
    sameSite:"none"
}
res.cookie('accessToken',accessToken,cookieOption)
res.cookie('RefreshToken',RefreshToken,cookieOption)
return res.json({
    message:"Login SuccessFully",
    error:false,
    success:true,
    data:{
        accessToken,
        RefreshToken,
        
    }
})

} catch (error) {
     return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
}

    
}
const logoutUser=async (req,res) => {
  try {

   await User.findByIdAndUpdate(req.user._id, {
    
      $set: { RefreshToken: "" }
    }, { new: true })
    const options = {
      httpOnly: true,
      secure: true,
      sameSite:"none"
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("RefreshToken", options)
      .json({
          message:"User Logout Successfully",
          error:false,
          success:true
      }
      )
  } catch (error) {
      return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
  }

}
//Upload user avatar
const  updateAvatar=async (req,res) => {
try {
    const userId=req.user //auth
    // console.log(userId);
    
        const avatar=req.file //multer 
        console.log(avatar);
        
        const upload= await uploudImageCloudinary(avatar)

        const updateUser=await User.findByIdAndUpdate(userId,{
           avatar:upload.url
        })
     
      
        return res.status(200).json({

        message:"Avatar is Uploaded",
        error:false,
        success:true,
        data:{
            // updatedAvatar:userId,
            updateAvatar:upload.url
            
        }
    })
    
    
} catch (error) {
      return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
}
    
}
const updateUserDeatails=async (req,res) => {
    try {
       let hashPass=""
        const userId=req.user._id
        const {username,email,password,mobileNum}=req.body
        if (password) {
              const salt=await bcrypt.genSalt(10)
         hashPass=await bcrypt.hash(password,salt)
            
        }
        const updateUser=await User.findByIdAndUpdate(userId,{
            ...(username && {username:username}),
            ...(email && {email:email}),
            ...(password &&{password:hashPass}),
            ...(mobileNum &&{mobileNum:mobileNum})

        } , { new: true } )
          return res.status(200).json({

        message:"User detail is Updated",
        error:false,
        success:true,
        data:{
            
           updateUser
        }
    })
    } catch (error) {
          return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    })
    }
}
//user is not login so he try to login with new pass
const forgotPassword=async (req,res) => {
//forgot passs controller ,sent otp ,verify otp ,reset password
try {
    const {email}=req.body
    const user=await User.findOne({email})
    if (!user) {
         return res.status(401).json({

        message:"Email is not Available",
        error:true,
        success:false
    })
        
    }
    const otp=generateOtp()
const expireTime=new Date()+60*60*1000//1hr
const update=await User.findByIdAndUpdate(user._id,{
    forgotPassword:otp,
    forgotPasswordExpiry:new Date(expireTime).toISOString()
})
await sendEmail({
    sendTo: email,
    subject:"OTP from blinkit" ,
    html: forgotPassTemplate({
        username:user.username,
        otp
    })
})

return res.json({
    message:"Check Your Email",
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

 const verifyforgotPassOtp=async (req,res) => {
    try {
        const {otp,email}=req.body;
        if (!otp || !email) {
           return res.status(400).json({

        message:"Provide both Fields",
        error:true,
        success:false
    }) 
            
        }
        const user=await User.findOne({email})
    if (!user) {
         return res.status(401).json({

        message:"Email is not Available",
        error:true,
        success:false
    })
        
    }
    const currentTime=new Date().toISOString()
    if (user.forgotPasswordExpiry<currentTime) {
          return res.status(401).json({

        message:"Otp is Expired",
        error:true,
        success:false
    })
       
    }
    if (otp!==user.forgotPassword) {
 return res.status(401).json({

        message:"Invalid Otp",
        error:true,
        success:false
    })
        
    }

    const updateUser=await User.findByIdAndUpdate(user._id,{
        forgotPassword :"",
        forgotPasswordExpiry:""
    })
    //if everyone is good otp not expire ootp=forgotpass then 
    return res.status(200).json({

        message:"Verification Otp Successfullly ",
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
//reset Pass
const userResetPass=async (req,res) => {
    try {
        const {email,newPass,confirmPass}=req.body;
        if (!email || !newPass || !confirmPass) {
             return res.status(400).json({

        message:"All fields are required",
        error:true,
        success:false
    }) 
            
        }
        const user=await User.findOne({email})
        if (!user) {
              return res.status(401).json({

        message:"Email is not Available",
        error:true,
        success:false
    })
        }
        if (newPass!==confirmPass) {
            return res.status(401).json({

        message:"new  PAssword and Confirm Password not match",
        error:true,
        success:false
    })   
            
        }
         const salt=await bcrypt.genSalt(10)
        const  hashPass=await bcrypt.hash(newPass,salt)
        const update=await User.findByIdAndUpdate(user._id,{
            password:hashPass
        })
          return res.status(200).json({

        message:"Password Updated Successfully",
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
const RefreshToken=async(req,res)=>{
    try {
        const RefreshToken=req.cookies.RefreshToken || req?.header?.authorization?.splite(" ")[1] 
if (!RefreshToken) {
      return res.status(401).json({

        message:"Unauthorized access",
        error:true,
        success:false
    }) 
    
}
const verifyToken=await jwt.verify(RefreshToken,process.env.SECRET_KEY_REFRESh_TOKEN)
if (!verifyToken) {
     return res.status(402).json({

        message:"Token is expired",
        error:true,
        success:false
    }) 
}
const cookieOption={
    httpOnly:true,
    secure:true,
    sameSite:"none"
}
const userId=verifyToken._id
const newAccessToken=await  generateAccessToken(userId)
res.cookie("accessToken",newAccessToken,cookieOption)
return res.status(200).json({

        message:"New Access Token is generated",
        error:true,
        success:false,
        data:{
        accessToken:    newAccessToken
        }
    }) 
    } catch (error) {
           return res.status(500).json({

        message:error.message,
        error:true,
        success:false
    }) 
    }
}
const getUserDetails=async (req,res) => {
    const userId=req.user._id
      const user=await User.findById(userId).select("-password -RefreshToken")

    res.status(200).json({
        message:"User Details",
        data:user,
        error:false,
        success:true
    })
}
export {userRegister, verifyEmail,loginUser,logoutUser,updateAvatar,RefreshToken,updateUserDeatails, getUserDetails,forgotPassword,verifyforgotPassOtp,userResetPass}