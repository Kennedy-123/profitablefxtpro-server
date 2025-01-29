import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: true },
    comfirmPassword: { type: String },
    amount: {type: Number, default: 0},
    interest: {type: Number, default: 0},
    role: {
      type: String,
      enum: ["admin", "broker", "user"],
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
