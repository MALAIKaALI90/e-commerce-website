import { User } from "../model/user.model.js"

const admin=async(req,res,next)=>{
    try {
        const user=req.user
        const users=await User.findById(user)
        if (users.role!=="Admin") {
           return res.status(400).json({
            message:"Permission DENAiD To Access this Page",
            error :true,
            success:false
        })  
            
        }
        next()
    } catch (error) {
        return res.status(500).json({
            message:"Permission DENAiD",
            error :true,
            success:false
        })
    }

}
export default admin