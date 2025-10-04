import Query from "../models/query.model.js";

// Save a new query
export const saveQuery = async (req, res) => {
  try {
    const { prompt, language, generatedCode, explanation, modelUsed, tokenUsage } = req.body;
    const user = req.user.id;

    const query = await Query.create({
      user,
      prompt,
      language,
      generatedCode,
      explanation,
      modelUsed,
      tokenUsage,
      status: "done"
    });

    return res.status(201).json(query);
  } catch (err) {
    console.error("Save Query Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get all queries for logged-in user
export const getUserQueries = async (req, res) => {
  try {
    const user = req.user.id;
    const queries = await Query.find({ user }).sort({ createdAt: -1 });
    return res.json(queries);
  } catch (err) {
    console.error("Get Queries Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
