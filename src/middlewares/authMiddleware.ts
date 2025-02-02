import * as Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please Login" });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch {
    res.status(400).json({ message: "Invalid token." });
  }
};

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add the user property here
      username?: string;
    }
  }
}

module.exports = authMiddleware;
