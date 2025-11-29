import DailyNote from "../models/Notes.js";
import dayjs from "dayjs";

export const getTodayNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const todayDate = dayjs().format("YYYY-MM-DD");

    const note = await DailyNote.findOne({ userId, date: todayDate });

    if (!note)
      return res.json({ note: null });

    res.status(200).json({ note });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const saveTodayNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const todayDate = dayjs().format("YYYY-MM-DD");

    const { content } = req.body;

    const updatedNote = await DailyNote.findOneAndUpdate(
      { userId, date: todayDate },
      { content },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res
      .status(200)
      .json({
        message: "Note saved",
        savedAt: updatedNote.updatedAt,
        note: updatedNote,
      });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};
