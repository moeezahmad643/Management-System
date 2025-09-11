import express from "express";
import Support from "../models/supports.js";

const router = express.Router();

/**
 * @route POST /supports
 * @desc Create new support message
 */
router.post("/", async (req, res) => {
  try {
    const { userId, name, email, subject, message } = req.body;

    const support = new Support({
      userId,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    await support.save();
    res.status(201).json(support);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /supports
 * @desc Get all support messages
 */
router.get("/", async (req, res) => {
  try {
    const supports = await Support.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(supports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /supports/:id
 * @desc Get support message by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const support = await Support.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!support) return res.status(404).json({ error: "Support not found" });
    res.json(support);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route PATCH /supports/:id/status
 * @desc Update support message status (read/unread/resolved)
 */
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!support) return res.status(404).json({ error: "Support not found" });
    res.json(support);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route PATCH /supports/:id/reply
 * @desc Add an admin reply
 */
router.patch("/:id/reply", async (req, res) => {
  try {
    const { adminReply } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { adminReply, status: "resolved" },
      { new: true }
    );
    if (!support) return res.status(404).json({ error: "Support not found" });
    res.json(support);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
