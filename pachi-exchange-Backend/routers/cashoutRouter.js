import express from "express";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import CashoutBankPayment from "../models/cashoutBankModel.js";
import CashoutPaypalPayment from "../models/cashoutPaypalModel.js";
import sendCashoutEmail from "../middleware/sendCashoutEmail.js";

//Products

const cashoutRouter = express.Router();
const { verify } = jwt;

//Cashout Bank
cashoutRouter.post("/bank", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const emailAddress = user.emailAddress;
    const cashoutOption = "Bank";
    const {
      username,
      bankCode,
      bankAccountNumber,
      bankAccountFirstName,
      bankAccountLastName,
      country,
      previousCashAmount,
      cashoutValue,
      cashoutDate,
    } = req.body;
    const updatedCashAmount = previousCashAmount - cashoutValue;

    if (
      !bankCode ||
      !bankAccountNumber ||
      !bankAccountFirstName ||
      !bankAccountLastName ||
      !country
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    if (cashoutValue > previousCashAmount) {
      return res.status(400).json({
        errorMessage:
          "Cashout amount should not be more than your available amount.",
      });
    }

    const newCashoutRequest = await new CashoutBankPayment({
      userId: verified.user,
      username,
      bankCode,
      bankAccountNumber,
      bankAccountFirstName,
      bankAccountLastName,
      country,
      cashoutOption: cashoutOption,
      previousCashAmount,
      cashoutValue,
      updatedCashAmount: updatedCashAmount,
      cashoutDate,
    });

    const savedCashoutRequest = await newCashoutRequest.save();
    await sendCashoutEmail(
      emailAddress,
      "Cashout Request",
      username,
      cashoutValue,
      updatedCashAmount,
      cashoutOption
    );
    res.json(savedCashoutRequest);
  } catch (err) {
    res.status(500).send();
  }
});

//Cashout Paypal
cashoutRouter.post("/paypal", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const emailAddress = user.emailAddress;
    const cashoutOption = "Paypal";
    const {
      username,
      paypalAccount,
      previousCashAmount,
      cashoutValue,
      cashoutDate,
    } = req.body;
    const updatedCashAmount = previousCashAmount - cashoutValue;

    if (!paypalAccount) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (cashoutValue > previousCashAmount) {
      return res.status(400).json({
        errorMessage:
          "Cashout amount should not be more than your available amount.",
      });
    }

    const newCashoutRequest = await new CashoutPaypalPayment({
      userId: verified.user,
      username,
      paypalAccount,
      cashoutOption: cashoutOption,
      previousCashAmount,
      cashoutValue,
      updatedCashAmount: updatedCashAmount,
      cashoutDate,
    });

    const savedCashoutRequest = await newCashoutRequest.save();
    await sendCashoutEmail(
      emailAddress,
      "Cashout Request",
      username,
      cashoutValue,
      updatedCashAmount,
      cashoutOption
    );
    res.json(savedCashoutRequest);
  } catch (err) {
    res.status(500).send();
  }
});

export default cashoutRouter;
