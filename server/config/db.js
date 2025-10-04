import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URI;
// Connect to MongoDB
const connDB = async() => {
    try {
        const conn = await mongoose.connect(mongo_url);
        console.log(`${conn.connection.name} in MongoDB connected Successfully!`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connDB;
