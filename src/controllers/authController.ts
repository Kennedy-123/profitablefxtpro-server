import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register controller
export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    countryCode,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
  } = req.body;

  // Basic validation
  if (!username) return res.status(400).json({ msg: "Enter username" });
  if (!email) return res.status(400).json({ msg: "Enter email" });
  if (!password) return res.status(400).json({ msg: "Enter password" });
  if (!confirmPassword)
    return res.status(400).json({ msg: "Enter comfirmPassword" });
  if (!address) return res.status(400).json({ msg: "Enter address" });
  if (!city) return res.status(400).json({ msg: "Enter city" });
  if (!state) return res.status(400).json({ msg: "Enter state" });
  if (!zipCode) return res.status(400).json({ msg: "Enter zipCode" });
  if (!countryCode) return res.status(400).json({ msg: "Enter countryCode" });
  if (!phoneNumber) return res.status(400).json({ msg: "Enter phoneNumber" });

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

    // check if comfirm password and password match
    if (confirmPassword !== password) {
      return res.status(400).json({ msg: "passwords must match" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      countryCode
    });

    // Send success response with user details (optional)
    return res.status(201).json({
      msg: "User registered successfully",
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      // Extract specific validation errors
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ msg: "An error occured" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ msg: "Enter Email" });
  if (!password) return res.status(400).json({ msg: "Enter Password" });

  try {
    // check if user exists
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "This account does not exist" });

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ msg: "Incorrect credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "5h",
      }
    );

    // Convert Mongoose document to plain object
    const userObject = user.toObject(); // or use `.lean()`

    // Destructure to remove password
    const { password: _, ...userWithoutPassword } = userObject;

    return res
      .status(200)
      .json({
        msg: "Logged in successfully",
        token: token,
        userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ msg: "An error occured" });
  }
};
