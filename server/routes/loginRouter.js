const express = require('express');

const { loginUser } = require('../controllers/users/loginController');

const loginRouter = express.Router();

loginRouter
  .post('/', loginUser);

module.exports = {
  loginRouter,
};
