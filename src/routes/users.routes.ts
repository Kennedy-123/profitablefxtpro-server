import { Router, RequestHandler } from "express";
import { getUsers, updateUserAmount } from "../controllers/users.controller";

const router = Router();

router.get('/users', getUsers as RequestHandler)
router.put('/users/:id/amount', updateUserAmount as unknown as RequestHandler)
export default router;
