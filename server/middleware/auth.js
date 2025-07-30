import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        console.log("Headers received:", req.headers);

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");

        if(!user) return res.status(404).json({success: false, message: "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}