import express from "express";
import Product from "../models/productModel.js";
import auth from "../middleware/auth.js";

//Products

const productRouter = express.Router();
productRouter.post("/", auth, async (req, res) => {
  try {
    const {
      image,
      price,
      productTicket,
      description,
      description1,
      description2,
      description3,
      description4,
      description5,
      name,
      emailVerification,
      type,
      shortName,
    } = req.body;

    const newProduct = new Product({
      image,
      price,
      productTicket,
      description,
      description1,
      description2,
      description3,
      description4,
      description5,
      name,
      emailVerification,
      type,
      shortName,
      count,
      number,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({number:1});
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/*const productRouter = express.Router();
productRouter.post("/", auth, async (req, res) => {
  const dbCard = req.body;
  Product.create(Product, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(201).send(data);
      console.log(data);
    }
  });
});

productRouter.get("/productitems", auth, async (req, res) => {
  Product.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
*/

export default productRouter;
