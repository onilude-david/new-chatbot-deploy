import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js"; // Use the new router

dotenv.config();

const app = express();
// Allow both local development and production URLs
app.use(cors({
  origin: [
    "https://lanteraibot.vercel.app",
    "http://localhost:5173", // Vite dev server
    "http://localhost:3000", // Alternative dev port
    "http://127.0.0.1:5173", // Alternative localhost
    "http://127.0.0.1:3000",  // Alternative localhost
    "https://your-frontend.vercel.app" // your actual Vercel domain
  ],
  credentials: true
}));
app.use(express.json());

// Use the new unified router for all /api routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});