const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('userAccess', { session: false })(req, res, next);
};
