import express from "express";
import User from "../models/userModel.js";
import LotteryEntry from "../models/lotteryEntryModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import parser from "cron-parser";

const lotteryEntryRouter = express.Router();
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

//Daily Draw..................
lotteryEntryRouter.post("/dailyDraw", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          drawDate: new Date(dailyDrawDate),
          lotteryType: lotteryType,
          freeEntry: false,
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            drawDate: "$drawDate",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          count: "$count",
        },
      },
    ]);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    if (countEntry < 3) {
      const newLotteryEntry = await new LotteryEntry({
        lotteryType,
        userId,
        username,
        entryId: "#" + entryId,
        prize,
        cashPrize,
        count,
        lotteryTicket,
        freeEntry,
        drawDate: dailyDrawDate,
      });
      const savedLotteryEntry = await newLotteryEntry.save();
      res.json(savedLotteryEntry);
    } else {
      res.status(401).send({
        errorMessage:
          "YOU HAVE REACHED THE MAXIMUM AMOUNT OF ENTRIES PERMITTED FOR THIS DRAW.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Weekly Draw ...................................
lotteryEntryRouter.post("/weeklyDraw", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          drawDate: new Date(weeklyDrawDate),
          lotteryType: lotteryType,
          freeEntry: false,
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            drawDate: "$drawDate",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          count: "$count",
        },
      },
    ]);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    if (countEntry < 3) {
      const newLotteryEntry = await new LotteryEntry({
        lotteryType,
        userId,
        username,
        entryId: "#" + entryId,
        prize,
        cashPrize,
        count,
        lotteryTicket,
        freeEntry,
        drawDate: weeklyDrawDate,
      });
      const savedLotteryEntry = await newLotteryEntry.save();
      res.json(savedLotteryEntry);
    } else {
      res.status(401).send({
        errorMessage:
          "YOU HAVE REACHED THE MAXIMUM AMOUNT OF ENTRIES PERMITTED FOR THIS DRAW.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//MonthlyDraw ..................................
lotteryEntryRouter.post("/monthlyDraw", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          drawDate: new Date(monthlyDrawDate),
          lotteryType: lotteryType,
          freeEntry: false,
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            drawDate: "$drawDate",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          count: "$count",
        },
      },
    ]);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    if (countEntry < 3) {
      const newLotteryEntry = await new LotteryEntry({
        lotteryType,
        userId,
        username,
        entryId: "#" + entryId,
        prize,
        cashPrize,
        count,
        lotteryTicket,
        freeEntry,
        drawDate: monthlyDrawDate,
      });
      const savedLotteryEntry = await newLotteryEntry.save();
      res.json(savedLotteryEntry);
    } else {
      res.status(401).send({
        errorMessage:
          "YOU HAVE REACHED THE MAXIMUM AMOUNT OF ENTRIES PERMITTED FOR THIS DRAW.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

lotteryEntryRouter.post("/freeEntry/daily", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          freeEntry: true,
          freeEntryDate: new Date(dailyDrawDate),
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
            freeEntryDate: "$freeEntryDate",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          freeEntryDate: "$_id.freeEntryDate",
          count: "$count",
        },
      },
    ]);
    console.log(lotteryEntryCount);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    console.log(countEntry);
    if (countEntry >= 1)
      return res.status(401).send({
        errorMessage:
          "YOU HAVE ALREADY USED YOUR FREE ENTRY TODAY. <br><br> COME BACK AGAIN TOMORROW TO PLACE ANOTHER ENTRY.",
      });
    const newLotteryEntry = await new LotteryEntry({
      lotteryType,
      userId,
      username,
      entryId: "#" + entryId,
      prize,
      cashPrize,
      count,
      lotteryTicket,
      freeEntry,
      drawDate: dailyDrawDate,
      freeEntryDate: dailyDrawDate,
    });
    const savedLotteryEntry = await newLotteryEntry.save();
    res.json(savedLotteryEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
lotteryEntryRouter.post("/freeEntry/weekly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          freeEntry: true,
          freeEntryDate: new Date(dailyDrawDate),
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
            freeEntryDate: "$freeEntryDate",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          freeEntryDate: "$_id.freeEntryDate",
          count: "$count",
        },
      },
    ]);
    console.log(lotteryEntryCount);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    console.log(countEntry);
    if (countEntry >= 1)
      return res.status(401).send({
        errorMessage:
          "YOU HAVE ALREADY USED YOUR FREE ENTRY TODAY. <br><br> COME BACK AGAIN TOMORROW TO PLACE ANOTHER ENTRY.",
      });
    const newLotteryEntry = await new LotteryEntry({
      lotteryType,
      userId,
      username,
      entryId: "#" + entryId,
      prize,
      cashPrize,
      count,
      lotteryTicket,
      freeEntry,
      drawDate: weeklyDrawDate,
      freeEntryDate: dailyDrawDate,
    });
    const savedLotteryEntry = await newLotteryEntry.save();
    res.json(savedLotteryEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
lotteryEntryRouter.post("/freeEntry/monthly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    const lotteryCount = await LotteryEntry.find().count();
    const entryId = lotteryCount + 1;
    const { lotteryType, prize, cashPrize, count, lotteryTicket, freeEntry } =
      req.body;

    const lotteryEntryCount = await LotteryEntry.aggregate([
      {
        $match: {
          userId: verified.user,
          freeEntry: true,
          freeEntryDate: new Date(dailyDrawDate),
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
            lotteryType: "$lotteryType",
            freeEntry: "$freeEntry",
            freeEntryDate: "$freeEntryDate",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          drawDate: "$_id.drawDate",
          lotteryType: "$_id.lotteryType",
          freeEntry: "$_id.freeEntry",
          freeEntryDate: "$_id.freeEntryDate",
          count: "$count",
        },
      },
    ]);
    console.log(lotteryEntryCount);
    const countEntry = lotteryEntryCount.map((item) => item.count);
    console.log(countEntry);
    if (countEntry >= 1)
      return res.status(401).send({
        errorMessage:
          "YOU HAVE ALREADY USED YOUR FREE ENTRY TODAY. <br><br> COME BACK AGAIN TOMORROW TO PLACE ANOTHER ENTRY.",
      });
    const newLotteryEntry = await new LotteryEntry({
      lotteryType,
      userId,
      username,
      entryId: "#" + entryId,
      prize,
      cashPrize,
      count,
      lotteryTicket,
      freeEntry,
      drawDate: monthlyDrawDate,
      freeEntryDate: dailyDrawDate,
    });
    const savedLotteryEntry = await newLotteryEntry.save();
    res.json(savedLotteryEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

lotteryEntryRouter.get("/entries", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const lotteryEntries = await LotteryEntry.aggregate([
      {
        $match: {
          userId: String(verified.user),
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
          entryId: "$entryId",
          lotteryType: "$lotteryType",
          purchaseDate: "$purchaseDate",
        },
      },
    ]).sort({ purchaseDate: -1 });

    res.json(lotteryEntries);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default lotteryEntryRouter;
