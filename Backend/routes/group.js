// backend/routes/group.js
import express from "express";
import Group from "../models/Group.js";

const router = express.Router();

// ✅ Create a new group
router.post("/", async (req, res) => {
  try {
    const { title, description, members, twoWay, status, conclusion } = req.body;

    const membersArray = Array.isArray(members)
      ? members
      : members
      ? members.split(",").map((id) => id.trim())
      : [];

    const group = new Group({
      title,
      description,
      members: membersArray,
      twoWay: twoWay ?? false, // default false (admin-only)
      createdBy: req.user ? req.user._id : null,
      // Allow optionally setting status/conclusion on create (usually defaults)
      status: status || undefined,
      conclusion: conclusion || undefined,
    });

    await group.save();
    const populated = await Group.findById(group._id).populate("members", "username email");

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all groups
router.get("/", async (req, res) => {
  try {
    const limitParam = parseInt(req.query.limit) || "all";

    const groups = await Group.find()
      .populate("members", "username email")
      .limit(typeof limitParam === "number" ? limitParam : 0);

    res.json(groups);
  } catch (err) {
    console.error("Get groups error:", err);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
});

// ✅ Get single group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("members", "username email");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    console.error("Get group error:", err);
    res.status(500).json({ message: "Failed to fetch group" });
  }
});

// ✅ Update group (title, description, members, twoWay, status, conclusion)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, members, twoWay, status, conclusion } = req.body;

    const membersArray = Array.isArray(members)
      ? members
      : members
      ? members.split(",").map((id) => id.trim())
      : [];

    const update = {
      title,
      description,
      members: membersArray,
      twoWay,
    };

    // only include status/conclusion if provided
    if (typeof status !== "undefined") update.status = status;
    if (typeof conclusion !== "undefined") update.conclusion = conclusion;

    const group = await Group.findByIdAndUpdate(req.params.id, update, { new: true }).populate(
      "members",
      "username email"
    );

    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    console.error("Update group error:", err);
    res.status(500).json({ message: "Failed to update group" });
  }
});

// ✅ Mark group completed with conclusion (requires conclusion)
router.patch("/:id/complete", async (req, res) => {
  try {
    const { conclusion } = req.body;
    if (!conclusion || !conclusion.trim()) {
      return res.status(400).json({ message: "Conclusion is required when marking a group as completed." });
    }

    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { status: "completed", conclusion: conclusion.trim() },
      { new: true }
    ).populate("members", "username email");

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);
  } catch (err) {
    console.error("Complete group error:", err);
    res.status(500).json({ message: "Failed to complete group" });
  }
});

// ✅ Update status (flexible: 'active' or 'completed' — if completed and no conclusion provided, keep existing conclusion)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, conclusion } = req.body;
    if (!status || !["active", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Allowed: 'active' or 'completed'." });
    }

    const update = { status };
    if (status === "completed" && typeof conclusion !== "undefined") {
      if (!conclusion || !conclusion.trim()) {
        return res.status(400).json({ message: "Conclusion is required when setting status to completed." });
      }
      update.conclusion = conclusion.trim();
    } else if (status === "active") {
      // optional: when reactivating clear conclusion? we will keep existing conclusion unless caller explicitly passes empty string
      if (typeof conclusion !== "undefined") update.conclusion = conclusion;
    }

    const group = await Group.findByIdAndUpdate(req.params.id, update, { new: true }).populate("members", "username email");
    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Failed to update group status" });
  }
});

// ✅ Add member to group
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
    console.error("Add member error:", err);
    res.status(500).json({ message: "Failed to add member" });
  }
});

// ✅ Remove member from group
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
    console.error("Remove member error:", err);
    res.status(500).json({ message: "Failed to remove member" });
  }
});

// ✅ Delete group
router.delete("/:id", async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) return res.status(404).json({ message: "Group not found" });

    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("Delete group error:", err);
    res.status(500).json({ message: "Failed to delete group" });
  }
});

export default router;