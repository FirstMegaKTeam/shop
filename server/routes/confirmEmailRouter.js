const express = require('express');

const { confirmEmail, sendNewEmail } = require('../controllers/users/confirmEmailController');
const confirmEmailAuthenticate = require('../controllers/access/accessByQueryParamsToken');

const confirmEmailRouter = express.Router();

confirmEmailRouter
  .get('/', confirmEmailAuthenticate, confirmEmail)
  .post('/', sendNewEmail);

module.exports = {
  confirmEmailRouter,
};
