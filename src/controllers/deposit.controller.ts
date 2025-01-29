import { Request, Response } from "express";
import { Deposit } from "../models/Deposit";

export const deposit = async (req: Request, res: Response) => {
  try {
    const { userId, userName, amount, btc, plan, proof } = req.body;

    // Basic validation
    if (!userId) res.status(400).json({ msg: "Enter userId" });
    if (!userName) res.status(400).json({ msg: "Enter username" });
    if (!amount) res.status(400).json({ msg: "Enter amount" });
    if (!btc) res.status(400).json({ msg: "Enter btc" });
    if (!plan) res.status(400).json({ msg: "Enter plan" });
    if (!proof) res.status(400).json({ msg: "Enter proof" });

    // Create Deposit
    await Deposit.create(req.body);

    return res.status(201).json({
      msg: "Deposit success"
    });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" })
  }
};

export const getDeposit = async (req: Request, res: Response) => {
    
}
