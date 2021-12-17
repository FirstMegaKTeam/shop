const express = require('express');
const { sendEmailWithResetLink, checkQueryAndSendCookie, setNewPassword} = require('../controllers/users/resetPaswordControllers');
const accessTokenInQueryString = require('../controllers/access/accessByQueryParamsToken');
const accessCookieToChangeResPass= require('../controllers/access/accessToChangeForgetPassword');

const resetPasswordRouter = express.Router();

resetPasswordRouter
  .get('/', accessTokenInQueryString, checkQueryAndSendCookie)
  .post('/', sendEmailWithResetLink)
  .post('/set/password', accessCookieToChangeResPass, setNewPassword);

module.exports = {
  resetPasswordRouter,
};
