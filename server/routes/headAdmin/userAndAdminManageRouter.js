const express = require('express');
const { editUserAndAdminData, deleteUserAndAdmin } = require('../../controllers/headAdmin/userAndAdminController');

const headAdminRouter = express.Router();

headAdminRouter
  .patch('/', editUserAndAdminData)
  .delete('/', deleteUserAndAdmin);

module.exports = {
  headAdminRouter,
};
