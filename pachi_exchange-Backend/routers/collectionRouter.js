import express from "express";
import Collection from "../models/collectionModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

//Products

const collectionRouter = express.Router();
const { verify } = jwt;
collectionRouter.post("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
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
      type,
      count,
      shortName,
      productTicket,
    } = req.body;

    const newCollection = await new Collection({
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
      type,
      count,
      shortName,
      productTicket,
    });
    const savedCollection = await newCollection.save();
    res.json(savedCollection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

collectionRouter.get("/redeemCollections", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    verify(token, process.env.JWT_SECRET);
    const newName = { name: req.body.name };
    const collection = await Collection.find({
      newName: { $slice: -1 },
    });
    res.json(collection);
    console.log(collection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

collectionRouter.put("/redeemCollection", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    verify(token, process.env.JWT_SECRET);
    const newCollection = await Collection.findOneAndUpdate(
      {
        $and: [
          { userId: req.body.currentUser },
          { redeemed: false },
          { shortName: req.body.shortName },
          { count: 1 },
        ],
      },

      {
        redeemed: true,
        count: 0,
        $set: { redeemDate: Date.now(), status: "Redeemed" },
      },
      {
        new: true,
        upsert: false,
        returnOriginal: false,
      }
    );
    res.json(newCollection);
  } catch (err) {
    res.send(err);
  }
});

collectionRouter.get("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const collection = await Collection.aggregate([
      {
        $match: {
          userId: String(verified.user),
          count: { $gte: 1 },
        },
      },
      {
        $group: {
          _id: {
            name: "$name",
            image: "$image",
            price: "$price",
            shortName: "$shortName",
          },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id.name",
          image: "$_id.image",
          price: "$_id.price",
          shortName: "$_id.shortName",
          uniqueId: "$uniqueId",
          count: "$count",
          userId: "$userId",
        },
      },
    ]).sort({ price: 1 });
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default collectionRouter;
