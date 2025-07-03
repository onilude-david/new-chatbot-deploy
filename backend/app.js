import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js"; // Use the new router

dotenv.config();

const app = express();
// Allow only your Vercel frontend to access the backend
app.use(cors({
  origin: "https://lanteraibot.vercel.app"
}));
app.use(express.json());

// Use the new unified router for all /api routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});