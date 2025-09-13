// backend/models/Group.js
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    twoWay: {
      type: Boolean,
      default: false,
    },
    members: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // which admin created it
    },

    // NEW: status (active or completed)
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    // NEW: conclusion/details written when group completed
    conclusion: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;