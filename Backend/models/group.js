import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    members: Array,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // which admin created it
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
