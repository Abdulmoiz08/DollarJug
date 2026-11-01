const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || !totalAmount || !address || !paymentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user: req.user._id,
      items: items,
      totalAmount,
      address,
      paymentId,
    });

    const createdOrder = await order.save();
    const orderDetails = createdOrder.items
      .map(
        (item) =>
          `Product ID: ${item.product}, Quantity: ${item.quantity}, Price: ${item.price}`,
      )
      .join("\n");
    await sendEmail(
      req.user.email,
      "Order Confirmation",
      `Your order has been placed successfully.\n\nOrder Details:\n${orderDetails}\nTotal Amount: ${totalAmount}\n\nThank you for shopping with us!`,
    );
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").populate("items.product", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const orders = await Order.find({user: req.user._id}).populate("items.product", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersById,
  updateOrderStatus
};