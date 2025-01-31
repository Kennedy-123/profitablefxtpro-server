import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  DepositWallet: number;
  interestWallet: number;
  role: "admin" | "broker" | "user";
  balance?: number; // ✅ Add virtual field (not stored in DB)
}

const userSchema = new mongoose.Schema<IUser>(
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
    confirmPassword: { type: String },
    DepositWallet: { type: Number, default: 0 },
    interestWallet: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["admin", "broker", "user"],
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true },
  }
);

// ✅ Add a virtual field for `balance`
userSchema.virtual("balance").get(function () {
  return this.DepositWallet + this.interestWallet;
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
