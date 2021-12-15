const express = require('express');

const {
  getAllOrders,
  getOrdersByStatus,
  getUserWitchOrders,
  getOneOrder,
  deleteOneOrder,
  editOneOrder,
} = require('../../controllers/admin/manageOrdersController');

const manageOrdersRouter = express.Router();

manageOrdersRouter
  .get('/', getAllOrders)
  .get('/status/:status', getOrdersByStatus)
  .get('/users/:id', getUserWitchOrders)
  .get('/order/:id', getOneOrder)
  .patch('/', editOneOrder)
  .delete('/', deleteOneOrder);

module.exports = {
  manageOrdersRouter,
};
