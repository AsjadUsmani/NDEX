import mongoose from "mongoose";

const querySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  prompt: { type: String, required: true },
  language: { type: String, default: "javascript" },
  generatedCode: { type: String, default: "" },
  explanation: { type: String, default: "" },
  modelUsed: { type: String, default: "" },
  tokenUsage: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "done", "failed"], default: "pending" },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Query = mongoose.model("query", querySchema);
export default Query;
