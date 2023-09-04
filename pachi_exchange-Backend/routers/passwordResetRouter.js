import express from "express";
import mongoose from "mongoose";
import Joi from "joi";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../middleware/sendEmail.js";
import resetToken from "../models/tokenModel.js";
import User from "../models/userModel.js";

const pwResetRouter = express.Router();
const { genSalt, hash } = bcrypt;

pwResetRouter.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      emailAddress: Joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (!user)
      return res.status(400).json({ errorMessage: "Email doesn't exist" });

    let token = await resetToken.findOne({ userId: user._id });
    if (!token) {
      token = await new resetToken({
        userId: String(user._id),
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `http://localhost:3000/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.emailAddress, "Password reset", link);
    res.json("Password reset link sent to your email account");
  } catch (error) {
    res.json({ errorMessage: "An error occured" });
    console.log(error);
  }
});

pwResetRouter.post("/:userId/:token", async (req, res) => {
  const { userId, token, password, confirmNewPassword } = req.body;
  let passwordResetToken = await resetToken.findOne({
    userId: userId,
  });
  if (!passwordResetToken)
    return res.status(400).json({
      errorMessage: "Invalid or expired password reset token",
    });
  if (token !== passwordResetToken.token)
    return res.status(400).json({
      errorMessage: "Invalid or expired password reset token",
    });
  if (password.length < 8)
    return res.status(400).json({
      errorMessage: "Please enter a password of at least 8 characters.",
    });
  if (password !== confirmNewPassword)
    return res.status(400).json({
      errorMessage: "Please confirm your password. Password didn't matched.",
    });
  const salt = await genSalt();
  const passwordHash = await hash(password, salt);
  await User.updateOne(
    { _id: userId },
    { $set: { passwordHash: passwordHash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });
  /*sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );*/
  await passwordResetToken.deleteOne();
  res.json("Password reset successful");
  return true;
});

export default pwResetRouter;
