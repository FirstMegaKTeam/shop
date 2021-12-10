const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('login', { session: false })(req, res, next);
};
