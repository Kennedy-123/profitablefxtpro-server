import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../utils/sendEmail";
const bcrypt = require("bcryptjs");

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const resetLink = `https://profitablefxtpro.netlify.app/reset-password/${token}`;

    // Send reset password email
    sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ msg: "Reset password email sent." });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "Invalid token." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decoded) {
      return res.status(400).json({ msg: "Invalid token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(
      { _id: decoded._id },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ msg: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" });
  }
};
