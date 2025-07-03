import { GoogleGenerativeAI } from "@google/generative-ai";
import characters from "../prompts/characters.js";
import { ElevenLabsClient } from "elevenlabs";
// import pdf from "pdf-parse"; // We no longer need this

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY, 
});

export function getCharacters(req, res) {
  const characterInfo = Object.entries(characters).map(([key, value]) => ({
    id: key,
    name: value.name,
    emoji: value.emoji,
    subject: value.subject,
    // This is the fix: Send the voiceId to the frontend
    voiceId: value.voiceId, 
  }));
  res.json(characterInfo);
}

export async function chatWithAI(req, res) {
  try {
    // 1. Get data from the request and validate it
    const { characterId, history: historyString, userName } = req.body;
    const uploadedFile = req.file;

    if (!characterId || !characters[characterId]) {
      return res.status(400).json({ error: "Invalid or missing characterId" });
    }
    if (!historyString) {
      return res.status(400).json({ error: "Missing history" });
    }
    if (!userName) {
      return res.status(400).json({ error: "Missing userName" });
    }

    const character = characters[characterId];
    const history = JSON.parse(historyString);

    // 2. Set up the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Build the 'contents' array for the Gemini API
    const contents = history.map(msg => {
      const role = msg.from === 'ai' ? 'model' : 'user';
      const parts = [{ text: msg.text }];
      return { role, parts };
    });

    // 4. Handle file upload
    if (uploadedFile) {
      // Find the last user message in the history to attach the image to.
      const lastUserContent = contents.slice().reverse().find(c => c.role === 'user');
      
      if (lastUserContent) {
        lastUserContent.parts.push({
          inlineData: {
            mimeType: uploadedFile.mimetype,
            data: uploadedFile.buffer.toString("base64"),
          },
        });
      }
    }

    // 5. Generate content and stream the response
    const result = await model.generateContentStream({
      contents,
      systemInstruction: character.systemPrompt.replace(/{{userName}}/g, userName),
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    
    res.end();

  } catch (err) {
    console.error("Error in chatWithAI:", err);
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: "Invalid history JSON format." });
    }
    if (!res.headersSent) {
      res.status(500).json({ error: "AI error", details: err.message });
    } else {
      res.end();
    }
  }
}

// Add this new function to handle speech generation
export async function speakWithElevenLabs(req, res) {
  const { text, characterId } = req.body;
  
  console.log(`Received request to generate speech for character: ${characterId}`);

  if (!text) {
    console.error("Speak request failed: No text provided.");
    return res.status(400).json({ error: "Missing text." });
  }
  
  const character = characters[characterId];
  if (!character?.voiceId) {
    console.error(`Speak request failed: No voiceId found for character ${characterId}.`);
    return res.status(400).json({ error: "Character voice configuration not found." });
  }

  try {
    console.log(`Generating audio for text: "${text}" with voice ID: ${character.voiceId}`);
    const audio = await elevenlabs.generate({
      voice: character.voiceId,
      text,
      model_id: "eleven_multilingual_v2",
    });

    res.setHeader("Content-Type", "audio/mpeg");
    
    // Pipe the audio stream to the response
    const audioStream = audio;
    audioStream.pipe(res);
    
    console.log("Successfully streamed audio to client.");

  } catch (error) {
    // Log the full error from ElevenLabs for detailed debugging
    console.error("--- ElevenLabs API Error ---");
    console.error(error);
    console.error("--------------------------");
    res.status(500).json({ error: "Failed to generate audio.", details: error.message });
  }
}