import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les images uploadées
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "KAKO API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur KAKO démarré sur le port ${PORT}`);
});
