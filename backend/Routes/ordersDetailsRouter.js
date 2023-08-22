import express from "express";
import Order from "../Model/orderModel.js";

const orderDetailsRouter = express.Router();

orderDetailsRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const ordersDetails = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(ordersDetails);
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
});

export default orderDetailsRouter;
