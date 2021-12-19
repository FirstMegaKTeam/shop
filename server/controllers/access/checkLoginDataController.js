const passport = require('passport');
const { WrongDataError } = require('../../utils/errors');

module.exports = function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) throw new WrongDataError('You must give email and password');
  passport.authenticate('login', { session: false, failWithError: true })(req, res, next);
};
