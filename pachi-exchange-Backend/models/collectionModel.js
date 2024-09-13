import mongoose from "mongoose";

const { Schema, model } = mongoose;
const collectionSchema = new Schema({
  image: { type: String },
  userId: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  description1: { type: String },
  description2: { type: String },
  description3: { type: String },
  description4: { type: String },
  description5: { type: String },
  name: { type: String },
  emailVerification: { type: Boolean },
  type: { type: String },
  count: { type: Number, default: 1 },
  purchaseDate: { type: Date, default: Date.now },
  redeemed: { type: Boolean, default: false },
  shortName: { type: String },
  redeemDate: { type: Date },
  status: { type: String },
  productTicket: { type: Number },
});

const Collection = model("collection", collectionSchema);

export default Collection;
