import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { generateCode } from "../controllers/generate.controller.js";

const router = Router();

router.post('/', requireAuth, generateCode);

export default router;
