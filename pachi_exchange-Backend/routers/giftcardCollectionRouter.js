import express from "express";
import User from "../models/userModel.js";
import giftCardCollection from "../models/giftCardCollectionModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import validator from "validator";
import sendGiftCardEmail from "../middleware/sendGiftCardEmail.js";

//Products

const giftcardCollectionRouter = express.Router();
const { verify } = jwt;
const { isEmail } = validator;
giftcardCollectionRouter.post("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const user = await User.findById(userId);
    const username = user.username;
    console.log(verified);
    const {
      image,
      price,
      description,
      description1,
      description2,
      description3,
      description4,
      description5,
      name,
      emailVerification,
      emailAddress,
      isDelivered,
      type,
      count,
      productTicket,
    } = req.body;

    if (emailAddress === !isEmail)
      return res.status(400).json({
        errorMessage: "Please input a valid email address.",
      });

    const newCollection = await new giftCardCollection({
      image,
      userId,
      price,
      description,
      description1,
      description2,
      description3,
      description4,
      description5,
      name,
      emailVerification,
      emailAddress,
      isDelivered,
      type,
      count,
      productTicket,
    });
    const savedCollection = await newCollection.save();
    await sendGiftCardEmail(
      emailAddress,
      "Gift Card Purchase",
      username,
      name,
      price
    );
    res.json(savedCollection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

giftcardCollectionRouter.get("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const giftcardCollection = await giftCardCollection
      .aggregate([
        {
          $match: {
            userId: String(verified.user),
            count: { $gte: 1 },
          },
        },
        {
          $project: {
            name: "$name",
            purchaseDate: {
              $dateToString: {
                format: "%m-%d-%Y %H:%M:%S",
                date: "$purchaseDate",
                timezone: "Asia/Manila",
              },
            },
            status: "$status",
          },
        },
      ])
      .sort({ purchaseDate: -1 });

    res.json(giftcardCollection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default giftcardCollectionRouter;
