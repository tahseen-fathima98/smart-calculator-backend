import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/v4", async (req, res) => {
  const expression = req.query.expr;

  if (!expression) {
    return res.status(400).json({ error: "Expression missing" });
  }

  try {
    const response = await axios.get(
      `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`
    );
    res.json({ result: response.data });
  } catch (err) {
    res.status(500).json({ error: "Calculation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Math.js API running at http://localhost:${PORT}/v4`);
});
