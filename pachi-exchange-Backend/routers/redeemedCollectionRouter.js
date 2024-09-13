import express from "express";
import Collection from "../models/collectionModel.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

//Products

const redeemCollectionRouter = express.Router();
const { verify } = jwt;
redeemCollectionRouter.post("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const userId = String(verified.user);
    const {
      collectionId,
      price,
      name,
      type,
      count,
      purchaseDate,
      productTicket,
    } = req.body;

    const newRedeemCollection = await new Collection({
      collectionId,
      userId,
      price,
      name,
      type,
      count,
      purchaseDate,
      productTicket,
    });
    const savedCollection = await newRedeemCollection.save();
    res.json(savedCollection);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

redeemCollectionRouter.get("/", auth, async (req, res) => {
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
          _id: { name: "$name", image: "$image", price: "$price" },
          uniqueId: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$uniqueId",
          image: "$_id.image",
          userId: "$userId",
          name: "$_id.name",
          price: "$_id.price",
          count: "$count",
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
