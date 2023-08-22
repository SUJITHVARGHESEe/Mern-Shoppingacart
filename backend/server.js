import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./Routes/seedRoute.js";
import productRouter from "./Routes/productRouter.js";
import UserRouter from "./Routes/UserRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import orderPlace from "./Routes/orderPlace.js";
import orderDetails from "./Routes/ordersDetailsRouter.js";

const app = express(); // Initialize 'app' first
dotenv.config();
const port = 5000;

app.use(cors()); // Then use cors middleware
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());

app.use("/api/seedRouter", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/user", UserRouter);
app.use("/api/user", orderPlace);
app.use("/api/user/order", orderDetails);
app.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});
