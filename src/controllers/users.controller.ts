import User from "../models/User";
import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { Deposit } from "../models/Deposit";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) res.status(404).json({ msg: "No users" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" });
  }
};

// Update a user's amount
export const updateUserAmount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract user ID from request params
    const { amount, status } = req.body;

    
    if (status === "approved") {
      // Validate amount input
      if (typeof amount !== "number") {
        return res.status(400).json({ message: "Amount must be a number." });
      }
      // Find and update the user's amount
      const user = await User.findByIdAndUpdate(
        id,
        { $inc: { amount: amount } }, // Set the new amount
        { new: true } // Return the updated document
      );
      // If the user doesn't exist
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      await Deposit.findOneAndUpdate(
        { userId: id },
        { status: "approved" }, // Set the new amount
        { new: true }
      );
      const userEmail = user.email;
      const username = user.username;
      const deposited = amount;
      const balance = user.amount;

      // send email
      sendEmail(userEmail, username, deposited, balance);
      // Respond with the updated user
      return res.status(200).json({
        message: "Approved!!",
        user,
      });
    } else if(status === "declined") {
      await Deposit.findOneAndUpdate(
        { userId: id },
        { status: "declined" }, // Set the new amount
        { new: true }
      );
      return res.status(200).json({
        message: "Declined"
      });
    }
  } catch {
    return res.status(500).json({ message: "Internal server error." });
  }
};
