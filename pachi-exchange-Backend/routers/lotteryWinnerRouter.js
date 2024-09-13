import express from "express";
import User from "../models/userModel.js";
import LotteryEntry from "../models/lotteryEntryModel.js";
import LotteryWinner from "../models/lotteryWinnerModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import cron from "node-cron";
import parser from "cron-parser";
import sendLotteryWinnerEmail from "../middleware/sendLotteryWinnerEmail.js";

const lotteryWinnerRouter = express.Router();
const { verify } = jwt;

//Daily Draw date value
const cronDailyDraw = "0 12 * * * ";
const interval = parser.parseExpression(cronDailyDraw);
const dailyDrawDate = interval.next().toISOString();
//Weekly Draw date value
const cronWeeklyDraw = "0 12 * * MON";
const weeklyInterval = parser.parseExpression(cronWeeklyDraw);
const weeklyDrawDate = weeklyInterval.next().toISOString();
//Monthly Draw date value
const cronMonthlyDraw = "0 12 1 * *";
const monthlyInterval = parser.parseExpression(cronMonthlyDraw);
const monthlyDrawDate = monthlyInterval.next().toISOString();

//Daily lottery winner
const dailyJob = cron.schedule("0 12 * * *", async function () {
  console.log("DailyWinner");
  const lotteryWinnerCount = await LotteryWinner.find().count();
  const drawNumber = lotteryWinnerCount + 1;

  const lotteryWinner = await LotteryEntry.aggregate([
    {
      $match: {
        drawDate: new Date(dailyDrawDate),
        lotteryType: "Daily",
      },
    },
    {
      $sample: { size: 1 },
    },
    {
      $addFields: { drawNumber: "#" + drawNumber },
    },
    {
      $merge: { into: "lotterywinners" },
    },
  ]);
  res.json(lotteryWinner);
});
dailyJob.start();

//Weekly lottery winner
const weeklyJob = cron.schedule("1 12 * * MON", async function () {
  console.log("WeeklyWinner");
  const lotteryWinnerCount = await LotteryWinner.find().count();
  const drawNumber = lotteryWinnerCount + 1;

  const lotteryWinner = await LotteryEntry.aggregate([
    {
      $match: {
        drawDate: new Date(weeklyDrawDate),
        lotteryType: "Weekly",
      },
    },
    {
      $sample: { size: 1 },
    },
    {
      $addFields: { drawNumber: "#" + drawNumber },
    },
    {
      $merge: { into: "lotterywinners" },
    },
  ]);
  res.json(lotteryWinner);
});
weeklyJob.start();

//Monthly lottery winner
const monthlyJob = cron.schedule("2 12 1 * *", async function () {
  console.log("MonthlyWinner");
  const lotteryWinnerCount = await LotteryWinner.find().count();
  const drawNumber = lotteryWinnerCount + 1;

  const lotteryWinner = await LotteryEntry.aggregate([
    {
      $match: {
        drawDate: new Date(monthlyDrawDate),
        lotteryType: "Monthly",
      },
    },
    {
      $sample: { size: 1 },
    },
    {
      $addFields: { drawNumber: "#" + drawNumber },
    },
    {
      $merge: { into: "lotterywinners" },
    },
  ]);
  res.json(lotteryWinner);
});
monthlyJob.start();

