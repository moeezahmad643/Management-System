import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }, // HTML content
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignedGroup: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    degree: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["pending", "done", "failed"], default: "pending" },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;