// models/DailyNote.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // one note per day
    date: {
      type: String, 
      required: true,
    },

    content: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Prevent duplicate notes for the same day
noteSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyNote", noteSchema);
