const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("🔴 ERROR: MONGO_URI is missing in Vercel Environment Variables!");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🟢 Team & Event MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`🔴 Database connection error: ${error.message}`);
    }
};

module.exports = connectDB;