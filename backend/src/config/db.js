import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDBURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
