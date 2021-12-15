const express = require('express');
const { order } = require('../../controllers/users/ orderController');

const orderRouter = express.Router();

orderRouter.get('/', order);

module.exports = {
  orderRouter,
};
