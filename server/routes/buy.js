const express = require('express');


const buyRouter = express.Router();

buyRouter.get('/', async (req, res, next) => {


  res.json('odp');
});

module.exports = {
  buyRouter,
};
