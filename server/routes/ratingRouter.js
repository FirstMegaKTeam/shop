const express = require('express');
const { getAllRating, addProductRating } = require('../controllers/users/ratingController');

const ratingRouter = express.Router();

ratingRouter

  .get('/:productId', getAllRating)
  .post('/', addProductRating);

module.exports = {
  ratingRouter,
};
