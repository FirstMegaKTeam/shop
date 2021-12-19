const passport = require('passport');
const { NotLoginError } = require('../../utils/errors');

module.exports = function (req, res, next) {
  if (!req.headers.authorization) throw new NotLoginError('You must login');
  passport.authenticate('adminAccess', { session: false, failWithError: true })(req, res, next);
};
