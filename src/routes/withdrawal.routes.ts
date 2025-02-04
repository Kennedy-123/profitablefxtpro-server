import { Router, RequestHandler } from "express";
import { withdraw } from "../controllers/withdrawal.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/withdraw", authMiddleware, withdraw as RequestHandler);

export default router;
