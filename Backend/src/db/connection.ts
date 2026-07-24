import mongoose from "mongoose";
import 'dotenv/config.js';
import { DB_NAME } from "./constant.js";

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `MongoDB was Connected || DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB was not connected:", error);
    process.exit(1);
  }
};

export { connectDB };
