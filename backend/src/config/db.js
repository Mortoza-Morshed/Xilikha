import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not defined in environment variables");
      console.error(
        "Available env vars:",
        Object.keys(process.env).filter((key) => key.includes("MONGO")),
      );
      process.exit(1);
    }

    console.log("🔌 Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
