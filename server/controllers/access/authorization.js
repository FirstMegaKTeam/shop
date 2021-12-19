// dependencis
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { compare } = require('bcrypt');
const passportJWT = require('passport-jwt');

// import
const { User } = require('../../DB/models/index');
const {
  WrongEmailError,
  AccountActivationError,
  WrongPasswordError,
  WrongPublicKeyError,
  NotAdminError,
} = require('../../utils/errors');

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

const configJWTStrategyResetPassword = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_RESET_PASSWORD,
};

passport.use('login', new LocalStrategy({ usernameField: 'email', session: false }, async (name, password, done) => {
  try {
    const findUser = await User.findOne({ where: { email: name } });

    if (!findUser) {
      throw new WrongEmailError('Your Email is wrong');
    }
    if (!findUser.activate) {
      throw new AccountActivationError('Your account isn\'t active');
    }

    const passwordMatch = await compare(password, findUser.password);
    if (!passwordMatch) {
      throw new WrongPasswordError('Wrong password');
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
      throw new WrongPublicKeyError('Wrong public key');
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
    const admin = await User.findOne(({ where: { id: payload.id } }));

    const keyMatch = await compare(
      admin.name.concat(admin.lastName, admin.age, admin.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new WrongPublicKeyError('Wrong public key');
    }
    if (admin.role === 1 || admin.role === 2) {
      done(null, admin);
    } else {
      throw new NotAdminError('You not Admin');
    }
  } catch (er) {
    done(er);
  }
}

passport.use('adminAccess', new JWTStrategy(configJWTStrategy,  verifyAdmin));

async function accountActivation(payload, done) {
  try {
    const user = await User.findOne(({
      attributes: ['id', 'name', 'lastName', 'age', 'email', 'publicKey'],
      where: { id: payload.id },
    }));
    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new WrongPublicKeyError('Wrong public key');
    }
    done(null, user);
  } catch (er) {
    done(er);
  }
}

passport.use('checkTokenInQuery', new JWTStrategy(configJWTStrategyCheckEmail, accountActivation));

async function resetPassword(payload, done) {
  try {
    const user = await User.findOne(({ where: { id: payload.id } }));
    const keyMatch = await compare(
      user.name.concat(user.lastName, user.age, user.email),
      payload.publicKey,
    );
    if (!keyMatch) {
      throw new WrongPublicKeyError('Wrong public key');
    }
    done(null, user);
  } catch (er) {
    done(er);
  }
}

passport.use('changeForgetPassword', new JWTStrategy(configJWTStrategyResetPassword, resetPassword));

module.exports = {
  passport,
};
