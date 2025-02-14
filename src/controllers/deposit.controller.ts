import { Request, Response } from "express";
import { Deposit } from "../models/Deposit";
import User from "../models/User";

interface AuthRequest extends Request {
  userId?: string; // Ensure `userId` is recognized in TypeScript
  username?: string;
}

export const deposit = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.userId;
    const username = req.username;
    const { amount, btc, plan, proof, wallet } = req.body;

    // Basic validation
    if (!amount) return res.status(400).json({ msg: "Enter amount" });
    if (!btc) return res.status(400).json({ msg: "Enter btc" });
    if (!plan) return res.status(400).json({ msg: "Enter plan" });
    if (!wallet) return res.status(400).json({ msg: "Enter wallet" });
    if (!proof) return res.status(400).json({ msg: "Enter proof" });

    // Extract numeric value from amount string
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericAmount))
      return res.status(400).json({ msg: "Invalid amount format" });

    // Create Deposit
    await Deposit.create({
      userId: id,
      userName: username,
      amount: numericAmount,
      btc,
      plan,
      wallet,
      proof,
    });

    await User.findByIdAndUpdate(id, {
      plan: plan,
    });

    return res.status(201).json({
      msg: "Deposit success",
    });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" });
  }
};

export const getDeposits = async (req: Request, res: Response) => {
  try {
    const deposits = await Deposit.find();
    res.status(200).json({ deposits });
  } catch {
    res.status(500).json({ msg: "An error occured" });
  }
};
