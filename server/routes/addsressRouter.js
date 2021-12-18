const express = require('express');

const {
  getAllUserAddress,
  addNewUserAddress,
  editUserAddress,
  deleteUserAddress,
} = require('../controllers/users/addressController');

const addressRouter = express.Router();

addressRouter
  .get('/', getAllUserAddress)
  .post('/', addNewUserAddress)
  .patch('/', editUserAddress)
  .delete('/', deleteUserAddress);

module.exports = {
  addressRouter,
};
