import {Router} from "express";
import { saveQuery, getUserQueries } from "../controllers/query.controller.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

// Save a query
router.post("/", requireAuth, saveQuery);

// Get user queries
router.get("/", requireAuth, getUserQueries);

export default router;