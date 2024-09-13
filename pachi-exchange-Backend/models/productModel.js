import mongoose from "mongoose";

const { Schema, model } = mongoose;
const productSchema = new Schema({
  image: { type: String },
  price: { type: Number, required: true },
  productTicket: { type: Number, required: true },
  description: { type: String },
  description1: { type: String },
  description2: { type: String },
  description3: { type: String },
  description4: { type: String },
  description5: { type: String },
  name: { type: String },
  emailVerification: { type: Boolean },
  type: { type: String },
  shortName: { type: String },
  count: { type: Number, default: 1 },
  number:{type: Number, default: 1},
});

const Product = model("productitems", productSchema);

export default Product;
