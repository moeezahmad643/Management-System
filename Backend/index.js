// backend/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import cloudinary from "./utils/cloudinary.js";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import taskRoutes from "./routes/task.js";
import groupRoutes from "./routes/group.js";
import supportRoutes from "./routes/supports.js";
import groupMessageRoutes from "./routes/groupMessage.js"; // note: now a function
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  },
});

// serve uploads if any
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "120mb" })); // raise limit if you expect large files
app.use(express.urlencoded({ extended: true, limit: "120mb" }));

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/groups", groupRoutes);
app.use("/supports", supportRoutes);
app.use("/upload", uploadRoutes);

// IMPORTANT: mount group-message routes with io so POST can emit
app.use("/api/group-messages", groupMessageRoutes(io));

// Socket events - simplified: just join rooms
io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    if (!groupId) return;
    socket.join(groupId);
    console.log(`Socket ${socket.id} joined group ${groupId}`);
  });

  // Keep an option to listen to sendGroupMessage if you want (but do not save here).
  // If you prefer to receive socket events and call the REST endpoint server-side,
  // you can implement that here. For now we keep this minimal to avoid double-saves.
  socket.on("disconnect", () => {
    console.log("⚠️ Socket disconnected:", socket.id);
  });
});

// connect db & start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });
