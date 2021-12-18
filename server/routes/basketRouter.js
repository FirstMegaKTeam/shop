const express = require('express');
const {
  getUserBasket,
  addProductToBasket,
  deleteProductFromBasket,
} = require('../controllers/users/basketController');

const basketRouter = express.Router();

basketRouter
  .get('/', getUserBasket)
  .post('/', addProductToBasket)
  .delete('/', deleteProductFromBasket);

module.exports = {
  basketRouter,
};
