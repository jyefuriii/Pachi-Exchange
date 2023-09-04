import mongoose from "mongoose";

const { Schema, model } = mongoose;
const giftCardCollectionSchema = new Schema({
  image: { type: String },
  userId: { type: String },
  price: { type: Number },
  description: { type: String },
  description1: { type: String },
  description2: { type: String },
  description3: { type: String },
  description4: { type: String },
  description5: { type: String },
  name: { type: String },
  emailVerification: { type: Boolean },
  emailAddress: { type: String, required: true },
  isDelivered: { type: Boolean, default: false },
  type: { type: String },
  count: { type: Number, default: 1 },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, default: "For Shipping" },
  productTicket: { type: Number },
});

const giftCardCollection = model(
  "giftcardCollection",
  giftCardCollectionSchema
);

export default giftCardCollection;
