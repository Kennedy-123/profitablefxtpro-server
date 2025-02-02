import { Router, RequestHandler } from "express";
import { deposit, getDeposits } from "../controllers/deposit.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/deposit", authMiddleware, deposit as RequestHandler);
router.get('/get-deposits', getDeposits as RequestHandler)

export default router;
