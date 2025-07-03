import express from "express";
import multer from "multer"; // 1. Import multer
import { getCharacters, chatWithAI, speakWithElevenLabs } from "../controllers/apiController.js";

const router = express.Router();
// 2. Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Route to get the list of characters
router.get("/characters", getCharacters);

// Route for the chat functionality
// 3. Apply the middleware to the chat route. 'file' is the field name we'll use on the frontend.
router.post("/chat", upload.single("file"), chatWithAI);

// Add this new route for text-to-speech
router.post("/speak", speakWithElevenLabs);

export default router;