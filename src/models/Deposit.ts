import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDeposit extends Document {
  userId: Types.ObjectId; // Reference to the user making the deposit
  userName: string; // User's name
  amount: number; // Deposit amount
  btc: Number; // Bitcoin address
  plan: string; // Deposit plan
  proof: string; // URL or file path of proof of payment
  status: "pending" | "approved" | "declined"; // Status of the deposit
  wallet: string;
  createdAt: Date; // Deposit creation time
  updatedAt: Date; // Last update time
}

const DepositSchema: Schema = new Schema<IDeposit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 500,
    },
    btc: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      enum: ["starter", "silver", "gold", "diamond"], // Example plans (adjust as needed)
    },
    proof: {
      type: String, // Can store the URL or file path to proof of payment
      required: true,
    },
    wallet: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

export const Deposit = mongoose.model<IDeposit>("Deposit", DepositSchema);
