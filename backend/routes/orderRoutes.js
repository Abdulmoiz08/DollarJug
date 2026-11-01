const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const { admin } = require("../middleware/adminmiddleware");
const {
  createOrder,
  getOrders,
  getOrdersById,
  updateOrderStatus,
} = require("../controller/orderController");
const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/:id").get(protect, getOrdersById);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
