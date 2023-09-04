import mongoose from "mongoose";

const { Schema, model } = mongoose;
const cashoutPaypalSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  paypalAccount: { type: String, required: true },
  cashoutOption: { type: String, required: true },
  previousCashAmount: { type: Number, required: true },
  cashoutValue: { type: Number, required: true },
  updatedCashAmount: { type: Number, required: true },
  cashoutDate: { type: Date, default: Date.now },
});
const cashoutPaypalPayment = model("cashoutPaypallog", cashoutPaypalSchema);

export default cashoutPaypalPayment;
