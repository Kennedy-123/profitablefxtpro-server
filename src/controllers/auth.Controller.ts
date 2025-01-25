import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

// Register controller
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username) return res.status(400).json({ msg: "Enter username" });
  if (!email) return res.status(400).json({ msg: "Enter email" });
  if (!password) return res.status(400).json({ msg: "Enter password" });

  try {
    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Send success response with user details (optional)
    return res.status(201).json({
      msg: "User registered successfully",
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        msg: error.message
      });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ msg: "Enter Email" });
  if (!password) return res.status(400).json({ msg: "Enter Password" });

  try {
    // check if user exists
    const user = await User.find({ email });
    if (user.length === 0)
      return res.status(200).json({ msg: "Incorrect credentials" });

    // verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!isPasswordValid)
      return res.status(400).json({ msg: "Incorrect credentials" });

    // Generate JWT
    const token = jwt.sign({ userId: user[0].username }, process.env.JWT_SECRET as string, {
      expiresIn: "5h",
    });
 
    // Set JWT in the Authorization header
    res.set("Authorization", `Bearer ${token}`);
    return res.status(200).json({msg: "Logged in successfully"})
  } catch (error) {
    res.status(500).json({msg: 'An error occured'})
  }
}