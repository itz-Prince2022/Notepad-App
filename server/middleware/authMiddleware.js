import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";

export const protect = async (req, res, next) => {
    let token;
    
    // Check for "Bearer <token>" in header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from DB and attach to request (exclude password)
            req.user = await User.findById(decoded.id).select("-password");
            
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};