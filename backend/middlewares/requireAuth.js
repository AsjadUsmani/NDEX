import userModel from "../models/user.model.js";
import { verifyToken } from "../utils/token.js";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = verifyToken(token);
    const user = await userModel.findById(payload.id).select("-hashedPassword");
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default requireAuth;
