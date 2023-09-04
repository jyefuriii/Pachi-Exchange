import mongoose from "mongoose";

const { Schema, model } = mongoose;
const lotterySchema = new Schema({
  lotteryType: { type: String },
  prize: { type: Number, required: true },
  cashPrize: { type: Boolean, default: true },
  count: { type: Number, default: 1 },
  lotteryTicket: { type: Number, required: true },
});
const Lottery = model("lotteries", lotterySchema);

export default Lottery;
