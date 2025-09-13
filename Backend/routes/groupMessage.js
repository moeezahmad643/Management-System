// backend/routes/groupMessage.js
import express from "express";
import GroupMessage from "../models/GroupsMessage.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

// Export a function that accepts `io` so we can emit after saving
export default function (io) {
  const router = express.Router();

  /**
   * POST /api/group-messages
   * Body: { groupId, sender, content, files: [{ fileName, base64 OR fileUrl, fileType }] }
   * - If group.status === 'completed' only users with role 'admin' can post.
   */
  router.post("/", async (req, res) => {
    try {
      const { groupId, sender, content = "", files = [] } = req.body;

      if (!groupId || !sender) {
        return res.status(400).json({ message: "groupId and sender are required" });
      }

      // Load group to check status
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: "Group not found" });

      // If group is completed, only admins may send messages
      if (group.status === "completed") {
        const user = await User.findById(sender).select("role");
        // If user not found or not admin -> forbid
        if (!user || user.role !== "admin") {
          return res.status(403).json({ message: "Group is completed — only admins can send messages." });
        }
      }

      // Upload files to Cloudinary (if present)
      const uploadedFiles = [];
      const uploadedPublicIds = [];

      for (const f of files || []) {
        if (f.base64) {
          // normalize to full data URI if frontend sent raw base64
          let base = f.base64;
          if (!base.startsWith("data:")) {
            const mime = f.fileType || "application/octet-stream";
            base = `data:${mime};base64,${base}`;
          }

          try {
            const uploadRes = await cloudinary.uploader.upload(base, {
              folder: "group_messages",
              resource_type: "auto",
            });

            uploadedFiles.push({
              fileName: f.fileName || uploadRes.public_id,
              fileType: f.fileType || uploadRes.resource_type,
              fileUrl: uploadRes.secure_url,
              public_id: uploadRes.public_id,
              resource_type: uploadRes.resource_type,
            });

            uploadedPublicIds.push({ public_id: uploadRes.public_id, resource_type: uploadRes.resource_type });
          } catch (uploadErr) {
            console.error("Cloudinary upload failed:", uploadErr);
            // cleanup any uploaded files for this request
            await Promise.all(
              uploadedPublicIds.map(async (u) => {
                try {
                  await cloudinary.uploader.destroy(u.public_id, { resource_type: u.resource_type });
                } catch (destroyErr) {
                  console.error("Cloudinary cleanup failed:", destroyErr);
                }
              })
            );
            return res.status(502).json({ message: "Cloudinary upload failed", error: uploadErr.message || String(uploadErr) });
          }
        } else if (f.fileUrl) {
          uploadedFiles.push({
            fileName: f.fileName,
            fileType: f.fileType || null,
            fileUrl: f.fileUrl,
            public_id: null,
          });
        } else {
          // fallback minimal entry
          uploadedFiles.push({ fileName: f.fileName || "unknown", fileType: f.fileType || null, fileUrl: f.fileUrl || null });
        }
      }

      // Save message
      const message = new GroupMessage({ groupId, sender, content, files: uploadedFiles });
      await message.save();
      const populated = await message.populate("sender", "name username email role");

      // Emit to group room so clients receive in real-time
      try {
        if (io && groupId) io.to(groupId).emit("newGroupMessage", populated);
      } catch (emitErr) {
        console.error("Emit newGroupMessage error:", emitErr);
      }

      return res.status(201).json(populated);
    } catch (err) {
      console.error("Create GroupMessage Error:", err);
      return res.status(500).json({ message: "Failed to create group message", error: err.message || String(err) });
    }
  });

  // GET messages for a group (unchanged behavior)
  router.get("/:groupId", async (req, res) => {
    try {
      const messages = await GroupMessage.find({ groupId: req.params.groupId })
        .populate("sender", "name username email")
        .sort({ createdAt: 1 });

      const out = messages.map((m) => {
        const obj = m.toObject();
        obj.files = (obj.files || []).map((f) => ({ fileName: f.fileName, fileUrl: f.fileUrl, fileType: f.fileType || null }));
        return obj;
      });

      res.json(out);
    } catch (err) {
      console.error("Get messages error:", err);
      res.status(500).json({ message: "Failed to load messages", error: err.message || String(err) });
    }
  });

  // Delete message (unchanged)
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await GroupMessage.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Message not found" });
      res.json({ message: "Message deleted successfully" });
    } catch (err) {
      console.error("Delete GroupMessage Error:", err);
      res.status(500).json({ message: "Failed to delete message", error: err.message || String(err) });
    }
  });

  return router;
}