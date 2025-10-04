// backend/app.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import connectDB from "./utils/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
// If you still need urlencoded (forms), uncomment next line
app.use(express.urlencoded({ extended: true }));

// Cookie parser (required to read HttpOnly cookies)
app.use(cookieParser());

// CORS - adjust origin for your frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true // allow cookies to be sent
}));

// Health check
app.get("/", (req, res) => res.json({ ok: true, service: "backend" }));

// Mount routers (use, not get)
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
