import mongoose from "mongoose";
import config from "./env.js";

const connectDB = async () => {
  const uri = config.mongodbUri;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const conn = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
};

export default connectDB;
