import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-frontend-kappa-jet.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const dbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    req.dbAvailable = true;
  } catch (error) {
    console.error("Database connection failed:", error);
    req.dbAvailable = false;
  }
  next();
};

app.use("/api", dbMiddleware);
app.use("/api/tasks", taskRoutes);

export default app;
