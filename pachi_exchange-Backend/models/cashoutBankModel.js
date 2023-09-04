import mongoose from "mongoose";

const { Schema, model } = mongoose;
const cashoutBankSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  bankCode: { type: String, required: true },
  bankAccountNumber: { type: Number, required: true },
  bankAccountFirstName: { type: String, required: true },
  bankAccountLastName: { type: String, required: true },
  country: { type: String, required: true },
  cashoutOption: { type: String, required: true },
  previousCashAmount: { type: Number, required: true },
  cashoutValue: { type: Number, required: true },
  updatedCashAmount: { type: Number, required: true },
  cashoutDate: { type: Date, default: Date.now },
});
const cashoutBankPayment = model("cashoutBanklog", cashoutBankSchema);

export default cashoutBankPayment;
