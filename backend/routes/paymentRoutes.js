const express = require("express");
const {
  createdOrder,
  verifyPayment,
} = require("../controller/paymentController");

const route = express.Router();

route.post("/order", createdOrder);
route.post("/verify", verifyPayment);

module.exports = route;
