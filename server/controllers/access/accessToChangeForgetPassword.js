const passport = require('passport');
const { EmptyTokenError } = require('../../utils/errors');

module.exports = function (req, res, next) {
  if (!req.headers.authorization) throw new EmptyTokenError('You dont have acces token');
  passport.authenticate('changeForgetPassword', { session: false, failWithError: true })(req, res, next);
};
