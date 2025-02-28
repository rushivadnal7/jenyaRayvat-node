import mongoose from "mongoose";
import 'dotenv/config.js';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connection with MONGO DB successful!");
    } catch (error) {
        console.error(`Error : ${error}`)
        process.exit(1);
    }
} 