const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('adminAccess', { session: false })(req, res, next);
};
