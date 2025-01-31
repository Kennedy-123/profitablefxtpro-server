import { Router, RequestHandler } from "express";
import { withdrawal } from "../controllers/withdrawal.controller";
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/withdrawal", authMiddleware, withdrawal as RequestHandler);

export default router;
