const express = require('express');
const { order, orderNow, getAllUserOrders } = require('../controllers/users/orderController');

const orderRouter = express.Router();

orderRouter
  .get('/', getAllUserOrders)
  .post('/', order)
  .post('/buy/now', orderNow);

module.exports = {
  orderRouter,
};
