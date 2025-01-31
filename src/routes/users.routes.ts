import { Router, RequestHandler } from "express";
import {
  getUsers,
  updateUserAmount,
  getUserInfo,
} from "../controllers/users.controller";
const authMiddlware = require('../middlewares/authMiddleware')

const router = Router();

router.get("/users", getUsers as RequestHandler);
router.put("/users/:id/amount", updateUserAmount as unknown as RequestHandler);
router.get("/users/info", authMiddlware, getUserInfo as unknown as RequestHandler);
export default router;
