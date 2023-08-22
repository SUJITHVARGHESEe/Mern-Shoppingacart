import express from "express";
import Order from "../Model/orderModel.js";
import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());

const orderPlace = express.Router();

orderPlace.post("/orderplace", async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    user: { _id, email, itemsPrice, shippingPrice, taxPrice, totalPrice },
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    if (decoded._id !== req.body.user._id) {
      return res
        .status(401)
        .json({ message: "Not authorized, token user ID mismatch" });
    }
    console.log(decoded._id, req.body.user._id);
    const user = await User.findById(decoded._id);

    const useremail = user.email;
    console.log(useremail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const order = new Order({
      user: _id,
      shippingAddress,
      paymentMethod,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({ createdOrder, useremail });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Server error" });
  }
});

export default orderPlace;
