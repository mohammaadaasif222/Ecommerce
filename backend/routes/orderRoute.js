const express = require("express");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//getUserOrder
router.route("order/myorders").get(protect, getMyOrders);
//get order by id
router.route("order/:id").get(protect, getOrderById);
//craete new order
router.route("order/").post(protect, addOrderItem);
//update order
router.route("order/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
