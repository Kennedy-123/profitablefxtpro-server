import { Router, RequestHandler } from "express";
import { register, login } from "../controllers/auth.Controller";
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router();

router.post("/register", authMiddleware, register as RequestHandler);
router.post("/login", login as RequestHandler);
export default router;
