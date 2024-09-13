import express from "express";
import Lottery from "../models/lotteryModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const lotteryRouter = express.Router();
const { verify } = jwt;
lotteryRouter.post("/", async (req, res) => {
  try {
    const { lotteryType, prize, cashPrize, count, lotteryTicket } = req.body;
    const newLottery = await new Lottery({
      lotteryType,
      prize,
      cashPrize,
      count,
      lotteryTicket,
    });
    const savedLottery = await newLottery.save();
    res.json(savedLottery);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
lotteryRouter.get("/daily", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const type = "Daily";
    const lottery = await Lottery.findOne({ lotteryType: type });
    res.json(lottery);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
lotteryRouter.get("/weekly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const type = "Weekly";
    const lottery = await Lottery.findOne({ lotteryType: type });
    res.json(lottery);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
lotteryRouter.get("/monthly", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const type = "Monthly";
    const lottery = await Lottery.findOne({ lotteryType: type });
    res.json(lottery);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default lotteryRouter;
