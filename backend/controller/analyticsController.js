const User = require('../model/User');
const Order = require("../model/Order");
const product = require("../model/Product");

const getSalesAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalrevenue = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0,
    );

    const totalorders = orders.length;
    const totalproducts = await product.countDocuments({});
    const totalusers = await User.countDocuments({ role: "user" });

    res.json({
      totalRevenue: totalrevenue,
      totalOrders: totalorders,
      totalProducts: totalproducts, 
      totalUsers: totalusers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSalesAnalytics };
