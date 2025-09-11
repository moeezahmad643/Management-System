import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ Create new task
router.post("/", async (req, res) => {
  try {
    const { title, description, assignedTo, assignedGroup, degree, status } = req.body;

    const newTask = new Task({
      title,
      description,
      assignedTo: Array.isArray(assignedTo) ? assignedTo : assignedTo ? assignedTo.split(",") : [],
      assignedGroup: Array.isArray(assignedGroup) ? assignedGroup : assignedGroup ? assignedGroup.split(",") : [],
      degree: degree || "medium",
      status: status || "pending",
    });

    await newTask.save();
    const populated = await Task.findById(newTask._id)
      .populate("assignedTo", "name email")
      .populate("assignedGroup", "name");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error while creating task" });
  }
});

// ✅ Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name email")
      .populate("assignedGroup", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("assignedGroup", "name");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// ✅ Update task
router.patch("/:id", async (req, res) => {
  try {
    const { title, description, assignedTo, assignedGroup, degree, status } = req.body;

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(assignedTo && { assignedTo: Array.isArray(assignedTo) ? assignedTo : assignedTo.split(",") }),
      ...(assignedGroup && { assignedGroup: Array.isArray(assignedGroup) ? assignedGroup : assignedGroup.split(",") }),
      ...(degree && { degree }),
      ...(status && { status }),
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("assignedTo", "name email")
      .populate("assignedGroup", "name");

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

// ✅ Delete task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
