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
  if (!req.dbAvailable) {
    // Return a created placeholder when DB is unreachable
    const offlineTask = { _id: `offline-${Date.now()}`, title: req.body.title };
    return res.status(201).json(offlineTask);
  }

  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (!req.dbAvailable) {
    // Accept delete for offline ids during DB outage
    return res.json({ message: "Deleted (offline)" });
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
