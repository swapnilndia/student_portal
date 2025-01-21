import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  await mongoose.connect(MONGODB_URL.toString().trim());
};
