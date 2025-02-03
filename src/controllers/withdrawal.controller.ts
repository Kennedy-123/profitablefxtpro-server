import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
    userId?: string; // Ensure `userId` is recognized in TypeScript
  }

export const withdrawal = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.userId;
    const { amount, wallet } = req.body;

    if (typeof amount !== "number")
      return res.status(400).json({ msg: "Amount must be a number." });
    if (!amount) return res.status(400).json({ msg: "enter amount" });
    if (!wallet) return res.status(400).json({ msg: "enter wallet" });

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (wallet === "deposit wallet") {
      if (user.DepositWallet < amount) {
        return res.status(400).json({
          msg: `Insufficient funds`,
        });
      }
      await User.findByIdAndUpdate(
        id,
        { $inc: { DepositWallet: -amount } }, // Set the new amount
        { new: true } // Return the updated document
      );
    } else if (wallet === "interest wallet") {
      if (user.interestWallet < amount) {
        return res.status(400).json({
          msg: `Insufficient funds`,
        });
      }
      await User.findByIdAndUpdate(
        id,
        { $inc: { interestWallet: -amount } }, // Set the new amount
        { new: true } // Return the updated document
      );
    }
    
    res.status(201).json({ msg: "withdrawal successful" });
  } catch (error) {
    return res.status(500).json({ msg: "An error occured" });
  }
};
