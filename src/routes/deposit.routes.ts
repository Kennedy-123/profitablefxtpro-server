import { Router, RequestHandler } from "express";
import { deposit, getDeposit } from "../controllers/deposit.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/deposit", authMiddleware, deposit as RequestHandler);
router.get('/get-deposit', getDeposit as RequestHandler)

export default router;
