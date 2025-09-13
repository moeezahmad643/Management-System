import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "project_uploads", // folder name in Cloudinary
    resource_type: "auto", // auto detects pdf, image, video, etc.
  },
});

const upload = multer({ storage });

// Upload single file
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    // Cloudinary gives url & public_id in req.file.path & req.file.filename
    const fileUrl = req.file.path;

    // Force download link
    const downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

    res.json({
      message: "File uploaded successfully",
      fileUrl,
      downloadUrl, // send download-only link
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;