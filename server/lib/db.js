import mongoose from "mongoose";

//Function to connect to the mongodb database

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/chat-Among`);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}