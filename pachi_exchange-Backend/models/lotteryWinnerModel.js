import mongoose from "mongoose";

const { Schema, model } = mongoose;
const lotteryWinnerSchema = new Schema({
  lotteryType: { type: String },
  userId: { type: String, required: true },
  drawNumber: { type: String, required: true },
  username: { type: String, required: true },
  entryId: { type: String, required: true, unique: true },
  prize: { type: Number, required: true },
  cashPrize: { type: Boolean, default: true },
  count: { type: Number, default: 1 },
  lotteryTicket: { type: Number, required: true },
  freeEntry: { type: Boolean, default: false },
  purchaseDate: { type: Date, default: Date.now },
  drawDate: { type: Date, required: true },
});
const LotteryWinner = model("lotterywinners", lotteryWinnerSchema);

export default LotteryWinner;
