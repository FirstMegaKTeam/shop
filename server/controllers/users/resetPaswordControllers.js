const { compare, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../DB/models/index');
const { resetPasswordMail } = require('../../utils/sendMail');

const sendEmailWithResetLink = async (req, res, next) => {
  const {
    name, lastName, age, email,
  } = req.body;
  try {
    if (!name || !lastName || !age || !email) {
      throw new Error('You must complete all the fields');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User dont exist');
    }

    const checkUser = compare(name.concat(lastName, age, email), user.publicKey);
    if (!checkUser) {
      throw new Error('You write wrong data');
    }

    const token = jwt.sign(
      {
        id: user.id,
        publicKey: user.publicKey,
      },
      process.env.JWT_SECRET_EMIAL,
      { expiresIn: '1h' },
    );

    await resetPasswordMail(user.email, token, user.name);
    res.json('We send mail witch link to reset password')
  } catch (e) {
    next(e);
  }
};

const checkQueryAndSendCookie = async (req, res, next) => {
  const { user } = req;
  try {
    const userToActivity = await User.findOne({ where: { id: user.id } });
    if (!userToActivity) {
      throw new Error('User not found');
    }
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
    if (!password || !email) {
      throw new Error('You must complete email and new password');
    }

    const userToResetPass = await User.findOne({ where: { id: user.id } });
    if (!userToResetPass) {
      throw new Error('User dont exist');
    }
    if (userToResetPass.email !== email) {
      throw new Error('Email is wrong');
    }
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
