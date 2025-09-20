import { Router } from "express";
import { forgotPassword, loginUser, logoutUser,  RefreshToken,  updateUserDeatails, updateAvatar,
     userRegister,userResetPass,verifyEmail, verifyforgotPassOtp,getUserDetails } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const userRouter=Router()
userRouter.post("/register",userRegister)
userRouter.post("/verify-email",verifyEmail)
userRouter.post("/login",loginUser)
userRouter.get("/logout",auth,logoutUser) 
userRouter.put("/update-avatar",auth, upload.single("avatar"),updateAvatar)
userRouter.put("/update-user",auth,updateUserDeatails)
userRouter.put("/forgot-password",auth,forgotPassword)
userRouter.put("/verify-forgot-password-otp",auth,verifyforgotPassOtp)
userRouter.put("/reset-password",auth,userResetPass)
userRouter.post("/refresh-token",auth,RefreshToken)
userRouter.get("/user-detail",auth,getUserDetails)











export default userRouter