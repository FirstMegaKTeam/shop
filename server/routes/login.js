const express = require('express');

const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  res.json('you log in');
});

module.exports = {
  loginRouter,
};
