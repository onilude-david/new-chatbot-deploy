import OpenAI from "openai";
import characters from "../prompts/characters.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAI(req, res) {
  const { message, character } = req.body;
  const char = characters[character];
  if (!char) return res.status(400).json({ error: "Invalid character" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: char.systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });
    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: "AI error", details: err.message });
  }
} 