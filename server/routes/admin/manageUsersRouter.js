const express = require('express');

const {
  getAllUsers,
  getOneUserByID,
  getOneUserByEmail,
  editUserData,
  deleteUser,
} = require('../../controllers/admin/usersControllers');

const manageUsersRouter = express.Router();

manageUsersRouter
  .get('/', getAllUsers)
  .get('/id/:id', getOneUserByID)
  .get('/email/:email', getOneUserByEmail)
  .patch('/', editUserData)
  .delete('/', deleteUser);

module.exports = {
  manageUsersRouter,
};
