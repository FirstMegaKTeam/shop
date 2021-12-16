const express = require('express');

const {
  getAllUserMessage,
  getSentOrReceivedUserMessage,
  getOneMessage,
  sendMessage,
  deleteMessage,
} = require('../controllers/users/messagesController');

const messageRouter = express.Router();

messageRouter
  .get('/:userId', getAllUserMessage)
  .get('/:shippedOrReceived/:userId', getSentOrReceivedUserMessage)
  .get('/one/:messageId', getOneMessage)
  .post('/', sendMessage)
  .delete('/', deleteMessage);

module.exports = {
  messageRouter,
};
