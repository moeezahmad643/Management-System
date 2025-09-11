import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || "all";

    let users;
    if (typeof limit == "number") {
      users = await User.find().select("-password").limit(limit);
    }
    else{
      users = await User.find().select("-password");
    }
    res.json({
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password" // exclude password
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/users/:id/make-admin", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User promoted to admin", user });
  } catch (error) {
    console.error("Make Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated", user });
  } catch (error) {
    console.error("Edit User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/userEdit", async (req, res) => {
  try {
    const { userId, name, shortDescription, position } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (shortDescription !== undefined) user.shortDescription = shortDescription;
    if (position !== undefined) user.position = position;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
