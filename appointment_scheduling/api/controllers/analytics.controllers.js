//importing services
const Analytics = require("../services/analytics.services");

const perDayApponitments = async (req, res) => {
  try {
    const { userId } = req.params;
    const apponitments = await Analytics.timePerDay(userId);

    res.status(201).json({
      message: "Time spent per day :- ",
      apponitments,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

const eveningMornong = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({
        message: "Please enter user Id ",
      });
    }
    const apponitments = await Analytics.morningEvening(userId);
    if (!apponitments) {
      res.status(400).json({
        message: "MD not existed ",
      });
    }

    res.status(201).json({
      message: "Time spent per day :- ",
      apponitments,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
module.exports = { perDayApponitments, eveningMornong };
