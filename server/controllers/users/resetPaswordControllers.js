const { compare, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../DB/models/index');
const { resetPasswordMail } = require('../../utils/sendMail');
const {
  WrongDataError, NotFoundError, WrongPublicKeyError, NotLoginError, WrongEmailError,
} = require('../../utils/errors');

const sendEmailWithResetLink = async (req, res, next) => {
  const {
    name, lastName, age, email,
  } = req.body;
  try {
    if (!name || !lastName || !age || !email) throw new WrongDataError('You must complete all the fields');

    const user = await User.findOne({ where: { email } });

    if (!user) throw new NotFoundError('User dont exist');

    const checkUser = compare(name.concat(lastName, age, email), user.publicKey);

    if (!checkUser) throw new WrongPublicKeyError('You write wrong data');

    const token = jwt.sign(
      {
        id: user.id,
        publicKey: user.publicKey,
      },
      process.env.JWT_SECRET_EMIAL,
      { expiresIn: '1h' },
    );

    await resetPasswordMail(user.email, token, user.name);
    res.json('We send mail witch link to reset password');
  } catch (e) {
    next(e);
  }
};

const checkQueryAndSendCookie = async (req, res, next) => {
  const { user } = req;
  try {
    if (!user) throw new NotLoginError('Dont found user');

    const userToResetPassword = await User.findOne({ where: { id: user.id } });

    if (!userToResetPassword) throw new NotFoundError('User not found');

    const token = jwt.sign(
      {
        id: user.id,
        publicKey: user.publicKey,
      },
      process.env.JWT_SECRET_RESET_PASSWORD,
      { expiresIn: 60 * 10 },
    );

    res.cookie('auth', token, {
    // secure: true,
      signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    });

    res.json('You can now reset your password');
  } catch (e) {
    next(e);
  }
};

const setNewPassword = async (req, res, next) => {
  const { user } = req;
  const { password, email } = req.body;
  try {
    if (!user) throw new NotLoginError('User data be wrong');
    if (!password || !email) throw new WrongDataError('You must complete email and new password');

    const userToResetPass = await User.findOne({ where: { id: user.id } });

    if (!userToResetPass) throw new NotFoundError('User dont exist');
    if (userToResetPass.email !== email) throw new WrongEmailError('Email is wrong');

    userToResetPass.password = await hash(password, 10);

    await userToResetPass.save();

    res.json('Your password has been change');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  sendEmailWithResetLink,
  checkQueryAndSendCookie,
  setNewPassword,
};
