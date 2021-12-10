const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { compare } = require('bcrypt');

const { User } = require('../DB/models/index');

const checkUser = (email, passsword, done) => {

};

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (name, password, done) => {
  try {
    const findUser = await User.findOne({ where: { email: name } });

    if (!findUser) {
      throw new Error('Email is wrong');
    }
    if (!findUser.activate) {
      throw new Error('Your account isn\'t active');
    }

    const passwordMatch = await compare(password, findUser.password);
    if (!passwordMatch) {
      throw new Error('Wrong password');
    }
    return done(null, findUser);
  } catch (e) {
    done(e);
  }
}));

module.exports = {
  passport,
};
