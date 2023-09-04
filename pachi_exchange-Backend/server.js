import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import collectionRouter from "./routers/collectionRouter.js";
import lotteryRouter from "./routers/lotteryRouter.js";
import lotteryEntryRouter from "./routers/lotteryEntryRouter.js";
import lotteryWinnerRouter from "./routers/lotteryWinnerRouter.js";
import cashoutRouter from "./routers/cashoutRouter.js";
import giftcardCollectionRouter from "./routers/giftcardCollectionRouter.js";
import passwordResetRouter from "./routers/passwordResetRouter.js";

dotenv.config();

// set up server

const app = express();
const uri = process.env.MDB_CONNECT;
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// connect to mongoDB
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.status(200).send("Hello Jeffrey");
});
// set up routes

app.use("/auth", userRouter);
app.use("/giftcardCollection", giftcardCollectionRouter);
app.use("/collection", collectionRouter);
app.use("/productitems", productRouter);
app.use("/lottery", lotteryRouter);
app.use("/lotteryEntry", lotteryEntryRouter);
app.use("/lotteryWinner", lotteryWinnerRouter);
app.use("/cashout", cashoutRouter);
app.use("/password-reset", passwordResetRouter);
