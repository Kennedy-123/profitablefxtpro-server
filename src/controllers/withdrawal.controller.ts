import { Request, Response } from "express";
import User from "../models/User";

export const withdrawal = async (req: Request, res: Response) => {
  try {
    const { userId, amount, wallet } = req.body;

    if (typeof amount !== "number")return res.status(400).json({ msg: "Amount must be a number." });
    if(!userId) return res.status(400).json({msg: "enter userId"})
    if(!amount) return res.status(400).json({msg: "enter amount"})
    if(!wallet) return res.status(400).json({msg: "enter wallet"})
  } catch (error) {

  }
};
