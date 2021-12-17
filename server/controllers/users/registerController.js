const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../DB/models/index');
const { sendMail } = require('../../utils/sendMail');

const registerUser = async (req, res, next) => {
  const {
    name, lastName, age, email, password,
  } = req.body;

  try {
    const hashPassword = await hash(password, 10);

    const publicKey = await hash((name.concat(lastName, age, email)), 10);

    const newUser = await User.create({
      name,
      lastName,
      age,
      email,
      password: hashPassword,
      publicKey,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        publicKey: newUser.publicKey,
      },
      process.env.JWT_SECRET_EMIAL,
      { expiresIn: '1h' },
    );

    await sendMail(email, token, name);

    res.json(newUser);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
};
