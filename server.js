/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/getSummary", async (req, res) => {
  const { bookName } = req.body;
  if (!bookName) return res.status(400).json({ error: "Book name required" });

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}`);
    const bookData = response.data.docs[0];

    if (bookData?.key) {
      const detailsResponse = await axios.get(`https://openlibrary.org${bookData.key}.json`);
      const summary = detailsResponse.data?.description;
      if (summary) return res.json({ summary });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: `Give me the whole book "${bookName}".` }],
    });

    res.json({ summary: aiResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching summary:", error.response?.data || error.message);
    res.status(500).json({ error: "Summary service unavailable." });
  }
});

app.post("/generateVideo", (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ error: "Missing summary" });
  }

  // Simulated AI-generated video link
  const videoUrl = `http://localhost:5000/static/${summary.replace(/\s/g, "_")}.mp4`;

  res.json({ videoUrl });
});

app.listen(5000, () => console.log("Server running on port 5000"));
