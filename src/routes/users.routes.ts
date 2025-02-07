import { Router, RequestHandler } from "express";
import {
  getUsers,
  updateUserAmount,
  getUserInfo,
} from "../controllers/users.controller";

import { forgetPassword, resetPassword } from "../controllers/forgetPassword.controller";
const authMiddlware = require('../middlewares/authMiddleware')

const router = Router();

router.get("/users", getUsers as RequestHandler);
router.put("/users/:id/amount", updateUserAmount as unknown as RequestHandler);
router.get("/users/info", authMiddlware, getUserInfo as unknown as RequestHandler);
router.post("/forgot-password", forgetPassword as unknown as RequestHandler);
router.post("/reset-password/:token", resetPassword as unknown as RequestHandler);

export default router;
