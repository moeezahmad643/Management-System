import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router();

// Helper: update user task counters
const updateUserTaskCounts = async (userIds) => {
  for (let userId of userIds) {
    const total = await Task.countDocuments({ assignedTo: userId });
    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "pending",
    });
    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "done",
    });

    await User.findByIdAndUpdate(userId, {
      TotalTask: total,
      PendingTask: pending,
      CompletedTask: completed,
    });
  }
};

// ✅ Create new task
router.post("/", async (req, res) => {
  try {
    const { title, description, assignedTo, assignedGroup, degree, status } =
      req.body;

    const assignedArray = Array.isArray(assignedTo)
      ? assignedTo
      : assignedTo
      ? assignedTo.split(",")
      : [];

    const newTask = new Task({
      title,
      description,
      assignedTo: assignedArray,
      assignedGroup: Array.isArray(assignedGroup)
        ? assignedGroup
        : assignedGroup
        ? assignedGroup.split(",")
        : [],
      degree: degree || "medium",
      status: status || "pending",
    });

    await newTask.save();

    // Update counters
    await updateUserTaskCounts(assignedArray);

    const populated = await Task.findById(newTask._id)
      .populate("assignedTo", "name email TotalTask PendingTask CompletedTask")
      .populate("assignedGroup", "name");

    res.status(201).json(populated);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ message: "Server error while creating task" });
  }
});

// ✅ Get all tasks
router.get("/", async (req, res) => {
  try {
    const limitParam = parseInt(req.query.limit) || "all";
    const skip = parseInt(req.query.skip) || 0;

    let tasksQuery = Task.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .populate("assignedTo", "name email TotalTask PendingTask CompletedTask")
      .populate("assignedGroup", "name");

    let tasks;
    if (typeof limitParam === "number") tasks = await tasksQuery.limit(limitParam);
    else tasks = await tasksQuery;

    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email TotalTask PendingTask CompletedTask")
      .populate("assignedGroup", "name");

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Get Task Error:", err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// ✅ Update task
router.patch("/:id", async (req, res) => {
  try {
    const { title, description, assignedTo, assignedGroup, degree, status } =
      req.body;

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(assignedTo && {
        assignedTo: Array.isArray(assignedTo) ? assignedTo : assignedTo.split(","),
      }),
      ...(assignedGroup && {
        assignedGroup: Array.isArray(assignedGroup)
          ? assignedGroup
          : assignedGroup.split(","),
      }),
      ...(degree && { degree }),
      ...(status && { status }),
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate("assignedTo", "name email TotalTask PendingTask CompletedTask")
      .populate("assignedGroup", "name");

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    // Update counters for all assigned users
    const assignedUsers = updatedTask.assignedTo.map((u) =>
      typeof u === "object" ? u._id : u
    );
    await updateUserTaskCounts(assignedUsers);

    res.json(updatedTask);
  } catch (err) {
    console.error("Update Task Error:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// ✅ Delete task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    // Update counters for assigned users
    const assignedUsers = deletedTask.assignedTo.map((u) =>
      typeof u === "object" ? u._id : u
    );
    await updateUserTaskCounts(assignedUsers);

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;