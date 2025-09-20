import jwt, { decode } from "jsonwebtoken";
import { User } from "../model/user.model.js";

const auth = async(req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.split(" ")[1]; // ["Bearer", "token"]
    if (!token) {
      return res.status(401).json({
        message: "Token is not available",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
      const user = await User.findById(decoded?.id).select("-password");
    if (!user) {
  return res.status(401).json({
      message: "Unauthorized User",
      error: true,
      success: false,
    });
    }
  req.user = user;
 
  
    
    next(); 
  } catch (error) {
    return res.status(500).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;
