const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('changeForgetPassword', { session: false })(req, res, next);
};
