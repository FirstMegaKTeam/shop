// dependencis
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { compare } = require('bcrypt');
const passportJWT = require('passport-jwt');

// import
const { User } = require('../DB/models/index');

// variable
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const configJWTStrategy = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use('login', new LocalStrategy({ usernameField: 'email', session: false }, async (name, password, done) => {
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

// autenticate witch cookie combo

async function verifyCallback(payload, done) {
    console.log(('yyy'))
  try {
    const user = await User.findOne(({ id: payload.id }));
    console.log(user)
    done(null, user);
  } catch (er) {
      console.log('xxx')
    done(er);
  }
}

passport.use('userAccess', new JWTStrategy(configJWTStrategy, verifyCallback));



module.exports = {
  passport,
};
