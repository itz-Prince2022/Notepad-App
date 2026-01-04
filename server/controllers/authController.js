import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import bcrypt from "bcryptjs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        
        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        // Extract Info from Google
        const { name, email, picture, sub: googleId } = ticket.getPayload();

        // Find or Create User
        let user = await User.findOne({ email });

        if (user) {
            // Update picture if it changed
            user.googleId = googleId;
            user.picture = picture; 
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name,
                email,
                googleId,
                picture, // Save the picture
                password: await bcrypt.hash(Date.now() + "secret", 10)
            });
        }

        const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        // Send Response (FLAT STRUCTURE)
        // We send the user details directly so frontend can access user.picture easily
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture, // <--- CRITICAL: Send the picture back
            token: appToken,
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ message: "Google Auth Failed" });
    }
};