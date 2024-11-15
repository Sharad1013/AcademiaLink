import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    students: [String],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // reference to the postmodel added later
      },
    ],
  },
  { timestamps: true }
);

export const Classroom = mongoose.model("Classroom", ClassroomSchema);
