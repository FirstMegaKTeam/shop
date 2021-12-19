const passport = require('passport');
const { EmptyTokenError } = require('../../utils/errors');

module.exports = function (req, res, next) {
  if (!req.query.token) throw new EmptyTokenError('Authorization token not exist');
  passport.authenticate('checkTokenInQuery', { session: false, failWithError: true })(req, res, next);
};
