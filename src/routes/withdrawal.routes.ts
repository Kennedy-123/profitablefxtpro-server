import { Router, RequestHandler } from "express";
import { withdraw, updateWithdrawalStatus } from "../controllers/withdrawal.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/withdraw", authMiddleware, withdraw as RequestHandler);
router.post("/withdraw/:id/updateWithdrawalStatus", authMiddleware, updateWithdrawalStatus as RequestHandler);

export default router;
