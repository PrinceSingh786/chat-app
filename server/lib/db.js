import mongoose from "mongoose";

// Function to connect to the mongodb
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`);
  } catch (error) {
    console.log(error);
  }
};
