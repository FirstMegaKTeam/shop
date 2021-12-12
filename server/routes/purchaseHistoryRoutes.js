const express = require('express');

const { getShoppingHistory, addNewProductToHistory } = require('../controllers/users/purchaseHistoryController');

const purchaseHistoryRouter = express.Router();

purchaseHistoryRouter
  .get('/:id', getShoppingHistory)
  .post('/', addNewProductToHistory);

module.exports = {
  purchaseHistoryRouter,
};
