import mongoose from "mongoose";

const { Schema, model } = mongoose;
const redeemCollectionSchema = new Schema({
  collectionId: { type: String },
  userId: { type: String },
  price: { type: Number, required: true },
  name: { type: String },
  count: { type: Number, default: 1 },
  purchaseDate: { type: String },
  redeemedDate: { type: Date, default: Date.now },
  status: { type: String, default: "Redeemed" },
  productTicket: { type: Number },
});

const RedeemCollection = model("redeemedCollection", redeemCollectionSchema);

export default RedeemCollection;
