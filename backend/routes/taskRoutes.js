import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  if (!req.dbAvailable) {
    // Graceful fallback when DB is unreachable
    return res.json([
      { _id: "offline-1", title: "Sample task (offline)" },
      { _id: "offline-2", title: "Another sample task (offline)" },
    ]);
  }

  const tasks = await Task.find();
  res.json(tasks);
});

// POST
router.post("/", async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
