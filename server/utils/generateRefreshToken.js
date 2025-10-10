import { User } from "../model/user.model.js"
import jwt from "jsonwebtoken"
const generateRefreshToken=async (userId) => {
      const token=await jwt.sign({id:userId},
            process.env.SECRET_KEY_REFRESh_TOKEN,
           { expiresIn:"30d"}
        )
        const updateRefreshToken=await User.updateOne({
            _id:userId
        },
    {RefreshToken:token})
        return token
    
}
export default generateRefreshToken;
