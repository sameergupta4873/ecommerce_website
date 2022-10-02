const express = require('express')
const {addOrderItem, getOrderById , updateOrderToPaid, getMyOrders} = require('../controllers/orderController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

//create new order
router.route("/").post(protect, addOrderItem);
//get a particular order
router.route("/:id").get(protect, getOrderById);
//update payment in order
router.route("/:id/pay").put(protect, updateOrderToPaid);
//to get all orders by email and password
router.route("/myorders/:id").get(protect,getMyOrders)

module.exports = router;