// Daily: last 7 draws
lotteryWinnerRouter.get("/daily", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const lotteryDailyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Daily",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(7);

    res.json(lotteryDailyWinners);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Weekly: last 7 draws
lotteryWinnerRouter.get("/weekly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const lotteryWeeklyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Weekly",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(7);

    res.json(lotteryWeeklyWinners);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Monthly: last 7 draws
lotteryWinnerRouter.get("/monthly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const lotteryMonthlyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Monthly",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(7);

    res.json(lotteryMonthlyWinners);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Daily email job
const dailyEmailJob = cron.schedule("1 12 * * *", async function () {
  console.log("DailyWinnerEmail");
  try {
    const lotteryDailyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Daily",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
          entryId: "$entryId",
          prize: "$prize",
          drawNumber: "$drawNumber",
          lotteryType: "$lotteryType",
          purchaseDate: "$purchaseDate",
          userId: "$userId",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(1);

    const user = await User.findById(lotteryDailyWinners[0].userId);
    const fullName = user.fullName;
    const username = user.username;
    const emailAddress = user.emailAddress;
    const entryId = lotteryDailyWinners[0].entryId;
    const lotteryType = lotteryDailyWinners[0].lotteryType;
    const prize = lotteryDailyWinners[0].prize + " Tickets";
    const drawNumber = lotteryDailyWinners[0].drawNumber;
    const drawDate = lotteryDailyWinners[0].drawDate;
    const purchaseDate = lotteryDailyWinners[0].purchaseDate;

    await sendLotteryWinnerEmail(
      fullName,
      emailAddress,
      "Sweepstakes Winner",
      username,
      entryId,
      lotteryType,
      prize,
      drawNumber,
      drawDate,
      purchaseDate
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
dailyEmailJob.start();

//Weekly email job
const weeklyEmailJob = cron.schedule("2 12 * * MON", async function () {
  console.log("WeeklyWinnerEmail");
  try {
    const lotteryWeeklyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Weekly",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
          entryId: "$entryId",
          prize: "$prize",
          drawNumber: "$drawNumber",
          lotteryType: "$lotteryType",
          purchaseDate: "$purchaseDate",
          userId: "$userId",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(1);

    const user = await User.findById(lotteryWeeklyWinners[0].userId);
    const fullName = user.fullName;
    const username = user.username;
    const emailAddress = user.emailAddress;
    const entryId = lotteryWeeklyWinners[0].entryId;
    const lotteryType = lotteryWeeklyWinners[0].lotteryType;
    const prize = "$" + lotteryWeeklyWinners[0].prize;
    const drawNumber = lotteryWeeklyWinners[0].drawNumber;
    const drawDate = lotteryWeeklyWinners[0].drawDate;
    const purchaseDate = lotteryWeeklyWinners[0].purchaseDate;

    await sendLotteryWinnerEmail(
      fullName,
      emailAddress,
      "Sweepstakes Winner",
      username,
      entryId,
      lotteryType,
      prize,
      drawNumber,
      drawDate,
      purchaseDate
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
weeklyEmailJob.start();

//Monthly email job
const monthlyEmailJob = cron.schedule("3 12 1 * *", async function () {
  console.log("MonthlyWinnerEmail");
  try {
    const lotteryMonthlyWinners = await LotteryWinner.aggregate([
      {
        $match: {
          lotteryType: "Monthly",
        },
      },
      {
        $project: {
          drawDate: {
            $dateToString: {
              format: "%m-%d-%Y %H:%M:%S",
              date: "$drawDate",
              timezone: "Asia/Manila",
            },
          },
          drawNumber: "$drawNumber",
          username: "$username",
          entryId: "$entryId",
          prize: "$prize",
          drawNumber: "$drawNumber",
          lotteryType: "$lotteryType",
          purchaseDate: "$purchaseDate",
          userId: "$userId",
        },
      },
    ])
      .sort({ drawDate: -1 })
      .limit(1);

    const user = await User.findById(lotteryMonthlyWinners[0].userId);
    const fullName = user.fullName;
    const username = user.username;
    const emailAddress = user.emailAddress;
    const entryId = lotteryMonthlyWinners[0].entryId;
    const lotteryType = lotteryMonthlyWinners[0].lotteryType;
    const prize = "$" + lotteryMonthlyWinners[0].prize;
    const drawNumber = lotteryMonthlyWinners[0].drawNumber;
    const drawDate = lotteryMonthlyWinners[0].drawDate;
    const purchaseDate = lotteryMonthlyWinners[0].purchaseDate;

    await sendLotteryWinnerEmail(
      fullName,
      emailAddress,
      "Sweepstakes Winner",
      username,
      entryId,
      lotteryType,
      prize,
      drawNumber,
      drawDate,
      purchaseDate
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
monthlyEmailJob.start();

export default lotteryWinnerRouter;
