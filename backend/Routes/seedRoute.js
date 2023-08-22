import express from "express";
import Product from "../Model/productModel.js";
import data from "../data.js";
const app = express();
app.use(express.json());
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const CreatedProducts = await Product.insertMany(data.products);
  res.send({ CreatedProducts });
});

export default seedRouter;
