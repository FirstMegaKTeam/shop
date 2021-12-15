const express = require('express');

const { registerUser } = require('../controllers/users/registerController');

const registerRouter = express.Router();

registerRouter
  .post('/', registerUser);

module.exports = {
  registerRouter,
};
