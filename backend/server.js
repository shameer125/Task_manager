import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-manager-m41d.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Connect MongoDB for each serverless invocation (reuses existing connection)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/tasks", taskRoutes);

export default app;
