import { Request, Response } from "express";
import { Deposit } from "../models/Deposit";
export const deposit = async (req: Request, res: Response) => {
  try {
    const { userId, amount, btc, plan, proof } = req.body;

    // Basic validation
    if (!userId) return res.status(400).json({ msg: "Enter userId" });
    if (!amount) return res.status(400).json({ msg: "Enter amount" });
    if (!btc) return res.status(400).json({ msg: "Enter btc" });
    if (!plan) return res.status(400).json({ msg: "Enter plan" });
    if (!proof) return res.status(400).json({ msg: "Enter proof" });

    // Create Deposit
    await Deposit.create(req.body);

    return res.status(201).json({
      msg: "Deposit success",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
