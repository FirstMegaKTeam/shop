// dependencis
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { compare } = require('bcrypt');
const passportJWT = require('passport-jwt');

// import
const { User } = require('../../DB/models/index');

// variable
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const configJWTStrategy = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const configJWTStrategyCheckEmail = {
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
  secretOrKey: process.env.JWT_SECRET_EMIAL,
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

// authentic user
async function verifyUser(payload, done) {
  try {
    const user = await User.findOne(({ where: { id: payload.id } }));

    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new Error('Wrong public key');
    }

    done(null, user);
  } catch (er) {
    done(er);
  }
}

passport.use('userAccess', new JWTStrategy(configJWTStrategy, verifyUser));

// authentic Admin

async function verifyAdmin(payload, done) {
  try {
    const user = await User.findOne(({ where: { id: payload.id } }));

    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new Error('Wrong public key');
    }
    if (user.role === 1 || user.role === 2) {
      done(null, user);
    } else {
      throw new Error('You not Admin');
    }
  } catch (er) {
    done(er);
  }
}

passport.use('adminAccess', new JWTStrategy(configJWTStrategy, verifyAdmin));

//

async function verifyHeadAdmin(payload, done) {
  try {
    const user = await User.findOne(({ where: { id: payload.id } }));

    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new Error('Wrong public key');
    }

    if (user.role === 2) {
      done(null, user);
    } else {
      throw new Error('You not Head Admin');
    }
  } catch (er) {
    done(er);
  }
}

passport.use('headAdminAccess', new JWTStrategy(configJWTStrategy, verifyHeadAdmin));

async function accountActivation(payload, done) {
  try {
    const user = await User.findOne(({ where: { id: payload.id } }));
    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new Error('Wrong public key');
    }
    done(null, user);
  } catch (er) {
    done(er);
  }
}

passport.use('activation', new JWTStrategy(configJWTStrategyCheckEmail, accountActivation));

module.exports = {
  passport,
};
