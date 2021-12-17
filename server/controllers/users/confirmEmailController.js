const jwt = require('jsonwebtoken');
const { User } = require('../../DB/models/index');
const { sendActivateMail } = require('../../utils/sendMail');

const confirmEmail = async (req, res, next) => {
  const { user } = req;
  try {
    const userToActivity = await User.findOne({ where: { id: user.id } });
    if (!userToActivity) {
      throw new Error('User not found');
    }
    userToActivity.activate = 1;
    await userToActivity.save();

    res.json('Your account is active, now You can login');
  } catch (e) {
    next(e);
  }
};

const sendNewEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    throw new Error('You must give email address');
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User dont exist');
    }

    const token = jwt.sign(
      {
        id: user.id,
        publicKey: user.publicKey,
      },
      process.env.JWT_SECRET_EMIAL,
      { expiresIn: '1h' },
    );

    await sendActivateMail(email, token, user.name);

    res.json('We send new activate email');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  confirmEmail,
  sendNewEmail,
};
