// server.js
import express from "express";
import fetch from "node-fetch"; // For Node <18
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to handle chat messages
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: [
          {
            role: "system",
            content: "You are Paul Mendoza, a friendly web developer. Keep answers short, helpful, and conversational."
          },
          { role: "user", content: message }
        ],
        max_tokens: 200
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "⚠️ Sorry, I couldn't respond.";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ Error connecting to AI." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));