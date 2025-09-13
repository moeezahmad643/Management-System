// backend/models/GroupsMessage.js
import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    files: [
      {
        fileName: String,
        fileType: String, // image/png, application/pdf
        fileUrl: String,  // ✅ Cloudinary URL
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("GroupMessage", groupMessageSchema);