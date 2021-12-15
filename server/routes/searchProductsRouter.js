const express = require('express');

const {
  getAllProducts,
  getProductByName,
  getByPriceSmallerOrBigger,
  getProductByPriceBetween,
} = require('../controllers/users/searchProductsController');

const productsRouter = express.Router();

productsRouter
  .get('/:page', getAllProducts)
  .get('/name/:name', getProductByName)
  .get('/price/sign/:price/:biggerOrSmaller', getByPriceSmallerOrBigger)
  .get('/price/compartment/:greaterThan/:lessThan', getProductByPriceBetween);

module.exports = {
  productsRouter,
};
