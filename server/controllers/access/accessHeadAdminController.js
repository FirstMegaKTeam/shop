const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('headAdminAccess', { session: false })(req, res, next);
};
