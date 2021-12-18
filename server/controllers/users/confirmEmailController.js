const jwt = require('jsonwebtoken');
const { User } = require('../../DB/models/index');
const { sendActivateMail } = require('../../utils/sendMail');
const { NotFoundError, WrongEmailError } = require('../../utils/errors');

const confirmEmail = async (req, res, next) => {
  const { user } = req;
  try {
    if (!user) throw new NotFoundError('User dont exist');
    console.log(user);

    user.activate = 1;
    await user.save();

    res.json('Your account is active, now You can login');
  } catch (e) {
    next(e);
  }
};

const sendNewEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) throw new WrongEmailError('You must give email address');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new NotFoundError('User dont exist');

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
