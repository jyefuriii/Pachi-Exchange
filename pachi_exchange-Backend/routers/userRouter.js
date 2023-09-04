import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

// register
const userRouter = express.Router();
const { sign, verify } = jwt;
const { genSalt, hash, compare } = bcrypt;

userRouter.post("/", async (req, res) => {
  try {
    const {
      emailAddress,
      password,
      passwordVerify,
      fullName,
      gender,
      birthday,
      phoneNumber,
      country,
      username,
      shippingName,
      shippingLastName,
      address1,
      address2,
      city,
      postalCode,
      userTickets,
    } = req.body;
    // validation
    if (
      !emailAddress ||
      !password ||
      !passwordVerify ||
      !fullName ||
      !gender ||
      !birthday ||
      !phoneNumber ||
      !country ||
      !username ||
      !shippingName ||
      !shippingLastName ||
      !address1 ||
      !address2 ||
      !city ||
      !postalCode
    )
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 8)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please confirm your password. Password didn't matched.",
      });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this username/email already exists.",
      });

    // hash the password

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    // save a new user account to the db
    const newUser = new User({
      emailAddress,
      passwordHash,
      fullName,
      gender,
      birthday,
      phoneNumber,
      country,
      username,
      shippingName,
      shippingLastName,
      address1,
      address2,
      city,
      postalCode,
      userTickets,
    });
    const user = await newUser.save();
    // sign the token

    const token = sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// log in
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // validate
    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please input your username and password." });

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ errorMessage: "Incorrect username/email or password." });

    const passwordCorrect = await compare(password, user.passwordHash);
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "Incorrect username/email or password." });

    // sign the token
    const token = sign(
      {
        user: user._id,
      },
      process.env.JWT_SECRET
    );
    // send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

userRouter.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

userRouter.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

//Update user tickets
userRouter.put("/updateTickets", async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const newTickets = { userTickets: req.body.userTickets };
    const user = await User.findByIdAndUpdate(verified.user, newTickets, {
      new: true,
      returnOriginal: false,
    });
    {
      user.userTickets;
      user.save();
    }
    res.json(user.userTickets);
  } catch (err) {
    res.send(err);
  }
});
//Update user account
userRouter.put("/updateAccount", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const {
      currentUser,
      fullName,
      gender,
      birthday,
      phoneNumber,
      country,
      shippingName,
      shippingLastName,
      address1,
      address2,
      city,
      postalCode,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;
    // validate
    if (oldPassword.length === 0 && newPassword.length === 0) {
      const updateAccount = await User.findOneAndUpdate(
        {
          _id: currentUser,
        },
        {
          fullName,
          gender,
          country,
          birthday,
          phoneNumber,
          shippingName,
          shippingLastName,
          address1,
          address2,
          city,
          postalCode,
          updatedAt: Date.now(),
        },
        {
          new: true,
          upsert: false,
          returnOriginal: false,
        }
      );
      res.json(updateAccount);
      return res
        .status(200)
        .json({ errorMessage: "Update Account Successful." });
    }
    if (newPassword.length < 8)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    if (newPassword !== confirmNewPassword)
      return res.status(400).json({
        errorMessage: "Please confirm your password. Password didn't matched.",
      });

    const user = await User.findById({ _id: currentUser });
    const salt = await genSalt();
    const passwordHash = await hash(newPassword, salt);
    const passwordCorrect = await compare(oldPassword, user.passwordHash);
    if (!passwordCorrect)
      return res.status(400).json({
        errorMessage:
          "Incorrect Password, Please make sure your old password is correct",
      });
    if (passwordCorrect && newPassword.length < 8)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    if (passwordCorrect && newPassword.length >= 8) {
      const updateAccount = await User.findOneAndUpdate(
        {
          _id: currentUser,
        },
        {
          fullName,
          gender,
          country,
          birthday,
          phoneNumber,
          shippingName,
          shippingLastName,
          address1,
          address2,
          city,
          postalCode,
          passwordHash,
          updatedAt: Date.now(),
        },
        {
          new: true,
          upsert: false,
          returnOriginal: false,
        }
      );
      res.json(updateAccount);
      return res
        .status(200)
        .json({ errorMessage: "Update Account Successful." });
    }
  } catch (err) {
    res.status(500).send();
  }
});

//Update cash value on redeem
userRouter.put("/updateCashAmount", async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const newCashValue = { userCashAmount: req.body.userCashAmount };
    const user = await User.findByIdAndUpdate(verified.user, newCashValue, {
      new: true,
      returnOriginal: false,
    });
    {
      user.userCashAmount;
      user.save();
    }
    res.json(user.userCashAmount);
  } catch (err) {
    res.send(err);
  }
});
//Update cash value on cashout
userRouter.put("/updateCashoutAmount", async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const { previousCashAmount, cashoutValue } = req.body;
    const updatedCashAmount = previousCashAmount - cashoutValue;
    const newCashValue = { userCashAmount: updatedCashAmount };
    const user = await User.findByIdAndUpdate(verified.user, newCashValue, {
      new: true,
      returnOriginal: false,
    });
    {
      user.userCashAmount;
      user.save();
    }
    res.json(user.userCashAmount);
  } catch (err) {
    res.send(err);
  }
});

userRouter.get("/login", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.user).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default userRouter;
