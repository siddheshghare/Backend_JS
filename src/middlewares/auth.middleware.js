import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export const verifyJWT=asyncHandler(async(req,res,next)=>{
  try {
    const token=  req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ","");//Authorization:Bearer <token>
  
  
    if (!token) {
      throw new ApiError(401,"unauthorised Request")
    }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
  
   const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   if (!user) {
      throw new ApiError(401,"invalid Access token")  
   }
  
   req.user=user;
   next()
  } catch (error) {
    throw new ApiError(401,error?.message || "invalid access Token")
    
  }

})