import mongoose from "mongoose";

const { Schema, model } = mongoose;
const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900,
  },
});

const resetToken = model("resetToken", tokenSchema);

export default resetToken;
