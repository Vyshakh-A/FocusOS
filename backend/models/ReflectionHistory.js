import mongoose from "mongoose";

const reflectionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String, // format: YY-MM-DD
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 4000,
    },
     mood: {
      type: String,
      enum: ["good", "okay", "bad", null],
      default: null,
    },
    reflectionStreak: {
        type: Number,
        default: 1
    }
  },
  {
    timestamps: true,
  }
);
reflectionHistorySchema.index({ userId: 1, date: 1 }, { unique: true });
export default mongoose.model("ReflectionHistory", reflectionHistorySchema);
