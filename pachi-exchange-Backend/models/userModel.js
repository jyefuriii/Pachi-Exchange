import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema({
  emailAddress: { type: String, required: true },
  passwordHash: { type: String, require: true },
  fullName: { type: String, require: true },
  gender: { type: String, require: true },
  birthday: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  country: { type: String, require: true },
  username: { type: String, require: true },
  shippingName: { type: String, require: true },
  shippingLastName: { type: String, require: true },
  address1: { type: String, require: true },
  address2: { type: String, require: true },
  city: { type: String, require: true },
  postalCode: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userTickets: { type: Number, default: 10000 },
  userCashAmount: { type: Number, default: 0 },
});

const User = model("users", userSchema);

export default User;
