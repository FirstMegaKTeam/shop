const express = require('express');

const {
  logout,
} = require('../controllers/users/logoutController');

const logoutRouter = express.Router();

logoutRouter
  .get('/', logout);

module.exports = {
  logoutRouter,

};
