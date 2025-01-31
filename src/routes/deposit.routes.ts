import { Router, RequestHandler } from "express";
import { deposit } from "../controllers/deposit.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/deposit", authMiddleware, deposit as RequestHandler);

export default router;
