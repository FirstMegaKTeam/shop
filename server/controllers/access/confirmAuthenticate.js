const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('activation', { session: false })(req, res, next);
};
