const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('checkTokenInQuery', { session: false })(req, res, next);
};
