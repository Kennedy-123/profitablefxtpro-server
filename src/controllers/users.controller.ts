import User from "../models/User";
import { Request, Response } from "express";
import { sendApprovalEmail, sendDeclinedEmail } from "../utils/sendEmail";
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
    const { amount, status, wallet } = req.body;

    // Validate amount input
    if (typeof amount !== "number") {
      return res.status(400).json({ msg: "Amount must be a number." });
    } else if (status === "approved") {
      // check the wallet
      if (wallet === "deposit") {
        // Find and update the user's DepositWallet
        const user = await User.findByIdAndUpdate(
          id,
          { $inc: { DepositWallet: amount } }, // Set the new amount
          { new: true } // Return the updated document
        );

        // If the user doesn't exist
        if (!user) {
          return res.status(404).json({ msg: "User not found." });
        }
        await Deposit.findOneAndUpdate(
          { userId: id, amount: amount },
          { status: "approved" }, // Set the new amount
          { new: true }
        );
        const userEmail = user.email;
        const username = user.username;
        const deposited = amount;
        const balance = user.balance;

        // send approval email
        sendApprovalEmail(userEmail, username, deposited, balance as number);
      } else if (wallet === "interest") {
        // Find and update the user's interestWallet
        const user = await User.findByIdAndUpdate(
          id,
          { $inc: { interestWallet: amount } }, // Set the new amount
          { new: true } // Return the updated document
        );

        // If the user doesn't exist
        if (!user) {
          return res.status(404).json({ msg: "User not found." });
        }

        await Deposit.findOneAndUpdate(
          { userId: id, amount: amount },
          { status: "approved" }, // Set the new amount
          { new: true }
        );
        const userEmail = user.email;
        const username = user.username;
        const deposited = amount;
        const balance = user.balance;

        // send approval email
        sendApprovalEmail(userEmail, username, deposited, balance as number);
      }

      // Respond with the updated user
      return res.status(200).json({
        msg: "Approved!!",
      });
    } else if (status === "declined") {
      await Deposit.findOneAndUpdate(
        { userId: id, amount: amount },
        { status: "declined" }, // Set the new amount
        { new: true }
      );

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }

      const userEmail = user.email;
      const username = user.username;
      const deposited = amount;

      sendDeclinedEmail(userEmail, username, deposited);

      return res.status(200).json({
        msg: "Declined",
      });
    }
  } catch {
    return res.status(500).json({ msg: "Internal server error." });
  }
};

interface AuthRequest extends Request {
  userId?: string; // Ensure `userId` is recognized in TypeScript
}

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.userId; // Extracted from middleware

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
      DepositWallet: user.DepositWallet,
      interestWallet: user.interestWallet,
      total: user.balance,
      totalwithdrawal: user.totalWithdrawal,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
