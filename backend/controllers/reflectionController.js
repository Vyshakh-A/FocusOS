import ReflectionHistory from "../models/ReflectionHistory";
import dayjs from "dayjs";

export const saveReflection = async (req, res) => {
  try {
    const userId = req.user.id;
    const todayDate = dayjs().format("YYYY-MM-DD");
    const { content, mood } = req.body;

    if (!content || content.trim().length < 3) {
      return res.status(400).json({
        message: "Reflection content is too short.",
      });
    }

    const reflection = new ReflectionHistory.findOneAndUpdate(
      { userId, date: todayDate },
      { content, mood: mood || null },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    const yesterdayReflection = await ReflectionHistory.findOne({
      userId,
      date: yesterday,
    });

    let streak = 1;

    if (yesterdayReflection) {
      streak = req.user.reflectionStreak + 1;
    }

    req.user.reflectionStreak = streak;
    await req.user.save();
    return res.status(200).json({
      message: "Reflection saved successfully.",
      date: todayDate,
      reflection,
      streak,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getReflectionHistory = async (req, res) => {
    try{
        const userId = req.user.id;

        const reflection = await ReflectionHistory.find({ userId }.sort({
            date: -1,
        }))

        res.status(200).json({reflection});
    } catch (e) {
        res.status(500).json({
            message: "Server Error",
            error: e.message
        })
    }
}