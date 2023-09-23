import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: [true, "Please enter a username"],
      unique: true,
    },
    email: {
      type: "String",
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please enter a password"],
    },
    isVerified: {
      type: "Boolean",
      default: false,
    },
    forgotPasswordToken: "String",
    forgotPasswordTokenExpiry: Date,
    verifyToken: "String",
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

console.log("Mongoose model");
console.log(mongoose.models);
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
