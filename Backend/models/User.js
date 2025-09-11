import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ✅ Task counters
    TotalTask: { type: Number, default: 0, trim: true },
    PendingTask: { type: Number, default: 0, trim: true },
    CompletedTask: { type: Number, default: 0, trim: true },

    // Optional profile fields
    shortDescription: String,
    position: String,
    profileImage: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;