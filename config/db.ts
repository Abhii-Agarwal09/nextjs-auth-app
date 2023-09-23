import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("MongoDB connected");
    });
  } catch (error: any) {
    console.log("There was an error connecting: ", error.message);
    process.exit();
  }
};
