const express = require('express');

const { changeSettings } = require('../controllers/users/userSettingsController');

const userSettingsRouter = express.Router();

userSettingsRouter
  .patch('/', changeSettings);

module.exports = {
  userSettingsRouter,
};
