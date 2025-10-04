import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.verify(token, JWT_SECRET);
};
