import express from "express";
import Group from "../models/Group.js";

const router = express.Router();

// Create a new group
// Create a new group
router.post("/", async (req, res) => {
  try {
    const { title, description, members } = req.body;


    console.log(members);
    

    const membersArray = Array.isArray(members)
      ? members
      : members
      ? members.split(",").map((id) => id.trim())
      : [];

    const group = new Group({
      title,
      description,
      members: membersArray,
      createdBy: req.user ? req.user._id : null,
    });

    await group.save();
    const populated = await Group.findById(group._id).populate(
      "members",
      "username email"
    );

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all groups
router.get("/", async (req, res) => {
  try {
    const limitParam = parseInt(req.query.limit) || "all";

    const groups = await Group.find()
      .populate("members", "username email")
      .limit(typeof limitParam == "number" ? limitParam : null);
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch groups" });
  }
});

// ✅ Get single group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "username email"
    );
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch group" });
  }
});

// ✅ Update group (title, description, members)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const membersArray = Array.isArray(members)
      ? members
      : members
      ? members.split(",").map((id) => id.trim())
      : [];

    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { title, description, members: membersArray },
      { new: true }
    ).populate("members", "username email");

    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to update group" });
  }
});

// Add member to group
router.patch("/:id/add-member", async (req, res) => {
  try {
    const { userId } = req.body;
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } }, // prevents duplicates
      { new: true }
    ).populate("members", "username email");

    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to add member" });
  }
});

// Remove member from group
router.patch("/:id/remove-member", async (req, res) => {
  try {
    const { userId } = req.body;
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: userId } },
      { new: true }
    ).populate("members", "username email");

    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove member" });
  }
});

// Delete group
router.delete("/:id", async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup)
      return res.status(404).json({ message: "Group not found" });

    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete group" });
  }
});

export default router;
