// backend/controllers/generate.controller.js
import axios from "axios";
import Query from "../models/query.model.js"; // ensure path/name matches your model
// you already have auth middleware to attach req.user

export const generateCode = async (req, res) => {
  const PYTHON_AI_URL = process.env.PYTHON_AI_URL || "http://localhost:8001";
  const INTERNAL_KEY = process.env.INTERNAL_KEY || "local-internal-key";

  try {
    const { prompt, language, options } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    // Create pending query
    const q = await Query.create({
      user: req.user.id,
      prompt,
      language: language || "python",
      options: options || {},
      status: "pending",
    });

    // Call python microservice
    const resp = await axios.post(
      `${PYTHON_AI_URL}/generate`,
      {
        prompt,
        language,
        options,
      },
      {
        headers: {
          "X-Internal-Auth": INTERNAL_KEY,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const data = resp.data || {};

    q.generatedCode = data.code || "";
    q.explanation = data.explanation || "";
    q.modelUsed = data.model || "";
    q.tokenUsage = data.usage?.total_tokens || 0;
    q.status = "done";
    q.updatedAt = new Date();
    await q.save();

    return res.json({
      id: q._id,
      code: q.generatedCode,
      explanation: q.explanation,
      model: q.modelUsed,
      tokens: q.tokenUsage,
    });
  } catch (err) {
    console.error("generateCode error:", err?.response?.data || err.message);
    // Update DB to failed if we have a query created
    if (err?.response) {
      // leave q as pending/failed if exists -- optionally update
    }
    return res.status(500).json({ error: "Generation failed" });
  }
};
