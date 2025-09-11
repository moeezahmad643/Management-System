import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: { type: String }, // from form
    email: { type: String }, // from form
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "resolved"],
      default: "unread",
    },
    adminReply: { type: String },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);
export default Support;
